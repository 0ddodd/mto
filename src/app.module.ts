import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { BookModule } from './book/book.module';
import { AuthorModule } from './author/author.module';
import { PrismaService } from './prisma/prisma.service';
import * as fs from 'fs';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      typeDefs: fs.readFileSync(join(process.cwd(), 'src/schema.gql'), 'utf-8'),
      sortSchema: true
    }),
    BookModule,
    AuthorModule
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
