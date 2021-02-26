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

var { width, height } = Dimensions.get('window')

const Confirm = (props) => {
    const CustInfo = props.route.params.CustInfo;
    console.log(CustInfo.address);
    console.log(CustInfo.mobile);
    const netInfo = useNetInfo();
    const dispatch = useAppDispatch();
    const [subTotal, setSubTotal] = useState(0);
    const [deliveryCharge, setDeliveryCharge] = useState(0);

  const {
    items,
    removeCoupon,
    coupon,
    clearCart,
    cartItemsCount,
    calculatePrice,
    calculateDiscount,
    calculateSubTotalPrice,
  } = useCart();

    const handlePlaceOrder = async () => {
    props.navigation.navigate("ProductsOverview");
    dispatch({ type: 'IS_LOGIN', payload: true });
    if (netInfo.isInternetReachable === true) {
      fetch(PLACE_ORDER_URL,
        {
          method: 'POST',
          headers:
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            {
              cartItem: items,
              subTotal: subTotal,
              deliveryCharge: deliveryCharge,
              mobile: CustInfo.mobile,
              address: CustInfo.address,
              accessKey: '8jdfjd88743jhg',
              deviceKey: API_KEY,
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
          clearCart();
        }).catch((error) => {
           console.log(error);
        });

    } else {

      alert("Hold on! Internet Connection Lost", [
        {
          text: "OK",
          onPress: () => null,
          style: "OK"
        },
      ]);
    }
   
  };




//     const getData = async () => {
//         try {
//             const value = await AsyncStorage.removeItem("user");
//             const CustInfo = JSON.parse(value);
//             // const address = CustInfo.address;
//             // const MobileNo = CustInfo.mobile;
//             // console.log(address);

//         } catch(e) {
//             console.log(e);
//         }
//    }
    
// getData()
  
 
    return(
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={{ fontSize: 20, fontWeight: 'bold'}}>
                    Confirm Order
                </Text>
                {/* {props.route.params ?  */}
                <View style={{ borderWidth: 1, borderColor: 'orange'}}>
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
                </View>    
        {/* //    : null } */}
            </View>
             {items.length > 0  &&(
                  <MainButton onPress={handlePlaceOrder}>
                      Confirm Order
                    </MainButton>
                )}
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


export default Confirm;


