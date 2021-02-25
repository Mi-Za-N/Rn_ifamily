import React, {useEffect} from 'react';
import MainButton from "../../components/shop/MainButton";
import  Colors  from '../../constants/Colors';
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

var { width, height } = Dimensions.get('window')

const Confirm = (props) => {
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
  console.log(items);

    const finalOrder = props.route.params;
    console.log(finalOrder);
    const confirmOrder = () => {
        clearCart();
        props.navigation.navigate("ProductsOverview");
    }

    

  
 
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
                        <Text>Address: </Text>
                        <Text>Address2: </Text>
                        <Text>City: </Text>
                        <Text>Zip Code: </Text>
                        <Text>Country: </Text>
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
                  <MainButton onPress={confirmOrder}>
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


