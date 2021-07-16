import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import History from "../screens/History";
import NewTransaction from "../screens/NewTransaction";

const Stack = createStackNavigator()

const NewTransactionStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerBackTitleVisible: false,
                headerTintColor: "#48cae4",
            }}
            initialRouteName="New">
            <Stack.Screen
                name="New"
                component={NewTransaction}
                options={{
                    title: "NEW TRANSACTION", 
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
export default NewTransactionStack;