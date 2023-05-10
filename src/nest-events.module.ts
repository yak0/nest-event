import { DiscoveryModule } from '@golevelup/nestjs-discovery';
import { Global, Module } from '@nestjs/common';
import { DefaultEventEmitter } from './nest-emitters';
import { NestEvents } from './nest-events';
import { NestEventsEmitter } from './nest-events-emitter';

@Global()
@Module({
  imports: [DiscoveryModule],
  providers: [
    NestEvents,
    NestEventsEmitter,
    DefaultEventEmitter,
  ],
  exports: [
    NestEvents,
    NestEventsEmitter,
    DefaultEventEmitter,
  ],
})
export class NestEventsModule {}
