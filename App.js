import React, { useState } from "react";
import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { productListReducer } from "./store/reducers/products";
import cartReducer from "./store/reducers/cart";
import ordersReducer from "./store/reducers/orders";
import Data from "./store/reducers/Data";
import ShopNavigator from "./navigation/ShopNavigator";
import { list } from './loadMore/reducers/list';

const initialState = {};
const reducer = combineReducers({
  productList: productListReducer,
  cart: cartReducer,
  orders: ordersReducer,
  Data: Data,
  list
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoded(true);
        }}
      />
    );
  }

  return (
    <Provider store={store}>
       <ShopNavigator />
    </Provider>
  );
}


// import React from 'react';
// import List from './loadMore/List';
// import { list } from './loadMore/reducers/list';
// import { createStore,combineReducers } from 'redux';
// import { Provider } from 'react-redux';
// import { StatusBar } from 'expo-status-bar';
// import { SafeAreaView } from 'react-native';

// export default function App () {

//   const rootReducer = combineReducers({
//     list
//   });

//   const store = createStore(rootReducer);

//   return (
//     <Provider store={store}>
//       <StatusBar style="auto" />
//       <SafeAreaView style={{ flex: 1 }}>
//         <List />
//       </SafeAreaView>
//     </Provider>
//   );
// }
