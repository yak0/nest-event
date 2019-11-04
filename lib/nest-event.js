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
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const events_1 = require("events");
const discovery_1 = require("@nestjs-plus/discovery");
const common_1 = require("@nestjs/common");
let NestEvent = class NestEvent {
    constructor(discovery) {
        this.discovery = discovery;
    }
    async configure() {
        this.emitters = await this.findEmitters();
        await this.setEventListeners();
    }
    getEmitters() {
        return this.emitters;
    }
    async findEmitters() {
        const discoveredEmitters = await this.discovery
            .providersWithMetaAtKey(constants_1.NEST_EVENT_EMITTER);
        const defaultEmitter = discoveredEmitters
            .find((item) => item.meta === 'default');
        const emitters = new Map(discoveredEmitters
            .map((item) => [item.meta, item.discoveredClass.instance]));
        if (!defaultEmitter) {
            emitters.set('default', new events_1.EventEmitter());
        }
        return emitters;
    }
    async getMethodEmitters() {
        const methodEmitters = await this
            .findFromControllersAndProviders(constants_1.NEST_EVENT_FROM);
        return new Map(methodEmitters
            .map((m) => [
            `${m.discoveredMethod.parentClass.name}.${m.discoveredMethod.methodName}`,
            this.emitters.get(m.meta),
        ]));
    }
    async setEventListeners() {
        const methodEmitters = await this.getMethodEmitters();
        const methods = await this
            .findFromControllersAndProviders(constants_1.NEST_EVENT_ON);
        methods.forEach((m) => {
            const eventName = m.meta;
            const methodKey = `${m.discoveredMethod.parentClass.name}.${m.discoveredMethod.methodName}`;
            const method = m.discoveredMethod.parentClass.instance[m.discoveredMethod.methodName];
            if (methodEmitters.has(methodKey)) {
                const emiterInstance = methodEmitters.get(methodKey);
                if (emiterInstance) {
                    emiterInstance.on(eventName, method);
                }
                return;
            }
            const emitter = this.emitters.get('default');
            if (emitter) {
                emitter.on(eventName, method);
            }
        });
    }
    async findFromControllersAndProviders(metaKey) {
        const methodsFromControllers = await this.discovery.controllerMethodsWithMetaAtKey(metaKey);
        const methodsFromProviders = await this.discovery.providerMethodsWithMetaAtKey(metaKey);
        return [...methodsFromControllers, ...methodsFromProviders];
    }
};
NestEvent = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [discovery_1.DiscoveryService])
], NestEvent);
exports.NestEvent = NestEvent;
//# sourceMappingURL=nest-event.js.map