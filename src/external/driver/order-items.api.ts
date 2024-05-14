import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateOrderItemDto } from '../../@core/order-item/entitites/create-order-item.dto';
import { UpdateOrderItemDto } from '../../@core/order-item/entitites/update-order-item.dto';
import { OrderItemsController } from '../../@core/order-item/controller/order-item.controller';

@ApiTags('order-item')
@Controller('order-items')
export class OrderItemsApi {
  constructor(private readonly orderItemsController: OrderItemsController) {}

  @Post()
  @ApiOperation({ summary: 'add itens to an order' })
  create(@Body() createOrderItemDto: CreateOrderItemDto[]) {
    return this.orderItemsController.create(createOrderItemDto);
  }

  @Get()
  @ApiOperation({ summary: 'return all order items created' })
  findAll() {
    return this.orderItemsController.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'return one order item' })
  findOne(@Param('id') id: string) {
    return this.orderItemsController.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'update the data' })
  update(
    @Param('id') id: string,
    @Body() updateOrderItemDto: UpdateOrderItemDto,
  ) {
    return this.orderItemsController.update(id, updateOrderItemDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete the order item' })
  remove(@Param('id') id: string) {
    return this.orderItemsController.remove(id);
  }
}
