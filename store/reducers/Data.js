import {
  SAVE_PRODUCT,
  SAVE_CATEGORY,
  SAVE_ORDER,
  SEARCH_PRODUCT,
  CLICKED_PRODUCT,
  SUBTYPE_PRODUCT_INFO,
  IS_UPDATED,
  IS_OPEN,
  IS_LOGIN
} from "../actions/Data";

const initialState = {
  saveProduct: [],
  saveCategory: [],
  saveOrder: [],
  productInfo: [],
  statusUpdate: '0',
  isSidebarOpen: "0",
  isLogin: false,
  items: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SAVE_PRODUCT:
      return {
        ...state,
        saveProduct: action.payload,
        productInfo: action.payload,
        statusUpdate: '1',
      };
      case "UPDATE_LIST_RESULTS":
      const nState = Object.assign({}, state, {
         ...state,
         saveProduct: action.payload,
         productInfo: action.payload,
        items: action.items
      });
      return nState;
      case SAVE_CATEGORY:
      return {
        ...state,
        saveCategory: action.payload,
      };
      case SAVE_ORDER:
        //  console.log(action.payload);
      return {
        ...state,
        saveOrder: action.payload,
      };
    case CLICKED_PRODUCT:
      return {
        ...state,
        saveProduct: action.payload,
        productInfo: action.payload,
        statusUpdate: '1',
      };
      case SUBTYPE_PRODUCT_INFO:
      return {
        ...state,
        saveProduct: action.payload,
        productInfo: state.saveProduct.filter(p => p.subtype_id === action.payload),
      };
    case SEARCH_PRODUCT:
      return {
        ...state,
        saveProduct: action.payload,
        productInfo: state.saveProduct.filter(pP => pP.product_title_eng.toLowerCase().includes(action.payload.toLowerCase())),
        statusUpdate: '1',
      };
    case IS_UPDATED:
      // console.log(action.payload)
      return {
        ...state,
        statusUpdate: action.payload,
      };
    case IS_OPEN:
      //  console.log(action.payload)
      return {
        ...state,
        isSidebarOpen: action.payload,
      };
    case IS_LOGIN:
      return {
        ...state,
        isLogin: action.payload,
      };
  }
  return state;
}