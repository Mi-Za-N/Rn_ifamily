import React, { useState } from "react";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { AppProvider } from './src/contexts/app/app.provider';
import { CartProvider } from './src/contexts/cart/use-cart';
import ShopNavigator from "./src/navigation/ShopNavigator";
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
        <ShopNavigator />
        </CartProvider>
      </AppProvider>
  );
}

