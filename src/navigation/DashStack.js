import React, {useContext, useEffect} from "react";
import {View, Text} from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import Settings from "../screens/Settings";
import Dashboard from "../screens/Dashboard";
import { TouchableOpacity } from "react-native";
import Icon from "../components/Icon";
import Reminders from "../screens/Reminders";
import History from "../screens/History";
import EditTransaction from "../screens/EditTransaction";
import GlobalStyle from "../components/GlobalStyle";
import {Context as ReminderContext} from "../context/ReminderContext";
import {getBadgeCount} from "../utilities/helper";

const Stack = createStackNavigator()

const DashStack = () => {

    const reminder = useContext(ReminderContext);
    const headerTitleStyle = GlobalStyle.headerTitleStyle;

    const badgeCount = getBadgeCount(reminder.state);

    useEffect(() => {
        reminder.getReminders();
      }, []);

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
                                <Icon name="gear" style={{fontSize: 32, color: "#b7b7b7"}} />
                            </TouchableOpacity>
                        )
                    },
                    headerLeft: () => {
                        return (
                            <TouchableOpacity style={{paddingLeft: 7}} onPress={() => navigation.navigate("Reminders")}>
                                <View style={{flexDirection: "row"}}>
                                <Icon name="bell" style={{fontSize: 32, color: "#b7b7b7"}} />
                                {( badgeCount > 0
                                   ? <View style={{position: "absolute", marginLeft: 15, lineHeight: 2, backgroundColor: "#48cae4", borderRadius: 50, width: 23, height: 23, alignItems: "center", justifyContent: "center"}}>
                                        <Text style={GlobalStyle.WhiteBold}>{badgeCount}</Text>
                                    </View>
                                    : null
                                )}
                                </View>
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