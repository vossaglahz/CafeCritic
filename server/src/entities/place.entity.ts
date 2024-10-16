import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { User } from "./user.entity";
import { Review } from "./review.entity";
import { Images } from "./images.entity";

@Entity({name: 'place'})
export class Place {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string

    @Column()
    description!: string

    @Column({default: "noimage.jpg"})
    mainImage!: string

    @Column({default: false})
    published!: boolean

    @ManyToOne(() => User, (user) => user.place) 
    user!: User

    @OneToMany(() => Review, (review) => review.place)
    review!: Review[]

    @OneToMany(() => Images, (images) => images.place)
    images!: Images[]
}