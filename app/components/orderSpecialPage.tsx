import React, { useState } from "react";
import { Clock, Plus, Minus, ChefHat, CreditCard } from "lucide-react";

interface MenuItem {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  prepTime: string;
}

interface OrderItem extends MenuItem {
  quantity: number;
}

interface FormData {
  name: string;
  phone: string;
  email: string;
  address: string;
  notes: string;
  mpesaNumber: string;
}

const OrdersPage = () => {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    address: "",
    notes: "",
    mpesaNumber: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<
    "idle" | "processing" | "success" | "error"
  >("idle");

  const menuItems: MenuItem[] = [
    {
      id: 1,
      name: "Classic Breakfast",
      price: 15.99,
      description: "Eggs, bacon, toast, and hash browns",
      category: "Breakfast",
      prepTime: "15 mins",
    },
    {
      id: 2,
      name: "Caesar Salad",
      price: 12.99,
      description: "Fresh romaine lettuce, croutons, parmesan",
      category: "Lunch",
      prepTime: "10 mins",
    },
    {
      id: 3,
      name: "Grilled Salmon",
      price: 24.99,
      description: "Fresh salmon with seasonal vegetables",
      category: "Dinner",
      prepTime: "25 mins",
    },
    {
      id: 4,
      name: "Chocolate Lava Cake",
      price: 8.99,
      description: "Warm chocolate cake with molten center",
      category: "Dessert",
      prepTime: "20 mins",
    },
  ];

  const addToOrder = (item: MenuItem) => {
    const existingItem = orderItems.find(
      (orderItem) => orderItem.id === item.id,
    );
    if (existingItem) {
      setOrderItems(
        orderItems.map((orderItem) =>
          orderItem.id === item.id
            ? { ...orderItem, quantity: orderItem.quantity + 1 }
            : orderItem,
        ),
      );
    } else {
      setOrderItems([...orderItems, { ...item, quantity: 1 }]);
    }
  };

  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setOrderItems(orderItems.filter((item) => item.id !== itemId));
    } else {
      setOrderItems(
        orderItems.map((item) =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item,
        ),
      );
    }
  };

  const calculateTotal = () => {
    return orderItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);
    setPaymentStatus("processing");

    try {
      // 1. First, initiate M-PESA payment
      const paymentResponse = await initiatePayment();

      if ((paymentResponse as { success: boolean }).success) {
        // 2. Send order details via SMS
        await sendOrderConfirmationSMS();

        // 3. Clear the order and show success
        setPaymentStatus("success");
        setOrderItems([]);
        setFormData({
          name: "",
          phone: "",
          email: "",
          address: "",
          notes: "",
          mpesaNumber: "",
        });
        alert(
          "Order placed successfully! You will receive an SMS confirmation shortly.",
        );
      } else {
        setPaymentStatus("error");
        alert("Payment failed. Please try again.");
      }
    } catch (error) {
      setPaymentStatus("error");
      console.error("Order processing failed:", error);
      alert("An error occurred while processing your order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const initiatePayment = async () => {
    // Simulate M-PESA payment API call
    // Replace this with actual M-PESA API integration
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, transactionId: "MP" + Date.now() });
      }, 2000);
    });
  };

  const sendOrderConfirmationSMS = async () => {
    // Simulate SMS API call
    // Replace with actual SMS API integration (e.g., Twilio, Africa's Talking)
    const orderSummary = orderItems
      .map((item) => `${item.quantity}x ${item.name}`)
      .join(", ");

    const message = `Thank you for your order at KREMES!\n\nOrder Summary:\n${orderSummary}\n\nTotal: $${calculateTotal().toFixed(2)}\n\nWe'll notify you when it's ready.`;

    console.log("SMS would be sent:", message);
    return Promise.resolve();
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-3xl font-bold">Place Your Order</h1>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Menu Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Menu</h2>
            <div className="grid gap-4">
              {menuItems.map((item) => (
                <div
                  key={item.id}
                  className="rounded-lg bg-white p-4 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-600">
                        {item.description}
                      </p>
                      <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                        <Clock size={16} />
                        <span>{item.prepTime}</span>
                        <ChefHat size={16} className="ml-2" />
                        <span>{item.category}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${item.price}</p>
                      <button
                        onClick={() => addToOrder(item)}
                        className="mt-2 rounded-full bg-primary px-4 py-1 text-sm text-white hover:opacity-90"
                      >
                        Add to Order
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary and Form */}
          <div className="space-y-6">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-semibold">Your Order</h2>
              {orderItems.length === 0 ? (
                <p className="text-gray-500">Your order is empty</p>
              ) : (
                <div className="space-y-4">
                  {orderItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          ${item.price} each
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="rounded-full p-1 hover:bg-gray-100"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="rounded-full p-1 hover:bg-gray-100"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="mt-4 border-t pt-4">
                    <div className="flex justify-between font-semibold">
                      <span>Total:</span>
                      <span>${calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <form
              onSubmit={handleSubmit}
              className="rounded-lg bg-white p-6 shadow-sm"
            >
              <h2 className="mb-4 text-xl font-semibold">Delivery Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1 w-full rounded-md border p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-1 w-full rounded-md border p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 w-full rounded-md border p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Delivery Address
                  </label>
                  <textarea
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    className="mt-1 w-full rounded-md border p-2"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Special Instructions
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    className="mt-1 w-full rounded-md border p-2"
                    rows={2}
                  />
                </div>

                {/* M-PESA Payment Section */}
                <div className="rounded-lg bg-green-50 p-4">
                  <h3 className="mb-3 flex items-center gap-2 font-medium text-green-800">
                    <CreditCard size={20} />
                    M-PESA Payment
                  </h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      M-PESA Number
                    </label>
                    <input
                      type="tel"
                      name="mpesaNumber"
                      required
                      placeholder="254xxxxxxxxx"
                      value={formData.mpesaNumber}
                      onChange={handleInputChange}
                      className="mt-1 w-full rounded-md border p-2"
                      pattern="254[0-9]{9}"
                      title="Please enter a valid Kenyan phone number starting with 254"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Enter your M-PESA number starting with 254
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing || orderItems.length === 0}
                  className="w-full rounded-lg bg-primary px-4 py-2 font-medium text-white disabled:opacity-50"
                >
                  {isProcessing
                    ? "Processing Payment..."
                    : `Pay ${calculateTotal().toFixed(2)} KES via M-PESA`}
                </button>

                {paymentStatus === "success" && (
                  <div className="rounded-lg bg-green-50 p-3 text-center text-sm text-green-800">
                    Payment successful! Check your phone for confirmation.
                  </div>
                )}

                {paymentStatus === "error" && (
                  <div className="rounded-lg bg-red-50 p-3 text-center text-sm text-red-800">
                    Payment failed. Please try again.
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
