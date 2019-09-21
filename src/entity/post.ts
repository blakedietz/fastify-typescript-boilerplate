import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Post {
    @PrimaryColumn()
    public id: string;

    @Column()
    public title: string;

    @Column({ type: 'json' })
    public postJson: string;
}
