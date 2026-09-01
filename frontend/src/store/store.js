import { create } from "zustand";

export const useCartStore = create((set, get) => ({
  cart: [],

  // Add Product
  addToCart: (product) => {
    const cart = get().cart;

    const exist = cart.find((item) => item.product?._id === product._id);

    if (exist) {
      set({
        cart: cart.map((item) =>
          item.product?._id === product._id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        ),
      });
    } else {
      set({
        cart: [
          ...cart,
          {
            product: product,
            quantity: 1,
          },
        ],
      });
    }
  },

  setCart: (newCart) => set({ cart: newCart ?? [] }),
  // Remove Product
  // Remove Product
  removeFromCart: (productId) => {
    set({
      cart: get().cart.filter((item) => item.product?._id !== productId),
    });
  },

  // Increase Quantity
  increaseQuantity: (productId) => {
    set({
      cart: get().cart.map((item) =>
        item.product?._id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    });
  },

  // Decrease Quantity
  decreaseQuantity: (productId) => {
    set({
      cart: get().cart.map((item) =>
        item.product?._id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    });
  },

  totalPrice: () =>
    (get().cart || [])
      .filter((item) => item.product)
      .reduce((total, item) => total + item.product.price * item.quantity, 0),

  totalQuantity: () =>
    (get().cart || [])
      .filter((item) => item.product)
      .reduce((total, item) => total + item.quantity, 0),

  // Check Exists
  isInCart: (productId) =>
    get().cart.some((item) => item.product?._id === productId),
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
