import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Place } from "./place.entity";

@Entity({name: 'review'})
export class Review {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    text!: string

    @Column({default: 5})
    ratingFood!: number

    @Column({default: 5})
    ratingQuality!: number

    @Column({default: 5})
    ratingInterior!: number

    @ManyToOne(() => Place, (place) => place.review) 
    place!: Place

    @Column()
    datetime!: string;
  
    generateDate() {
      this.datetime = new Date().toISOString();
    }
}