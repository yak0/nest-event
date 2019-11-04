"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const constants_1 = require("../constants");
exports.Emitter = (emitter = 'default') => common_1.SetMetadata(constants_1.NEST_EVENT_EMITTER, emitter);
//# sourceMappingURL=event-emitter.decorator.js.map