const images = {
  Clear: require("../assets/bg-images/clear.jpeg"),
  Hail: require("../assets/bg-images/hail.jpeg"),
  "Heavy Cloud": require("../assets/bg-images/heavy-cloud.jpeg"),
  "Light Cloud": require("../assets/bg-images/light-cloud.jpeg"),
  "Heavy Rain": require("../assets/bg-images/heavy-rain.jpeg"),
  "Light Rain": require("../assets/bg-images/light-rain.jpeg"),
  Showers: require("../assets/bg-images/showers.jpeg"),
  Sleet: require("../assets/bg-images/sleet.jpeg"),
  Snow: require("../assets/bg-images/snow.jpeg"),
  Thunderstorm: require("../assets/bg-images/thunderstorm.jpeg")
};

export default weather => images[weather];
