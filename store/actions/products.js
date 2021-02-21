import axios from "axios";
export const PRODUCT_LIST_REQUEST = 'PRODUCT_LIST_REQUEST';
export const PRODUCT_LIST_SUCCESS = 'PRODUCT_LIST_SUCCESS';
export const PRODUCT_LIST_FAIL = 'PRODUCT_LIST_FAIL';


const listProducts = () => async (dispatch) => {
  try { 
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await axios.get("https://www.carryfresh.com.bd/api/getWebsiteInfo");
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data.allProductInfo });
    //  console.log(data)
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};

export { listProducts};