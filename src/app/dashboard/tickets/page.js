"use client";

import React, { useEffect, useState } from "react";
import { ArrowBigRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/userContext";
import { CustomTable } from "@/components/custom-table";

export default function Tickets() {
  const { tickets } = useUser();

  useEffect(() => {
    console.log("Tickets data:", tickets);
  }, [tickets]);

  const handleCreateTicket = () => {
    console.log("Create Ticket clicked - Implement modal/form logic");
  };

  const handleViewTicketDetails = (ticket) => {
    console.log("View Details clicked for:", ticket, "- Implement modal logic");
  };

  const columns = [
    {
      accessorKey: "id",
      header: "Ticket ID",
    },
    {
      accessorKey: "order_id",
      header: "Order ID",
      cell: ({ row }) => row.original.order_id || "N/A",
    },
    {
      accessorKey: "customer_email",
      header: "Customer Email",
      cell: ({ row }) => row.original.customer_email || "N/A",
    },
    {
      accessorKey: "customer_id",
      header: "Customer ID",
      cell: ({ row }) => row.original.customer_id || "N/A",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        const statusClass =
          status?.toLowerCase() === "open"
            ? "text-yellow-500"
            : status?.toLowerCase() === "closed"
            ? "text-green-500"
            : status?.toLowerCase() === "pending"
            ? "text-blue-500"
            : "text-white";
        return <span className={statusClass}>{status || "N/A"}</span>;
      },
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
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <ArrowBigRight
          className="h-4 w-4 cursor-pointer text-white"
          onClick={() => handleViewTicketDetails(row.original)}
        />
      ),
    },
  ];

  return (
    <div className="">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-white ">Tickets</h1>
        <Button
          variant="outline"
          className="bg-purple-500 text-white hover:bg-purple-600"
          size={"lg"}
          onClick={handleCreateTicket}
        >
          Create Ticket
        </Button>
      </div>

      <CustomTable columns={columns} data={tickets || []} />
    </div>
  );
}
