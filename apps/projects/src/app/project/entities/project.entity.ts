import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './../../../../../products/src/app/products/entities/product.entity';


@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  description: string;

  @OneToMany(()=>Product,(product)=>product.project)
  product:Product[];
}
