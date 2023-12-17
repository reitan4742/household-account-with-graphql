import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { IncomesModule } from './incomes/incomes.module';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Income } from './incomes/entities/income.entity';
import { PurchasesModule } from './purchases/purchases.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "user",
      password: "password",
      database: "restdatabase",
      autoLoadEntities: true,
      synchronize: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      sortSchema: true,
    }),
    IncomesModule,
    PurchasesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
