import React from 'react';
import * as Font from "expo-font";
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./app/navigation/TabNavigator"

let customFonts = {
  "Nunito-Black": require("./assets/fonts/Nunito-Black.ttf"),
  "Nunito-Bold": require("./assets/fonts/Nunito-Bold.ttf"),
  "Nunito-Regular": require("./assets/fonts/Nunito-Regular.ttf"),
  "Moolah-Icons": require("./assets/fonts/icomoon.ttf"),
};

export default class App extends React.Component {
  state = {
    fontsLoaded: false,
  };

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  render() {
    if (this.state.fontsLoaded) {
      return (
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      );
    } else {
      return <AppLoading />;
    }
  }
}