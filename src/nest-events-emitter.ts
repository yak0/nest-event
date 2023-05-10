import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { IEventEmitter } from './nest-emitters';
import { NestEvents } from './nest-events';

@Injectable()
export class NestEventsEmitter {
  constructor(private readonly nestEvents: NestEvents) {
  }

  public emit(event: string | symbol, ...args: any[]) {
    const eventEmitter: IEventEmitter = this.emitter();
    if (eventEmitter) {
      return eventEmitter.emit(event, ...args);
    }
  }

  public on(event: string | symbol, listener: (...args: any[]) => void) {
    const eventEmitter: IEventEmitter = this.emitter();
    if (eventEmitter) {
      eventEmitter.on(event, listener);
    }
  }

  public off(event: string | symbol, listener: (...args: any[]) => void) {
    const eventEmitter: IEventEmitter = this.emitter();
    if (eventEmitter) {
      eventEmitter.off(event, listener);
    }
  }

  public emitter<T = any>(emitter: string = 'default'): IEventEmitter<T> | undefined {
    if (!this.nestEvents.getEmitters().has(emitter)) {
      throw new InternalServerErrorException(`Emitter with name: '${emitter}' not found`);
    }

    return this.nestEvents.getEmitters().get(emitter);
  }
}
