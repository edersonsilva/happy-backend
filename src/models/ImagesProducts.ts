import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import Product from "./Product";

@Entity('images_products')
export default class ImageProducts {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  path: string;

  @ManyToOne(() => Product, product => product.images_products)
  @JoinColumn({ name: 'product_id'})
  product: Product;
}