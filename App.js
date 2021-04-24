 
import { StatusBar } from "expo-status-bar";
import React from "react";
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import BlockRGB from "./Components/BlockRGB.js";
import { useState } from "react";
import { useEffect } from "react";
import { color } from "react-native-reanimated";

function HomeScreen({navigation}) {

const [colorArray, setColorArray] = useState([]);
function renderItem({ item }) {
  return (
    <TouchableOpacity

    onPress={() => navigation.navigate("DetailsScreen", { ...item })}
    >
      <BlockRGB red={item.red} green={item.green} blue={item.blue} />
    </TouchableOpacity>
  );
}

useEffect(() => {
  navigation.setOptions({
    headerRight: () => <Button onPress={addColor} title="Add colour" />,
  });

});

function addColor() {
  setColorArray([
    ...colorArray,
    {
      red: Math.floor(Math.random() * 256),
      green: Math.floor(Math.random() * 256),
      blue: Math.floor(Math.random() * 256),
      id: `${colorArray.length}`,
    },
  ]);
}
function reset() {
  setColorArray([]);
}
return (
  <View style={styles.container}>
    

    <TouchableOpacity
      style={{ height: 40, justifyContent: "center" }}
      onPress={reset}
    >
      <Text style={{ color: "red" }}>Reset</Text>
    </TouchableOpacity>
    <FlatList style={styles.list} data={colorArray} renderItem={renderItem} />
  </View>
);
}


const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Colour List" component={HomeScreen} />
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
  }

  function DetailsScreen({ route }) {
    // Destructure this object so we don't have to type route.params.red etc
    const { red, green, blue } = route.params;
   
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: `rgb(${red}, ${green}, ${blue})` },
        ]}
      >
        <View style={{ padding: 30 }}>
          <Text style={styles.detailText}>Red: {red}</Text>
          <Text style={styles.detailText}>Green: {green}</Text>
          <Text style={styles.detailText}>Blue: {blue}</Text>
        </View>
      </View>
    );
   }
const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: "#fff",
   alignItems: "center",
   justifyContent: "center",
 },
 list:{width:"100%"}
});