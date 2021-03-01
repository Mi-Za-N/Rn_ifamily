import React, { useState, useMemo } from 'react';
import { FlatList, View,StyleSheet, } from 'react-native';
import { IMAGE_URL} from "../../BaseUrl";
import ProductItem from "../../components/shop/ProductItem";
import Category from "./CategoryScreen";
import PopUpModal from "../../components/shop/PopUpModal"
import MainButton from "../../components/shop/MainButton";
import { useAppState } from "../../contexts/app/app.provider";

export default function App (props) {
   const products = useAppState("showProductInfo");
   const subMenu = props.route.params.subMenu;
   const [isAddMode, setIsAddMode] = useState(false);
   const cancelModal = () => {
     setIsAddMode(false);
    };    

   const renderItem = ({ item }) => (
        <ProductItem
          id={item.product_id}
          product={item}
          image={IMAGE_URL + item.type_id+'/'+ item.web_pic1}
          title={item.product_title_eng}
          price={item.sale_price}
          onSelect={() => {
            selectItemHandler(item, item.product_title_eng);
          }}
        />
    );

  const memoizedValue = useMemo(() => renderItem, [products]);

   const selectItemHandler = (item, product_title_eng) => {
    props.navigation.navigate("ProductDetail", {
      item: item,
      title: product_title_eng
    });
  };

  const openModal = () => {
    setIsAddMode(true)
  }

  return (
    <View style={{flex: 1}}>
     <Category subMenu={subMenu} />
      <FlatList
      style={{ marginTop: 5 }}
      data={products}
      keyExtractor={item => item.product_id}
      numColumns={2}
      renderItem={memoizedValue}
      />
      
      <View style={styles.screen}>
          <MainButton onPress={openModal}>
              Order Now
            </MainButton>
        <PopUpModal
          visible={isAddMode}
          onCancel={cancelModal}
          onSelect={() => { props.navigation.navigate("otp");
              cancelModal()}}/>
        </View>
    </View>
  );
}

export const screenOptions = (navData) => {
  return {
    headerTitle: navData.route.params.title,
    // headerLeft: () => (
    //   <HeaderButtons HeaderButtonComponent={HeaderButton}>
    //     <Item
    //       title="Menu"
    //       iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
    //       onPress={() => {
    //         navData.navigation.toggleDrawer();
    //       }}
    //     />
    //   </HeaderButtons>
    // ),
  };
};

export const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
  },
  list: {

  },
  item: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    width: '100%',
  },
  footer: {
    padding: 15,
  },
  footerText: {
    fontWeight: '600',
  },
    main: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cartItems: {
    position: "absolute",
    zIndex: 999,
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
  screen: {
    paddingHorizontal: 15,
    paddingVertical: 2,
  }
});






// import React, { useState, useMemo } from "react";
// import {
//   FlatList,
//   View,
//   StyleSheet,
// } from "react-native";
// import { useSelector } from "react-redux";
// import ProductItem from "../../components/shop/ProductItem";
// import { HeaderButtons, Item } from "react-navigation-header-buttons";
// import HeaderButton from "../../components/UI/HeaderButton";
// import { IMAGE_URL} from "../../BaseUrl";
// import PopUpModal from "../../components/shop/PopUpModal"
// import CartButton from "../../components/shop/CartButton";

// const CategoryProdScreen = (props) => {
//   const typeId = props.route.params;
//    const [isAddMode, setIsAddMode] = useState(false);
//   const cancelModal = () => {
//     setIsAddMode(false);
//   };
//   const cartItems = useSelector((state) => {
//     const transformedCartItems = [];
//     for (const key in state.cart.items) {
//       transformedCartItems.push({
//         productId: key,
//         productTitle: state.cart.items[key].productTitle,
//         productPrice: state.cart.items[key].productPrice,
//         productImage: state.cart.items[key].productImage,
//         quantity: state.cart.items[key].quantity,
//         sum: state.cart.items[key].sum,
//       });
//     }
//     return transformedCartItems.sort((a, b) =>
//       a.productId > b.productId ? 1 : -1
//     );
//   });

  // const categorProd = useSelector((state) =>
  //   state.Data.saveProduct.filter((product) => {
  //     return product.type_id === typeId.id;
  //   })
  // );



//    const renderItem = ({ item }) => (
//         <ProductItem
//            id={item.product_id}
//           product={item}
//           image={IMAGE_URL + item.type_id+'/'+ item.app_pic1}
//           title={item.product_title_eng}
//           price={item.sale_price}
//           onSelect={() => {
//             selectItemHandler(item.product_id, item.product_title_eng);
//           }}
//         />
//     );
  
//   const memoizedValue = useMemo(() => renderItem, [categorProd]);


//   const selectItemHandler = (product_id, name) => {
//     props.navigation.navigate("ProductDetail", {
//       productId: product_id,
//       productTitle: name,
//     });
//   };
//   return (
//        <View style={styles.main}>
//     <FlatList
//       style={{ marginTop: 5 }}
//       initialNumToRender={7}
//       data={categorProd}
//       keyExtractor={item => item.product_id}
//       numColumns={2}
//       renderItem={memoizedValue}
//       />
//         {cartItems.length !== 0 && 
//         <View style={styles.screen}>
//         <CartButton onPress={() => setIsAddMode(true)} />
//         <PopUpModal
//           visible={isAddMode}
//           onCancel={cancelModal}
//           onSelect={() => { props.navigation.navigate("Cart");
//               cancelModal()}}/>
//         </View>
//         }
//     </View>     
//   );
// };

// export const screenOptions = (navData) => {
//   return {
//     headerTitle: navData.route.params.title,
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
//   main: {
//     flex: 1,
//   },
//   centered: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   cartItems: {
//     position: "absolute",
//     zIndex: 999,
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#ffffff",
//   },
// });

// export default CategoryProdScreen;