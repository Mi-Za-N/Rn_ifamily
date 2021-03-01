import React from "react";
import { View, Text, FlatList, Modal, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import CartItem from "./CartItem";
import MainButton from "../shop/MainButton";
import { useCart } from '../../contexts/cart/use-cart';

const PopUpModal = (props) => {
  const {
    items,
    coupon,
    addItem,
    removeItem,
    removeItemFromCart,
    cartItemsCount,
    calculatePrice,
  } = useCart();


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
              {items.length === 0 ? (
                <View style={styles.center}>
                  <Text>No Item in Cart</Text>
                </View>
              ) : (
                <FlatList
              data={items}
              keyExtractor={(item) => item.product_id}
              renderItem={(itemData) => (
                <CartItem
              key={itemData.item.product_id}
              quantity={itemData.item.quantity}
              title={itemData.item.productTitle}
              image={itemData.item.productImage}
              amount={itemData.item.sum}
              data={itemData.item}
              onDecrease={() => removeItem(itemData.item)}
              onIncrease={() => addItem(itemData.item)}
              onDelete={() => removeItemFromCart(itemData.item)}
                    />
                  )}
                />
              )}
               {items.length > 0  &&(
                  <MainButton onPress={props.onSelect}>
                      Checkout
                  </MainButton>
                )}
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
      justifyContent: 'flex-end',
      alignItems: 'center',
      // backgroundColor: Colors.primary, 
  },
  ModalHeight: {
  width: "100%",
  height: "100%",
  paddingTop: 100,
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
  center: {
    flex:1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
    borderTopRightRadius:20,
    borderTopLeftRadius:20,

  }
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
