"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./src/app.module");
async function initializeDataSource() {
    const appContext = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const configService = appContext.get(config_1.ConfigService);
    const dataSource = new typeorm_1.DataSource({
        type: 'postgres',
        url: configService.get('DBURL'),
        database: configService.get('DATABASE'),
        entities: ['src/**/*.entity{.ts,.js}'],
        migrations: ['src/migrations/**/*{.ts,.js}'],
        migrationsTableName: 'migrations',
    });
    return dataSource;
}
exports.default = initializeDataSource();
//# sourceMappingURL=ormconfig.js.map