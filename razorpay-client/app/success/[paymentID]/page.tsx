import React from "react";

const page = async ({ params }: { params: { paymentID: string } }) => {
  return (
    <div className="flex items-center justify-center h-screen">
      Payment for Payment ID:{params.paymentID} is successful
    </div>
  );
};

export default page;
