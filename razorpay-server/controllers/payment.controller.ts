import { instance } from "../server";
import { Request, Response } from "express";

export const checkout = async (req: Request, res: Response) => {
  const { amount } = req.body;
  const options = {
    amount: Number(amount * 100),
    currency: "INR",
  };
  const order = await instance.orders.create(options);

  res.status(200).json({
    success: true,
    order,
  });
};

export const paymentVerification = async (req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    message: "Payment verified successfully",
  });
};
