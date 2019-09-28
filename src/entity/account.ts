import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  public id: string;
  @Column()
  public email: string;
  @Column()
  public userName: string;
  @Column()
  public hashedPassword: string;

  @CreateDateColumn()
  public createdAt: string;
  @UpdateDateColumn()
  public updatedAt: string;
}
