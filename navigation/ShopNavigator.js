import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Platform, SafeAreaView,Text, ScrollView,StyleSheet, TouchableOpacity,Image, Button, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import ProductsOverviewScreen, {
  screenOptions as productsOverviewScreenOptions,
} from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen, {
  screenOptions as productDetailScreenOptions,
} from "../screens/shop/ProductDetailScreen";
import ShippingScreen, {
  screenOptions as ShippingScreenOptions,
} from "../screens/shop/ShippingScreen";
import ConfirmScreen, {
  screenOptions as ConfirmScreenOptions,
} from "../screens/shop/ConfirmScreen";
import OrdersScreen, {
  screenOptions as ordersScreenOptions,
} from "../screens/shop/OrdersScreen";
import CategoryProdScreen, {
  screenOptions as CategoryProdScreenOptions,
} from "../screens/shop/CategoryProdScreen";
import {IMAGE_URL} from "../BaseUrl";

import Colors from "../constants/Colors";
import { useAppState } from "../contexts/app/app.provider";




const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};


const ProductsStackNavigator = createStackNavigator();

export const ProductsNavigator = () => {
  return (
    <ProductsStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <ProductsStackNavigator.Screen
        name="ProductsOverview"
        component={ProductsOverviewScreen}
        options={productsOverviewScreenOptions}
      />
      <ProductsStackNavigator.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={productDetailScreenOptions}
      />
      <ProductsStackNavigator.Screen
        name="Cart"
        component={ShippingScreen}
        options={ShippingScreenOptions}
      />
      <ProductsStackNavigator.Screen
        name="Confirm"
        component={ConfirmScreen}
        options={ConfirmScreenOptions}
      />
      <ProductsStackNavigator.Screen
        name="CatPod"
        component={CategoryProdScreen}
        options={CategoryProdScreenOptions}
      />
      
    </ProductsStackNavigator.Navigator>
  );
};
const OrdersStackNavigator = createStackNavigator();

export const OrdersNavigator = () => {
  return (
    <OrdersStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <OrdersStackNavigator.Screen
        name="Orders"
        component={OrdersScreen}
        options={ordersScreenOptions}
      />
    </OrdersStackNavigator.Navigator>
  );
};



const ShopDrawerNavigator = createDrawerNavigator();

export const ShopNavigator = () => {
const categories = useAppState("sidebarData");
  return (
    <NavigationContainer>
      <ShopDrawerNavigator.Navigator
        drawerContent={(props) => {
          return (
            <View style={{ flex: 1, paddingTop: 20 }}>
              <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
                <DrawerItemList {...props} />

                  <ScrollView
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoriesListContainer}>
                    {categories.map((category) => (
                      <TouchableOpacity
                        key={category.type_id}
                        activeOpacity={0.8}
                        onPress={() => {
                          props.navigation.navigate("CatPod", {
                            id: category.type_id,
                            title: category.product_type,
                            subMenu: category.sub_menu
                          });
                        }}
                        >
                        <View
                          style={{
                            // backgroundColor:
                            //   selectedCategoryIndex == index
                            //     ? COLORS.primary
                            //     : COLORS.primary,
                            ...styles.categoryBtn,
                          }}>
                          <View style={styles.categoryBtnImgCon}>
                            <Image
                              source={{uri: IMAGE_URL + "banner/" + category.type_icon}}
                              style={styles.image}
                            />
                          </View>
                          <Text
                            style={{
                              fontSize: 18,
                              fontWeight: 'bold',
                              marginHorizontal: 5,
                              color: Colors.primary ,
                            }}>
                            {category.product_type}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
              </SafeAreaView>
            </View>
          );
        }}
        drawerContentOptions={{
          activeTintColor: Colors.primary,
        }}
      >
        <ShopDrawerNavigator.Screen
          name="Products"
          component={ProductsNavigator}
          options={{
            drawerIcon: (props) => (
              <Ionicons
                name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
                size={23}
                color={props.color}
              />
            ),
          }}
        />
        <ShopDrawerNavigator.Screen
          name="Orders"
          component={OrdersNavigator}
          options={{
            drawerIcon: (props) => (
              <Ionicons
                name={Platform.OS === "android" ? "md-list" : "ios-list"}
                size={23}
                color={props.color}
              />
            ),
          }}
        />
      </ShopDrawerNavigator.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  categoriesListContainer: {
    paddingHorizontal: 6,
  },
  categoryBtn: {
    height: 30,
    width: "100%",
    marginBottom: 7,
    borderRadius: 30,
    alignItems: 'center',
    paddingHorizontal: 2,
    flexDirection: 'row',
  },
  image: {
   height: 20,
   width: 20, 
   resizeMode: 'cover'
  },
  categoryBtnImgCon: {
    height: 30,
    width: 30,
    backgroundColor: Colors.white,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ShopNavigator;
 