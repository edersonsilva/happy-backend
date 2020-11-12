import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import Foodtruck from './FoodTruck';

@Entity('images')
export default class Image {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  path: string;

  @ManyToOne(() => Foodtruck, foodtruck => foodtruck.images)
  @JoinColumn({ name: 'foodtruck_id'})
  foodtruck: Foodtruck;
}