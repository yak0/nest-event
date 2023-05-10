import { Injectable } from '@nestjs/common';
import { From, On } from '../src';

@Injectable()
export class SimpleService {
  public readonly stack: [string, any][] = [];

  @On('simple.event')
  onSimple(payload: any): void {
    this.stack.push(['simple.event', payload]);
  }

  @From('secondary')
  @On('simple.event')
  onSimpleSecondary(payload: any): void {
    this.stack.push(['simple.event.secondary', payload]);
  }
}
