import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field()
  name: string;

  @Field()
  quantity: number;

  @Field()
  price: number;
}
