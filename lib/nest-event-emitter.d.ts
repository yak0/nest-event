/// <reference types="node" />
import { NestEvent } from './nest-event';
import { EventEmitter } from 'events';
export declare class NestEventEmitter {
    private readonly nestEvent;
    constructor(nestEvent: NestEvent);
    emit(event: string | symbol, ...args: any[]): void;
    emitter(emitter?: string): EventEmitter | undefined;
}
