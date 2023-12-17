import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateIncomeInput {
  @Field()
  name: string;

  @Field()
  date: string;

  @Field()
  value: number;
}
