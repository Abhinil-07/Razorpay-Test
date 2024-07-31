"use client";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import axios from "axios";

export function ItemCard() {
  const checkoutHandler = async () => {
    const response = await axios.post(
      "http://localhost:4000/api/payment/checkout",
      {
        amount: 1000,
      }
    );
    console.log(response.data);
    const order = response.data.order;
    const options = {
      key: process.env.RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: "INR",
      name: "6 Pack Programmer",
      description: "Tutorial of RazorPay",
      image: "https://avatars.githubusercontent.com/u/25058652?v=4",
      order_id: order.id,
      callback_url: "http://localhost:4000/api/payment/paymentverification",
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#121212",
      },
    };
    const razor = new (window as any).Razorpay(options);
    razor.open();
  };
  return (
    <Card className="w-full max-w-sm rounded-lg overflow-hidden shadow-lg transition-all hover:shadow-xl">
      <Link href="#" className="block" prefetch={false}>
        <img
          src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mbp14-spacegray-gallery1-202310?wid=4000&hei=3074&fmt=jpeg&qlt=90&.v=1697311136703"
          alt="Macbook"
          width={600}
          height={400}
          className="w-full h-48 object-cover"
        />
      </Link>
      <CardContent className="p-6 bg-background">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Macbook Pro</h3>
            <p className="text-muted-foreground">2023 Model</p>
          </div>
          <div className="text-2xl font-bold">$1,999</div>
        </div>
        <Button onClick={checkoutHandler} className="mt-4 w-full">
          Buy Now
        </Button>
      </CardContent>
    </Card>
  );
}
