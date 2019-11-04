"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const nest_event_1 = require("./nest-event");
const decorators_1 = require("./decorators");
common_1.Injectable();
let NestEventEmitter = class NestEventEmitter {
    constructor(nestEvent) {
        this.nestEvent = nestEvent;
    }
    emit(event, ...args) {
        const eventEmitter = this.emitter();
        if (eventEmitter) {
            eventEmitter.emit(event, ...args);
        }
    }
    emitter(emitter = 'default') {
        if (!this.nestEvent.getEmitters().has(emitter)) {
            throw new common_1.InternalServerErrorException(`Emitter with name: '${emitter}' not found`);
        }
        return this.nestEvent.getEmitters().get(emitter);
    }
};
NestEventEmitter = __decorate([
    __param(0, decorators_1.InjectNestEvent()),
    __metadata("design:paramtypes", [nest_event_1.NestEvent])
], NestEventEmitter);
exports.NestEventEmitter = NestEventEmitter;
//# sourceMappingURL=nest-event-emitter.js.map