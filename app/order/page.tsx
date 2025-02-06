"use client";

import React, { useEffect, useState } from "react";
import { MenuItem } from "../utils/types";
import { OrderItemCard } from "../components/order/orderItemCard";
import { useSearchParams } from "next/navigation";
import { useOrderItems } from "../hooks/useOrderItems";
import { ArrowLeft, PlusCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddNewItemPage from "./addNewItemPage";
import OrderConfirmationModal from "../components/order/confirmButtonPage";
import { cn } from "../utils/cn";

const OrderPage = () => {
  const searchParams = useSearchParams();
  const itemQuery = searchParams.get("item");
  const [initialItem, setInitialItem] = useState<MenuItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const {
    availableItems,
    orderItems,
    setOrderItems,
    isModalOpen,
    calculateTotal,
    handleQuantityChange,
    handleCloseModal,
    handleOpenModal,
    addItem,
    ClearAllOrders,
    removeItem,
    handleBack,
    clearOrderItems,
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
        className="mb-8 flex items-center justify-center bg-secondary"
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

      <Button
        onClick={handleOpenModal}
        className="group mb-6 w-full rounded-lg border-2 border-dashed border-gray-300 bg-transparent p-3 py-6 font-semibold uppercase text-gray-500 shadow-none"
      >
        <PlusCircleIcon size={20} className="group-hover:scale-110" />
        {orderItems.length === 0 ? "Add A New Item" : "Add Another Item"}
      </Button>

      {/* Modal for adding a new item */}
      <AddNewItemPage
        isAddItemModalOpen={isModalOpen}
        handleCloseModal={() => handleCloseModal(false)}
        availableItems={availableItems}
        addItem={addItem}
      />

      <div className="rounded-lg bg-gray-100 p-4">
        <div className="flex justify-between text-lg font-bold">
          <span>Total: </span>
          <span>KES {calculateTotal().toFixed(2)}</span>
        </div>
      </div>

      <Button
        onClick={() => setIsOrderModalOpen(true)}
        className={cn(
          "mt-6 w-full rounded-full bg-primary py-6 uppercase text-white",
          orderItems.length === 0 && "pointer-events-none opacity-50",
        )}
      >
        Place Order
      </Button>

      {/* Modal for Confirmation */}
      {isOrderModalOpen && (
        <OrderConfirmationModal
          orderItems={orderItems}
          clearOrderItems={clearOrderItems}
          totalPrice={calculateTotal()}
          isOrderModalOpen={isOrderModalOpen}
          setIsOrderModalOpen={setIsOrderModalOpen}
          name={initialItem.name}
          price={calculateTotal()}
          onRemoveItem={removeItem}
        />
      )}
    </div>
  );
};

export default OrderPage;
