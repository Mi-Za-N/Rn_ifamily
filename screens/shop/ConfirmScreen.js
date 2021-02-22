import React from 'react'
import { View,Text, StyleSheet,TouchableOpacity,Image, Dimensions, ScrollView } from 'react-native';
import  Colors  from '../../constants/Colors';
import { useDispatch } from "react-redux";
import { addOrder } from "../../store/actions/orders";
import Card from "../../components/UI/Card"

var { width, height } = Dimensions.get('window')

const Confirm = (props) => {
    const finalOrder = props.route.params;
    const dispatch = useDispatch();
    const confirmOrder = () => {
        dispatch(addOrder(finalOrder));
        props.navigation.navigate("ProductsOverview");
    }

    return(
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={{ fontSize: 20, fontWeight: 'bold'}}>
                    Confirm Order
                </Text>
                {props.route.params ? 
                <View style={styles.border}>
                    <Text style={styles.title}>Shipping to:</Text>
                    <View style={styles.shipping}>
                        <Text>Address: {finalOrder.order.shippingAddress1}</Text>
                        <Text>Address2: {finalOrder.order.shippingAddress2}</Text>
                        <Text>City: {finalOrder.order.city}</Text>
                        <Text>Zip Code: {finalOrder.order.zip}</Text>
                    </View>
                    <Text style={styles.title}>Items:</Text>
                    {finalOrder.order.orderItems.map((x) => {
                        return (
                          <TouchableOpacity style={{ padding: 8 }}
                                key={x.productId}>
                            <View style={styles.productMain}>
                                    <Image style={styles.image} source={{ uri: x.productImage}}/>
                                <View style={styles.body}>
                                    <Text>{x.productTitle}</Text>
                                    <Text>  ৳{x.productPrice}</Text>
                                </View>
                            </View>
                          </TouchableOpacity>
                        )
                    })}
                </View>    
           : null }
           <TouchableOpacity onPress={confirmOrder}>
                <Card style={styles.Container}>
                  <Text style={styles.placeOrder}>Confirm Order</Text>
                </Card>
              </TouchableOpacity>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
  shipping: {
    justifyContent: "center",
    alignContent: "center",
    marginLeft: 50,
  },
  border: {
    borderWidth: 1, 
    borderColor: Colors.primary
  },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 8,
        
    },
    title: {
        alignSelf: 'center', 
        margin: 8, 
        fontSize: 16,
        fontWeight: 'bold' 
    },
    total: {
      alignSelf: 'center', 
        margin: 8, 
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.primary
    },
    listItem: {
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'center',
        width: width / 1.2
    },
    body: {
        margin: 10,
        alignItems: 'center',
        flexDirection: 'row'
    },
    productMain: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  text: {
    color: "black",
    fontSize: 15,
    fontWeight: "bold",
    overflow: "hidden",
    width: "90%",
  },
  image: {
    width: 50,
    height: 40,
    resizeMode: "contain",
    borderRadius: 5,
  },
  Details: {
    justifyContent: "space-around",
    alignContent: "center",
    marginLeft: 20,
  },
  Container: { 
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.primary,
    paddingHorizontal: 30,
    paddingVertical: 5,
    marginHorizontal: 10,
    marginVertical:15
  },
  placeOrder: {
    fontSize: 20,
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
    borderRadius: 10,
    marginHorizontal: 5
  },
})

export default Confirm;


