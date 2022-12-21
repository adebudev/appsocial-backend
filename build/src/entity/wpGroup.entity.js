import { __decorate, __metadata } from "tslib";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinTable, ManyToMany, } from 'typeorm';
import { Contact } from './contact.entity.js';
import { User } from './user.entity.js';
let WpGroup = class WpGroup {
    id;
    name;
    user;
    contacts;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], WpGroup.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], WpGroup.prototype, "name", void 0);
__decorate([
    ManyToOne(() => User, (user) => user.wpBot),
    __metadata("design:type", Object)
], WpGroup.prototype, "user", void 0);
__decorate([
    ManyToMany(() => Contact) // note: we will create author property in the Photo class below
    ,
    JoinTable(),
    __metadata("design:type", Array)
], WpGroup.prototype, "contacts", void 0);
WpGroup = __decorate([
    Entity()
], WpGroup);
export { WpGroup };
//# sourceMappingURL=wpGroup.entity.js.map