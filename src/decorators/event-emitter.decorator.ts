import { SetMetadata } from '@nestjs/common';
import { NEST_EVENT_EMITTER } from '../constants';

export const Emitter = (emitter: string = 'default') =>  SetMetadata(NEST_EVENT_EMITTER, emitter);
