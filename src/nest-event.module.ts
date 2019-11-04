import { Module, Global, NestModule } from '@nestjs/common';
import { NestEvent } from './nest-event';
import { DiscoveryModule } from '@nestjs-plus/discovery';
import { NestEventEmitter } from './nest-event-emitter';
import { InjectNestEvent } from './decorators';
import { NEST_EVENT } from './constants';

@Global()
@Module({
  imports: [DiscoveryModule],
  providers: [
    {
      provide: NEST_EVENT,
      useClass: NestEvent,
    },
    NestEventEmitter,
  ],
  exports: [
    {
      provide: NEST_EVENT,
      useClass: NestEvent,
    },
    NestEventEmitter,
  ],
})
export class NestEventModule implements NestModule {
  constructor(
   @InjectNestEvent() private readonly nestEvent: NestEvent,
  ) {}

  async configure() {
    await this.nestEvent.configure();
  }
}
