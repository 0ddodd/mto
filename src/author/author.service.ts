import { Injectable } from '@nestjs/common';
import { CreateAuthorInput } from './dto/create-author.input';
import { UpdateAuthorInput } from './dto/update-author.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthorService {
  constructor(private prisma: PrismaService) {}

  async create(createAuthorInput: CreateAuthorInput) {
    const author = await this.prisma.author.findUnique({where: {name: createAuthorInput.name}});

    if (author) {
      throw new Error(`author ${createAuthorInput.name}이 이미 존재함`)
    }

    return await this.prisma.author.create({data: {name: createAuthorInput.name}})
  }

  findAll() {
    return this.prisma.author.findMany({
      include: {book: true}
    });
  }

  findOne(id: number) {
    return this.prisma.author.findUnique({
      where: {id},
      include: {book: true}
    });
  }

  update(id: number, updateAuthorInput: UpdateAuthorInput) {
    const author = this.prisma.author.findUnique({where: {name: updateAuthorInput.name}});
    if (!author) {
      throw new Error(`author ${name}이 없음`)
    }

    return this.prisma.author.update({
      where: {id},
      data: {name: updateAuthorInput.name}
    });
  }

  remove(id: number) {
    return this.prisma.author.delete({where: {id}});
  }
}
