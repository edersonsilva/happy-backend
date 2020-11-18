import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import Category from './Category';
import FoodTruck from './FoodTruck';
import ImageProduct from './ImageProduct';

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

  @OneToMany(() => ImageProduct, image_products => image_products.product_id, {cascade: ['insert', 'update']})
  @JoinColumn({ name: 'product_id'})
  images_products: ImageProduct[];

  @ManyToOne(() => FoodTruck, foodtruck => foodtruck.products)
  @JoinColumn({ name: 'foodtruck_id'})
  foodtruck_id: FoodTruck;

  @ManyToOne(() => Category, category => category.products)
  @JoinColumn({ name: 'category_id'})
  category_id: Category;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

