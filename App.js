import React, { useState } from "react";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { AppProvider } from './contexts/app/app.provider';
import { CartProvider } from './contexts/cart/use-cart';
import ShopNavigator from "./navigation/ShopNavigator";
// import { StatusBar } from 'expo-status-bar';
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
      <AppProvider>
        <CartProvider>
        {/* <StatusBar style="auto" /> */}
        <ShopNavigator />
        </CartProvider>
      </AppProvider>
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
