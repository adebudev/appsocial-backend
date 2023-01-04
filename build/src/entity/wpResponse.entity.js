import { __decorate, __metadata } from "tslib";
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
let WpResponse = class WpResponse {
    id;
    replyMessage;
    trigger;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], WpResponse.prototype, "id", void 0);
__decorate([
    Column('text', { array: true }),
    __metadata("design:type", Array)
], WpResponse.prototype, "replyMessage", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], WpResponse.prototype, "trigger", void 0);
WpResponse = __decorate([
    Entity()
], WpResponse);
export { WpResponse };
//# sourceMappingURL=wpResponse.entity.js.map