export const ADD_TO_CART = "ADD_TO_CART";
export const INCREASE_CART_ITEM = "INCREASE_CART_ITEM";
export const DECREASE_CART_ITEM = "DECREASE_CART_ITEM";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";

export const addToCart = (product) => {
  return { type: ADD_TO_CART, payload: product };
};

export const increase = (productId) => {
  return { type: INCREASE_CART_ITEM, payload: productId };
};

export const decrease = (productId) => {
  return { type: DECREASE_CART_ITEM, payload: productId };
};

export const removeFromCart = (productId) => {
  return { type: REMOVE_FROM_CART, payload: productId };
};
