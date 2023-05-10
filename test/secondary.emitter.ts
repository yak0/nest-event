import { EventEmitter } from 'events';
import { Emitter, IEventEmitter } from '../src';

@Emitter('secondary')
export class SecondaryEmitter<T> extends EventEmitter implements IEventEmitter<T, boolean> {
}
