import React, {useState} from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Platform, SafeAreaView,Text, ScrollView,StyleSheet, TouchableOpacity,Image, Button, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppDispatch } from "../contexts/app/app.provider";

import ProductsOverviewScreen, {
  screenOptions as productsOverviewScreenOptions,
} from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen, {
  screenOptions as productDetailScreenOptions,
} from "../screens/shop/ProductDetailScreen";
import AuthScreen, {
  screenOptions as AuthScreenOptions,
} from "../screens/shop/AuthScreen";
import ConfirmScreen, {
  screenOptions as ConfirmScreenOptions,
} from "../screens/shop/ConfirmScreen";
import OrdersScreen, {
  screenOptions as ordersScreenOptions,
} from "../screens/shop/OrdersScreen";
import CategoryProdScreen, {
  screenOptions as CategoryProdScreenOptions,
} from "../screens/shop/CategoryProdScreen";
import InputOtpScreen, { 
  screenOptions as InputOtpScreenOptions,
} from "../screens/shop/InputOtpScreen";
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      {/* <ProductsStackNavigator.Screen
        name="auth"
        component={AuthScreen}
        options={AuthScreenOptions}
      /> */}
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
      <ProductsStackNavigator.Screen
        name="otp"
        component={InputOtpScreen}
        options={InputOtpScreenOptions}
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
export const AuthNavigator = () => {
  return (
    <OrdersStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <OrdersStackNavigator.Screen
        name="Auth"
        component={AuthScreen}
        options={AuthScreenOptions}
      />
    </OrdersStackNavigator.Navigator>
  );
};



const ShopDrawerNavigator = createDrawerNavigator();

export const ShopNavigator = (props) => {
  const dispatch = useAppDispatch();
  const isLogin = useAppState("isLogin");

  const handleLogOut = async () => {
    dispatch({ type: 'IS_LOGIN', payload: false });
        try {
            await AsyncStorage.removeItem("user");
        } catch(e) {
            console.log(e);
        }
   }
   
   

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
                          dispatch({ type: 'SAME_TYPE_PRODUCT_INFO', payload: category.type_id });
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
                              fontSize: 16,
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
                  {isLogin === true  &&(
                    <Button title="Logout" color={Colors.primary}
                      onPress={handleLogOut}
                     />
                  )}
                  
              </SafeAreaView>
            </View>
          );
        }}
        drawerContentOptions={{
          activeTintColor: Colors.primary,
        }}
      >
        <ShopDrawerNavigator.Screen
          name="Ifamily Mart"
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
        {isLogin === true && (
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
        )}
        {isLogin === false && (
            <ShopDrawerNavigator.Screen
              name="Login"
              component={AuthNavigator}
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
        )}
        
      </ShopDrawerNavigator.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  categoriesListContainer: {
    paddingHorizontal: 6,
  },
  categoryBtn: {
    height: 26,
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
 