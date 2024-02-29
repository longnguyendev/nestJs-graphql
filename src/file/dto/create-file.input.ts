import { InputType, Field } from '@nestjs/graphql';

import { Stream } from 'stream';

export interface FileUpload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => Stream;
}

@InputType()
export class CreateFileInput {
  @Field(() => String)
  image: string;
}
