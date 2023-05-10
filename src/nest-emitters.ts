import { EventEmitter } from 'events';

export interface IEventEmitter<T = any, R = boolean | Promise<unknown>> {
  emit(event: string | symbol, ...args: T[]): R;

  on(event: string | symbol, listener: (...args: T[]) => void): this;

  off(event: string | symbol, listener: (...args: T[]) => void): this;
}

export class DefaultEventEmitter<T> extends EventEmitter implements IEventEmitter<T, boolean> {}
