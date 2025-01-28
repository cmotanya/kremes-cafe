"use client";

import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { MenuItem } from "../utils/types";
import { OrderItemCard } from "../components/order/orderItemCard";
import { useSearchParams } from "next/navigation";
import { useOrderItems } from "../hooks/useOrderItems";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const OrderPage = () => {
  const searchParams = useSearchParams();
  const itemQuery = searchParams.get("item");
  const [initialItem, setInitialItem] = useState<MenuItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const {
    availableItems,
    orderItems,
    setOrderItems,
    isAddItemModalOpen,
    calculateTotal,
    handleQuantityChange,
    handleCloseModal,
    handleOpenModal,
    addItem,
    ClearAllOrders,
    removeItem,
    handleBack,
  } = useOrderItems();

  useEffect(() => {
    if (!itemQuery) {
      setIsLoading(false);
      return;
    }
    try {
      const decodedItem = decodeURIComponent(itemQuery);
      const parsedItem = JSON.parse(decodedItem) as MenuItem;
      setInitialItem(parsedItem);
      setOrderItems([{ item: parsedItem, quantity: 1, instructions: "" }]);
    } catch (error) {
      console.error("Error parsing item:", error);
    } finally {
      setIsLoading(false);
    }
  }, [itemQuery, setOrderItems]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!initialItem) {
    return (
      <div className="p-8 text-center text-red-500">
        <p> No item selected.Please go back and select an item.</p>
        <Button onClick={handleBack}>Back to Menu</Button>
      </div>
    );
  }
  return (
    <div className="w-full space-y-2 p-5 md:w-1/3">
      {/* Back button */}
      <Button
        onClick={handleBack}
        className="mb-8 flex items-center justify-center bg-accent"
      >
        <ArrowLeft className="size-4" />
        Back To Menu
      </Button>
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
            {availableItems.length} Available.
          </Badge>
          <div className="space-y-2 overflow-y-auto">
            {availableItems.length > 0 ? (
              availableItems.map((item) => (
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
