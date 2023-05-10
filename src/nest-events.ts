import { DiscoveredClass, DiscoveredClassWithMeta, DiscoveredMethodWithMeta, DiscoveryService } from '@golevelup/nestjs-discovery';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { NEST_EVENT_EMITTER, NEST_EVENT_FROM, NEST_EVENT_ON } from './decorators';
import { DefaultEventEmitter, IEventEmitter } from './nest-emitters';

@Injectable()
export class NestEvents implements OnModuleInit {
  private emitters: Map<string, IEventEmitter>;

  constructor(
    private readonly discovery: DiscoveryService,
    private readonly defaults: DefaultEventEmitter<any>,
  ) {
  }

  public async onModuleInit() {
    this.emitters = await this.findEmitters();
    await this.setEventListeners();
  }

  public getEmitters(): Map<string, IEventEmitter> {
    return this.emitters;
  }

  private async findEmitters(): Promise<Map<string, IEventEmitter>> {
    const discoveredEmitters: DiscoveredClassWithMeta<string>[] = await this.discovery
      .providersWithMetaAtKey<string>(NEST_EVENT_EMITTER);

    const defaultEmitter: DiscoveredClassWithMeta<string> = discoveredEmitters
      .find((item: DiscoveredClassWithMeta<string>) => item.meta === 'default');
    const emitters: Map<string, IEventEmitter> = new Map<string, IEventEmitter>(
      discoveredEmitters
        .map((item: DiscoveredClassWithMeta<string>) => [item.meta, item.discoveredClass.instance as IEventEmitter]),
    );
    if (!defaultEmitter) {
      emitters.set('default', this.defaults);
    }

    return emitters;
  }

  private async getMethodEmitters(): Promise<Map<string, IEventEmitter>> {
    const methodEmitters: DiscoveredMethodWithMeta<string>[] = await this
      .findFromControllersAndProviders(NEST_EVENT_FROM);

    return new Map<string, IEventEmitter>(
      methodEmitters
        .map((m: DiscoveredMethodWithMeta<string>) => [
          `${m.discoveredMethod.parentClass.name}.${m.discoveredMethod.methodName}`,
          this.emitters.get(m.meta),
        ]),
    );
  }

  private async setEventListeners() {
    const methodEmitters: Map<string, IEventEmitter> = await this.getMethodEmitters();
    const methods: DiscoveredMethodWithMeta<string>[] = await this
      .findFromControllersAndProviders(NEST_EVENT_ON);

    methods.forEach((m: DiscoveredMethodWithMeta<string>) => {
      const eventName: string = m.meta;
      const discoveredClass: DiscoveredClass = m.discoveredMethod.parentClass;
      const methodName: string = m.discoveredMethod.methodName;
      const methodKey: string = `${discoveredClass.name}.${methodName}`;
      const method: any = discoveredClass.instance[methodName].bind(discoveredClass.instance);
      if (methodEmitters.has(methodKey)) {
        const emitterInstance: IEventEmitter | undefined = methodEmitters.get(methodKey);
        if (emitterInstance) {
          emitterInstance.on(eventName, method);
        }

        return;
      }
      const emitter: IEventEmitter | undefined = this.emitters.get('default');
      if (emitter) {
        emitter.on(eventName, method);
      }
    });
  }

  private async findFromControllersAndProviders(metaKey: string): Promise<DiscoveredMethodWithMeta<string>[]> {
    const methodsFromControllers = await this.discovery.controllerMethodsWithMetaAtKey<string>(metaKey);
    const methodsFromProviders = await this.discovery.providerMethodsWithMetaAtKey<string>(metaKey);
    return [...methodsFromControllers, ...methodsFromProviders];
  }
}
