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
const discovery_1 = require("@nestjs-plus/discovery");
const nest_event_emitter_1 = require("./nest-event-emitter");
const decorators_1 = require("./decorators");
const constants_1 = require("./constants");
let NestEventModule = class NestEventModule {
    constructor(nestEvent) {
        this.nestEvent = nestEvent;
    }
    async configure() {
        await this.nestEvent.configure();
    }
};
NestEventModule = __decorate([
    common_1.Global(),
    common_1.Module({
        imports: [discovery_1.DiscoveryModule],
        providers: [
            {
                provide: constants_1.NEST_EVENT,
                useClass: nest_event_1.NestEvent,
            },
            nest_event_emitter_1.NestEventEmitter,
        ],
        exports: [
            {
                provide: constants_1.NEST_EVENT,
                useClass: nest_event_1.NestEvent,
            },
            nest_event_emitter_1.NestEventEmitter,
        ],
    }),
    __param(0, decorators_1.InjectNestEvent()),
    __metadata("design:paramtypes", [nest_event_1.NestEvent])
], NestEventModule);
exports.NestEventModule = NestEventModule;
//# sourceMappingURL=nest-event.module.js.map