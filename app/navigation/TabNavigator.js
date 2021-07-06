import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from "../components/Dashboard";
import Needs from "../components/Needs";
import Wants from "../components/Wants";
import Goals from "../components/Goals";
import NewTransaction from "../components/NewTransaction";
import Icon from "../components/Icon";


const Tab = createBottomTabNavigator()
const TabNavigator = () => {
    return <Tab.Navigator
        tabBarOptions={{
            showLabel: false,
            activeTintColor: "#48cae4",
            inactiveTintColor: "#b7b7b7",
            style: {
                backgroundColor: "#fcfcfc"
            }
        }}
    >
        <Tab.Screen
            name="Dash"
            component={Dashboard}
            options={{
                tabBarIcon: ({ color, size }) => (
                    <Icon name="dashboard" color={color} size={32} />
                ),
            }}
        />
        <Tab.Screen
            name="Needs"
            component={Needs}
            options={{
                tabBarIcon: ({ color, size }) => (
                    <Icon name="needs" color={color} size={32} />
                ),
            }}
        />
        <Tab.Screen
            name="Wants"
            component={Wants}
            options={{
                tabBarIcon: ({ color, size }) => (
                    <Icon name="wants" color={color} size={32} />
                ),
            }}
        />
        <Tab.Screen
            name="Goals"
            component={Goals}
            options={{
                tabBarIcon: ({ color, size }) => (
                    <Icon name="goals" color={color} size={32} />
                ),
            }}
        />
        <Tab.Screen
            name="New"
            component={NewTransaction}
            options={{
                tabBarIcon: ({ color, size }) => (
                    <Icon name="new" color={color} size={32} />
                ),
            }}
        />
    </Tab.Navigator>
}

export default TabNavigator;