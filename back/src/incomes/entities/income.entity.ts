import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
@ObjectType()
export class Income {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  name: string;

  @Column({ type: "date"})
  @Field()
  date: Date;

  @Column()
  @Field()
  value: number;
}
