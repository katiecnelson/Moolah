import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NewTransaction from "../screens/NewTransaction";
import Icon from "../components/Icon";
import DashStack from "./DashStack";
import NeedsStack from "./NeedsStack"
import WantsStack from "./WantsStack"
import GoalsStack from "./GoalsStack";
import NewTransactionStack from "./NewTransactionStack";

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
            component={DashStack}
            options={{
                tabBarIcon: ({ color, size }) => (
                    <Icon name="dashboard" color={color} size={32} />
                ),
            }}
        />
        <Tab.Screen
            name="Needs"
            component={NeedsStack}
            options={{
                tabBarIcon: ({ color, size }) => (
                    <Icon name="needs" color={color} size={32} />
                ),
            }}
        />
        <Tab.Screen
            name="Wants"
            component={WantsStack}
            options={{
                tabBarIcon: ({ color, size }) => (
                    <Icon name="wants" color={color} size={32} />
                ),
            }}
        />
        <Tab.Screen
            name="Goals"
            component={GoalsStack}
            options={{
                tabBarIcon: ({ color, size }) => (
                    <Icon name="goals" color={color} size={32} />
                ),
            }}
        />
        <Tab.Screen
            name="New"
            component={NewTransactionStack}
            options={{
                tabBarIcon: ({ color, size }) => (
                    <Icon name="new" color={color} size={32} />
                ),
            }}
        />
    </Tab.Navigator>
}

export default TabNavigator;