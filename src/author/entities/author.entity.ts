import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Book } from 'src/book/entities/book.entity';

@ObjectType()
export class Author {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => [Book])
  books: Book[];
}
