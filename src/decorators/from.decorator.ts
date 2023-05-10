import { SetMetadata } from '@nestjs/common';

export const NEST_EVENT_FROM: string = 'nest-event:from';
export const From = (emitter: string) => SetMetadata(NEST_EVENT_FROM, emitter);
