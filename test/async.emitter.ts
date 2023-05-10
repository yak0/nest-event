import { DefaultEventEmitter, Emitter, IEventEmitter } from '../src';

@Emitter('async')
export class AsyncEmitter<T> implements IEventEmitter<T, Promise<boolean>> {
  constructor(private emitter: DefaultEventEmitter<any>) {
  }

  async emit(event: string, ...args: any[]): Promise<boolean> {
    return new Promise<boolean>(async (resolve) => {
      this.emitter.emit(event, ...args);
      await new Promise(wakeup => setTimeout(wakeup, 1000));
      resolve(true);
    });
  }

  on(event: string | symbol, listener: (...args: T[]) => void): this {
    this.emitter.on(event, listener);
    return this;
  }

  off(event: string | symbol, listener: (...args: T[]) => void): this {
    this.emitter.off(event, listener);
    return this;
  }
}
