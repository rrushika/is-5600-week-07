// src/state/CartProvider.js
import React, { useReducer, createContext } from 'react';

// Initialize the context
const CartContext = createContext();

// Define the default state
const initialState = {
  itemsById: {},
  allItems: [],
};

// Define reducer actions
const ADD_ITEM = 'ADD_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';
const UPDATE_ITEM_QUANTITY = 'UPDATE_ITEM_QUANTITY';

// Define the reducer
const cartReducer = (state, action) => {
  const { payload } = action;

  console.log({ state });

  switch (action.type) {
    case ADD_ITEM:
      const newState = {
        ...state,
        itemsById: {
          ...state.itemsById,
          [payload._id]: {
            ...payload, // the product object
            quantity: state.itemsById[payload._id]
              ? state.itemsById[payload._id].quantity + 1
              : 1,
          },
        },
        // Use Set to remove duplicates
        allItems: Array.from(new Set([...state.allItems, payload._id])),
      };
      console.log({ newState });
      return newState;

    case REMOVE_ITEM:
      const updatedState = {
        ...state,
        itemsById: Object.entries(state.itemsById)
          .filter(([key]) => key !== payload._id)
          .reduce((obj, [key, value]) => {
            obj[key] = value;
            return obj;
          }, {}),
        allItems: state.allItems.filter(
          (itemId) => itemId !== payload._id
        ),
      };
      return updatedState;

    case UPDATE_ITEM_QUANTITY:
      const currentItem = state.itemsById[payload._id];
      const updatedItemState = {
        ...state,
        itemsById: {
          ...state.itemsById,
          [payload._id]: {
            ...currentItem,
            quantity: currentItem.quantity + payload.quantity, // +1 or -1
          },
        },
      };
      return updatedItemState;

    default:
      return state;
  }
};

// Define the provider
const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Remove an item from the cart
  const removeFromCart = (product) => {
    dispatch({ type: REMOVE_ITEM, payload: product });
  };

  // Add an item to the cart
  const addToCart = (product) => {
    dispatch({ type: ADD_ITEM, payload: product });
  };

  // Update the quantity of an item in the cart
  const updateItemQuantity = (product, quantity) => {
    dispatch({ type: UPDATE_ITEM_QUANTITY, payload: { _id: product._id, quantity } });
  };

  // Get the total price of all items in the cart
  const getCartTotal = () => {
    return getCartItems().reduce((acc, item) => acc + (item.price * item.quantity || 0), 0);
  };

  // Get all items currently in the cart
  const getCartItems = () => {
    return state.allItems.map((itemId) => state.itemsById[itemId]) ?? [];
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: getCartItems(),
        allItems: state.allItems,
        addToCart,
        updateItemQuantity,
        removeFromCart,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, CartContext };