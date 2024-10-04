"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseCrudController = void 0;
const openapi = require("@nestjs/swagger");
class BaseCrudController {
    constructor(service) {
        this.service = service;
    }
}
exports.BaseCrudController = BaseCrudController;
//# sourceMappingURL=base-crud.controller.js.map