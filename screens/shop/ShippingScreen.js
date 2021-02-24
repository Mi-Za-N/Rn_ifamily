import React, { useEffect, useState} from 'react';
import { Text, TouchableOpacity ,StyleSheet} from 'react-native'
import FormContainer from '../../components/UI/FormContainer'
import Input from '../../components/UI/Input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Card from "../../components/UI/Card"
import Colors from "../../constants/Colors";
import { useCart } from '../../contexts/cart/use-cart';

const Checkout = (props) => {
  const { cartItemsCount, calculatePrice } = useCart();

    const [ totalOrder, setTotalorder ] = useState();
    const [ orderItems, setOrderItems ] = useState();
    const [ address, setAddress ] = useState();
    const [ address2, setAddress2 ] = useState();
    const [ city, setCity ] = useState();
    const [ zip, setZip ] = useState();
    const [ phone, setPhone ] = useState();

    useEffect(() => {
        setOrderItems(cartItemsCount)
        setTotalorder(calculatePrice())
        return () => {
            setOrderItems();
            setTotalorder();
        }
    }, [])

    const checkOut = () => {
        let order = {
            city,
            dateOrdered: Date.now(),
            orderItems,
            totalOrder,
            phone,
            shippingAddress1: address,
            shippingAddress2: address2,
            status: "3",
            zip,
        }

        props.navigation.navigate("Confirm", {order: order })
    }

    return (
        <KeyboardAwareScrollView
            viewIsInsideTabBar={true}
            extraHeight={200}
            enableOnAndroid={true}
        >
            <FormContainer title={"Shipping Address"}>
                <Input
                    placeholder={"Phone"}
                    name={"phone"}
                    value={phone}
                    keyboardType={"numeric"}
                    onChangeText={(text) => setPhone(text)}
                />
                   <Input
                    placeholder={"Shipping Address 1"}
                    name={"ShippingAddress1"}
                    value={address}
                    onChangeText={(text) => setAddress(text)}
                />
                   <Input
                    placeholder={"Shipping Address 2"}
                    name={"ShippingAddress2"}
                    value={address2}
                    onChangeText={(text) => setAddress2(text)}
                />
                   <Input
                    placeholder={"City"}
                    name={"city"}
                    value={city}
                    onChangeText={(text) => setCity(text)}
                />
                   <Input
                    placeholder={"Zip Code"}
                    name={"zip"}
                    value={zip}
                    keyboardType={"numeric"}
                    onChangeText={(text) => setZip(text)}
                />
                {/* <View style={{ width: '80%', alignItems: "center" }}>
                    <Button title="Confirm" onPress={() => checkOut()}/>
                </View> */}
                <TouchableOpacity 
                    onPress={() => checkOut()}>
                <Card style={styles.Container}>
                  <Text style={styles.placeOrder}>Place Order</Text>
                </Card>
              </TouchableOpacity>
            </FormContainer>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
Container: { 
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.primary,
    paddingHorizontal: 30,
    paddingVertical: 5,
    marginHorizontal: 10,
    marginBottom:5
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
    borderRadius: 10
  },
})
export default Checkout;
