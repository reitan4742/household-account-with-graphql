import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePurchaseInput {
  @Field()
  name: string;

  @Field()
  date: string;

  @Field()
  value: number;
}
