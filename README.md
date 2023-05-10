## Nest Event
<p>
  <a href="https://www.npmjs.com/~nest-event" target="_blank"><img src="https://img.shields.io/npm/v/nest-event.svg"
      alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/~nest-event" target="_blank"><img src="https://img.shields.io/npm/l/nest-event.svg"
      alt="Package License" /></a>
  <a href="https://www.npmjs.com/~nest-event" target="_blank"><img
      src="https://img.shields.io/npm/dm/nest-event.svg" alt="NPM Downloads" /></a>
  <a href="https://travis-ci.org/javascript-dragons/nest-event"><img
      src="https://api.travis-ci.org/javascript-dragons/nest-event.svg?branch=master" alt="Travis" /></a>
</p>
  <p >Event handler for <a href="https://nestjs.com" target="_blank">Nest.js</a> framework with decorators </p>

### Features
- Communicate between modules without import
- Organize event handlers with decorators
- Work with multiple Event Emitters

### Installation

```bash
$ npm i --save nest-event
```
### Usage
Import `NestEventModule` into your root module _(`AppModule`)_

```ts
// app.module.ts

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NestEventModule } from 'nest-event';
@Module({
  imports: [NestEventModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

Nest Event is coming with an internal event emitter. If you provide one without a name, the module do not create the internal emitter. Also, you can use any instance with extended from `IEventEmitter`

To provide an emitter use `@Emitter` decorator.

```ts
import { Emitter, DefaultEventEmitter } from 'nest-event';

@Emitter()
export class MyEventEmitter extends DefaultEventEmitter {}
```

You can provide multiple emitters with passing a name.

```ts
import { WebSocket } from 'ws';

@Emitter('ws-emitter')
class WebsocketClient<T = any> extends WebSocket implements IEventEmitter<T, boolean> {}
```

You can also implement async Emitters

```ts
import { SNS } from '@aws-sdk/client-sns';
import { Emitter, IEventEmitter } from 'nest-event';

@Emitter('cloud-emitter')
export class CloudEventEmitter<T> implements IEventEmitter<T, Promise<void>> {
  constructor(private readonly sns: SNS) {
  }

  async emit(event: string | symbol, ...args: T[]): Promise<void> {
    await this.sns.publishBatch({
      TopicArn: 'arn:aws:sns:us-east-1:123456789012:MyTopic',
      PublishBatchRequestEntries: args.map(message => ({
        Id: '<generated id>',
        Message: JSON.stringify(message),
      })),
    });
  }

  on(event: string | symbol, listener: (...args: T[]) => void): this {
    throw new Error('Method not implemented.');
  }

  off(event: string | symbol, listener: (...args: T[]) => void): this {
    throw new Error('Method not implemented.');
  }
}
```


#### Event Handler

To adding a listener for an event you can use `@On` decorator.

```ts
import { Injectable } from '@nestjs/common';
import { On } from 'nest-event';
import { User } from './interfaces';

@Injectable()
export class EmailService {

  @On('user-created')
  onUserCreated(user: User){
    // send verification email
  }
}
```
If you have multiple emitters you can separate the handlers with `@From` decorator.

```ts
  @From('ws-emitter')
  @On('subscribe')
  onSubscribe(channel: string){
    // do something
  }
```
#### Event Emitter

To access your emitters in different modules, controllers etc. You can use  `NestEventEmitter`

```ts
import { NestEventEmitter } from 'nest-event';

@Controller('user')
export class UserController {
  constructor(private readonly events: NestEventEmitter) {}

  @Post('signup')
  signup() {
    // ...
    this.events.emit('user-created', user);
  }
}
```
If you provide multiple emitters you can select one with:

```ts
 this.events.emitter('my-emitter').emit('user-created', user);
```

### Contributing

You are welcome to contribute to this project, just open a PR.
### License

- NestEvent is [MIT licensed](LICENSE).
