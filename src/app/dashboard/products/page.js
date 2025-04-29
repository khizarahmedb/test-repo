"use client";
import { ArrowBigRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ProductModal } from "@/components/product-modal";
import { useUser } from "@/context/userContext";
import { CustomTable } from "@/components/custom-table";

export default function Products() {
  const { user, setUser, products, inventory } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAddProduct = () => {
    setModalMode("add");
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product) => {
    setModalMode("edit");
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const columns = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      id: "image",
      header: "Image",
      cell: ({ row }) => {
        const product = row.original;
        console.log(product);
        return (
          <div className="h-8 w-8 rounded bg-gray-700 flex items-center justify-center">
            <Image
              src={
                product.image_url === "uploads/1741773811721.png"
                  ? "https://placehold.co/400"
                  : product.image_url
              }
              width={32}
              height={32}
              alt={`${product.name} image`}
              className="rounded"
            />
          </div>
        );
      },
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "variation",
      header: "Variation",
    },
    {
      accessorKey: "availability",
      header: "Availability",
      cell: ({ row }) => {
        const availability = row.original.availability;
        return (
          <span
            className={
              availability === "available" ? "text-green-500" : "text-red-500"
            }
          >
            {availability}
          </span>
        );
      },
    },
    {
      accessorKey: "stock",
      header: "Stock",
    },
    {
      accessorKey: "price",
      header: "Price",
    },
    {
      accessorKey: "deliveryTime",
      header: "Delivery Time",
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <ArrowBigRight
          className="h-4 w-4 cursor-pointer text-white"
          onClick={() => handleEditProduct(row.original)}
        />
      ),
    },
  ];

  return (
    <div className="">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-white ">Products Table</h1>
        <Button
          variant="outline"
          className="bg-purple-500 text-white hover:bg-purple-600"
          size={"lg"}
          onClick={handleAddProduct}
        >
          Add Product
        </Button>
      </div>
      <CustomTable columns={columns} data={products} />

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        product={selectedProduct}
      />
    </div>
  );
}
