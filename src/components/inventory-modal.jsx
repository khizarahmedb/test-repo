"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@/context/userContext";
import {
  addInventory,
  editInventory,
  deleteInventory,
} from "@/utils/axiosInstance"; // Adjust import path as needed

export function InventoryModal({ isOpen, onClose, mode, inventoryItem }) {
  const { user, inventory, setInventory, fetchData } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    stock_name: "",
    delimiter: ",", // Default delimiter
    items: "", // Added items field
  });

  // Initialize form data when modal opens or changes mode
  useEffect(() => {
    if (mode === "edit" && inventoryItem) {
      setFormData({
        stock_name: inventoryItem.stock_name || "",
        delimiter: inventoryItem.delimiter || ",",
        items: inventoryItem.items || "", // Initialize items field for edit mode
      });
    } else {
      // Reset form for add mode
      setFormData({
        stock_name: "",
        delimiter: ",",
        items: "", // Reset items field for add mode
      });
    }
    setIsSubmitting(false);
  }, [mode, inventoryItem, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setIsSubmitting(true);

      // Prepare data for API
      const apiData = {
        ...formData,
      };

      if (mode === "add") {
        // Add new inventory item
        const response = await addInventory(user.token, apiData);
        console.log("Inventory item added successfully", response);

        // Option 1: Update the inventory state directly with the new item
        if (response && response.body) {
          setInventory([...inventory, response.body]);
        } else {
          // Option 2: Refetch all data if the response doesn't include the new item
          await fetchData();
        }
      } else {
        // Edit existing inventory item
        const response = await editInventory(
          user.token,
          inventoryItem.id,
          apiData
        );
        console.log("Inventory item updated successfully", response);

        // Option 1: Update the specific item in the state
        if (response && response.body) {
          setInventory(
            inventory.map((item) =>
              item.id === inventoryItem.id ? response.body : item
            )
          );
        } else {
          // Option 2: Update the item in state with local data
          const updatedItem = {
            ...inventoryItem,
            ...apiData,
            // Keep other fields that might not be in the form
            id: inventoryItem.id,
            created_at: inventoryItem.created_at,
            created_by: inventoryItem.created_by,
            last_updated: new Date().toISOString(),
            products: inventoryItem.products,
            status: inventoryItem.status,
          };
          setInventory(
            inventory.map((item) =>
              item.id === inventoryItem.id ? updatedItem : item
            )
          );
        }
      }

      // Close the modal
      onClose();
    } catch (error) {
      console.error("Error saving inventory item:", error);
      // Option 3: Always refetch on error to ensure data consistency
      await fetchData();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!inventoryItem || !inventoryItem.id) return;

    try {
      setIsSubmitting(true);
      await deleteInventory(user.token, inventoryItem.id);
      console.log("Inventory item deleted successfully");

      // Option 1: Remove the deleted item from state
      setInventory(inventory.filter((item) => item.id !== inventoryItem.id));

      onClose();
    } catch (error) {
      console.error("Error deleting inventory item:", error);
      // Refetch on error to ensure data consistency
      await fetchData();
    } finally {
      setIsSubmitting(false);
    }
  };

  const CloseButton = () => (
    <Button
      variant="ghost"
      size="icon"
      className="absolute right-4 top-4 text-gray-400 hover:text-white"
      onClick={onClose}
    >
      <X className="h-4 w-4" />
    </Button>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="no-scrollbar bg-[#0a0a14] text-white border border-[#5D43E1] max-h-[90vh] overflow-y-auto max-w-xl w-full rounded-xl p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">
            {mode === "add" ? "Add Stock" : "Edit Stock"}
          </DialogTitle>
        </DialogHeader>

        {/* Delete button only shown in edit mode */}
        {mode === "edit" && (
          <Button
            variant="destructive"
            className="absolute right-4 top-4 bg-red-600 hover:bg-red-700"
            onClick={handleDelete}
            disabled={isSubmitting}
          >
            Delete Stock
          </Button>
        )}

        <div className="grid gap-4 py-4">
          {/* Stock Name - Changed from Textarea to Input */}
          <div className="space-y-2">
            <label htmlFor="stock_name" className="text-sm text-gray-400">
              Stock Name
            </label>
            <Input
              id="stock_name"
              name="stock_name"
              placeholder="Enter stock name"
              value={formData.stock_name}
              onChange={handleInputChange}
              className="bg-gray-900 border-gray-700"
              disabled={isSubmitting}
            />
          </div>

          {/* Items - New Textarea field */}
          <div className="space-y-2">
            <label htmlFor="items" className="text-sm text-gray-400">
              Items
            </label>
            <Textarea
              id="items"
              name="items"
              placeholder="Enter items (e.g. bottle 1, bottle 2, bottle 3)"
              value={formData.items}
              onChange={handleInputChange}
              className="bg-gray-900 border-gray-700 min-h-[150px]"
              disabled={isSubmitting}
            />
          </div>

          {/* Delimiter */}
          <div className="space-y-2">
            <label htmlFor="delimiter" className="text-sm text-gray-400">
              Delimiter
            </label>
            <Select
              value={formData.delimiter}
              onValueChange={(value) => handleSelectChange("delimiter", value)}
              disabled={isSubmitting}
            >
              <SelectTrigger
                id="delimiter"
                className="bg-gray-900 border-gray-700"
              >
                <SelectValue placeholder="Delimiter" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700">
                <SelectItem value=",">Comma</SelectItem>
                <SelectItem value=";">Semi colon</SelectItem>
                <SelectItem value="|">New line</SelectItem>
              </SelectContent>
            </Select>
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
            onClick={handleSave}
            className="rounded-[12px] hover:bg-none hover:bg-white hover:text-black bg-[linear-gradient(90deg,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0)_22.94%,rgba(255,255,255,0)_72.33%,rgba(255,255,255,0.2)_100%),linear-gradient(119deg,#5D43E1_12.9%,#AB51DE_86.02%)]"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : mode === "add" ? "Add Stock" : "Save"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
