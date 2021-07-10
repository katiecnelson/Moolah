import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import Settings from "../screens/Settings";
import Dashboard from "../screens/Dashboard";
import { TouchableOpacity } from "react-native";
import Icon from "../components/Icon";
import Reminders from "../screens/Reminders";

const Stack = createStackNavigator()

const DashStack = () => {
    return (
        <Stack.Navigator initialRouteName="Dashboard">
            <Stack.Screen
                name="Dashboard"
                component={Dashboard}
                options={({navigation}) => ({
                    title: "DASHBOARD", 
                    headerTitleStyle: {
                        fontFamily: "Nunito-Regular",
                        color: "#03045e",
                        fontSize: 24,
                        textAlign: "center",
                    },
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
                    headerTitleStyle: {
                        fontFamily: "Nunito-Regular",
                        color: "#03045e",
                        fontSize: 24,
                        textAlign: "center",
                    },
                }}    
            />
            <Stack.Screen name="Reminders" component={Reminders}/>
        </Stack.Navigator>
    )
}
export default DashStack;