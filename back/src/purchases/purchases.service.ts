import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePurchaseInput } from './dto/create-purchase.input';
import { UpdatePurchaseInput } from './dto/update-purchase.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Purchase } from './entities/purchase.entity';
import { Between, Repository } from 'typeorm';

@Injectable()
export class PurchasesService {
  constructor(
    @InjectRepository(Purchase)
    private purchasesRepository: Repository<Purchase>,
  ) {}

  async create(createPurchaseInput: CreatePurchaseInput) {
    return await this.purchasesRepository.save(createPurchaseInput);
  }

  async findAll(orderBy: "ASC" | "DESC" ,year: number, month: number) {
    if (!year && month) {
      throw new BadRequestException();
    }

    if (year && month) {
      const start = new Date(year, month - 1, 0);
      const end = new Date(year, month - 1, 31);
      return await this.purchasesRepository.find({
        where: {
          date: Between(start, end),
        },
        order: {
          date: orderBy
        }
      });
    }

    if (year) {
      const start = new Date(year, 0, 1);
      const end = new Date(year, 11, 31);
      return await this.purchasesRepository.find({
        where: {
          date: Between(start, end),
        },
        order: {
          date: orderBy
        }
      });
    }

    return await this.purchasesRepository.find({
      order: {
        date: orderBy
      }
    });
  }

  async findOne(id: number) {
    return await this.purchasesRepository.find({
      where: {
        id: id
      }
    });
  }

  async update(id: number, updatePurchaseInput: UpdatePurchaseInput) {
    const purchase: Purchase = await this.purchasesRepository.findOneBy({ id });

    if (!purchase) {
      throw new NotFoundException();
    }

    try {
      await this.purchasesRepository.update(id, updatePurchaseInput);
      return await this.purchasesRepository.findOneBy({ id });
    } catch {
      throw new BadRequestException();
    }
  }

  async remove(id: number) {
    const purchase: Purchase = await this.purchasesRepository.findOneBy({ id });

    if (!purchase) {
      throw new NotFoundException();
    }

    await this.purchasesRepository.remove(purchase);
    return purchase;
  }
}
