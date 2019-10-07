import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { IsEmail, Length } from 'class-validator';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  public id: string;
  @Column({ unique: true })
  @IsEmail()
  public email: string;
  @Column({ unique: true })
  @Length(1, 20)
  public userName: string;
  @Column()
  public hashedPassword: string;
  @Column({ default: false })
  public isVerified: boolean;

  @CreateDateColumn()
  public createdAt: string;
  @UpdateDateColumn()
  public updatedAt: string;
}
