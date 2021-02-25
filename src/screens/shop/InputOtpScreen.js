import React, {useState,useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Card from "../../components/UI/Card";
import Colors from "../../constants/Colors";
import Input from '../../components/UI/Input';
import FormContainer from '../../components/UI/FormContainer';
import { SEND_OTP_URL, API_KEY } from "../../BaseUrl";
import { useAppDispatch } from "../../contexts/app/app.provider";
import { useNetInfo} from "@react-native-community/netinfo";

const InputOtp = (props) => {
  const netInfo = useNetInfo();
  const [mobileNo, setMobileNo] = useState();
  const dispatch = useAppDispatch();
  useEffect(() => { 
      setMobileNo(mobileNo);
      dispatch({ type: 'IS_LOGIN', payload: true });
  }, []);

  const getOtp = (text) => {
      setMobileNo(text);
  }

  const handleLogin = () => {
    props.navigation.navigate("Cart");
    let RandomNumber = Math.floor(Math.random() * 8999 + 1000);

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

  


    return (
      <KeyboardAwareScrollView
            viewIsInsideTabBar={true}
            extraHeight={200}
            enableOnAndroid={true}
        >
        <View style={styles.maain}>
            <View>
                <Text style={styles.title}>Please enter your phone number</Text>
                <View style={{paddingBottom: 100}}>
                  <FormContainer>
                    <Input
                        placeholder={"Enter Mobile No"}
                        name={"phone"}
                        value={mobileNo}
                        keyboardType={"numeric"}
                        onChangeText={getOtp}
                    />
                    <TouchableOpacity onPress={handleLogin}>
                    <Card style={styles.Container}>
                      <Text style={styles.placeOrder}>Login with Mobile N0</Text>
                    </Card>
                  </TouchableOpacity>
                  </FormContainer>
                </View>
                    
            </View>
        </View>
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

export default InputOtp;