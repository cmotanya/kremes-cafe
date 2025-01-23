import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { MenuItem } from "../utils/lib";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { MinusCircle, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Mock array of available items (replace with your actual data)
const availableItems: MenuItem[] = [
  { id: 1, name: "Burger", description: "Delicious beef burger", price: 10 },
  { id: 2, name: "Pizza", description: "Cheesy pepperoni pizza", price: 15 },
  { id: 3, name: "Pasta", description: "Creamy Alfredo pasta", price: 12 },
];

interface OrderItem {
  item: MenuItem;
  quantity: number;
  instructions: string;
}

const OrderPage: React.FC = () => {
  const location = useLocation();
  const initialItem = location.state as MenuItem;

  const [orderItems, setOrderItems] = useState<OrderItem[]>([
    { item: initialItem, quantity: 1, instructions: "" },
  ]);

  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);

  const handleQuantityChange = (index: number, value: number) => {
    const newItems = [...orderItems];
    newItems[index].quantity = Math.max(1, value);
    setOrderItems(newItems);
  };

  const addItem = (selectedItem: MenuItem) => {
    setOrderItems([
      ...orderItems,
      { item: selectedItem, quantity: 1, instructions: "" },
    ]);
    setIsAddItemModalOpen(false); // Close the modal after adding the item
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
        No item selected. Please go back and select an item.
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="mb-6 text-3xl font-medium">Order Page</h1>

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
        onClick={() => setIsAddItemModalOpen(true)}
        className="mb-6 w-full border-dashed"
        variant="outline"
      >
        + Add Another Item
      </Button>

      <div className="rounded-lg bg-gray-50 p-4">
        <div className="flex justify-between text-lg font-semibold">
          <span>Total:</span>
          <span>KES {calculateTotal().toFixed(2)}</span>
        </div>
      </div>

      <Button className="mt-6 w-full" onClick={() => alert("Order placed!")}>
        Place Order
      </Button>

      {/* Modal for adding a new item */}
      <Dialog open={isAddItemModalOpen} onOpenChange={setIsAddItemModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select an Item</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {availableItems.map((item) => (
              <div
                key={item.id}
                className="flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-colors hover:bg-gray-50"
                onClick={() => addItem(item)}
              >
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
                <span className="text-lg font-bold">KES {item.price}</span>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface OrderItemCardProps {
  orderItem: OrderItem;
  index: number;
  onQuantityChange: (index: number, value: number) => void;
  onRemoveItem: (index: number) => void;
  showRemoveButton: boolean;
}

const OrderItemCard: React.FC<OrderItemCardProps> = ({
  orderItem,
  index,
  onQuantityChange,
  onRemoveItem,
  showRemoveButton,
}) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">{orderItem.item.name}</h2>
          {showRemoveButton && (
            <Button
              variant="ghost"
              onClick={() => onRemoveItem(index)}
              className="text-red-500 hover:text-red-700"
            >
              Remove
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-700">{orderItem.item.description}</p>
        <p className="text-lg font-bold">Price: KES {orderItem.item.price}</p>

        <QuantityControl
          quantity={orderItem.quantity}
          onDecrease={() => onQuantityChange(index, orderItem.quantity - 1)}
          onIncrease={() => onQuantityChange(index, orderItem.quantity + 1)}
        />
      </CardContent>
    </Card>
  );
};

interface QuantityControlProps {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
}

const QuantityControl: React.FC<QuantityControlProps> = ({
  quantity,
  onDecrease,
  onIncrease,
}) => {
  return (
    <div className="flex items-center space-x-4">
      <label className="text-sm font-medium">Quantity:</label>
      <div className="flex items-center space-x-3">
        <Button
          variant="ghost"
          onClick={onDecrease}
          disabled={quantity <= 1}
          className="text-blue-600 hover:text-blue-800"
        >
          <MinusCircle
            className={quantity <= 1 ? "text-gray-400" : "text-blue-600"}
          />
        </Button>
        <span className="min-w-[2rem] text-center text-lg font-semibold">
          {quantity}
        </span>
        <Button
          variant="ghost"
          onClick={onIncrease}
          className="text-blue-600 hover:text-blue-800"
        >
          <PlusCircle />
        </Button>
      </div>
    </div>
  );
};

export default OrderPage;
