'use client'

import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { MenuItem, todaysSpecials } from "../utils/lib";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { OrderItemProps } from "../utils/types";
import { OrderItemCard } from "../components/order/orderItemCard";

const OrderPage = () => {
  const location = useLocation();
  const initialItem = location.state as MenuItem;

  const [orderItems, setOrderItems] = useState<OrderItemProps[]>([
    { item: initialItem, quantity: 1, instructions: "" },
  ]);
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);

  const handleQuantityChange = (index: number, value: number) => {
    const newItems = [...orderItems];
    newItems[index].quantity = Math.max(1, value);
    setOrderItems(newItems);
  };

  const handleCloseModal = (open: boolean) => {
    setIsAddItemModalOpen(open); // Close the modal
  };

  const handleOpenModal = () => {
    setIsAddItemModalOpen(true);
  };

  const addItem = (selectedItem: MenuItem) => {
    setOrderItems([
      ...orderItems,
      { item: selectedItem, quantity: 1, instructions: "" },
    ]);
    setIsAddItemModalOpen(false); // Close the modal after adding the item
  };

  const ClearAllOrders = () => {
    setOrderItems([]);
  };

  const removeItem = (index: number) => {
    if (orderItems.length > 1) {
      setOrderItems(orderItems.filter((_, i) => i !== index));
    }
  };

  const calculateTotal = () => {
    return orderItems.reduce(
      (total, { item, quantity }) => total + item.price * quantity,
      0,
    );
  };
  if (!initialItem?.id) {
    return (
      <div className="p-8 text-center text-red-500">
        No item selected.Please go back and select an item.
      </div>
    );
  }
  return (
    <div className="space-y-4 p-5">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Order Page</h1>
        {/* Clears all orders */}
        {orderItems.length > 0 && (
          <button
            onClick={ClearAllOrders}
            className="rounded-lg bg-gray-200 p-2 text-sm font-semibold text-red-700"
          >
            Clear All
          </button>
        )}
      </div>

      {orderItems.map((orderItem, index) => (
        <OrderItemCard
          key={index}
          orderItem={orderItem}
          index={index}
          onQuantityChange={handleQuantityChange}
          onRemoveItem={removeItem}
          showRemoveButton={orderItems.length > 1}
        />
      ))}

      <button
        onClick={handleOpenModal}
        className="mb-6 w-full rounded-lg border-2 border-dashed p-3 text-gray-500"
      >
        + Add Another Item
      </button>

      <div className="rounded-lg bg-gray-100 p-4">
        <div className="flex justify-between text-lg font-bold">
          <span>Total: </span>
          <span>KES {calculateTotal().toFixed(2)}</span>
        </div>
      </div>

      <button className="mt-6 w-full rounded-full bg-primary p-3 text-white">
        Place Order
      </button>

      {/* Modal for adding a new item */}
      <Dialog open={isAddItemModalOpen} onOpenChange={handleCloseModal}>
        <DialogContent className="max-h-[70vh] w-[90%] max-w-md rounded-md bg-white/95">
          <DialogTitle className="mb-2 font-bold">Add Another Item</DialogTitle>
          <Badge className="ml-3 w-fit bg-gray-200">
            {
              todaysSpecials.filter(
                (item) =>
                  !orderItems.some(
                    (orderItem) => orderItem.item.id === item.id,
                  ),
              ).length
            }{" "}
            Available.
          </Badge>
          <div className="space-y-2 overflow-y-auto">
            {todaysSpecials.filter(
              (item) =>
                !orderItems.some((orderItem) => orderItem.item.id === item.id),
            ).length > 0 ? (
              todaysSpecials
                .filter(
                  (item) =>
                    !orderItems.some(
                      (orderItem) => orderItem.item.id === item.id,
                    ),
                )
                .map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      addItem(item);
                    }}
                    className="flex cursor-pointer items-center justify-between rounded-lg border bg-gray-100 p-2 transition-colors"
                  >
                    <div className="flex-grow">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-800 group-hover:text-primary">
                          {item.name}
                        </h3>
                        <span className="rounded-md bg-secondary px-0.5 text-sm font-medium">
                          KES {item.price.toFixed(2)}
                        </span>
                      </div>
                      <p className="line-clamp-2 text-sm text-gray-600">
                        {item.description}
                      </p>
                    </div>
                    <div className="opacity-0 transition-opacity group-hover:opacity-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-primary"
                      >
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </div>
                  </div>
                ))
            ) : (
              <p className="text-center text-gray-500">
                No items available to add.
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrderPage;
