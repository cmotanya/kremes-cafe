import { QuantityControlProps } from "@/app/utils/types";
import { MinusCircle, PlusCircle } from "lucide-react";

export const QuantityControl: React.FC<QuantityControlProps> = ({
  quantity,
  onDecrease,
  onIncrease,
}) => {
  return (
    <div className="flex items-center space-x-4">
      <label className="text-sm font-medium">Quantity:</label>
      <div className="flex items-center space-x-3">
        <button
          onClick={onDecrease}
          disabled={quantity <= 1}
          aria-label="Decrease quantity"
          className="text-blue-600 hover:text-blue-800"
        >
          <MinusCircle
            className={quantity <= 1 ? "text-gray-400" : "text-red-600"}
          />
        </button>
        <span className="min-w-[1.5rem] text-center text-lg font-semibold">
          {quantity}
        </span>
        <button
          onClick={onIncrease}
          aria-label="Increase quantity"
          className="text-green-600"
        >
          <PlusCircle />
        </button>
      </div>
    </div>
  );
};
