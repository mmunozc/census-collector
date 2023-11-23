import { View, Text, Pressable } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { CheckBox } from 'react-native-elements';
import { COLORS } from "../constants";
import { SendUpdate } from "../database/APIconection";


const DwellingComponent = ({ item, user }) => {
  const [state, setState] = useState(item.state);

  const handlePress = async () => {
    item.state = !item.state;
    setState(item.state);
    SendUpdate(user, item.CFN, item.state);
  };

  return (
    item && (
      <View style={styles.container}>
        <View style={styles.container2}>
          <Text style={styles.text}>{"Dirección: " + item.direction}</Text>
          <Text style={styles.text}>{"ECN: " + item.ECN}</Text>
          <Text style={styles.text}>{"CFN: " + item.CFN}</Text>
        </View>
        <CheckBox
          checked={state}
          onPress={handlePress}
          containerStyle={styles.checkboxContainer}
          checkedColor={COLORS.tertiary}// Set the color for the checked state
          uncheckedColor={COLORS.tertiary}
        />
      </View>
    )
  );
};

export default DwellingComponent;

// Define your styles in styles.js or wherever you have them
const styles = {
  container: {
    flexDirection: "row", // Align children in a row
    alignItems: "center", // Center items vertically
    justifyContent: "space-between", // Distribute space evenly between children\
    padding: 10, // Add padding for better visibility
    borderWidth: 3, // Add a border
    borderRadius: 10, // Add curved edges
    borderColor: COLORS.tertiary, // Border color
    backgroundColor: COLORS.secondary, // Background color
    marginVertical: 5, // Add vertical margin
    marginHorizontal: 5, // Add horizontal margin
  },
  container2: {
    flexDirection: "column", // Align children in a column
    alignItems: "flex-start", // Align items to the left
  },
  text: {
    marginVertical: 5, // Add vertical margin between text elements
  },
  checkboxContainer: {
    marginLeft: "auto", // Move the checkbox to the right by pushing it to the end of the container
  },
};
