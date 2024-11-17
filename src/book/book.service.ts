import { Injectable } from '@nestjs/common';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { Book } from './entities/book.entity';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  async create(createBookInput: CreateBookInput) {
    const {title, authorName} = createBookInput;

    const author = await this.prisma.author.findUnique({where: {name: authorName}});
    if (!author) {
      await this.prisma.author.create({data: {name: authorName}})
    }

    return await this.prisma.book.create({
      data: {
        title,
        authorId: author.id
      }
    });
  }

  findAll() {
    return this.prisma.book.findMany({
      include: {author: true}
    });
  }

  findOne(id: number) {
    return this.prisma.book.findUnique({
      where: {id},
      include: {author: true}
    });
  }

  async update(id: number, updateBookInput: UpdateBookInput) {
    const {title} = updateBookInput;
    const book = await this.prisma.book.findUnique({where: {id}})
    if (!book) {
      throw new Error(`book ${id} does not exist.`)
    }

    return await this.prisma.book.update({
      where: {id},
      data: {title}
    })
  }

  remove(id: number) {
    return this.prisma.book.delete({where: {id}});
  }
}
