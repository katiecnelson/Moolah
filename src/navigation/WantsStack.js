import React, {useContext} from "react";
import { createStackNavigator } from '@react-navigation/stack';
import Wants from "../screens/Wants";
import History from "../screens/History";
import {Context as CategoryIncomeContext} from "../context/CategoryIncomeContext";
import GlobalStyle from "../components/GlobalStyle";

const Stack = createStackNavigator()

const WantsStack = () => {

    const categoryIncome = useContext(CategoryIncomeContext)
    const title = categoryIncome.state.labelTwo;
    const headerTitleStyle = GlobalStyle.headerTitleStyle;

    return (
        <Stack.Navigator
            screenOptions={{
                headerTitleAlign: "center",
                headerBackTitleVisible: false,
                headerTintColor: "#48cae4",
            }}
            initialRouteName="Wants">
            <Stack.Screen
                name="Wants"
                component={Wants}
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
export default WantsStack;