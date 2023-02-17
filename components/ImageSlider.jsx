import React from "react";
import { View, Image, ScrollView, Dimensions, Animated } from "react-native";

let { width } = Dimensions.get("window");

export default class ImageSlider extends React.Component {
  scrollX = new Animated.Value(0);
  render() {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={{ width, height: width }}>
          <ScrollView
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
          >
            {this.props.images.map((image, i) => {
              return (
                <Image
                  key={i}
                  style={{ width, height: width }}
                  source={image}
                />
              );
            })}
          </ScrollView>
        </View>
      </View>
    );
  }
}
