import React from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  Button,
  StyleSheet,
} from "react-native";
import { IMAGE_URL} from "../../BaseUrl";
import Colors from "../../constants/Colors";
import { useCart } from '../../contexts/cart/use-cart';

const ProductDetailScreen = (props) => {
  const { addItem, removeItem, getItem, isInCart } = useCart();
  const product= props.route.params.item;

 

  return (
    <ScrollView>
      <View style={styles.imageContainer}>
        <Image style={styles.image} 
        source={{ uri: IMAGE_URL + product.type_id+'/'+ product.app_pic1 }} />
      </View>
      <View style={styles.details}>
        
        <Text style={styles.price}>Price: ৳{product.sale_price}</Text>
        {/* <Text style={styles.description}>{product.description}</Text> */}
        <View style={styles.actions}>
          <Button
             buttonStyle={{
                backgroundColor: "white",
                borderRadius: 60,
                flex: 1,
                height: 30,
                width: 30,  
            }}
             titleStyle={{
              color: "white",
              fontSize: 16,
          }}
            // disabled={quantity > 0}
            color={Colors.primary}
            title="Add to Cart"
            onPress={() => {
              addItem(product)
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};
export const screenOptions = (navData) => {
  return {
    headerTitle: navData.route.params.title,
  };
};

const styles = StyleSheet.create({
  imageContainer: {
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
  },
  image: {
    width: "100%",
    height: 300,
  },
  actions: {
    marginVertical: 20,
    alignItems: "center",
  },
  details: {
    // paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 60,
    backgroundColor: Colors.primary,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  price: {
    fontSize: 20,
    color: Colors.white,
    textAlign: "center",
    marginVertical: 20, 
    fontFamily: "open-sans-bold",
  },
  description: {
    fontFamily: "open-sans",
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 20,
  },
});

export default ProductDetailScreen;
