import { useState } from "react";
import { todaysSpecials } from "../utils/lib";
import { MenuItem, OrderItemProps } from "../utils/types";
import { useRouter } from "next/navigation";

export const useOrderItems = () => {
  const router = useRouter();

  const [orderItems, setOrderItems] = useState<OrderItemProps[]>([]);
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);

  const availableItems = todaysSpecials.filter(
    (item) => !orderItems.some((orderItems) => orderItems.item.id === item.id),
  );
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

  const handleBack = () => {
    router.push("/");
  };
  return {
    availableItems,
    orderItems,
    isAddItemModalOpen,
    calculateTotal,
    handleQuantityChange,
    handleCloseModal,
    handleOpenModal,
    addItem,
    ClearAllOrders,
    removeItem,
    setOrderItems,
    handleBack,
  };
};
