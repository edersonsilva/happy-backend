import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import Image from './Image';
import Product from "./Product";

@Entity('foodtrucks')
export default class FoodTruck {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  about: string;

  @Column()
  instructions: string;

  @Column()
  opening_hours: string;

  @Column()
  open_on_weekends: boolean;

  @OneToMany(() => Product, product => product.foodtruck_id, {cascade: ['insert', 'update']})
  @JoinColumn({ name: 'foodtruck_id'})
  products: Product[];

  @OneToMany(() => Image, image => image.foodtruck_id, {cascade: ['insert', 'update']})
  @JoinColumn({ name: 'foodtruck_id'})
  images: Image[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}