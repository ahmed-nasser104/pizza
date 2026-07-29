import { create } from "zustand";

export const useCartStore = create((set, get) => ({
  cart: [],

  // Add Product
  addToCart: (product) => {
    const cart = get().cart;

    const exist = cart.find((item) => item.id === product.id);

    if (exist) {
      set({
        cart: cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      });
    } else {
      set({
        cart: [...cart, { ...product, quantity: 1 }],
      });
    }
  },

  // Remove Product
  removeFromCart: (id) => {
    set({
      cart: get().cart.filter((item) => item.id !== id),
    });
  },

  // Increase Quantity
  increaseQuantity: (id) => {
    set({
      cart: get().cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    });
  },

  // Decrease Quantity
  decreaseQuantity: (id) => {
    set({
      cart: get()
        .cart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    });
  },

  // Clear Cart
  clearCart: () => set({ cart: [] }),

  // Total Price
  totalPrice: () =>
    get().cart.reduce((total, item) => total + item.price * item.quantity, 0),

  // Total Items
  totalQuantity: () =>
    get().cart.reduce((total, item) => total + item.quantity, 0),

  // Check Exists
  isInCart: (id) => get().cart.some((item) => item.id === id),
}));

export const useCartModalStore = create((set) => ({
  isOpen: false,

  openCart: () =>
    set({
      isOpen: true,
    }),

  closeCart: () =>
    set({
      isOpen: false,
    }),

  toggleCart: () =>
    set((state) => ({
      isOpen: !state.isOpen,
    })),
}));

export const useMood = create((set) => ({
  isDark: false,
  toggleMood: () => {
    set((state) => ({
      isDark: !state.isDark,
    }));
  },
}));
