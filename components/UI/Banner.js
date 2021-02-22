import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Dimensions, View, ScrollView } from "react-native";
import Swiper from "react-native-swiper/src";

var { width } = Dimensions.get("window");

const Banner = () => {
  const [bannerData, setBannerData] = useState([]);

  useEffect(() => {
    setBannerData([
      "https://www.ifamilymart.com.bd/ifm/assets/product_image/slider/main_slider27997044352210221_theme1.jpg",
      "https://www.ifamilymart.com.bd/ifm/assets/product_image/slider/main_slider18929043431210221_theme1.jpg",
      "https://www.ifamilymart.com.bd/ifm/assets/product_image/slider/main_slider38843043458210221_theme1.jpg",
    ]);

    return () => {
      setBannerData([]);
    };
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.swiper}>
          <Swiper
            style={{ height: width/2 - 40 }}
            showButtons={false}
            autoplay={true}
            autoplayTimeout={2}
          >
            {bannerData.map((item) => {
              return (
                <Image
                  key={item}
                  style={styles.imageBanner}
                  resizeMode="contain"
                  source={{ uri: item }}
                />
              );
            })}
          </Swiper>
          <View style={{ height: 25 }}></View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "gainsboro",
    
  },
  swiper: {
    width: width,
    alignItems: "center",
    // marginHorizontal: 10,
  },
  imageBanner: {
    height: 120,
    width: width,
    // borderRadius: 10,
    marginRight: 20,
  },
});

export default Banner;
