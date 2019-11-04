import { NestModule } from '@nestjs/common';
import { NestEvent } from './nest-event';
export declare class NestEventModule implements NestModule {
    private readonly nestEvent;
    constructor(nestEvent: NestEvent);
    configure(): Promise<void>;
}
