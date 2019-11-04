import { SetMetadata } from '@nestjs/common';
import { NEST_EVENT_ON } from '../constants';

export const On = (eventName: string) => SetMetadata(NEST_EVENT_ON, eventName);
