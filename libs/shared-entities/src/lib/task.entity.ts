
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class TaskEntity {

@PrimaryGeneratedColumn()
  id!: number;
  @Column()
  title!: string; 
  @Column({ type: 'text', nullable: true })
  priority!: string;
  @Column()
  status!: string;

    @Column({ type:'simple-array', nullable: true })
  requiredSkills!: string[];
  
//   @Column({nullable: true,type:'simple-array'})
//   assignedTo: number[];

  @ManyToOne(()=>UserEntity,(userEntity=>userEntity.tasks))
  users!: UserEntity;

}
