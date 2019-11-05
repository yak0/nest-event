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
  <p >Event handler for <a href="http://nestjs.com" target="_blank">Nest.js</a> framework with decorators </p>

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

Nest Event is coming with an internal event emitter. If you provide one without a name, the module do not create the internal emitter. Also, you can use any instance with extended from `EventEmitter`

To provide an emitter use `@Emitter` decorator.

```ts
import { EventEmitter } from 'events';
import { Injectable } from '@nestjs/common';
import { Emitter } from './nest-event';

@Emitter()
export class MyEventEmitter extends EventEmitter {}
```
You can provide multiple emitters with passing a name.
```ts
@Emitter('ws-emitter')
export class WebsocketClient extends Websocket {}
```

#### Event Handler

To adding a listener for an event you can use `@On` decorator.

```ts
import { Injectable } from '@nestjs/common';
import { On } from './nest-event';
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
import { NestEventEmitter } from './nest-event';

@Controller('user')
export class UserController {
  constructor(
    private readonly nestEventEmitter: NestEventEmitter,
    ) {}

  @Post('signup')
  signup() {
    // ...
    this.nestEventEmitter.emit('user-created', user);
  }
}
```
If you provide multiple emitters you can select one with:

```ts
 this.nestEventEmitter.emitter('my-emitter').emit('user-created', user);
```
### Future Goals

* Add tests;

### Contributing

You are welcome to contribute to this project, just open a PR.
### License

- NestEvent is [MIT licensed](LICENSE).
