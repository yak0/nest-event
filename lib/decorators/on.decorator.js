"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const constants_1 = require("../constants");
exports.On = (eventName) => common_1.SetMetadata(constants_1.NEST_EVENT_ON, eventName);
//# sourceMappingURL=on.decorator.js.map