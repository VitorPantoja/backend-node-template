import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  @Column({ generated: 'increment', name: 'id', nullable: false, primary: true, type: 'int', unsigned: true })
  id!: number;

  @Column({ length: 100 })
  name!: string;

  @Column()
  age!: number;

  @Column({ length: 80, nullable: true })
  email!: string;

  @Column({ length: 80, nullable: true })
  password?: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;

  @Column({ length: 255, nullable: true })
  hashedPassword?: string;

  constructor(name: string, age: number, email: string, password?: string, hashedPassword?: string) {
    this.name = name;
    this.age = age;
    this.email = email;
    this.password = password;
    this.hashedPassword = hashedPassword;
  }
}
