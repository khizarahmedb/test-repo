"use client";
import { createContext, useContext, useEffect, useState } from "react";
import {
  getAllCoupons,
  getAllInventories,
  getAllInvoices,
  getAllProducts,
  getAllTickets,
} from "@/utils/axiosInstance";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [tickets, setTickets] = useState([]);

  // Load initial state from localStorage
  const loadFromLocalStorage = (key, defaultValue = null) => {
    if (typeof window !== "undefined") {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : defaultValue;
    }
    return defaultValue;
  };

  const [user, setUser] = useState(() => loadFromLocalStorage("user"));

  const fetchData = async () => {
    try {
      const inventory = await getAllInventories(user.token);
      const products = await getAllProducts(user.token);
      const coupons = await getAllCoupons(user.token);
      const tickets = await getAllTickets(user.token);
      const invoices = await getAllInvoices(user.token);
      setInventory(inventory.body);
      setProducts(products.products);
      setCoupons(coupons.body);
      setTickets(tickets.body);
      setInvoices(invoices.invoices);
    } catch (error) {
      console.error("Error fetching inventories:", error);
    }
  };

  // Save to localStorage when state changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      // setLoggedIn(true);
      fetchData();

      console.log(user);
    } else {
      localStorage.removeItem("user");
      // setLoggedIn(false);
    }
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        products,
        setProducts,
        coupons,
        setCoupons,
        invoices,
        setInvoices,
        inventory,
        setInventory,
        tickets,
        setTickets,
        fetchData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
