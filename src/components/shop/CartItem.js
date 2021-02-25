import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import Card from "../UI/Card";
import {IMAGE_URL} from "../../BaseUrl";

const CartItem = ({data, onDecrease, onIncrease, onDelete}) => {
  return (
    <Card style={styles.productMain}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: IMAGE_URL + data.type_id+'/'+data.web_pic1 }} />
      </View>
      <View style={styles.detailContainer}>
        <View style={{ overFlow: "hidden" }}>
          <Text style={styles.text}>
            {data.product_title_eng}
          </Text>
        </View>
        <Text style={styles.text}>৳{(data.quantity * data.sale_price).toFixed(2)}</Text>

        <View style={styles.action}>
          <TouchableOpacity onPress={onDecrease}>
            <Ionicons
              name={
                Platform.OS === "android"
                  ? "md-remove-circle"
                  : "ios-remove-circle"
              }
              size={28}
              color={Colors.primary}
            />
          </TouchableOpacity>

          <Text style={styles.quantity}>{data.quantity} </Text>
          <TouchableOpacity onPress={onIncrease}>
            <Ionicons
              name={
                Platform.OS === "android" ? "md-add-circle" : "ios-add-circle"
              }
              size={28}
              color={Colors.primary}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelete} style={styles.touchable}>
            <Ionicons
              name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
              size={30}
              color="red"
            />
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  productMain: {
    flex:1,
    height: 110,
    flexDirection: "row",
    justifyContent: "flex-start",
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    margin: 3,  
  
  },
  text: {
    color: "black",
    fontSize: 13,
    fontWeight: "bold",
    overflow: "hidden",
    width: "90%",
  },
  quantity: {
    fontFamily: "open-sans",
    color: "#888",
    fontSize: 18,
    marginHorizontal: 5,
    paddingHorizontal: 5,
  },
  imageContainer: {
    width: "35%",
    height: 110,
    padding: 3
  },
  image: {
    width: "100%",
    height: "95%",
    resizeMode: "contain",
    borderRadius: 5,
  },
  detailContainer: {
    justifyContent: "space-around",
    alignContent: "center",
    marginLeft: 20,
  },
  action: {
    flexDirection: "row",
    marginVertical: 5,
  },
  touchable: {
    flexDirection: "row",
    marginLeft: "30%",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
});

export default CartItem;
