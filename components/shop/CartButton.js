import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors  from '../../constants/Colors';
import Card from "../../components/UI/Card"

const CartButtonScreen = (props) => {
    const cartTotalAmount = useSelector((state) => state.cart.totalAmount);

    const cartItems = useSelector((state) => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });

  return (
     <TouchableOpacity 
         onPress={props.onPress}>
      <Card style={styles.Container}>
        <View>
          <Text style={styles.cartItems}>Items: {cartItems.length}</Text>
        </View>
        <Text style={styles.placeOrder}>Order Now</Text>
        <View>
         <Text style={styles.amount}>
            ৳{Math.round(cartTotalAmount)}
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
     paddingHorizontal: 30,
     paddingVertical: 5,
     marginHorizontal: 10,
     marginBottom:5
    },
  cartItems: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.primary,
    padding: 5,
    backgroundColor: Colors.white,
    fontSize: 14,
    borderRadius: 10
  },
  placeOrder: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
  },
});

export default CartButtonScreen;