import { __decorate, __metadata } from "tslib";
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
let WpSession = class WpSession {
    id;
    session_id;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], WpSession.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], WpSession.prototype, "session_id", void 0);
WpSession = __decorate([
    Entity()
], WpSession);
export { WpSession };
//# sourceMappingURL=wpSession.entity.js.map