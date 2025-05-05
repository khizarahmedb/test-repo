"use client";

import { useEffect, useState } from "react";
import { ArrowBigRight, RefreshCw } from "lucide-react";
import { useUser } from "@/context/userContext";
import { CustomTable } from "@/components/custom-table";
import { ReplaceProductModal } from "@/components/ticket-replace-modal";

export default function Tickets() {
  const { tickets } = useUser();
  const [isReplaceModalOpen, setIsReplaceModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    console.log("Tickets data:", tickets);
  }, [tickets]);

  const handleCreateTicket = () => {
    console.log("Create Ticket clicked - Implement modal/form logic");
  };

  const handleViewTicketDetails = (ticket) => {
    console.log("View Details clicked for:", ticket, "- Implement modal logic");
  };

  const handleReplaceProduct = (ticket) => {
    setSelectedTicket(ticket);
    setIsReplaceModalOpen(true);
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
          status?.toLowerCase() === "unresolved"
            ? "text-red-500"
            : status?.toLowerCase() === "resolved"
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
      cell: ({ row }) => {
        const ticket = row.original;
        return (
          <div className="flex items-center space-x-2">
            <ArrowBigRight
              className="h-4 w-4 cursor-pointer text-white"
              onClick={() => handleViewTicketDetails(ticket)}
            />
            <RefreshCw
              className="h-4 w-4 cursor-pointer text-purple-500 hover:text-purple-400"
              onClick={() => handleReplaceProduct(ticket)}
              title="Replace Product"
            />
          </div>
        );
      },
    },
  ];

  return (
    <div className="">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-white ">Tickets</h1>
      </div>

      <CustomTable columns={columns} data={tickets || []} />

      {/* Replace Product Modal */}
      <ReplaceProductModal
        isOpen={isReplaceModalOpen}
        onClose={() => setIsReplaceModalOpen(false)}
        ticket={selectedTicket}
      />
    </div>
  );
}
