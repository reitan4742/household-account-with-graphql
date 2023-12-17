import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateIncomeInput } from './dto/create-income.input';
import { UpdateIncomeInput } from './dto/update-income.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Income } from './entities/income.entity';
import { Between, Repository } from 'typeorm';

@Injectable()
export class IncomesService {
  constructor(
    @InjectRepository(Income)
    private incomesRepository: Repository<Income>,
  ) {}

  async create(createIncomeInput: CreateIncomeInput) {
    return await this.incomesRepository.save(createIncomeInput);
  }

  async findAll(orderBy: "ASC" | "DESC", year: number, month: number) {
    if (!year && month) {
      throw new BadRequestException();
    }

    if (year && month) {
      const start = new Date(year, month - 1, 0);
      const end = new Date(year, month - 1, 31);
      return await this.incomesRepository.find({
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
      return await this.incomesRepository.find({
        where: {
          date: Between(start, end),
        },
        order: {
          date: orderBy
        }
      });
    }

    return await this.incomesRepository.find({
      order: {
        date: orderBy
      }
    });
  }

  async findOne(id: number) {
    return await this.incomesRepository.find({
      where: {
        id: id
      }
    });
  }

  async update(id: number, updateIncomeInput: UpdateIncomeInput) {
    const income: Income = await this.incomesRepository.findOneBy({ id });

    if (!income) {
      throw new NotFoundException();
    }

    try {
      await this.incomesRepository.update(id, updateIncomeInput);
      return await this.incomesRepository.findOneBy({ id });
    } catch {
      throw new BadRequestException();
    }
  }

  async remove(id: number) {
    const income: Income = await this.incomesRepository.findOneBy({ id });

    if (!income) {
      throw new NotFoundException();
    }

    await this.incomesRepository.remove(income);
    return income;
  }
}
