import { __decorate, __metadata } from "tslib";
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany, } from 'typeorm';
import { WpBot } from './wpBot.entity.js';
import { WpGroup } from './wpGroup.entity.js';
let User = class User {
    id;
    firstName;
    lastName;
    email;
    password;
    rol;
    // ROLES
    // ROOT
    // ADMIN
    // USER
    WpGroup;
    wpBot;
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    Column({ name: 'email', length: 300, nullable: false, unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], User.prototype, "rol", void 0);
__decorate([
    OneToMany(() => WpGroup, (WpGroup) => WpGroup.user),
    __metadata("design:type", Object)
], User.prototype, "WpGroup", void 0);
__decorate([
    OneToOne(() => WpBot, (wpBot) => wpBot.user),
    __metadata("design:type", Object)
], User.prototype, "wpBot", void 0);
User = __decorate([
    Entity()
], User);
export { User };
//# sourceMappingURL=user.entity.js.map