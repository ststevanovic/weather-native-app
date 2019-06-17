import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

export default class SearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      placeholder: this.props.placeholder,
      onSubmit: this.props.onSubmit
    };
  }

  fakeHanleChange = newLocation => {
    // example of unidirectional data flow P => C ... so this will not work back.
    // Have to pass handler to be called in the P. component.
    this.props.location = newLocation;
  };

  handleChangeText = event => {
    const text = event.nativeEvent.text;
    this.setState({ text });
  };

  handleSubmitEditing = () => {
    const { text, onSubmit } = this.state;

    if (!text) return;

    onSubmit(text);
    this.setState({ text: "" });
  };

  render() {
    //destructuring
    const { text, placeholder } = this.state;

    return (
      <View style={styles.container}>
        <TextInput
          autoCorrect={false}
          value={text}
          placeholder={placeholder}
          placeholderTextColor="white"
          style={styles.textInput}
          clearButtonMode="always"
          onChange={this.handleChangeText}
          onSubmitEditing={this.handleSubmitEditing}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: 200,
    marginTop: 20,
    backgroundColor: "#666",
    marginHorizontal: 40,
    paddingHorizontal: 10,
    borderRadius: 5
  },
  textInput: {
    flex: 1,
    color: "white"
  }
});
