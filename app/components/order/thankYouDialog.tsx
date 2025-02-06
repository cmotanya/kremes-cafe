import { useCurrency } from "@/app/hooks/useCurrency";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Check, PartyPopper } from "lucide-react";
import React from "react";

interface ThankYouProps {
  totalPrice: number;
  showThankYou: boolean;
  setShowThankYou: (open: boolean) => void;
  clearOrderItems: () => void;
  timeoutRef: React.MutableRefObject<NodeJS.Timeout | null>;
}
const ThankYouDialog = ({
  totalPrice,
  showThankYou,
  setShowThankYou,
  clearOrderItems,
  timeoutRef,
}: ThankYouProps) => {
  const priceCurrency = useCurrency();

  const handleCancel = () => {
    setShowThankYou(false);
    clearOrderItems();
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  return (
    <Dialog open={showThankYou} onOpenChange={(open) => setShowThankYou(open)}>
      <DialogContent className="max-w-sm text-balance rounded-xl bg-white text-center">
        <div className="flex flex-col items-center space-y-5">
          <div className="flex size-12 items-center justify-center rounded-full bg-green-500">
            <Check color="white" />
          </div>
          <div className="flex items-center justify-center gap-4">
            <DialogTitle className="text-xl">Thank You</DialogTitle>
            <PartyPopper className="size-8 text-primary" />
          </div>
          <p className="text-gray-500">
            Your order has been successfully placed. We&apos;ll start preparing
            it right away!
          </p>
          <p className="text-lg font-medium text-primary">
            OrderTotal: {priceCurrency(totalPrice)}
          </p>
          <Button onClick={handleCancel} className="bg-red-500 text-white">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ThankYouDialog;
