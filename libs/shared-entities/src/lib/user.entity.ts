import { Role } from '../../../common/src/utils/role.enum';
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Exclude } from 'class-transformer';
import { TaskEntity } from './task.entity';


@Entity()
export class UserEntity {

 @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userName!: string;

  @Column({nullable: true})
 userImage!: string;

  @Column({ nullable: true, unique: true })
  employeeId!: string;

  @Column()
  email!: string;

  @Column()
  @Exclude()
  password!: string;

  @Column()
  phone!: string;

  @Column()
  currentTask!: number;

  @Column()
  maxTask!: number;

  @Column({ type: 'boolean', nullable: true })
  status!: boolean;

  @Column({nullable: true, type: 'simple-array'})
  skills!: string[];


  @Column({nullable: true, type: 'simple-array'})
  roles!: string[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at!: Date;


  
  @ManyToMany(()=>TaskEntity,(taskEntity=>taskEntity.users))
  @JoinTable()
  tasks!: TaskEntity[];


}
