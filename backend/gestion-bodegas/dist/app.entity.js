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
exports.AppEntity = void 0;
const typeorm_1 = require("typeorm");
let AppEntity = class AppEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], AppEntity.prototype, "idBodega", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AppEntity.prototype, "nombreBodega", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AppEntity.prototype, "ubicacionPais", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AppEntity.prototype, "ubicacionCiudad", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AppEntity.prototype, "zonaLocalizacion", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], AppEntity.prototype, "capacidadVolumen", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], AppEntity.prototype, "capacidadUsada", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], AppEntity.prototype, "CapacidadDisponible", void 0);
AppEntity = __decorate([
    (0, typeorm_1.Entity)()
], AppEntity);
exports.AppEntity = AppEntity;
//# sourceMappingURL=app.entity.js.map