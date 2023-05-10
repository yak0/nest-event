import { Test } from '@nestjs/testing';
import { NestEventsEmitter, NestEventsModule } from '../src';
import { AsyncEmitter } from './async.emitter';
import { SecondaryEmitter } from './secondary.emitter';
import { SimpleService } from './simple.service';

describe('Nest Events Emitter', () => {
  let service: SimpleService;
  let events: NestEventsEmitter;

  beforeEach(async () => {
    const module = Test.createTestingModule({
      imports: [NestEventsModule],
      providers: [SimpleService, SecondaryEmitter, AsyncEmitter],
    });
    const ref = await module.compile();
    await ref.init();

    events = ref.get(NestEventsEmitter);
    service = ref.get(SimpleService);
  });

  it('should fail when emitter is not defined', () => {
    expect(() => events.emitter('not-defined').emit('simple.event', 'payload'))
      .toThrowError('Emitter with name: \'not-defined\' not found');
  });

  it('should simply emit events to @On listener', async () => {
    events.emit('simple.event', 'payload.1');
    events.emit('simple.event', 'payload.2');
    expect(service.stack).toEqual([
      ['simple.event', 'payload.1'],
      ['simple.event', 'payload.2'],
    ]);
  });

  it('should emit events to @On listener with async', async () => {
    await events.emitter('async').emit('simple.event', 'async.payload.1');
    await events.emitter('async').emit('simple.event', 'async.payload.2');
    expect(service.stack).toEqual([
      ['simple.event', 'async.payload.1'],
      ['simple.event', 'async.payload.2'],
    ]);
  });

  it('should emit events to @On listener for secondary', async () => {
    events.emitter('secondary').emit('simple.event', 'secondary.payload.1');
    events.emitter('secondary').emit('simple.event', 'secondary.payload.2');
    expect(service.stack).toEqual([
      ['simple.event.secondary', 'secondary.payload.1'],
      ['simple.event.secondary', 'secondary.payload.2'],
    ]);
  });

  it('should add and remove listener to emitter', async () => {
    const stack = [];
    const listener = event => stack.push(event);

    events.on('one.off', listener);
    events.emit('one.off', 'one.off.payload.1');

    events.off('one.off', listener);
    events.emit('one.off', 'one.off.payload.2');

    expect(stack).toEqual([
      'one.off.payload.1',
    ]);
  });
});
