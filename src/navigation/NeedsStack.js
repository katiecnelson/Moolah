import React, {useContext} from "react";
import {createStackNavigator} from "@react-navigation/stack";
import Needs from "../screens/Needs";
import History from "../screens/History";
import {Context as CategoryIncomeContext} from "../context/CategoryIncomeContext";
import GlobalStyle from "../components/GlobalStyle";
import EditTransaction from "../screens/EditTransaction";

const Stack = createStackNavigator();

// Returns the stack navigator used by the Needs screen

const DashStack = () => {

    const categoryIncome = useContext(CategoryIncomeContext);
    const title = categoryIncome.state.labelOne;
    const headerTitleStyle = GlobalStyle.headerTitleStyle;

    return (
        <Stack.Navigator
            screenOptions={{
                headerTitleAlign: "center",
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
            <Stack.Screen
                name="Edit Transaction"
                component={EditTransaction}
                options={{
                    title: "EDIT TRANSACTION", 
                    headerTitleStyle: headerTitleStyle,
                }}
            />
        </Stack.Navigator>
    )
}

export default DashStack;