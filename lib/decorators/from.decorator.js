"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const constants_1 = require("../constants");
exports.From = (emitter) => common_1.SetMetadata(constants_1.NEST_EVENT_FROM, emitter);
//# sourceMappingURL=from.decorator.js.map