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
import { CreateOrderDto } from '../../@core/order/dtos/create-order.dto';
import { UpdateOrderDto } from '../../@core/order/dtos/update-order.dto';
import { IOrderController } from '../../@core/order/controller/order-controller.interface';
import { IOrderService } from '../../@core/order/services/order-service.interface';
import { OrderStatus } from '../../@core/order/enums/order-status.enum';
import { CalculateOrderDto } from '../../@core/order/dtos/calculate-order.dto';

@ApiTags('order')
@Controller('orders')
export class OrdersApi {
  constructor(
    private readonly ordersController: IOrderController,
    private readonly ordersService: IOrderService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersController.create(createOrderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Calculate a order total price ' })
  calculateOrder(@Body() calculateOrderDto: CalculateOrderDto) {
    return this.ordersController.calculateOrder(calculateOrderDto);
  }

  @Get()
  @ApiOperation({ summary: 'return all orders created' })
  findAll() {
    return this.ordersController.findAll();
  }

  @Get('/queue')
  @ApiOperation({ summary: 'return all open orders' })
  findAllOpen() {
    return this.ordersController.findAllOpen();
  }

  @Get(':status')
  @ApiOperation({ summary: 'return all orders created by status' })
  findAllByStatus(@Param('status') status: OrderStatus) {
    return this.ordersService.findAllByStatus(status);
  }

  @Get(':id')
  @ApiOperation({ summary: 'return one order' })
  findOne(@Param('id') id: string) {
    return this.ordersController.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'update the data' })
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersController.update(id, updateOrderDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete the order' })
  remove(@Param('id') id: string) {
    return this.ordersController.remove(id);
  }
}
