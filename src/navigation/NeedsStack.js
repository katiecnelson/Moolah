import React, {useContext} from "react";
import { createStackNavigator } from '@react-navigation/stack';
import Needs from "../screens/Needs";
import History from "../screens/History";
import {Context as CategoryIncomeContext} from "../context/CategoryIncomeContext";
import GlobalStyle from "../components/GlobalStyle";

const Stack = createStackNavigator()

const DashStack = () => {

    const categoryIncome = useContext(CategoryIncomeContext)
    const title = categoryIncome.state.labelOne;
    const headerTitleStyle = GlobalStyle.headerTitleStyle;

    return (
        <Stack.Navigator
            screenOptions={{
                headerBackTitleVisible: false,
                headerTintColor: "#48cae4",
            }}
            initialRouteName="Needs">
            <Stack.Screen
                name="Needs"
                component={Needs}
                options={{
                    title: title, 
                    headerTitleStyle: headerTitleStyle
                }}
            />
            <Stack.Screen
                name="History"
                component={History}
                options={{
                    title: "HISTORICAL DATA", 
                    headerTitleStyle: headerTitleStyle
                }}   
            />
        </Stack.Navigator>
    )
}
export default DashStack;