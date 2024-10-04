"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseCrudService = void 0;
const crud_typeorm_1 = require("@dataui/crud-typeorm");
class BaseCrudService extends crud_typeorm_1.TypeOrmCrudService {
    constructor(repository) {
        super(repository);
        this.repository = repository;
    }
}
exports.BaseCrudService = BaseCrudService;
//# sourceMappingURL=base-crud.service.js.map