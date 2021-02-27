import React, {useState,useEffect} from 'react';
import axios from "axios";
import { FlatList, View, Text, StyleSheet, Alert,ActivityIndicator } from "react-native";
import Colors from "../../constants/Colors";
import OrderItem from "../../components/shop/OrderItem";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MY_ORDER_URL, API_KEY, IMAGE_URL } from '../../BaseUrl';
import {useAppState, useAppDispatch } from "../../contexts/app/app.provider";

const OrdersScreen = ({ }) => {
  const [error, setError] = useState(false);
  const [visible, setVisible] = useState(false);
  const [order, setOrder] = useState([]);
  const [orderInfo, setOrderInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState("");
  const [mobileNo, setMobileNo] = useState();

   
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("user");
        const CustInfo = JSON.parse(value);
        if (CustInfo !== null) {
          const mobile = CustInfo.mobile;
          setMobileNo(mobile)
          // address = CustInfo.address;
          // console.log(url);
        }
      } catch (e) {
        console.log(e);
      }
    }
   

 getData();

const dispatch = useAppDispatch();
useEffect(() => {
 
const url = MY_ORDER_URL + mobileNo + '/' + API_KEY + '/' +'accesskey';
    axios.get(url)
      .then((res) => {
        dispatch({ type: 'SAVE_ORDER_INFO', payload: res.data.orderInfo });
        setLoading(false);
        setActive(res.data.orderInfo);
        if (res.data.orderInfo.length > 0) {
          loadFirstOrder(res.data.orderInfo[0]);
        }
        //
      })
      .catch((error) => {
        console.log('Api call error');
        setError(true)
        setLoading(true);
      })
  }, []);
  const ordersData = useAppState("orderInfo");
  // console.log(ordersData);

   if (loading && ordersData.length === 0) {
    return ( 
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  //   if (!loading && ordersData.length === 0) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //       <Text>No orders found in here right now</Text>
  //     </View>
  //   );
  // }

  
  return (
    <FlatList
      data={ordersData}
      keyExtractor={(item) => item.r_order_id}
      renderItem={(itemData) => (
        <OrderItem 
          id={itemData.item.r_order_id}
          amount={itemData.item.total_price}
          date={itemData.item.order_date}
          items={itemData.item}
          // onDelete={deleteHandler.bind(this, itemData.item.id)}
        />
      )}
    />
  );
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



// import React from "react";
// import { FlatList, View, Text, StyleSheet, Alert } from "react-native";
// import { useSelector, useDispatch } from "react-redux";

// import OrderItem from "../../components/shop/OrderItem";
// import { HeaderButtons, Item } from "react-navigation-header-buttons";
// import HeaderButton from "../../components/UI/HeaderButton";
// import { deleteOrder } from "../../store/actions/orders";

// const OrdersScreen = () => {
//   const orders = useSelector((state) => state.orders.orders);

//   const dispatch = useDispatch();

//   if (orders.length === 0) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <Text>No orders found in here right now</Text>
//       </View>
//     );
//   }


//     const deleteHandler = (id) => {
//     Alert.alert("Are you sure?", "Do you really want to delete this item?", [
//       { text: "No", style: "default" },
//       {
//         text: "Yes",
//         style: "destructive",
//         onPress: () => {
//           dispatch(deleteOrder(id));
//         },
//       },
//     ]);
//   };

//   return (
//     <FlatList
//       data={orders}
//       keyExtractor={(item) => item.id}
//       renderItem={(itemData) => (
//         <OrderItem
//           amount={itemData.item.totalAmount}
//           date={itemData.item.readableDate}
//           items={itemData.item.items}
//           onDelete={deleteHandler.bind(this, itemData.item.id)}
//         />
//       )}
//     />
//   );
// };

// export const screenOptions = (navData) => {
//   return {
//     headerTitle: "Your Orders",
//     headerLeft: () => (
//       <HeaderButtons HeaderButtonComponent={HeaderButton}>
//         <Item
//           title="Menu"
//           iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
//           onPress={() => {
//             navData.navigation.toggleDrawer();
//           }}
//         />
//       </HeaderButtons>
//     ),
//   };
// };

// const styles = StyleSheet.create({
//   centered: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });

// export default OrdersScreen;
