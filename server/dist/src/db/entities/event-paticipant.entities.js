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
exports.EventParticipant = void 0;
const typeorm_1 = require("typeorm");
const event_entities_1 = require("./event.entities");
const user_entities_1 = require("./user.entities");
let EventParticipant = class EventParticipant {
    id;
    event;
    eventId;
    user;
    userId;
    paymentStatus;
    joinedDate;
    createdAt;
    updatedAt;
};
exports.EventParticipant = EventParticipant;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], EventParticipant.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => event_entities_1.Event, (event) => event.participants),
    (0, typeorm_1.JoinColumn)({ name: 'eventId' }),
    __metadata("design:type", event_entities_1.Event)
], EventParticipant.prototype, "event", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid', { nullable: false }),
    __metadata("design:type", String)
], EventParticipant.prototype, "eventId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entities_1.User, (user) => user.eventParticipants),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", user_entities_1.User)
], EventParticipant.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid', { nullable: false }),
    __metadata("design:type", String)
], EventParticipant.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 255, nullable: true }),
    __metadata("design:type", String)
], EventParticipant.prototype, "paymentStatus", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamptz', { nullable: false }),
    __metadata("design:type", Date)
], EventParticipant.prototype, "joinedDate", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamptz'),
    __metadata("design:type", Date)
], EventParticipant.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamptz'),
    __metadata("design:type", Date)
], EventParticipant.prototype, "updatedAt", void 0);
exports.EventParticipant = EventParticipant = __decorate([
    (0, typeorm_1.Entity)('event_participants'),
    (0, typeorm_1.Index)('UQ_EVENT_PARTICIPANT_EVENT_ID_USER_ID', ['eventId', 'userId'], { unique: true })
], EventParticipant);
