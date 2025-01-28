"use client";

import { MenuItem } from "@/app/utils/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

interface OrderButtonProps {
  item: MenuItem;
}

const OrderButton: React.FC<OrderButtonProps> = ({ item }) => {
  return (
    <div className="flex justify-center items-center pt-5">
      <Button asChild>
        <Link
          href={{ pathname: "/order", query: { item: JSON.stringify(item) } }}
          aria-label={`Order ${item.name} for KES ${item.price.toFixed(2)}`}
        >
          Order Now - KES {item.price.toFixed(2)}
        </Link>
      </Button>
    </div>
  );
};

export default OrderButton;
