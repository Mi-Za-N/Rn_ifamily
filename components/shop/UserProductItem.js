import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import { useSelector } from "react-redux";
import Card from "../UI/Card";

const UserProductItem = (props) => {
  const cartItem = useSelector((state) => state.cart.items);

  let quantity = 0;
  for (const key in cartItem) {
    key;
    if (key === props.id) {
      quantity = cartItem[key].quantity;
    }
  }

  let TouchableComp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableComp = TouchableNativeFeedback;
  }

  return (
    <Card style={styles.product}>
      <View style={styles.touchable}>
        <TouchableComp useForeGround>
          <View>
            <View onPress={props.onSelect} style={styles.imageContainer}>
              <TouchableNativeFeedback onPress={props.onSelect}>
                <Image source={{ uri: props.image }} style={styles.image} />
              </TouchableNativeFeedback>
            </View>
            <View style={styles.details}>
              <Text onPress={props.onSelect} style={styles.title}>
                {props.title}
              </Text>
              <Text style={styles.price}>${props.price.toFixed(2)}</Text>
            </View>

            <View style={styles.action}>{props.children}</View>
          </View>
        </TouchableComp>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  product: {
    height: 300,
    margin: 20,
  },
  touchable: {
    overflow: "hidden",
    borderRadius: 10,
  },
  details: {
    alignItems: "center",
    height: "15%",
    padding: 10,
  },
  imageContainer: {
    width: "100%",
    height: "60%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
    marginBottom: 4,
  },
  price: {
    fontFamily: "open-sans",
    fontSize: 14,
    color: "#888",
  },
  action: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "25%",
    paddingHorizontal: 15,
  },
  quantity: {
    fontFamily: "open-sans",
    color: "#888",
    fontSize: 18,
    marginHorizontal: 5,
    paddingHorizontal: 5,
  },
});

export default UserProductItem;
