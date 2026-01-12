import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  const url = "http://localhost:4000";

  // ✅ NEW: Clear cart function
  const clearCart = () => {
    setCartItems({});
    localStorage.removeItem("cartItems");
    
    // If user is logged in, also clear cart from backend
    if (token) {
      axios.post(
        `${url}/api/cart/clear`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ).catch(error => {
        console.error("Failed to clear cart on backend:", error);
      });
    }
  };

  // Fetch food list
  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${url}/api/cookies/list`);
      setFoodList(response.data.data || []);
    } catch (error) {
      console.error("Failed to fetch food list:", error);
    }
  };

  // Add to cart - with quantity parameter support (default 1)
  const addToCart = async (itemId, quantity = 1) => {
    if (!itemId) return;

    // Optimistic update
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + quantity,
    }));

    if (token) {
      try {
        await axios.post(
          `${url}/api/cart/add`,
          { itemId, quantity },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.error("Add to cart failed:", error?.response?.data || error);
        // Rollback optimistic update on failure
        setCartItems((prev) => {
          const updated = { ...prev };
          updated[itemId] = Math.max(0, (updated[itemId] || 0) - quantity);
          if (updated[itemId] === 0) delete updated[itemId];
          return updated;
        });
      }
    }
  };

  // Remove from cart (decrease by 1)
  const removeFromCart = async (itemId) => {
    if (!itemId) return;

    // Optimistic update
    setCartItems((prev) => {
      const updated = { ...prev };
      if (!updated[itemId]) return prev;
      if (updated[itemId] <= 1) {
        delete updated[itemId];
      } else {
        updated[itemId] -= 1;
      }
      return updated;
    });

    if (token) {
      try {
        await axios.post(
          `${url}/api/cart/remove`,
          { itemId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.error("Remove from cart failed:", error?.response?.data || error);
        // Optional: simple rollback (add 1 back)
        setCartItems((prev) => ({
          ...prev,
          [itemId]: (prev[itemId] || 0) + 1,
        }));
      }
    }
  };

  const getQuantity = (itemId) => {
    return cartItems[itemId] || 0;
  };

  const getTotalAmount = () => {
    let total = 0;
    for (const id in cartItems) {
      const item = food_list.find((food) => food._id === id);
      if (item) {
        total += item.price * cartItems[id];
      }
    }
    return total;
  };

  // Get total cart items count
  const getTotalCartItems = () => {
    return Object.values(cartItems).reduce((total, quantity) => total + quantity, 0);
  };

  // Initial data loading
  useEffect(() => {
    async function loadData() {
      await fetchFoodList();

      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        setToken(savedToken);

        try {
          const response = await axios.post(
            `${url}/api/cart/get`,
            {},
            {
              headers: {
                Authorization: `Bearer ${savedToken}`,
              },
            }
          );

          if (response.data.success) {
            setCartItems(response.data.cartData || {});
          } else {
            localStorage.removeItem("token");
            setToken("");
          }
        } catch (error) {
          console.error("Failed to load cart:", error?.response?.data || error);
          if (error.response?.status === 401 || error.response?.status === 403) {
            localStorage.removeItem("token");
            setToken("");
          }
        }
      }
    }

    loadData();
  }, []);

  // Optional: logout helper
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

  const contextValue = {
    food_list,
    cartItems,
    addToCart,
    removeFromCart,
    getQuantity,
    getTotalAmount,
    getTotalCartItems, // ✅ Added
    clearCart,        // ✅ Added - clear cart after successful payment
    url,
    token,
    setToken,
    logout,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;