import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entities";
import { EventParticipant } from "./event-paticipant.entities";

@Entity('events')
export class Event {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column('varchar', { length: 255, unique: true, nullable: false })
    title!: string;

    @Column('text', { nullable: true })
    description!: string;

    @Column('int', { nullable: true })
    capacity!: number;

    @Column('varchar', { length: 255, nullable: true })
    address!: string;

    @Column('timestamptz', { nullable: false })
    startDate!: Date;

    @Column('timestamptz', { nullable: false })
    endDate!: Date;

    @ManyToOne(() => User, (user) => user.events)
    @JoinColumn({ name: 'ownerId' })
    owner!: User;

    @Column('uuid', { nullable: false })
    ownerId!: string;

    @OneToMany(() => EventParticipant, (eventParticipant) => eventParticipant.event)
    participants!: EventParticipant[];

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt!: Date;

}