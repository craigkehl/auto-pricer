import {
  AfterInsert,
  AfterUpdate,
  AfterRemove,
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @AfterInsert()
  logInsert() {
    console.log(`Inserted new user, id: ${this.id}`);
  }

  @AfterRemove()
  logRemove() {
    console.log(`User ${this.id} has been removed`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`User ${this.id} has been updated`);
  }
}
