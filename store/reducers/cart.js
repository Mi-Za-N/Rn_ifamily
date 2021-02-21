import {
  ADD_TO_CART,
  INCREASE_CART_ITEM,
  DECREASE_CART_ITEM,
  REMOVE_FROM_CART,
} from "../actions/cart";

import CartItem from "../../models/cart-item";
import { ADD_ORDER } from "../actions/orders";

// import { REHYDRATE } from 'redux-persist/constants';

const initialState = {
  items: {},
  totalAmount: 0.00,
};

export default (state = initialState, action) => {
  switch (action.type) {
    // case REHYDRATE:
    //   return action.payload.cart || [];
    
    case ADD_TO_CART:
      const addedProduct = action.payload;
      const prodPrice = addedProduct.sale_price;
      const prodTitle = addedProduct.product_title_eng;
      const prodImage = addedProduct.web_pic1;

      // add only one product to cart
      if (!state.items[addedProduct.product_id]) {
        const newCartItem = new CartItem(
          1,
          prodPrice,
          prodTitle,
          prodImage,
          prodPrice
        );
        return {
          ...state,
          items: { ...state.items, [addedProduct.product_id]: newCartItem },
          totalAmount: state.totalAmount + prodPrice,
        };
      }

    case INCREASE_CART_ITEM:
      const increaseCartItem = state.items[action.payload];
      const increseQty = increaseCartItem.quantity;
      let updatedQty;
      if (increseQty > 0) {
        // need to increase
        const updatedCartItem = new CartItem(
          increaseCartItem.quantity + 1,
          increaseCartItem.productPrice,
          increaseCartItem.productTitle,
          increaseCartItem.productImage,
          increaseCartItem.sum + increaseCartItem.productPrice
        );
        updatedQty = {
          ...state.items,
          [action.payload]: updatedCartItem,
        };
      } else {
        updatedCartItems = { ...state.items };
        updatedCartItems[action.payload];
      }
      return {
        ...state,
        items: updatedQty,
        totalAmount: state.totalAmount + increaseCartItem.productPrice,
      };
    //         // add to cart (single item=else block) & increase cart item
    // let updatedOrNewCartItem;

    // if (state.items[addedProduct.id]) {
    //   // already have the item in the cart
    //   updatedOrNewCartItem = new CartItem(
    //     state.items[addedProduct.id].quantity + 1,
    //     prodPrice,
    //     prodTitle,
    //     state.items[addedProduct.id].sum + prodPrice
    //   );
    // } else {
    //   // new item add
    //   updatedOrNewCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice);
    // }
    // return {
    //   ...state,
    //   items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
    //   totalAmount: state.totalAmount + prodPrice,
    // };
    case DECREASE_CART_ITEM:
      const selectedCartItem = state.items[action.payload];
      const currentQty = selectedCartItem.quantity;
      let updatedCartItems;
      if (currentQty > 1) {
        // need to reduce it, not erase it
        const updatedCartItem = new CartItem(
          selectedCartItem.quantity - 1,
          selectedCartItem.productPrice,
          selectedCartItem.productTitle,
          selectedCartItem.productImage,

          selectedCartItem.sum - selectedCartItem.productPrice
        );
        updatedCartItems = {
          ...state.items,
          [action.payload]: updatedCartItem,
        };
      } else {
        updatedCartItems = { ...state.items };
        delete updatedCartItems[action.payload];
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedCartItem.productPrice,
      };

    case ADD_ORDER:
      return initialState;
    case REMOVE_FROM_CART:
      if (!state.items[action.payload]) {
        return state;
      }
      const updatedItems = { ...state.items };
      const itemTotal = state.items[action.payload].sum;
      delete updatedItems[action.payload];
      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount - itemTotal,
      };
  }

 
  return state;
};

// extra code

// if (state.items[addedProduct.id]) {
//   // already have the item in the cart
//   const updatedCartItem = new CartItem(
//     state.items[addedProduct.id].quantity + 1,
//     prodPrice,
//     prodTitle,
//     state.items[addedProduct.id].sum + prodPrice
//   );
//   return {
//     ...state,
//     items: { ...state.items, [addedProduct.id]: updatedCartItem },
//     totalAmount: state.totalAmount + prodPrice,
//   };
// } else {
//   const newCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice);
//   return {
//     ...state,
//     items: { ...state.items, [addedProduct.id]: newCartItem },
//     totalAmount: state.totalAmount + prodPrice,
//   };
// }

// let updatedOrNewCartItem;

// if (state.items[addedProduct.id]) {
//   // already have the item in the cart
//   updatedOrNewCartItem = new CartItem(
//     state.items[addedProduct.id].quantity + 1,
//     prodPrice,
//     prodTitle,
//     prodImage,
//     state.items[addedProduct.id].sum + prodPrice
//   );
// } else {
//   // new item add
//   updatedOrNewCartItem = new CartItem(
//     1,
//     prodPrice,
//     prodTitle,
//     prodImage,
//     prodPrice
//   );
// }
// return {
//   ...state,
//   items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
//   totalAmount: state.totalAmount + prodPrice,
// };
