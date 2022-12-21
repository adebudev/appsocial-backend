import { __decorate, __metadata } from "tslib";
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, } from 'typeorm';
import { User } from './user.entity.js';
let WpBot = class WpBot {
    id;
    life;
    user;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], WpBot.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", Boolean)
], WpBot.prototype, "life", void 0);
__decorate([
    OneToOne(() => User, (user) => user.wpBot),
    JoinColumn(),
    __metadata("design:type", Object)
], WpBot.prototype, "user", void 0);
WpBot = __decorate([
    Entity()
], WpBot);
export { WpBot };
//# sourceMappingURL=wpBot.entity.js.map