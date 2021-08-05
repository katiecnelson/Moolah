import React, {useContext} from "react";
import {createStackNavigator} from "@react-navigation/stack";
import Goals from "../screens/Goals";
import History from "../screens/History";
import {Context as CategoryIncomeContext} from "../context/CategoryIncomeContext";
import GlobalStyle from "../components/GlobalStyle";
import EditTransaction from "../screens/EditTransaction";

const Stack = createStackNavigator();

const GoalsStack = () => {
    const categoryIncome = useContext(CategoryIncomeContext);
    const title = categoryIncome.state.labelThree;
    const headerTitleStyle = GlobalStyle.headerTitleStyle;
    
    return (
        <Stack.Navigator
            screenOptions={{
                headerTitleAlign: "center",
                headerBackTitleVisible: false,
                headerTintColor: "#48cae4",
            }}
            initialRouteName="Goals">
            <Stack.Screen
                name="Goals"
                component={Goals}
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
    );
};

export default GoalsStack;