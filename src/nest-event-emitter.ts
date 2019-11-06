import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { NestEvent } from './nest-event';
import { InjectNestEvent } from './decorators';
import { EventEmitter } from 'events';

// tslint:disable-next-line: semicolon
Injectable()
export class NestEventEmitter {
  constructor(
    @InjectNestEvent() private readonly nestEvent: NestEvent,
  ) {}

  public emit(event: string | symbol, ...args: any[]) {
    const eventEmitter: EventEmitter = this.emitter();
    if (eventEmitter) {
      eventEmitter.emit(event, ...args);
    }
  }

  public on(event: string | symbol, listener: (...args: any[]) => void) {
    const eventEmitter: EventEmitter = this.emitter();
    if (eventEmitter) {
      eventEmitter.on(event, listener);
    }
  }

  public off(event: string | symbol, listener: (...args: any[]) => void) {
    const eventEmitter: EventEmitter = this.emitter();
    if (eventEmitter) {
      eventEmitter.off(event, listener);
    }
  }

  public emitter(emitter: string = 'default'): EventEmitter | undefined {
    if (!this.nestEvent.getEmitters().has(emitter)) {
      throw new InternalServerErrorException(`Emitter with name: '${emitter}' not found`);
    }

    return this.nestEvent.getEmitters().get(emitter);
  }

}
