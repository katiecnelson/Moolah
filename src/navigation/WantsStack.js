import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import Wants from "../screens/Wants";
import History from "../screens/History";

const Stack = createStackNavigator()

const WantsStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerBackTitleVisible: false,
                headerTintColor: "#48cae4",
            }}
            initialRouteName="Wants">
            <Stack.Screen
                name="Wants"
                component={Wants}
                options={{
                    title: "WANTS", 
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
export default WantsStack;