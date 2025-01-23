import { OrderItemCardProps } from "@/app/utils/types";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { QuantityControl } from "./qualityControl";

export const OrderItemCard: React.FC<OrderItemCardProps> = ({
  orderItem,
  index,
  onQuantityChange,
  onRemoveItem,
  showRemoveButton,
}) => {
  return (
    <Card>
      <CardHeader className="p-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">{orderItem.item.name}</h2>
          {showRemoveButton && (
            <button
              onClick={() => onRemoveItem(index)}
              className="rounded-md bg-red-500 px-2 py-1 text-sm text-white"
            >
              Remove
            </button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-1">
        <p className="text-sm text-gray-700">{orderItem.item.description}</p>
        <p className="font-semibold">Price: KES {orderItem.item.price}</p>

        <QuantityControl
          quantity={orderItem.quantity}
          onDecrease={() => onQuantityChange(index, orderItem.quantity - 1)}
          onIncrease={() => onQuantityChange(index, orderItem.quantity + 1)}
        />
      </CardContent>
    </Card>
  );
};
