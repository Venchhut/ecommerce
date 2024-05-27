import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SliderBox } from "react-native-image-slider-box";
import { COLORS } from "../../constants";
const Slider = () => {
  const slides = [
    "https://img.freepik.com/premium-psd/smart-watch-mockup-geometric-scene_23-2149896814.jpg?w=900",
    "https://img.freepik.com/premium-psd/black-friday-sale-laptops-gadgets-banner-template-3d-render_444361-44.jpg?w=1060",
    "https://img.freepik.com/premium-psd/black-friday-sale-laptops-with-dark-background-3d-render_444361-42.jpg?w=1060",
  ];
  return (
    <View style={styles.carouselContainer}>
      <SliderBox
        images={slides}
        dotColor={COLORS.primary}
        inactiveDotColor={COLORS.secondary}
        ImageComponentStyle={{ borderRadius: 15, width: "93%", marginTop: 15 }}
        autoplay
        circleLoop
      />
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({});
