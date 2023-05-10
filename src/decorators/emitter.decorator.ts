import { SetMetadata } from '@nestjs/common';

export const NEST_EVENT_EMITTER = 'nest-event:emitter';
export const Emitter = (emitter: string = 'default') =>  SetMetadata(NEST_EVENT_EMITTER, emitter);
