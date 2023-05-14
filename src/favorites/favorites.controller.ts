import { Controller, Post, Body, UseGuards, Get, Param } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { AtGuard } from 'src/auth/guards/at.guard';
import { GetCurrentUserId } from 'src/common/decorators';

@Controller('favorites')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @UseGuards(AtGuard)
  @Post()
  async addOne(@GetCurrentUserId() userId: string, @Body('id') id: number) {
    return this.favoritesService.addOne(userId, id);
  }

  @UseGuards(AtGuard)
  @Get(':id')
  async checkOne(@GetCurrentUserId() userId: string, @Param('id') id: number) {
    return this.favoritesService.checkOne(userId, id);
  }

  @UseGuards(AtGuard)
  @Get()
  async getAll(@GetCurrentUserId() userId: string) {
    return this.favoritesService.getAll(userId);
  }
}