import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import FoodTruck from './FoodTruck';
import ImageProducts from './ImagesProducts';

@Entity('products')
export default class Product {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @OneToMany(() => FoodTruck, foodtruck => foodtruck.products)
  foodtruck: FoodTruck[];

  @OneToMany(() => ImageProducts, image => image.product, {cascade: ['insert', 'update']})
  @JoinColumn({ name: 'product_id'})
  images_product: ImageProducts[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

