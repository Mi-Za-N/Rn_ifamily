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
import { useCart } from '../../contexts/cart/use-cart';
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import Card from "../UI/Card";

const ProductItem = (props) => {
  // console.log(props);
  const { addItem, removeItem, getItem, isInCart } = useCart();
  

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
              <Text numberOfLines={1} style={styles.title}>
                {props.title}
              </Text>
            </View>

            <View style={styles.action}>
              <Text style={styles.price}>৳{props.price}</Text>
              {!isInCart(props.id) ? (
                <TouchableOpacity onPress={() => {
                     addItem(props.product)}}>
                  <Ionicons
                      name={
                        Platform.OS === "android"
                          ? "md-cart"
                          : "md-cart"
                      }
                      size={29}
                      color={Colors.primary}
                    />
                </TouchableOpacity>
              ) : (
                <View style={styles.background}>
                    <TouchableOpacity onPress={() => { 
                      removeItem(props.product);
                     }}>
                    <Ionicons
                      name={Platform.OS === "android"
                          ? "md-remove-circle"
                          : "ios-remove-circle"}
                      size={30}
                      color={Colors.white}
                    />
                  </TouchableOpacity>
                  <Text style={styles.quantity}> {getItem(props.id).quantity} </Text>
                  <TouchableOpacity onPress={() => {
                       addItem(props.product);
                     }}>
                    <Ionicons
                      name={
                        Platform.OS === "android"
                          ? "md-add-circle"
                          : "ios-add-circle"
                      }
                      size={30}
                      color={Colors.white}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </TouchableComp>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  product: {
    height: 180,
    width: 170,
    margin: 5,
  },
  touchable: {
    overflow: "hidden",
    // borderRadius: 10,
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
    resizeMode: "center",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 14,
    marginBottom: 4,
  },
  price: {
    fontFamily: "open-sans",
    fontWeight: "bold",
    fontSize: 14,
    color: Colors.primary
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
    color: Colors.white, 
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 1,
  },
  background: {
    flexDirection: "row",
    backgroundColor: Colors.primary,
    paddingHorizontal: 3,
    borderRadius: 10,
  },
});

export default ProductItem;
