import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors  from '../../constants/Colors';
import Card from "../../components/UI/Card";
import { useCart } from '../../contexts/cart/use-cart';

const CartButtonScreen = (props) => {
const { cartItemsCount, calculatePrice } = useCart();
 
  return (
     <TouchableOpacity 
         onPress={props.onPress}>
      <Card style={styles.Container}>
        <View>
          <Text style={styles.cartItems}>Items: {cartItemsCount}</Text>
        </View>
        <Text style={styles.placeOrder}>{props.children}</Text>
        <View>
         <Text style={styles.amount}>
            ৳{calculatePrice()}
          </Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    Container: { 
     flexDirection: "row",
     justifyContent: "space-between",
     alignItems: "center",
     backgroundColor: Colors.primary,
     paddingHorizontal: 10,
     paddingVertical: 5,
    },
  cartItems: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
  },
  amount: {
    fontSize: 15,
    fontWeight: "bold",
    color: Colors.primary,
    padding: 5,
    backgroundColor: Colors.white,
    fontSize: 14,
    borderRadius: 10
  },
  placeOrder: {
   paddingHorizontal:15,
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
  },
});

export default CartButtonScreen;