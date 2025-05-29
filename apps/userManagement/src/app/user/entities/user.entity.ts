import { Role } from './../../../../../../libs/common/src/utils/role.enum';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Exclude } from 'class-transformer';

@Entity()
export class User {

 @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column()
 userImage: string;

  @Column({ nullable: true, unique: true })
  employeeId: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ unique: true })
  phone: string;

  @Column({ unique: true })
  currentTask: number;

  @Column({ unique: true })
  maxTask: number;

  @Column({ type: 'boolean', nullable: true })
  status: boolean;


  @Column({ type: 'enum', enum: Role, nullable: true })
  roles: Role[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;


}
