CREATE TABLE `Order` (
    `id` VARCHAR(191) NOT NULL,
    `customerId` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,
    `createdAtDate` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAtDate` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `OrderItems` (
    `id` VARCHAR(191) NOT NULL,
    `orderId` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE `OrderItems` ADD CONSTRAINT `OrderItems_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

DELETE FROM OrderItems;
DELETE FROM Order;


INSERT INTO `Order` (id, status, customerId, price) VALUES
('order-1', 'CONCLUDED', 'cust-1', 100),
('order-2', 'PROCESSING', 'cust-2', 50),
('order-3', 'READY_TO_PICKUP', 'cust-1', 100),
('order-4', 'PAYMENT_DUE', 'cust-1', 150),
('order-5', 'PLACED', 'cust-1', 110),
('order-6', 'PROCESSING', 'cust-1', 200);

INSERT INTO OrderItems (id, orderId, productId, quantity) VALUES
('order-item-1', 'order-1', 'prod-1', 2),
('order-item-2', 'order-1', 'prod-2', 3),
('order-item-3', 'order-2', 'prod-3', 5);
