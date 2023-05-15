import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Favorite } from './favorites.model';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectModel(Favorite.name) private favoriteModel: Model<Favorite>,
  ) {}

  async toggleOne(userId: string, id: number) {
    const record = await this.favoriteModel.findOne({ userId }).exec();

    if (record) {
      if (!record.items.find((x) => x === id)) {
        record.items.push(id);
        await record.save();
      } else {
        const index = record.items.findIndex((x) => x === id);
        record.items.splice(index, 1)[0];
        await record.save();
      }
    } else {
      const newRecord = new this.favoriteModel({ userId, items: [id] });
      await newRecord.save();
    }

    return { message: 'ok' };
  }

  async getAll(userId: string) {
    const { items } = await this.favoriteModel.findOne({ userId }).exec();

    return { items };
  }

  async checkOne(userId: string, id: number) {
    const { items } = await this.favoriteModel.findOne({ userId }).exec();
    const status = !items.findIndex((x) => x === id);

    return { status };
  }
}
