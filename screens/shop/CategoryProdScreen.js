import React, { useState, useMemo } from "react";
import {
  FlatList,
  View,
  StyleSheet,
} from "react-native";
import { useSelector } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import { IMAGE_URL} from "../../BaseUrl";
import PopUpModal from "../../components/shop/PopUpModal"
import CartButton from "../../components/shop/CartButton";

const CategoryProdScreen = (props) => {
  const typeId = props.route.params;
   const [isAddMode, setIsAddMode] = useState(false);
  const cancelModal = () => {
    setIsAddMode(false);
  };
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

  const categorProd = useSelector((state) =>
    state.Data.saveProduct.filter((product) => {
      return product.type_id === typeId.id;
    })
  );



   const renderItem = ({ item }) => (
        <ProductItem
           id={item.product_id}
          product={item}
          image={IMAGE_URL + item.type_id+'/'+ item.app_pic1}
          title={item.product_title_eng}
          price={item.sale_price}
          onSelect={() => {
            selectItemHandler(item.product_id, item.product_title_eng);
          }}
        />
    );
  
  const memoizedValue = useMemo(() => renderItem, [categorProd]);


  const selectItemHandler = (product_id, name) => {
    props.navigation.navigate("ProductDetail", {
      productId: product_id,
      productTitle: name,
    });
  };
  return (
       <View style={styles.main}>
    <FlatList
      style={{ marginTop: 5 }}
      initialNumToRender={7}
      data={categorProd}
      keyExtractor={item => item.product_id}
      numColumns={2}
      renderItem={memoizedValue}
      />
        {cartItems.length !== 0 && 
        <View style={styles.screen}>
        <CartButton onPress={() => setIsAddMode(true)} />
        <PopUpModal
          visible={isAddMode}
          onCancel={cancelModal}
          onSelect={() => { props.navigation.navigate("Cart");
              cancelModal()}}/>
        </View>
        }
    </View>     
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: navData.route.params.title,
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

export default CategoryProdScreen;