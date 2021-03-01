import React, {useState,useEffect} from 'react';
import axios from "axios";
import { FlatList, View, Text, StyleSheet, Alert,ActivityIndicator } from "react-native";
import Colors from "../../constants/Colors";
import OrderItem from "../../components/shop/OrderItem";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MY_ORDER_URL, API_KEY, IMAGE_URL } from '../../BaseUrl';
import {useAppState, useAppDispatch } from "../../contexts/app/app.provider";

const OrdersScreen = ({ }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

const dispatch = useAppDispatch();
useEffect(() => {
 getData();
  }, []);

  const getData = async () => {
      
      try {
        const value = await AsyncStorage.getItem("user");
        const CustInfo = JSON.parse(value);
        if (CustInfo != null) {
          const mobile = CustInfo.mobile;
          loadData(mobile);
        }
      } catch (e) {
        console.log(e);
      }
    }


const loadData = (mobile) => {
  const url = `${MY_ORDER_URL}${mobile}/${API_KEY}/accessKey`;
  if (url) {
    axios.get(url)
      .then((res) => {
        dispatch({ type: 'SAVE_ORDER_INFO', payload: res.data.orderInfo });
        setLoading(false);
      })
      .catch((error) => {
        console.log('Api call error');
        setError(true)
        setLoading(true);
      })
  }
  }




  const ordersData = useAppState("orderInfo");

   if (loading) {
    return ( 
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }
  
  return (
    <FlatList
      data={ordersData}
      keyExtractor={(item) => item.r_order_id}
      renderItem={({item}) => (
        <OrderItem 
          id={item.r_order_id}
          amount={item.total_price}
          date={item.order_date}
          items={item}
          // onPress={() => {
          //       onCategoryClick(item);
          //    }}
          // onDelete={deleteHandler.bind(this, item.id)}
        />
      )}
    />
  );
};

export const screenOptions = (navData) => {
  return {
    // headerTitle: "Popular Item",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
    Container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
     },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OrdersScreen;
