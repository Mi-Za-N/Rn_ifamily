import React, {useEffect, useState, useMemo } from "react";
import axios from "axios";
import {
  FlatList,
  Text,
  View,
  Button,
  StyleSheet,
  TextInput,
  ActivityIndicator
} from "react-native";
import ProductItem from "../../components/shop/ProductItem";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import {baseURL, IMAGE_URL} from "../../BaseUrl";
import Colors from "../../constants/Colors";
import PopUpModal from "../../components/shop/PopUpModal";
import MainButton from "../../components/shop/MainButton";
import Banner from "../../components/UI/Banner";
import { useAppState, useAppDispatch } from "../../contexts/app/app.provider";


const ProductsOverviewScreen = (props) => {
  const [data, setData ] = useState([]);
  const products = useAppState("showProductInfo");
  
  // console.log(products);
  const [sidebarItem, setSidebar] = useState([]);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [loadData, setLoadData] = useState(true)

  const [isAddMode, setIsAddMode] = useState(false);
  const cancelModal = () => {
    setIsAddMode(false);
  };


   useEffect(() => {
    axios.get(baseURL)
      .then((res) => {
        setSidebar(res.data.menu_item);
        setData(res.data);
        // setSlider(res.data.desktopSliderInfo);
        dispatch({ type: 'SAVE_PRODUCT_INFO', payload: res.data.allProductInfo });
        dispatch({ type: 'SAVE_SIDEBAR_DATA', payload: res.data.menu_item });
        setLoading(false);
        setLoadData(false);
      })
      .catch((error) => {
        console.log('Api call error');
        setError(true)
      });

      return () => {
         dispatch();
          setData([]);
          setSidebar([]);
        };
  }, []);

  const selectItemHandler = (item, product_title_eng) => {
    props.navigation.navigate("ProductDetail", {
      item: item,
      title: product_title_eng
    });
  };

   const renderItem = ({ item }) => (
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
    );
  
  const memoizedValue = useMemo(() => renderItem, [products]);
  const dispatch = useAppDispatch();
   

    if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button
          title="Try again"
          // onPress={loadProducts}
          color={Colors.primary}
        />
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!loading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No products found. please swipe down for refresh </Text>
      </View>
    );
  }


   let myVar = 0;
  const handleOnChange = (text) => {
    if (myVar) clearTimeout(myVar);
     myVar = setTimeout(function(){ dispatch({ type: 'SET_SEARCH_TERM', payload: text }); }, 1000);
    
  };


  props.navigation.setOptions({
    headerRight: () => (
      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            width: 270,
            height: 35,
            borderColor: "white",
            borderRadius: 15,
            borderWidth: 1,
            backgroundColor: "white",
          }}
        >
          <TextInput 
          onChangeText={(text) => handleOnChange(text)}
          placeholder="Search..." style={{ padding: 5 }} />
        </View>

        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="search"
            iconName="ios-search"
            onPress={() => {
              // navData.navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      </View>
    ),
  });

 

  const openModal = () => {
    setIsAddMode(true)
  }

  return (
     <View style={styles.main}>
       <Banner />
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

export default ProductsOverviewScreen;





// import React, {useEffect, useState, useMemo } from "react";
// import axios from "axios";
// import {
//   FlatList,
//   Text,
//   View,
//   Button,
//   StyleSheet,
//   TextInput,
//   ActivityIndicator
// } from "react-native";
// import delay from 'delay';
// import { useSelector, useDispatch } from "react-redux";
// import AsyncStorage from '@react-native-community/async-storage';
// import ProductItem from "../../components/shop/ProductItem";
// import { HeaderButtons, Item } from "react-navigation-header-buttons";
// import HeaderButton from "../../components/UI/HeaderButton";
// import {baseURL, IMAGE_URL} from "../../BaseUrl";
// import Colors from "../../constants/Colors";
// import PopUpModal from "../../components/shop/PopUpModal"
// import CartButton from "../../components/shop/CartButton";
// import Banner from "../../components/UI/Banner";
// import { saveProduct,saveCategory, searchProduct, updateProductlist } from "../../store/actions/Data";


// const ProductsOverviewScreen = (props) => {
//   const [data, setData] = useState([]);
//   const [sidebarItem, setSidebar] = useState([]);
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(false)
//   const [loadData, setLoadData] = useState(true)
//   const [loadingMore, setLoadingMore] = useState(false);
//     const [allLoaded, setAllLoaded] = useState(false);

//   const [isAddMode, setIsAddMode] = useState(false);
//   const cancelModal = () => {
//     setIsAddMode(false);
//   };

//   useEffect(() => {
//     axios.get(baseURL)
//       .then((res) => {
//         setSidebar(res.data.menu_item);
//         dispatch(saveCategory(res.data.menu_item));
//         dispatch(saveProduct(res.data.allProductInfo));
//         setData(res.data.allProductInfo);
//         // console.log(res.data.menu_item);
//         setLoading(false);
//         setLoadData(false);
//       })
//       .catch((error) => {
//         console.log('Api call error');
//         setError(true)
//       })
//   }, []);


//    const RECORDS_PER_FETCH = 20;
//     const fetchResults = (startingId = 0) => {
//     let obj = [];
  
//     for (let i = startingId; i < startingId + RECORDS_PER_FETCH; i++) {
//       if (data[i] === undefined)
//         break;

//       obj.push(data[i]);
//     }
//     return obj;
//   }

//   useEffect(() => {
//     initialiseList();
//   }, []);


//   const initialiseList = async () => {

//     // this is done for testing purposes - reset AsyncStorage on every app refresh
//     await AsyncStorage.removeItem('saved_list');

//     // get current persisted list items (will be null if above line is not removed)
//     const curItems = await AsyncStorage.getItem('saved_list');

//     if (curItems === null) {
//       // no current items in AsyncStorage - fetch initial items
//       json = fetchResults(0);

//       // set initial list in AsyncStorage
//       await AsyncStorage.setItem('saved_list', JSON.stringify(json));

//     } else {
//       // current items exist - format as a JSON object
//       json = JSON.parse(curItems);
//     }

//     // update Redux store (Redux will ignore if `json` is same as current list items) 
//     dispatch({
//       type: 'UPDATE_LIST_RESULTS',
//       items: json
//     });
//     // dispatch(updateProductlist);
//   }


//   const persistResults = async (newItems) => {

//     // get current persisted list items
//     const curItems = await AsyncStorage.getItem('saved_list');

//     // format as a JSON object
//     let json = curItems === null
//       ? {}
//       : JSON.parse(curItems);

//     // add new items to json object
//     for (let item of newItems) {
//       json.push(item);
//     }

//     // persist updated item list
//     await AsyncStorage.setItem('saved_list', JSON.stringify(json));

//     // update Redux store
//     dispatch({
//       type: 'UPDATE_LIST_RESULTS',
//       items: json
//     });
//     // dispatch(updateProductlist);
//   }


//   const loadMoreResults = async info => {

//     // if already loading more, or all loaded, return
//     if (loadingMore || allLoaded)
//       return

//     // set loading more (also updates footer text)
//     setLoadingMore(true);

//     // get next results
//     const newItems = fetchResults(totalItems);

//     // mimic server-side API request and delay execution for 1 second
//     await delay(100);

//     if (newItems.length === 0) {
//       // if no new items were fetched, set all loaded to true to prevent further requests
//       setAllLoaded(true);
//     } else {
//       // process the newly fetched items
//       await persistResults(newItems);
//     }

//     // load more complete, set loading more to false
//     setLoadingMore(false);
//   }


//   const dispatch = useDispatch();
//   const products = useSelector((state) => state.Data.items);
//   const totalItems = Array.isArray(products) ? products.length : 0;
//   // console.log(products);
  

//     if (error) {
//     return (
//       <View style={styles.centered}>
//         <Text>An error occurred!</Text>
//         <Button
//           title="Try again"
//           // onPress={loadProducts}
//           color={Colors.primary}
//         />
//       </View>
//     );
//   }

//   if (loading) {
//     return (
//       <View style={styles.centered}>
//         <ActivityIndicator size="large" color={Colors.primary} />
//       </View>
//     );
//   }

//   if (!loading && totalItems.length === 0) {
//     return (
//       <View style={styles.centered}>
//         <Text>No products found. please swipe down for refresh </Text>
//       </View>
//     );
//   }

//   const searchProductHandler = (text) => {
//     console.log(text);
//     dispatch(searchProduct(text));
//   };

//   props.navigation.setOptions({
//     headerRight: () => (
//       <View style={{ flexDirection: "row" }}>
//         <View
//           style={{
//             width: 270,
//             height: 35,
//             borderColor: "white",
//             borderRadius: 15,
//             borderWidth: 1,
//             backgroundColor: "white",
//           }}
//         >
//           <TextInput 
//           onChangeText={(text) => searchProductHandler(text)}
//           placeholder="Search..." style={{ padding: 5 }} />
//         </View>

//         <HeaderButtons HeaderButtonComponent={HeaderButton}>
//           <Item
//             title="search"
//             iconName="ios-search"
//             onPress={() => {
//               // navData.navigation.toggleDrawer();
//             }}
//           />
//         </HeaderButtons>
//       </View>
//     ),
//   });

//    const selectItemHandler = (item, product_title_eng) => {
//     props.navigation.navigate("ProductDetail", {
//       item: item,
//       title: product_title_eng
//     });
//   };

  

 

//   return (
//      <View style={styles.main}>
//        <Banner />
//       <FlatList
//         contentContainerStyle={styles.list}
//         // ListHeaderComponent={
//         //   <View style={styles.header}>
//         //     <Text style={styles.title}>Displaying {totalItems} Items</Text>
//         //   </View>
//         // }
//         ListFooterComponent={
//           <View style={styles.centered}>
//              {loadingMore && 
//                <ActivityIndicator size="large" color={Colors.primary} />
//              }
//           </View>
//         }
//         scrollEventThrottle={250}
//         onEndReached={info => {
//           loadMoreResults(info);
//         }}
//         onEndReachedThreshold={0.01}
//         data={products}
//         keyExtractor={(item) => item.product_id}
//         numColumns={2}
//         renderItem={({item}) => (
//         <ProductItem
//           id={item.product_id}
//           product={item}
//           image={IMAGE_URL + item.type_id+'/'+ item.app_pic1}
//           title={item.product_title_eng}
//           price={item.sale_price}
//           onSelect={() => {
//             selectItemHandler(item, item.product_title_eng);
//           }}
//         />
//       )}
//       />
        
//         <View style={styles.screen}>
//         <CartButton onPress={() => setIsAddMode(true)} />
//         <PopUpModal
//           visible={isAddMode}
//           onCancel={cancelModal}
//           onSelect={() => { props.navigation.navigate("Cart");
//               cancelModal()}}/>
//         </View> 
//     </View>
//   );
// };

// export const screenOptions = (navData) => {
//   return {
//     // headerTitle: "Popular Item",
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

// export default ProductsOverviewScreen;





