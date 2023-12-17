import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { IncomesService } from './incomes.service';
import { Income } from './entities/income.entity';
import { CreateIncomeInput } from './dto/create-income.input';
import { UpdateIncomeInput } from './dto/update-income.input';
import { NotFoundException } from '@nestjs/common';

@Resolver(() => Income)
export class IncomesResolver {
  constructor(private readonly incomesService: IncomesService) {}

  @Mutation(() => Income)
  async createIncome(@Args('createIncomeInput') createIncomeInput: CreateIncomeInput) {
    return await this.incomesService.create(createIncomeInput);
  }

  @Query(() => [Income], { name: 'incomes' })
  async findAll(
    @Args("orderBy") orderBy?: "ASC" | "DESC",
    @Args("year", { nullable: true, type: () => Int }) year?: number,
    @Args("month", { nullable: true, type: () => Int }) month?: number
    ) {
    return await this.incomesService.findAll(orderBy, year, month);
  }

  @Query(() => Income, { name: 'income' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    const income = await this.incomesService.findOne(id);
    if (!income) {
      throw new NotFoundException(id);
    }
    return income[0];
  }

  @Mutation(() => Income)
  async updateIncome(@Args('updateIncomeInput') updateIncomeInput: UpdateIncomeInput) {
    return await this.incomesService.update(updateIncomeInput.id, updateIncomeInput);
  }

  @Mutation(() => Income)
  async removeIncome(@Args('id', { type: () => Int }) id: number) {
    return await this.incomesService.remove(id);
  }
}
