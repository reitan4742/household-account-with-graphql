import { Module } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { PurchasesResolver } from './purchases.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Purchase } from './entities/purchase.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Purchase])],
  providers: [PurchasesResolver, PurchasesService],
})
export class PurchasesModule {}
