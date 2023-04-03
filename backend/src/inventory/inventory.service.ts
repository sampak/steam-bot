import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { axiosInstance } from 'src/axios';
import CEconItem from '../shared/base/CEonItem';

@Injectable()
export class InventoryService {
  async get(steamID: string | bigint) {
    try {
      const response = await axiosInstance.get(`/inventory/${steamID}`);
      const items = response.data.filter(item => item.tradable === true && item.marketable === true) as CEconItem[];
      return items
    } catch(error) {
      console.log(error);
      throw new HttpException(error.code, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
