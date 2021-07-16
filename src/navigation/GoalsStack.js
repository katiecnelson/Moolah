import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import Goals from "../screens/Goals";
import History from "../screens/History";

const Stack = createStackNavigator()

const GoalsStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerBackTitleVisible: false,
                headerTintColor: "#48cae4",
            }}
            initialRouteName="Goals">
            <Stack.Screen
                name="Goals"
                component={Goals}
                options={{
                    title: "GOALS", 
                    headerTitleStyle: {
                        fontFamily: "Nunito-Regular",
                        color: "#03045e",
                        fontSize: 24,
                        textAlign: "center",
                    },
                }}
            />
            <Stack.Screen
                name="History"
                component={History}
                options={{
                    title: "HISTORICAL DATA", 
                    headerTitleStyle: {
                        fontFamily: "Nunito-Regular",
                        color: "#03045e",
                        fontSize: 24,
                        textAlign: "center",
                    },
                }}   
            />
        </Stack.Navigator>
    )
}
export default GoalsStack;