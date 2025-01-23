import { MenuItem } from "@/app/utils/lib";
import React from "react";
import { useNavigate } from "react-router-dom";

interface OrderButtonProps {
  item: MenuItem;
}

const OrderButton: React.FC<OrderButtonProps> = ({ item }) => {
  const navigate = useNavigate();

  const handleOrderClick = () => {
    navigate("/order", { state: item });
  };

  return (
    <button
      onClick={handleOrderClick}
      className="group relative mx-auto block w-fit overflow-hidden rounded-full bg-accent px-8 py-3 font-medium text-black transition-transform duration-300 ease-in-out active:translate-y-2"
    >
      Order Now - KES {item.price.toFixed(2)}
      <span className="absolute inset-0 inline-block from-white/30 to-transparent transition-colors duration-100 group-hover:bg-gradient-to-t" />
    </button>
  );
};

export default OrderButton;
