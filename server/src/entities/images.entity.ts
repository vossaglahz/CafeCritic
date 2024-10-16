import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Place } from "./place.entity";

@Entity({name: 'images'})
export class Images {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({default: "noimage.jpg"})
    imageName!: string

    @ManyToOne(() => Place, (place) => place.images) 
    place!: Place
}