import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Button,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Colors from "../../constants/Colors";
import * as ordersActions from "../../store/actions/orders";
import Card from '../../components/UI/Card'

const ContactScreen = (props) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  const [isLoading, setIsLoading] = useState(false);
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
  const dispatch = useDispatch();

  const sendOrderHandler = async () => {
    setIsLoading(true);
    await dispatch(ordersActions.addOrder(cartItems, cartTotalAmount));
    setIsLoading(false);
    props.navigation.navigate("ProductsOverview");
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.title}>
          <Text style={styles.titleText}>Enter Your Contact Data</Text>
        </View>
        <View style={styles.formControl}>
          <TextInput
            style={styles.input}
            placeholder="Your Name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>
        <View style={styles.formControl}>
          <TextInput
            style={styles.input}
            placeholder="Address"
            value={address}
            onChangeText={(text) => setAddress(text)}
          />
        </View>
        <View style={styles.formControl}>
          <TextInput
            style={styles.input}
            placeholder="Contact Number"
            value={contactNumber}
            onChangeText={(text) => setContactNumber(text)}
          />
        </View>
      </View>
      <View style={styles.actions}>
        {isLoading ? (
          <ActivityIndicator size="small" color={Colors.primary} />
        ) : (
          <TouchableOpacity onPress={sendOrderHandler}>
              <Card style={styles.Container}>
                <Text style={styles.placeOrder}>Place Order</Text>
              </Card>
          </TouchableOpacity>
          // <Button
          //   color={Colors.accent}
          //   title="Order Now"
          //   disabled={cartItems.length === 0}
          //   onPress={sendOrderHandler}
          // />
        )}
      </View>
    </ScrollView>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "Contact Data",
  };
};

const styles = StyleSheet.create({
  title: {
    margin: 15,
    padding: 3,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#ddd",
    borderWidth: 0.3,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  form: {
    // flex: 1,
    marginTop: 70,
    marginHorizontal: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
  },
  formControl: {
    width: "100%",
    padding: 4,
    margin: 2,
  },

  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  actions: {
    padding: 20,
    // flexDirection: "row",
    // justifyContent: "space-between",
    // alignItems: "center",
    // height: "23%",
    // paddingHorizontal: 20,
  },
  Container: { 
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary,
    paddingHorizontal: 30,
    paddingVertical: 5,
    marginHorizontal: 10,
    marginBottom:5
  },
  placeOrder: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
  },
});

export default ContactScreen;
