import { SetMetadata } from '@nestjs/common';

export const NEST_EVENT_ON: string = 'nest-event:on';
export const On = (eventName: string) => SetMetadata(NEST_EVENT_ON, eventName);
