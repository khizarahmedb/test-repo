"use client";

import { useEffect, useState } from "react";
import { ArrowBigRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/userContext";
import { CustomTable } from "@/components/custom-table";
import { CouponModal } from "@/components/coupon-modal";

export default function Coupons() {
  const { coupons } = useUser();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  useEffect(() => {
    console.log("Coupons data:", coupons);
  }, [coupons]);

  const handleAddCoupon = () => {
    setModalMode("add");
    setSelectedCoupon(null);
    setIsModalOpen(true);
  };

  const handleEditCoupon = (coupon) => {
    setModalMode("edit");
    setSelectedCoupon(coupon);
    setIsModalOpen(true);
  };

  const columns = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "coupon_code",
      header: "Code",
    },
    {
      accessorKey: "coupon_name",
      header: "Name",
    },
    {
      accessorKey: "discount_percent",
      header: "Discount (%)",
      cell: ({ row }) => `${row.original.discount_percent}%`,
    },
    {
      accessorKey: "expiry_date",
      header: "Expiry Date",
      cell: ({ row }) => {
        const date = row.original.expiry_date;
        return date ? new Date(date).toLocaleDateString() : "N/A";
      },
    },
    {
      accessorKey: "usage_limit",
      header: "Usage Limit",
    },
    {
      accessorKey: "max_limit", // Assuming this is different from usage_limit
      header: "Max Uses",
    },
    {
      accessorKey: "created_at",
      header: "Created At",
      cell: ({ row }) => {
        const date = row.original.created_at;
        return date ? new Date(date).toLocaleDateString() : "N/A";
      },
    },
    {
      accessorKey: "created_by",
      header: "Created By",
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <ArrowBigRight
          className="h-4 w-4 cursor-pointer text-white"
          onClick={() => handleEditCoupon(row.original)}
        />
      ),
    },
  ];

  return (
    <div className="">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-white ">Coupons</h1>
        <Button
          variant="outline"
          className="bg-purple-500 text-white hover:bg-purple-600"
          size={"lg"}
          onClick={handleAddCoupon}
        >
          Add Coupon
        </Button>
      </div>

      <CustomTable columns={columns} data={coupons || []} />

      <CouponModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        coupon={selectedCoupon}
      />
    </div>
  );
}
