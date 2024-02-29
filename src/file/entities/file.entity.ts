import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class File {
  @Field()
  fileName: string;
}
