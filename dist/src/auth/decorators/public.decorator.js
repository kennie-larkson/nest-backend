"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoAuthNeeded = exports.IS_PUBLIC_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.IS_PUBLIC_KEY = 'isPublic';
const NoAuthNeeded = () => (0, common_1.SetMetadata)(exports.IS_PUBLIC_KEY, true);
exports.NoAuthNeeded = NoAuthNeeded;
//# sourceMappingURL=public.decorator.js.map