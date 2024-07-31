"use client";
import { ItemCard } from "@/components/component/item-card";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const loadRazorpayScript = async () => {
      try {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
      } catch (error) {
        console.log("Failed to load razorpay script", error);
      }
    };

    const checkoutHandler = async () => {
      await loadRazorpayScript();
      const response = await axios.post(
        "http://localhost:4000/api/v1/payment/checkout",
        {
          amount: 1000,
        }
      );
      console.log(response.data);
      const order = response.data.order;
      const options = {
        key: "rzp_test_F1X0rPEgB9CZc1",
        amount: order.amount,
        currency: "INR",
        name: "6 Pack Programmer",
        description: "Tutorial of RazorPay",
        image: "https://avatars.githubusercontent.com/u/25058652?v=4",
        order_id: order.id,
        callback_url: "http://localhost:4000/api/v1/paymentverification",
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
      const rzp = new (window as any).Razorpay(options);
    };
    checkoutHandler();
  }, []);
}
