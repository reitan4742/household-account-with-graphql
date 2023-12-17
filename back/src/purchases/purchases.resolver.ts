import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PurchasesService } from './purchases.service';
import { Purchase } from './entities/purchase.entity';
import { CreatePurchaseInput } from './dto/create-purchase.input';
import { UpdatePurchaseInput } from './dto/update-purchase.input';
import { NotFoundException } from '@nestjs/common';
import { Income } from 'src/incomes/entities/income.entity';

@Resolver(() => Purchase)
export class PurchasesResolver {
  constructor(private readonly purchasesService: PurchasesService) {}

  @Mutation(() => Purchase)
  async createPurchase(@Args('createPurchaseInput') createPurchaseInput: CreatePurchaseInput) {
    return await this.purchasesService.create(createPurchaseInput);
  }

  @Query(() => [Purchase], { name: 'purchases' })
  async findAll(
    @Args("orderBy") orderBy?: "ASC" | "DESC",
    @Args("year", { nullable: true, type: () => Int }) year?: number,
    @Args("month", { nullable: true, type: () => Int }) month?: number
  ) {
    return await this.purchasesService.findAll(orderBy, year, month);
  }

  @Query(() => Purchase, { name: 'purchase' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    const purchase = await this.purchasesService.findOne(id);

    if (!purchase) {
      throw new NotFoundException();
    }

    return purchase[0];
  }

  @Mutation(() => Purchase)
  async updatePurchase(@Args('updatePurchaseInput') updatePurchaseInput: UpdatePurchaseInput) {
    return await this.purchasesService.update(updatePurchaseInput.id, updatePurchaseInput);
  }

  @Mutation(() => Purchase)
  async removePurchase(@Args('id', { type: () => Int }) id: number) {
    return await this.purchasesService.remove(id);
  }
}
