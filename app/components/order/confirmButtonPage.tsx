"use client";

import { OrderItemProps } from "@/app/utils/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import React, { useState } from "react";

interface ButtonProps {
  name: string;
  price: number;
  totalPrice: number;
  orderItems: OrderItemProps[];
  isOrderModalOpen: boolean;
  setIsOrderModalOpen: (open: boolean) => void;
  clearOrderItems: () => void;
}

const ConfirmButtonPage = ({
  totalPrice,
  orderItems,
  isOrderModalOpen,
  setIsOrderModalOpen,
  clearOrderItems,
}: ButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsOrderModalOpen(false);
      clearOrderItems();
      setIsLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setIsOrderModalOpen(false);
  };

  return (
    <Dialog
      open={isOrderModalOpen}
      onOpenChange={(open: boolean) => setIsOrderModalOpen(open)}
    >
      <DialogContent className="max-h-[80vh] w-[95%] max-w-lg rounded-xl bg-stone-700 shadow-2xl">
        {/* Close Button */}
        <DialogClose className="focus:ring-ring absolute right-4 top-4 z-20 rounded-sm bg-stone-700 opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-gray-100">
          <X size={20} className="text-red-500" />
        </DialogClose>
        <DialogHeader className="mt-6 border-b pb-2">
          <DialogTitle className="text-2xl text-accent">
            Confirm Your Order
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Order Items List */}
          <div className="max-h-[40vh] space-y-4 overflow-y-auto rounded-lg bg-gray-50 p-4">
            {orderItems.map((orderItem, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b border-gray-300 pb-2 last:border-0 last:pb-0"
              >
                <div className="flex flex-col">
                  <p className="font-medium text-gray-800">
                    {orderItem.item.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    Quantity: {orderItem.quantity}
                  </p>
                </div>
                <p className="font-semibold text-primary">
                  KES {(orderItem.item.price * orderItem.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="mt-6 rounded-lg bg-stone-600 p-4 text-white/95">
            <div className="flex justify-between">
              <p className="text-lg font-bold uppercase">Total:</p>
              <p className="text-lg font-bold">KES {totalPrice.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-row justify-end gap-4">
          <Button
            onClick={handleCancel}
            disabled={isLoading}
            className="w-32 bg-gray-300"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={isLoading}
            className="w-32 text-white"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent transition-all"></div>
                Processing...
              </div>
            ) : (
              "Confirm"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmButtonPage;
