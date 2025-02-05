import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import React from "react";
import { MenuItem } from "../utils/types";
import { Badge } from "@/components/ui/badge";

interface AddNewItemProps {
  isAddItemModalOpen: boolean;
  handleCloseModal: () => void;
  availableItems: MenuItem[];
  addItem: (item: MenuItem) => void;
}

const AddNewItemPage = ({
  isAddItemModalOpen,
  handleCloseModal,
  availableItems,
  addItem,
}: AddNewItemProps) => {
  return (
    <Dialog open={isAddItemModalOpen} onOpenChange={handleCloseModal}>
      <DialogContent className="max-h-[70vh] w-[90%] max-w-md rounded-md bg-white/95">
        <DialogTitle className="mb-2 font-bold">
          <Badge className="ml-3 mt-4 bg-gray-300">
            {availableItems.length > 0
              ? availableItems.length > 1
                ? availableItems.length + " Items Available"
                : availableItems.length + " Item Available"
              : ""}
          </Badge>
        </DialogTitle>
        <div className="space-y-2 overflow-y-auto">
          {availableItems.length > 0 ? (
            availableItems.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  addItem(item);
                }}
                className="flex cursor-pointer items-center justify-between rounded-lg border bg-gray-100 p-2 transition-colors"
              >
                <div className="flex-grow">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-800 group-hover:text-primary">
                      {item.name}
                    </h3>
                    <span className="rounded-md bg-secondary px-1 text-sm font-medium text-white">
                      KES {item.price.toFixed(2)}
                    </span>
                  </div>
                  <p className="line-clamp-2 text-sm text-gray-600">
                    {item.description}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              No items available to add.
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewItemPage;
