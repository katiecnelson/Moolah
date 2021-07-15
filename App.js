import React from 'react';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./src/navigation/TabNavigator"
import {useFonts} from "expo-font";
import {Provider as ReminderProvider} from "./src/context/ReminderContext";
import {Provider as TransactionProvider} from "./src/context/TransactionContext";
import {Provider as IncomeProvider} from "./src/context/IncomeContext";
import {Provider as CategoryProvider} from "./src/context/CategoryContext";
import useDatabase from './src/hooks/useDatabase';


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
        <CategoryProvider>
          <IncomeProvider>
            <TransactionProvider>
              <ReminderProvider>
                <NavigationContainer>
                  <TabNavigator />
                </NavigationContainer>
              </ReminderProvider>
            </TransactionProvider>
          </IncomeProvider>
        </CategoryProvider>
    );
  }
}
