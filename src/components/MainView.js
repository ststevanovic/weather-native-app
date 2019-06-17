import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  TextInput,
  ActivityIndicator
} from "react-native";
// import { getLocationId, getWeather } from "../../utils/api.js";
import { fetchData } from "../../utils/api.js";
import getImageForWeather from "../../utils/getImageForWeather.js";

import SearchInput from "./SearchInput.js";
import ContentView from "./ContentView.js";

export default class MainView extends Component {
  state = {
    location: "london",
    weather: "",
    temperature: "",
    loading: false,
    error: false
  };

  async componentDidMount() {
    fetch(
      `https://www.metaweather.com/api/location/search/?query=${
        this.state.location
      }`
    )
      .then(results => {
        return results.json();
      })
      .then(responseJson => {
        let woeid = responseJson[0].woeid;

        fetch(`https://www.metaweather.com/api/location/${woeid}/`)
          .then(response => response.json())
          .then(responseJson => {
            let data = responseJson.consolidated_weather;
            let weather = data[0]["weather_state_name"];
            let temperature = data[0]["the_temp"];
            this.setState({ weather, temperature });
          });
      });
  }

  handleUpdateLocation = async location => {
    if (!location) return;

    this.setState({ loading: true }, async () => {
      try {
        const { weather, temperature } = await fetchData(location);

        this.setState({
          loading: false,
          error: false,
          location,
          weather,
          temperature
        });
      } catch (e) {
        this.setState({
          loading: false,
          error: true
        });
      }
    });
  };

  render() {
    const { location, weather, temperature, loading, error } = this.state;
    return (
      <KeyboardAvoidingView // in relations to keyboard
        style={styles.container}
        behavior="padding"
      >
        <ImageBackground
          source={getImageForWeather(weather)}
          style={styles.imageContainer}
          imageStyle={styles.image}
        >
          <View style={styles.detailsContainer}>
            <ActivityIndicator animating={loading} color="white" size="large" />

            {!loading && (
              <View>
                {error && (
                  <Text style={styles.errorText}>
                    Could not load your city or wather.
                  </Text>
                )}
                {!error && (
                  <ContentView
                    location={location}
                    weather={weather}
                    temperature={temperature}
                  />
                )}
                <SearchInput
                  placeholder="Search the city"
                  onSubmit={this.handleUpdateLocation}
                />
              </View>
            )}
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },

  textInput: {
    backgroundColor: "#666",
    color: "white",
    height: 40,
    width: 300,
    marginTop: 20,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    alignSelf: "center"
  },
  imageContainer: {
    // flex: 1
    width: "100%",
    height: "100%"
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    opacity: 0.7,
    resizeMode: "cover"
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    paddingHorizontal: 20
  },
  errorText: {
    backgroundColor: "gray",
    color: "red",
    fontWeight: "bold"
  }
});
