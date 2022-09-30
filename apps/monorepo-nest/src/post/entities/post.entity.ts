import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../user/entitis/user.entity";




//! SCHEMA PARA LA BASE DE DATOS COMO TAL 
@Entity('posts')
export class Post {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ type: 'text', nullable:false})
    slug!: string;

    @Column({ type: 'varchar', length:255})
    title!: string;

    @Column({ type: 'varchar', length:255})
    excerpt?: string;

    @Column({ type: 'text'})
    content!: string;

    @Column({ type: 'varchar', length:100, nullable:true})
    category: string;

    @Column({ type: 'simple-array'})
    tags: string[];

    @Column({type: 'bool', default: true})
    status: string;

    @CreateDateColumn({type: 'timestamp'})
    createAt: Date;

    @ManyToOne(_ => User, (user) => user.posts, { eager: true})
    @JoinColumn({ name: 'author' })
    author: User;
}