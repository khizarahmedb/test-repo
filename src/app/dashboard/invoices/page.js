"use client";

import React, { useEffect, useState } from "react";
import { ArrowBigRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/userContext";
import { CustomTable } from "@/components/custom-table";
// import { InvoiceModal } from "@/components/invoice-modal"; // Create this if needed

export default function Invoices() {
  const { invoices } = useUser();

  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [selectedInvoice, setSelectedInvoice] = useState(null);

  useEffect(() => {
    console.log("Invoices data:", invoices);
  }, [invoices]);

  const handleCreateInvoice = () => {
    // setSelectedInvoice(null);
    // setIsModalOpen(true); // Or navigate to a create page
    console.log("Create Invoice clicked - Implement logic");
  };

  const handleViewInvoiceDetails = (invoice) => {
    // setSelectedInvoice(invoice);
    // setIsModalOpen(true);
    console.log(
      "View Details clicked for:",
      invoice,
      "- Implement modal logic"
    );
  };

  const columns = [
    {
      accessorKey: "id",
      header: "Invoice ID",
    },
    {
      accessorKey: "customer_name",
      header: "Customer Name",
      cell: ({ row }) => row.original.customer_name || "N/A",
    },
    {
      accessorKey: "customer_email",
      header: "Customer Email",
      cell: ({ row }) => row.original.customer_email || "N/A",
    },
    {
      accessorKey: "inv_amount",
      header: "Amount",
      cell: ({ row }) => {
        const amount = parseFloat(row.original.inv_amount).toFixed(2);
        return isNaN(amount) ? "N/A" : amount;
      },
    },
    {
      accessorKey: "inv_currency",
      header: "Currency",
    },
    {
      // Assuming a 'status' field might exist
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        // Example styling (adjust based on actual status values like 'paid', 'pending', 'overdue')
        const statusClass =
          status?.toLowerCase() === "paid"
            ? "text-green-500"
            : status?.toLowerCase() === "pending"
            ? "text-yellow-500"
            : status?.toLowerCase() === "overdue"
            ? "text-red-500"
            : "text-white"; // Default
        return <span className={statusClass}>{status || "N/A"}</span>;
      },
    },
    {
      // Assuming a 'created_at' field might exist
      accessorKey: "created_at",
      header: "Created Date",
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
          onClick={() => handleViewInvoiceDetails(row.original)}
        />
      ),
    },
  ];

  return (
    <div className="">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-white ">Invoices </h1>
        {/* <Button
          variant="outline"
          className="bg-purple-500 text-white hover:bg-purple-600" // Example styling
          size={"lg"}
          onClick={handleCreateInvoice}
        >
          Create Invoice
        </Button> */}
      </div>

      <CustomTable columns={columns} data={invoices || []} />

      {/*
      <InvoiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        invoice={selectedInvoice}
      />
      */}
    </div>
  );
}
