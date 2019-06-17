import React from "react";
import { StyleSheet, Text, View, Platform } from "react-native";

export default class ContentView extends React.Component {
  render() {
    const { location, weather, temperature } = this.props;
    const capitalize = location => {
      return location.charAt(0).toUpperCase() + location.slice(1);
    };

    return (
      <>
        <Text style={[styles.largeText, styles.textStyle]}>
          {capitalize(location)}
        </Text>
        <Text style={[styles.smallText, styles.textStyle]}>{weather}</Text>
        <Text style={[styles.largeText, styles.textStyle]}>{`${Math.round(
          temperature
        )}°`}</Text>
      </>
    );
  }
}

const styles = {
  textStyle: {
    textAlign: "center",
    color: "white",
    textShadowColor: "blue",
    textShadowOffset: { width: 2, height: -2 },
    textShadowRadius: 20,
    ...Platform.select({
      ios: {
        fontFamily: "AvenirNext-Regular"
      },
      android: {
        fontFamily: "Roboto"
      }
    })
  },
  largeText: {
    fontSize: 44
  },
  smallText: {
    fontSize: 18
  }
};
