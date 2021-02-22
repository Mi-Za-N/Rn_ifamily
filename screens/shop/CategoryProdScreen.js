import React, { useState, useEffect } from 'react';
import Colors from "../../constants/Colors";
import AsyncStorage from '@react-native-community/async-storage';
import { FlatList, View,ActivityIndicator,StyleSheet, } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import delay from 'delay';
import { IMAGE_URL} from "../../BaseUrl";
import ProductItem from "../../components/shop/ProductItem";
import Category from "./CategoryScreen";
import PopUpModal from "../../components/shop/PopUpModal"
import CartButton from "../../components/shop/CartButton";

export default function App (props) {
    const typeId = props.route.params.id;
    const subMenu = props.route.params.subMenu;
    // console.log(subTypeId);
    const [loadingMore, setLoadingMore] = useState(false);
    const [allLoaded, setAllLoaded] = useState(false);
    const [isAddMode, setIsAddMode] = useState(false);
    const cancelModal = () => {
      setIsAddMode(false);
    };

      const dispatch = useDispatch(); 
        const data = useSelector((state) =>
          state.Data.saveProduct.filter((product) => {
            return product.type_id === typeId;
          })
        );

  //  if (delay && data.length === 0) {
  //   return (
  //     <View style={styles.centered}>
  //       <ActivityIndicator size="large" color={Colors.primary} />
  //     </View>
  //   );
  // }

  const RECORDS_PER_FETCH = 8;
  const fetchResults = (startingId = 0) => {
  let obj = [];
 
  for (let i = startingId; i < startingId + RECORDS_PER_FETCH; i++) {
    if (data[i] === undefined)
      break;

    obj.push(data[i]);
  }
  return obj;
}

  const listItems = useSelector(state => state.Data.items);

  const totalItems = Array.isArray(listItems) ? listItems.length : 0;
 
  useEffect(() => {
    initialiseList();
  }, []);


  const initialiseList = async () => {

    // this is done for testing purposes - reset AsyncStorage on every app refresh
    await AsyncStorage.removeItem('saved_list');

    // get current persisted list items (will be null if above line is not removed)
    const curItems = await AsyncStorage.getItem('saved_list');

    if (curItems === null) {
      // no current items in AsyncStorage - fetch initial items
      json = fetchResults(0);

      // set initial list in AsyncStorage
      await AsyncStorage.setItem('saved_list', JSON.stringify(json));

    } else {
      // current items exist - format as a JSON object
      json = JSON.parse(curItems);
    }

    // update Redux store (Redux will ignore if `json` is same as current list items)
    dispatch({
      type: 'UPDATE_LIST_RESULTS',
      items: json
    });
  }


  const persistResults = async (newItems) => {

    // get current persisted list items
    const curItems = await AsyncStorage.getItem('saved_list');

    // format as a JSON object
    let json = curItems === null
      ? {}
      : JSON.parse(curItems);

    // add new items to json object
    for (let item of newItems) {
      json.push(item);
    }

    // persist updated item list
    await AsyncStorage.setItem('saved_list', JSON.stringify(json));

    // update Redux store
    dispatch({
      type: 'UPDATE_LIST_RESULTS',
      items: json
    });
  }


  const loadMoreResults = async info => {

    // if already loading more, or all loaded, return
    if (loadingMore || allLoaded)
      return

    // set loading more (also updates footer text)
    setLoadingMore(true);

    // get next results
    const newItems = fetchResults(totalItems);

    // mimic server-side API request and delay execution for 1 second
    await delay(100);

    if (newItems.length === 0) {
      // if no new items were fetched, set all loaded to true to prevent further requests
      setAllLoaded(true);
    } else {
      // process the newly fetched items
      await persistResults(newItems);
    }

    // load more complete, set loading more to false
    setLoadingMore(false);
  }

// const loadDataOnClick = (id) => {
//   console.log(id);
//     // dispatch(clickedProduct(listItems));
//   }


  


   const selectItemHandler = (item, product_title_eng) => {
    props.navigation.navigate("ProductDetail", {
      item: item,
      title: product_title_eng
    });
  };

  return (
    <View style={{flex: 1}}>
     <Category subMenu={subMenu} />
      <FlatList
        contentContainerStyle={styles.list}
        // ListHeaderComponent={
        //   <View style={styles.header}>
        //     <Text style={styles.title}>Displaying {totalItems} Items</Text>
        //   </View>
        // }
        ListFooterComponent={
          <View style={styles.centered}>
             {loadingMore && 
               <ActivityIndicator size="large" color={Colors.primary} />
             }
          </View>
        }
        scrollEventThrottle={250}
        onEndReached={info => {
          loadMoreResults(info);
        }}
        onEndReachedThreshold={0.01}
        data={listItems}
        keyExtractor={(item) => item.product_id}
        numColumns={2}
        renderItem={({item}) => (
        <ProductItem
          id={item.product_id}
          product={item}
          image={IMAGE_URL + item.type_id+'/'+ item.app_pic1}
          title={item.product_title_eng}
          price={item.sale_price}
          onSelect={() => {
            selectItemHandler(item, item.product_title_eng);
          }}
        />
      )}
      />
      <View style={styles.screen}>
        <CartButton onPress={() => setIsAddMode(true)} />
        <PopUpModal
          visible={isAddMode}
          onCancel={cancelModal}
          onSelect={() => { props.navigation.navigate("Cart");
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