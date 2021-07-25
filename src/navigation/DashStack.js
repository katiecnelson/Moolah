import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import Settings from "../screens/Settings";
import Dashboard from "../screens/Dashboard";
import { TouchableOpacity } from "react-native";
import Icon from "../components/Icon";
import Reminders from "../screens/Reminders";
import History from "../screens/History";
import GlobalStyle from "../components/GlobalStyle";

const Stack = createStackNavigator()

const DashStack = () => {

    const headerTitleStyle = GlobalStyle.headerTitleStyle;

    return (
        <Stack.Navigator
            screenOptions={{
                headerBackTitleVisible: false,
                headerTintColor: "#48cae4",
            }}
            initialRouteName="Dashboard">
            <Stack.Screen
                name="Dashboard"
                component={Dashboard}
                options={({navigation}) => ({
                    title: "DASHBOARD", 
                    headerTitleStyle: headerTitleStyle,
                    headerRight: () => {
                        return (
                            <TouchableOpacity style={{paddingRight: 7}} onPress={() => navigation.navigate("Settings")}>
                                <Icon name="gear" style={{fontSize: 28, color: "#b7b7b7"}} />
                            </TouchableOpacity>
                        )
                    },
                    headerLeft: () => {
                        return (
                            <TouchableOpacity style={{paddingLeft: 7}} onPress={() => navigation.navigate("Reminders")}>
                                <Icon name="bell" style={{fontSize: 28, color: "#b7b7b7"}} />
                            </TouchableOpacity>
                        )
                    },
                })}
            />
            <Stack.Screen
                name="Settings"
                component={Settings}
                options={{
                    title: "SETTINGS", 
                    headerTitleStyle: headerTitleStyle,
                }}    
            />
            <Stack.Screen
                name="Reminders"
                component={Reminders}
                options={{
                    title: "REMINDERS", 
                    headerTitleStyle: headerTitleStyle,
                }}
            />
            <Stack.Screen
                name="History"
                component={History}
                options={{
                    title: "HISTORICAL DATA", 
                    headerTitleStyle: headerTitleStyle,
                }}
            />
        </Stack.Navigator>
    )
}
export default DashStack;