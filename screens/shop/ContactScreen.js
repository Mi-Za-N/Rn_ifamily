import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Button,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Colors from "../../constants/Colors";
import { addOrder } from "../../store/actions/orders";
// import * as contactActions from "../../store/actions/cart";

const ContactScreen = (props) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [street, setStreet] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  // const contactData = useSelector((state) => state.cart.contactData);
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

  // const submitHandler = useCallback(() => {
  //   dispatch(
  //     contactActions.contactData(name, address, street, contactNumber, email)
  //   );
  // }, []);

  // const sendOrderHandler = async () => {
  //   setIsLoading(true);
  //   await dispatch(ordersActions.addOrder(cartItems, cartTotalAmount));
  //   setIsLoading(false);
  // };

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
            keyboardType="default"
            returnKeyType="next"
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>
        <View style={styles.formControl}>
          <TextInput
            style={styles.input}
            keyboardType="default"
            returnKeyType="next"
            placeholder="Address"
            value={address}
            onChangeText={(text) => setAddress(text)}
          />
        </View>
        <View style={styles.formControl}>
          <TextInput
            style={styles.input}
            placeholder="Street"
            keyboardType="default"
            returnKeyType="next"
            value={street}
            onChangeText={(text) => setStreet(text)}
          />
        </View>
        <View style={styles.formControl}>
          <TextInput
            style={styles.input}
            placeholder="Contact Number"
            value={contactNumber}
            keyboardType="decimal-pad"
            returnKeyType="next"
            onChangeText={(text) => setContactNumber(text)}
          />
        </View>
      </View>
      <View style={styles.actions}>
        <Button
          color={Colors.primary}
          title="Back to Cart"
          onPress={() => {
            props.navigation.navigate("Cart");
          }}
        />
        {isLoading ? (
          <ActivityIndicator size="small" color={Colors.primary} />
        ) : (
          <Button
            color={Colors.accent}
            title="Place Order"
            onPress={() => {
              dispatch(addOrder(cartItems, cartTotalAmount));
              props.navigation.navigate("ProductsOverview");
            }}
          />
        )}
      </View>
      <Button title="press" 
            onPress={() => { props.navigation.navigate("CatPod")}} />
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "23%",
    paddingHorizontal: 20,
  },
});

export default ContactScreen;
