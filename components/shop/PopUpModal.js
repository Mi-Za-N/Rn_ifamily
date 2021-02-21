import React from "react";
import { View, Text, FlatList, Button, Modal, TouchableOpacity, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/Colors";
import CartItem from "./CartItem";
import { decrease } from "../../store/actions/cart";
import { increase } from "../../store/actions/cart";
import { addOrder } from "../../store/actions/orders";
import { removeFromCart } from "../../store/actions/cart";
import Card from "../UI/Card"

const PopUpModal = (props) => {
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        productImage: state.cart.items[key].productImage,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });
  const dispatch = useDispatch();

  // const submitOrder = () => {
  //   props.onNavigate
  //   // dispatch(addOrder(cartItems, cartTotalAmount));
    
  // }

  return (
    <Modal transparent visible={props.visible}    animationType="slide">
      <View style={styles.ModalView}>
      <View style={styles.ModalHeight}>
        <View style={styles.buttonContainer}>
            <Ionicons name={
                Platform.OS === "android"
                  ? "md-close-circle-outline" : "ios-close"}
              size={40}
              color={Colors.white}
              style={styles.closeIcon}
              onPress={props.onCancel}
            />
          </View>
            <View style={styles.screen}>
                <FlatList
                  data={cartItems}
                  keyExtractor={(item) => item.productId}
                  renderItem={(itemData) => (
                    <CartItem
                      quantity={itemData.item.quantity}
                      title={itemData.item.productTitle}
                      image={itemData.item.productImage}
                      amount={itemData.item.sum}
                      onDecrease={() => {
                        dispatch(decrease(itemData.item.productId));
                      }}
                      onIncrease={() => {
                        dispatch(increase(itemData.item.productId));
                      }}
                      onDelete={() => {
                        dispatch(removeFromCart(itemData.item.productId));
                      }}
                    />
                  )}
                />
                <TouchableOpacity 
                    onPress={props.onSelect}>
                <Card style={styles.Container}>
                  <Text style={styles.placeOrder}>Checkout</Text>
                  <View>
                    <Text style={styles.amount}>
                      ৳{Math.round(cartTotalAmount)}
                    </Text>
                  </View>
                </Card>
              </TouchableOpacity>
            </View>
        </View>
       </View>
    </Modal>    
  );
};

export const screenOptions = {
  headerTitle: "Your Cart",
};

const styles = StyleSheet.create({
  ModalView: { 
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center' 
  },
  ModalHeight: {
  width: "100%",
  height: "100%",
  paddingTop: 200,
  backgroundColor: "#00000090"
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  closeIcon: {
    backgroundColor: "red",
    paddingHorizontal: 8,
    borderRadius: 30
  },
  screen: {
    flex:1, 
    paddingHorizontal: 10,
    
  },
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
});

export default PopUpModal;





// import React, { useState } from 'react';
// import { 
//   View, Text,Button, Modal, StyleSheet, TouchableOpacity 
// } from 'react-native';
// import Colors  from '../../constants/Colors';
// import CartScreen from "../../screens/shop/CartScreen";
// import { Ionicons } from "@expo/vector-icons";

// const GoalInput = props => {
//   const [enteredGoal, setEnteredGoal] = useState('');

//   // const goalInputHandler = enteredText => {
//   //   setEnteredGoal(enteredText);
//   // };

//   // const addGoalHandler = () => {
//   //   props.onAddGoal(enteredGoal);
//   //   setEnteredGoal('');
//   // };

//   return (
//     <Modal transparent visible={props.visible}       animationType="slide">
//       <View style={{
//       flex: 1,
//       justifyContent: 'flex-end',
//       alignItems: 'center'
//       }}>
//       <View style={{
//               width: "100%",
//               height: "70%",
//               backgroundColor: "#00000080"
//               }}>
//         <View style={styles.buttonContainer}>
//             <Ionicons
//               name={
//                 Platform.OS === "android"
//                   ? "md-close-circle-outline"
//                   : "ios-close"
//               }
//               size={40}
//               color={Colors.white}
//               style={styles.closeIcon}
//               onPress={props.onCancel}
//             />
//               </View>
//             <CartScreen />
//           </View>
//         </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   inputContainer: {
//     flex: 1,
//     alignItems: 'center',
//     // paddingTop:"20%"
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     padding: 10,
//   },
//   button: {
//     width: '40%'
//   },
//   closeIcon: {
//     backgroundColor: "red",
//     paddingHorizontal: 8,
//     borderRadius: 30
//   },

//   Container: { 
//      flexDirection: "row",
//      justifyContent: "space-between",
//      alignItems: "center",
//      backgroundColor: Colors.primary,
//      paddingHorizontal: 30,
//      paddingVertical: 5,
//      marginHorizontal: 10,
//      marginBottom:5
//     },
//   cartItems: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#ffffff",
//   },
//   amount: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: Colors.primary,
//     padding: 5,
//     backgroundColor: Colors.white,
//     fontSize: 14,
//     borderRadius: 10
//   },
//   placeOrder: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#ffffff",
//   },
// });

// export default GoalInput;
