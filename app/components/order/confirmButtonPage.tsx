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
import React, { useState, useRef } from "react";
import ThankYouDialog from "./thankYouDialog";
import { cn } from "@/lib/utils";
import { useCurrency } from "@/app/hooks/useCurrency";

interface OrderConfirmationModalProps {
  name: string;
  price: number;
  totalPrice: number;
  orderItems: OrderItemProps[];
  isOrderModalOpen: boolean;
  setIsOrderModalOpen: (open: boolean) => void;
  clearOrderItems: () => void;
  onRemoveItem: (index: number) => void;
}

const OrderConfirmationModal = ({
  totalPrice,
  orderItems,
  isOrderModalOpen,
  setIsOrderModalOpen,
  clearOrderItems,
  onRemoveItem,
}: OrderConfirmationModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const priceCurrency = useCurrency();

  const handleShowThankYouModal = () => {
    setTimeout(() => {
      setShowThankYou(true);
    }, 1500);
  };

  const handleConfirm = async () => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsOrderModalOpen(false);
      setIsLoading(false);
      clearOrderItems();
    }, 5500);

    timeoutRef.current = timer;
  };

  const handleCancel = () => {
    setIsOrderModalOpen(false);
  };

  const handleRemoveItem = (index: number) => {
    onRemoveItem(index);
    if (orderItems.length === 1) {
      setIsOrderModalOpen(false);
    }
  };

  return (
    <>
      <Dialog
        open={isOrderModalOpen}
        onOpenChange={(open: boolean) => setIsOrderModalOpen(open)}
      >
        <DialogContent className="mb max-h-[80vh] w-[95%] max-w-lg rounded-xl bg-stone-700 shadow-2xl">
          {/* Close Button */}
          <DialogClose className="focus:ring-ring absolute right-4 top-4 z-20 rounded-sm bg-stone-100 opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-gray-100">
            <X size={20} color="red" />
          </DialogClose>
          <DialogHeader
            className={cn(
              "mt-6 border-b pb-4",
              orderItems.length === 0 && "hidden",
            )}
          >
            <DialogTitle className="text-2xl uppercase text-accent">
              Confirm Your Order
            </DialogTitle>
          </DialogHeader>

          <div
            className={cn("space-y-5", orderItems.length === 0 && "mb-4 mt-9")}
          >
            {/* Order Items List */}
            <div className="max-h-[40vh] space-y-4 overflow-y-auto rounded-lg bg-gray-50 p-4">
              {orderItems.length === 0 && (
                <p className="text-center text-sm font-semibold uppercase text-gray-500">
                  No item selected in your order
                </p>
              )}
              {orderItems.map((orderItem, index) => (
                <div
                  key={index}
                  className="group flex items-center justify-between border-b border-gray-300 pb-2 last:border-0 last:pb-0"
                >
                  <div className="flex flex-col">
                    <p className="font-medium text-gray-800">
                      {orderItem.item.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Quantity: {orderItem.quantity}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="font-semibold text-primary">
                      {priceCurrency(orderItem.item.price * orderItem.quantity)}
                    </p>
                    <button
                      onClick={() => handleRemoveItem(index)}
                      className="ml-2 transition-opacity hover:opacity-100 md:opacity-0 md:group-hover:opacity-100"
                      aria-label={`Remove ${orderItem.item.name} from order`}
                    >
                      <X size={20} color="red" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div
              className={cn(
                "mt-6 rounded-lg bg-stone-600 p-4 text-white/95",
                orderItems.length === 0 && "hidden",
              )}
            >
              <div className="flex justify-between">
                <p className="text-lg font-bold uppercase">Total:</p>
                <p className="text-lg font-bold">{priceCurrency(totalPrice)}</p>
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
              onClick={() => {
                handleConfirm();
                handleShowThankYouModal();
              }}
              disabled={isLoading || orderItems.length === 0}
              className="w-32 text-white"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div
                    className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent transition-all"
                    aria-live="polite"
                    aria-label="processing"
                  ></div>
                  Processing...
                </div>
              ) : (
                "Confirm"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Thank You Dialog */}
      <ThankYouDialog
        totalPrice={totalPrice}
        setShowThankYou={setShowThankYou}
        showThankYou={showThankYou}
        clearOrderItems={clearOrderItems}
        timeoutRef={timeoutRef}
      />
    </>
  );
};

export default OrderConfirmationModal;
