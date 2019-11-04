import { Inject } from '@nestjs/common';
import { NEST_EVENT } from '../constants';

export const InjectNestEvent = () => Inject(NEST_EVENT);
