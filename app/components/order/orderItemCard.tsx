import { OrderItemCardProps } from "@/app/utils/types";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { QuantityControl } from "./qualityControl";
import { cn } from "@/lib/utils";

export const OrderItemCard: React.FC<OrderItemCardProps> = ({
  orderItem,
  index,
  onQuantityChange,
  onRemoveItem,
  showRemoveButton,
}) => {
  return (
    <Card
      className={cn(orderItem.quantity > 1 ? "bg-green-100" : "bg-red-100")}
    >
      <CardHeader className="p-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">{orderItem.item.name}</h2>
          {showRemoveButton && (
            <button
              onClick={() => onRemoveItem(index)}
              className="rounded-md bg-red-500 px-2 py-1 text-sm text-white"
              aria-label={`Remove ${orderItem.item.name} from order`}
            >
              Remove
            </button>
          )}
        </div>
      </CardHeader>
      <CardContent>
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
