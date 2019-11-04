import { SetMetadata } from '@nestjs/common';
import { NEST_EVENT_FROM } from '../constants';

export const From = (emitter: string) => SetMetadata(NEST_EVENT_FROM, emitter);
