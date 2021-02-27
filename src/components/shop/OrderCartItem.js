import React, {useState,useEffect} from 'react';
import MainButton from "../../components/shop/MainButton";
import { PLACE_ORDER_URL, API_KEY } from "../../BaseUrl";
import { View, StyleSheet, Dimensions, ScrollView,} from 'react-native'
import {
    Text,
    Left,
    Right,
    ListItem,
    Thumbnail,
    Body
} from 'native-base'
import {IMAGE_URL} from "../../BaseUrl";
import { useCart } from '../../contexts/cart/use-cart';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNetInfo} from "@react-native-community/netinfo";
import {useAppState, useAppDispatch } from "../../contexts/app/app.provider";
import { get } from 'lodash';

var { width, height } = Dimensions.get('window')

const OrderCartItem = (props) => {
//   console.log(props);
    return(
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={{ fontSize: 20, fontWeight: 'bold'}}>
                    Your Order
                </Text>
                {/* <View style={{ borderWidth: 1, borderColor: 'orange'}}>
                    <Text style={styles.title}>Shipping to:</Text>
                    <View style={{ padding: 8 }}>
                        <Text>Name: {CustInfo.name}</Text>
                        <Text>Address: {CustInfo.address}</Text>
                        <Text>Mobile: {CustInfo.mobile}</Text>
                    </View>
                    <Text style={styles.title}>Items:</Text>
                    {items.map((x) => {
                        return (
                            <ListItem
                                style={styles.listItem}
                                key={x.product_id}
                                avatar
                            >
                                <Left>
                                    <Thumbnail source={{ uri: IMAGE_URL + x.type_id+'/'+ x.app_pic1}}/>
                                </Left>
                                <Body style={styles.body}>
                                    <Left>
                                        <Text>{x.product_title_beng}</Text>
                                    </Left>
                                    <Right>
                                        <Text>৳ {x.sale_price}</Text>
                                    </Right>
                                </Body>
                            </ListItem>
                        )
                    })}
                </View>     */}
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        // height: "100%",
        padding: 8,
        alignContent: 'center',
        backgroundColor: 'white',
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
})


export default OrderCartItem;







// import React from "react";
// import { View, Text, StyleSheet } from "react-native";

// const OrderCartItem = (props) => {
//   return (
//     <View style={styles.cartItem}>
//       <View style={styles.itemData}>
//         <Text style={styles.quantity}>{props.quantity} </Text>
//         <Text style={styles.mainText}>{props.title}</Text>
//       </View>
//       <View style={styles.itemData}>
//         <Text style={styles.mainText}>${props.amount.toFixed(2)}</Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   cartItem: {
//     padding: 10,
//     backgroundColor: "white",
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginHorizontal: 20,
//   },
//   itemData: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   quantity: {
//     fontFamily: "open-sans",
//     color: "#888",
//     fontSize: 16,
//   },
//   mainText: {
//     fontFamily: "open-sans-bold",
//     fontSize: 16,
//   },
//   deleteButton: {
//     marginLeft: 20,
//   },
// });

// export default OrderCartItem;
