import { Controller, Get, Param } from '@nestjs/common';
import { InventoryService } from './inventory.service';

@Controller('inventory')
export class InventoryController {

  constructor(private readonly inventoryService: InventoryService) {}


  @Get('/:steamID')
  async get(@Param('steamID') steamID: string) {
    return await this.inventoryService.get(steamID)
  }

}
