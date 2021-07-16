import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import Needs from "../screens/Needs";
import History from "../screens/History";

const Stack = createStackNavigator()

const DashStack = () => {
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
                    title: "NEEDS", 
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
export default DashStack;