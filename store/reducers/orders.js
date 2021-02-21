import { ADD_ORDER, DELETE_ORDER } from "../actions/orders";
import Order from "../../models/oder";

const initialState = {
  orders: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      const newOrder = new Order(
        new Date().toString(),
        action.orderData.items,
        action.orderData.amount,
        new Date()
      );
      return {
        ...state,
        orders: state.orders.concat(newOrder),
      };
     case DELETE_ORDER:
      return {
        orders: state.orders.filter(
          order => order.id !== action.paylaod
        )
      }
  }
  return state;
};
