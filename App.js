import React from "react";
import AppLoading from "expo-app-loading";
import {NavigationContainer} from "@react-navigation/native";
import TabNavigator from "./src/navigation/TabNavigator"
import {useFonts} from "expo-font";
import {Provider as ReminderProvider} from "./src/context/ReminderContext";
import {Provider as TransactionProvider} from "./src/context/TransactionContext";
import {Provider as CategoryIncomeProvider} from "./src/context/CategoryIncomeContext";
import {Provider as TagProvider} from "./src/context/TagContext";
import useDatabase from "./src/hooks/useDatabase";

/**
 * Returns the app after fonts and database have loaded
 * The app is wrapped in context providers for global data store
 */

export default function App() {

  const [loaded] = useFonts({
    "Nunito-Black": require("./assets/fonts/Nunito-Black.ttf"),
    "Nunito-Bold": require("./assets/fonts/Nunito-Bold.ttf"),
    "Nunito-Regular": require("./assets/fonts/Nunito-Regular.ttf"),
    "Moolah-Icons": require("./assets/fonts/icomoon.ttf"),
  });

  const isDBLoaded = useDatabase();
if (!loaded || !isDBLoaded) {
    return <AppLoading />;
  } else {
      return (
        <TagProvider>
          <CategoryIncomeProvider>
              <TransactionProvider>
                <ReminderProvider>
                  <NavigationContainer>
                    <TabNavigator />
                  </NavigationContainer>
                </ReminderProvider>
              </TransactionProvider>
          </CategoryIncomeProvider>
        </TagProvider>
    );
  }
};