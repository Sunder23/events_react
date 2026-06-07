import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Event } from "./event.entities";
import { User } from "./user.entities";

@Entity('event_participants')
@Index('UQ_EVENT_PARTICIPANT_EVENT_ID_USER_ID', ['eventId', 'userId'], { unique: true })
export class EventParticipant {

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @ManyToOne(() => Event, (event) => event.participants)
    @JoinColumn({ name: 'eventId' })
    event!: Event

    @Column('uuid', { nullable: false })
    eventId!: string;

    @ManyToOne(() => User, (user) => user.eventParticipants)
    @JoinColumn({ name: 'userId' })
    user!: User;

    @Column('uuid', { nullable: false })
    userId!: string;

    @Column('varchar', { length: 255, nullable: true })
    paymentStatus!: string;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    joinedDate!: Date;
}