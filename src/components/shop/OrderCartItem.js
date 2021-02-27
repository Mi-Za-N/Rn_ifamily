import React from 'react';
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

var { width, height } = Dimensions.get('window')

const OrderCartItem = ({order}) => {
  console.log(order);
    return(
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={{ fontSize: 20, fontWeight: 'bold'}}>
                    Your Order
                </Text>
                <View style={{ borderWidth: 1, borderColor: 'orange'}}>
                    <View style={{ padding: 8 }}>
                        {/* <Text>Total: {order.total_price}</Text> */}
                    </View>
                    <Text style={styles.title}>Items:</Text>
                    {order.map((x) => {
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
