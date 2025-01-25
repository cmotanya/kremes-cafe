export interface OrderItemProps {
  item: MenuItem;
  quantity: number;
  instructions: string;
}

export interface OrderItemCardProps {
  orderItem: OrderItemProps;
  index: number;
  onQuantityChange: (index: number, value: number) => void;
  onRemoveItem: (index: number) => void;
  showRemoveButton: boolean;
}

export interface QuantityControlProps {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
}

export type MenuItem = {
  id: string;
  name: string;
  prep: string;
  difficulty: string;
  orders: number;
  image: string;
  description: string;
  price: number;
};
