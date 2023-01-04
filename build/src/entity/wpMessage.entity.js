import { __decorate, __metadata } from "tslib";
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
let WpMessage = class WpMessage {
    id;
    keywords;
    key;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], WpMessage.prototype, "id", void 0);
__decorate([
    Column('text', { array: true }),
    __metadata("design:type", Array)
], WpMessage.prototype, "keywords", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], WpMessage.prototype, "key", void 0);
WpMessage = __decorate([
    Entity()
], WpMessage);
export { WpMessage };
//# sourceMappingURL=wpMessage.entity.js.map