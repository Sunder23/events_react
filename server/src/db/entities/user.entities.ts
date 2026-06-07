import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Event } from "./event.entities";
import { EventParticipant } from "./event-paticipant.entities";
import { type } from "os";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column('varchar', { length: 255, unique: true, nullable: false })
    email!: string;

    @Column('varchar', { length: 255, nullable: false })
    passwordHash!: string;

    @Column('varchar', { length: 255, nullable: false })
    name!: string;

    @OneToMany(() => Event, (event) => event.owner)
    events!: Event[];

    @OneToMany(() => EventParticipant, (eventParticipant) => eventParticipant.user)
    eventParticipants!: EventParticipant[];

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt!: Date;
}
