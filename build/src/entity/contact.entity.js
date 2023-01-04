import { __decorate, __metadata } from "tslib";
import { Entity, Column, PrimaryGeneratedColumn, } from 'typeorm';
let Contact = class Contact {
    id;
    name;
    number;
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Contact.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Contact.prototype, "name", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Contact.prototype, "number", void 0);
Contact = __decorate([
    Entity()
], Contact);
export { Contact };
//# sourceMappingURL=contact.entity.js.map