import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import NewTransaction from "../screens/NewTransaction";
import Settings from "../screens/Settings";
import GlobalStyle from "../components/GlobalStyle";

const Stack = createStackNavigator();

// Returns the stack navigator used by the NewTransaction screen

const NewTransactionStack = () => {

    const headerTitleStyle = GlobalStyle.headerTitleStyle;

    return (
        <Stack.Navigator
            screenOptions={{
                headerTitleAlign: "center",
                headerBackTitleVisible: false,
                headerTintColor: "#48cae4",
            }}
            initialRouteName="New">
            <Stack.Screen
                name="New"
                component={NewTransaction}
                options={{
                    title: "NEW TRANSACTION", 
                    headerTitleStyle: headerTitleStyle
                }}
            />
            <Stack.Screen
                name="Settings"
                component={Settings}
                options={{
                    title: "SETTINGS", 
                    headerTitleStyle: headerTitleStyle
                }}    
            />
        </Stack.Navigator>
    );
};

export default NewTransactionStack;