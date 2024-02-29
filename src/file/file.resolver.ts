import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FileService } from './file.service';
import { File } from './entities/file.entity';
import { CreateFileInput } from './dto/create-file.input';
import { UpdateFileInput } from './dto/update-file.input';

@Resolver(() => File)
export class FileResolver {
  constructor(private readonly fileService: FileService) {}

  @Mutation(() => File)
  createFile(@Args('createFileInput') createFileInput: CreateFileInput) {
    return this.fileService.create(createFileInput);
  }

  @Query(() => [File], { name: 'file' })
  findAll() {
    return this.fileService.findAll();
  }

  @Query(() => File, { name: 'file' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.fileService.findOne(id);
  }

  @Mutation(() => File)
  updateFile(@Args('updateFileInput') updateFileInput: UpdateFileInput) {
    return this.fileService.update(updateFileInput.id, updateFileInput);
  }

  @Mutation(() => File)
  removeFile(@Args('id', { type: () => Int }) id: number) {
    return this.fileService.remove(id);
  }

  // @Mutation(() => File)
  // async uploadFile(@Args('image') createFileInput: CreateFileInput) {
  //   const { createReadStream, filename } = await createFileInput.image;
  //   return new Promise(async (resolve) => {
  //     createReadStream()
  //       .pipe(
  //         createWriteStream(join(process.cwd(), `./src/upload/${filename}`)),
  //       )
  //       .on('finish', () =>
  //         resolve({
  //           image: filename,
  //         }),
  //       )
  //       .on('error', () => {
  //         new HttpException('Could not save image', HttpStatus.BAD_REQUEST);
  //       });
  //   });
  // }
}
