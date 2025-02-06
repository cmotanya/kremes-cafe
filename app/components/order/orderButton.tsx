"use client";

import { useCurrency } from "@/app/hooks/useCurrency";
import { MenuItem } from "@/app/utils/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

interface OrderButtonProps {
  item: MenuItem;
}

const OrderButton: React.FC<OrderButtonProps> = ({ item }) => {
  const priceCurrency = useCurrency();

  return (
    <div className="flex items-center justify-center pt-5">
      <Button className="w-[90%] max-w-full rounded-full bg-primary py-6 uppercase text-white transition-transform active:scale-95">
        <Link
          href={{ pathname: "/order", query: { item: JSON.stringify(item) } }}
          aria-label={`Order ${item.name} for KES ${item.price.toFixed(2)}`}
        >
          Order Now - {priceCurrency(item.price)}
        </Link>
      </Button>
    </div>
  );
};

export default OrderButton;
