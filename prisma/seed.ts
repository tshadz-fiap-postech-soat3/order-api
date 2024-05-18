import { PrismaClient } from "@prisma/client";
import { OrderStatus } from '../src/@core/order/enums/order-status.enum';

const prisma = new PrismaClient()

async function main() {
    await prisma.orderItems.deleteMany();
    await prisma.order.deleteMany();

    await prisma.order.createMany({
        data: [
            {
                id: 'order-1',
                status: OrderStatus.CONCLUDED,
                customerId: 'cust-1',
                price: 100,
            },
            {
                id: 'order-2',
                status: OrderStatus.PROCESSING,
                customerId: 'cust-2',
                price: 50,
            },
            {
              id: 'order-3',
              status: OrderStatus.READY_TO_PICKUP,
              customerId: 'cust-1',
                price: 100,
            },
            {
              id: 'order-4',
              status: OrderStatus.PAYMENT_DUE,
              customerId: 'cust-1',
              price: 150,
            },
            {
              id: 'order-5',
              status: OrderStatus.PLACED,
              customerId: 'cust-1',
              price: 110,
            },
            {
              id: 'order-6',
              status: OrderStatus.PROCESSING,
              customerId: 'cust-1',
              price: 200,
            },

        ]
    })

    await prisma.orderItems.createMany({
        data: [
            {
                id: 'order-item-1',
                orderId: 'order-1',
                productId: 'prod-1',
                quantity: 2,
            },
            {
                id: 'order-item-2',
                orderId: 'order-1',
                productId: 'prod-2',
                quantity: 3,
            },
            {
                id: 'order-item-3',
                orderId: 'order-2',
                productId: 'prod-3',
                quantity: 5,
            },
        ]
    })

}

main()
    .then(async() => {
        await prisma.$disconnect();
    })
    .catch(async(e)=> {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
