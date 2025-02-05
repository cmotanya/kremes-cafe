import { useState } from "react";
import { todaysSpecials } from "../utils/lib";
import { MenuItem, OrderItemProps } from "../utils/types";
import { useRouter } from "next/navigation";

export const useOrderItems = () => {
  const router = useRouter();

  const [orderItems, setOrderItems] = useState<OrderItemProps[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const availableItems = todaysSpecials.filter(
    (item) => !orderItems.some((orderItems) => orderItems.item.id === item.id),
  );
  const handleQuantityChange = (index: number, value: number) => {
    const newItems = [...orderItems];
    newItems[index].quantity = Math.max(1, value);
    setOrderItems(newItems);
  };

  const clearOrderItems = () => {
    setOrderItems([]);
  };
  const handleCloseModal = (open: boolean) => {
    setIsModalOpen(open); // Close the modal
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const addItem = (selectedItem: MenuItem) => {
    setOrderItems([
      ...orderItems,

      { item: selectedItem, quantity: 1, instructions: "" },
    ]);
    setIsModalOpen(false); // Close the modal after adding the item
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
    isModalOpen,
    calculateTotal,
    handleQuantityChange,
    handleCloseModal,
    handleOpenModal,
    addItem,
    ClearAllOrders,
    removeItem,
    setOrderItems,
    handleBack,
    clearOrderItems,
  };
};
