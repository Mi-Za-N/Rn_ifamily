import React, {useState} from 'react';
import { View,Text, StyleSheet,ScrollView, TouchableOpacity,Image } from 'react-native';
import Colors from "../../constants/Colors";

const CategoryScreen = ({subMenu }) => {
  return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesListContainer}
        >
        {subMenu.map((sm) => (
          <TouchableOpacity
            key={sm.subtype_id}
            activeOpacity={0.8}
            // onPress={() => setSelectedCategoryIndex(sm)}
            >
            <View
              style={{backgroundColor: Colors.primary,
                ...styles.categoryBtn}}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 'bold',
                  marginHorizontal: 5,
                  color:Colors.white,
                }}>
                {sm.subproduct_type}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
};

const styles = StyleSheet.create({
  categoriesListContainer: {
    paddingVertical: 6,
    alignItems: 'center',
    paddingHorizontal: 6,
    
  },
  categoryBtn: {
    height: 35,
    width: "100%",
    marginRight: 7,
    borderRadius: 30,
    alignItems: 'center',
    paddingHorizontal: 2,
    flexDirection: 'row',
    marginHorizontal: 3
  },
  image: {
   height: 35,
   width: 35, 
   resizeMode: 'cover'
  },
  categoryBtnImgCon: {
    height: 30,
    width: 30,
    backgroundColor: Colors.white,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CategoryScreen;