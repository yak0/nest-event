/// <reference types="node" />
import { EventEmitter } from 'events';
import { DiscoveryService } from '@nestjs-plus/discovery';
export declare class NestEvent {
    private readonly discovery;
    private emitters;
    constructor(discovery: DiscoveryService);
    configure(): Promise<void>;
    getEmitters(): Map<string, EventEmitter>;
    private findEmitters;
    private getMethodEmitters;
    private setEventListeners;
    private findFromControllersAndProviders;
}
