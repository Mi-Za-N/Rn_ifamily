import React, { useEffect, useState} from 'react';
import { Text, TouchableOpacity ,StyleSheet} from 'react-native'
import FormContainer from '../../components/UI/FormContainer'
import Input from '../../components/UI/Input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Card from "../../components/UI/Card"
import Colors from "../../constants/Colors";
import { useNetInfo} from "@react-native-community/netinfo";
import { REGISTER_CUSTOMER_URL, API_KEY } from "../../BaseUrl";
import AsyncStorage from '@react-native-community/async-storage';

const Checkout = (props) => {
    const netInfo = useNetInfo();
    const [ name, setName ] = useState();
    const [ address, setAddress ] = useState();
    const [ city, setCity ] = useState();
    const [ otp, setOpt ] = useState();
    const [tempOTP, setTempOTP] = useState('');

    const changeInput = (text) => {
    if (text === "name") {
      setName(text);
    }
    if (text === "addr") {
      setAddress(text);
    }
    if (text === "city") {
      setCity(text);
    }
    if (text === "otp") {
      setOpt(text);
    }
  };

  const handleSubmit = () => {
      props.navigation.navigate("Confirm")
      if (netInfo.isInternetReachable === true) {
        fetch(REGISTER_CUSTOMER_URL,
          {
            method: 'POST',
            headers:
            {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(
              {
                name: name,
                address: address,
                city: city,
                accessKey: '8jdfjd88743jhg',
                deviceKey: API_KEY,
              })
          })
          .then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson);
            storeData();
          }).catch((error) => {
            console.log(error);
            alert("Hold on! Somethig went worng Try again later", [
              {
                text: "OK",
                onPress: () => null,
                style: "OK"
              },
            ]);
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
  const storeData = () => {

    let customerInfo = {
      name: name,
      address: address,
      city: city,
      //accessKey: this.state.access_key,
    }

    AsyncStorage.setItem('user', JSON.stringify(customerInfo));
    dispatch({ type: 'IS_LOGIN', payload: true });
  }; 
  

    return (
        <KeyboardAwareScrollView
            viewIsInsideTabBar={true}
            extraHeight={200}
            enableOnAndroid={true}
        >
            <FormContainer title={"Shipping Address"}>
                <Input
                    placeholder={"name"}
                    name={"name"}
                    value={name}
                    onChangeText={changeInput}
                />
                   <Input
                    placeholder={"Shipping Address"}
                    name={"addr"}
                    value={address}
                    onChangeText={changeInput}
                />
                   <Input
                    placeholder={"City"}
                    name={"city"}
                    value={city}
                    onChangeText={changeInput}
                />
                   <Input
                    placeholder={"Enter OTP"}
                    name={"otp"}
                    keyboardType={"numeric"}
                    value={otp}
                    onChangeText={changeInput}
                />
                <TouchableOpacity 
                    onPress={handleSubmit}>
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
