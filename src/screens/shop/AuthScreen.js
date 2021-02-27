import React, {useState,useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Card from "../../components/UI/Card";
import Colors from "../../constants/Colors";
import Input from '../../components/UI/Input';
import FormContainer from '../../components/UI/FormContainer';
import { SEND_OTP_URL,REGISTER_CUSTOMER_URL, API_KEY } from "../../BaseUrl";
import {useAppState, useAppDispatch } from "../../contexts/app/app.provider";
import { useNetInfo} from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthScreen = (props) => {
  const netInfo = useNetInfo();
  const [isVisible, setIsVisible] = useState(false);
  const [mobileNo, setMobileNo] = useState();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [otp, setOTP] = useState('');
  const [tempOTP, setTempOTP] = useState('');
  const dispatch = useAppDispatch();
  const isLogin = useAppState("isLogin");

  const storeData = async () => {
    let customerInfo = {
      name: name,
      address: address,
      mobile: mobileNo,
    }
  try {
    // const jsonValue = JSON.stringify(customerInfo)
    await AsyncStorage.setItem("user", JSON.stringify(customerInfo));
    const value = await AsyncStorage.getItem("user");
    const CustInfo = JSON.parse(value);
    if (CustInfo !== null) {
      setName(CustInfo.name);
      setAddress(CustInfo.address);
      setMobileNo(CustInfo.mobile);
    }
    // console.log(CustInfo);
  } catch (e) {
    console.log(e);
  }
}

//   storeData();

  const changeInputMobile = (text) => {
     setMobileNo(text); 
  };
  const changeInputName = (text) => {
     setName(text); 
  };
  const changeInputAdress = (text) => {
     setAddress(text); 
  };
  const changeInputOtp = (text) => {
     setOTP(text); 
  };

  const handleLogin = () => {
   setIsVisible(true);
    // dispatch({ type: 'IS_LOGIN', payload: true });
    let RandomNumber = Math.floor(Math.random() * 8999 + 1000);
    setTempOTP(RandomNumber);

    const url = SEND_OTP_URL + mobileNo + '/' + RandomNumber + '/' + API_KEY;

    send_sms(url);

  };

  const send_sms = (url) => {
    if (netInfo.isInternetReachable === true) {
      return fetch(url)
        .then((response) => response.json())
        .catch((error) => {
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
  }
 
  const handleSubmit = async() => {
    props.navigation.goBack();
    dispatch({ type: 'IS_LOGIN', payload: true });
    if (otp == tempOTP) {
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
                mobile: mobileNo,
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
    } else {
      alert("Hold on! Please Enter Valid OTP", [
        {
          text: "OK",
          onPress: () => null,
          style: "OK"
        },
      ]);
    }

    // setIsLogin(true);
    // setLoading(false);
  };

    return (
      <KeyboardAwareScrollView
            viewIsInsideTabBar={true}
            extraHeight={200}
            enableOnAndroid={true}
        >
          {isVisible === false ? (
          <View style={styles.main}>
            <View>
                <Text style={styles.title}>Please enter your phone number</Text>
                <View style={{paddingBottom: 100}}>
                  <FormContainer>
                    <Input
                        placeholder={"Enter Mobile No"}
                        name={"phone"}
                        value={mobileNo}
                        keyboardType={"numeric"}
                        onChangeText={changeInputMobile}
                    />
                    <TouchableOpacity onPress={handleLogin}>
                    <Card style={styles.Container}>
                      <Text style={styles.placeOrder}>Login with OTP</Text>
                    </Card>
                  </TouchableOpacity>
                  </FormContainer>
                </View>
                    
            </View>
        </View>
          ) : (
            <FormContainer title={"Shipping Address"}>
                <Input
                    placeholder={"name"}
                    name={"name"}
                    value={name}
                    onChangeText={changeInputName}
                />
                   <Input
                    placeholder={"Shipping Address"}
                    name={"addr"}
                    value={address}
                    onChangeText={changeInputAdress}
                />
                   <Input
                    placeholder={"Enter OTP"}
                    name={"otp"}
                    keyboardType={"numeric"}
                    value={otp}
                    onChangeText={changeInputOtp}
                />
                <TouchableOpacity onPress={handleSubmit}>
                <Card style={styles.Container}>
                  <Text style={styles.placeOrder}>Submit</Text>
                </Card>
              </TouchableOpacity>
            </FormContainer>
          )}
        
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
  main: {
    flex: 1, 
    backgroundColor: '#f1f5f7'
  },
  title:{marginTop: 85, fontSize: 20, alignSelf: 'center'},
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
});

export default AuthScreen;

