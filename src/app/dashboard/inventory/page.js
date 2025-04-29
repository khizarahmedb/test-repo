"use client";

import { useEffect, useState } from "react";
import { ArrowBigRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/userContext";
import { CustomTable } from "@/components/custom-table";
import { InventoryModal } from "@/components/inventory-modal";

export default function Inventory() {
  const { inventory } = useUser();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedInventoryItem, setSelectedInventoryItem] = useState(null);

  useEffect(() => {
    console.log("Inventory data:", inventory);
  }, [inventory]);

  const handleAddInventory = () => {
    setModalMode("add");
    setSelectedInventoryItem(null);
    setIsModalOpen(true);
  };

  const handleEditInventory = (item) => {
    setModalMode("edit");
    setSelectedInventoryItem(item);
    setIsModalOpen(true);
  };

  const columns = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "stock_name",
      header: "Stock Name",
    },
    {
      accessorKey: "products",
      header: "Products Ref/Count",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        const statusClass = status?.toLowerCase().includes("out of stock")
          ? "text-red-500"
          : status?.toLowerCase().includes("available")
          ? "text-green-500"
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
      accessorKey: "last_updated",
      header: "Last Updated",
      cell: ({ row }) => {
        const date = row.original.last_updated;
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
          onClick={() => handleEditInventory(row.original)}
        />
      ),
    },
  ];

  return (
    <div className="">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-white ">Inventory </h1>
        <Button
          variant="outline"
          className="bg-purple-500 text-white hover:bg-purple-600"
          size={"lg"}
          onClick={handleAddInventory}
        >
          Add Inventory Item
        </Button>
      </div>

      <CustomTable columns={columns} data={inventory || []} />

      <InventoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        inventoryItem={selectedInventoryItem}
      />
    </div>
  );
}
