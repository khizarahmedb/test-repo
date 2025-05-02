"use client";

import { useState, useEffect } from "react";
import { X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useUser } from "@/context/userContext";
import axios from "axios";

export function ReplaceProductModal({ isOpen, onClose, ticket }) {
  const { user } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [inventoryItems, setInventoryItems] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    product_name: "",
    inventory_item_id: "",
    customer_email: "",
  });

  // Fetch product and inventory data when modal opens
  useEffect(() => {
    if (isOpen && ticket && ticket.product_id) {
      setIsLoading(true);
      setSuccessMessage("");
      setErrorMessage("");

      // Reset form data
      setFormData({
        product_name: "",
        inventory_item_id: "",
        customer_email: "",
      });

      // Fetch product data
      fetchProductData(ticket.product_id);
    }
  }, [isOpen, ticket]);

  const fetchProductData = async (productId) => {
    try {
      const response = await axios.get(
        `$https://back.invader.shop/api/product/${productId}`,
        {
          headers: { "x-token": user.token },
        }
      );

      setProduct(response.data.product);

      // If product has stock_id, fetch inventory items
      if (response.data.product.stock_id) {
        console.log("FIND STOCK ID HERE", response);
        fetchInventoryItems(response.data.product.stock_id);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
      setErrorMessage("Failed to load product data");
      setIsLoading(false);
    }
  };

  const fetchInventoryItems = async (stockId) => {
    try {
      console.log("Fetching inventory items for stock ID:", stockId);
      const response = await axios.get(
        `$https://back.invader.shop/api/inventory-items/${stockId}`,
        {
          headers: { "x-token": user.token },
        }
      );
      console.log(response);
      setInventoryItems(response.data.body || []);
    } catch (error) {
      console.error("Error fetching inventory items:", error);
      setErrorMessage("Failed to load inventory items");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value) => {
    setFormData((prev) => ({ ...prev, inventory_item_id: value }));
  };

  const handleSubmit = async () => {
    if (
      !formData.product_name ||
      !formData.inventory_item_id ||
      !formData.customer_email
    ) {
      setErrorMessage("Please fill in all fields");
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage("");

      const response = await axios.put(
        `$https://back.invader.shop/api/ticket/replace/${ticket.id}`,
        formData,
        {
          headers: { "x-token": user.token },
        }
      );

      setSuccessMessage("Product replaced successfully");

      // Close modal after short delay to show success message
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Error replacing product:", error);
      setErrorMessage("Failed to replace product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="no-scrollbar bg-[#0a0a14] text-white border border-[#5D43E1] max-h-[90vh] overflow-y-auto max-w-xl w-full rounded-xl p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">
            Replace Product
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          <>
            {successMessage && (
              <div className="bg-green-900/50 border border-green-500 rounded-md p-3 mb-4 flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>{successMessage}</span>
              </div>
            )}

            {errorMessage && (
              <div className="bg-red-900/50 border border-red-500 rounded-md p-3 mb-4 flex items-center">
                <X className="h-5 w-5 text-red-500 mr-2" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="grid gap-4 py-4">
              {/* Product Information */}
              {product && (
                <div className="bg-gray-800/50 rounded-md p-3 mb-2">
                  <h3 className="text-sm font-medium text-gray-300 mb-1">
                    Current Product
                  </h3>
                  <p className="text-white font-medium">{product.name}</p>
                  <p className="text-sm text-gray-400">ID: {product.id}</p>
                </div>
              )}

              {/* Inventory Item Selection */}
              <div className="space-y-2">
                <label
                  htmlFor="inventory_item"
                  className="text-sm text-gray-400"
                >
                  Select Inventory Item
                </label>
                <Select
                  onValueChange={handleSelectChange}
                  value={formData.inventory_item_id}
                >
                  <SelectTrigger className="bg-gray-900 border-gray-700">
                    <SelectValue placeholder="Select an item" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700 text-white">
                    {inventoryItems.length > 0 ? (
                      inventoryItems.map((item) => (
                        <SelectItem key={item.id} value={item.id.toString()}>
                          {item.item_name}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="no-items" disabled>
                        No items available
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>

              {/* Product Name */}
              <div className="space-y-2">
                <label htmlFor="product_name" className="text-sm text-gray-400">
                  Product Name
                </label>
                <Input
                  id="product_name"
                  name="product_name"
                  placeholder="Enter product name"
                  value={formData.product_name}
                  onChange={handleInputChange}
                  className="bg-gray-900 border-gray-700"
                />
              </div>

              {/* Customer Email */}
              <div className="space-y-2">
                <label
                  htmlFor="customer_email"
                  className="text-sm text-gray-400"
                >
                  Customer Email
                </label>
                <Input
                  id="customer_email"
                  name="customer_email"
                  type="email"
                  placeholder="Enter customer email"
                  value={formData.customer_email}
                  onChange={handleInputChange}
                  className="bg-gray-900 border-gray-700"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                onClick={onClose}
                className="bg-gray-800 hover:bg-gray-700 border-gray-700"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                className="bg-purple-600 hover:bg-purple-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Replace Product"}
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
