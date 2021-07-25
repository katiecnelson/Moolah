import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
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
                tabBarIcon: props => (
                    <Icon name="dashboard" color={props.color} size={props.focused ? 36 : 30} />
                ),
            }}
        />
        <Tab.Screen
            name="Needs"
            component={NeedsStack}
            options={{
                tabBarIcon: props => (
                    <Icon name="needs" color={props.color} size={props.focused ? 36 : 30} />
                ),
            }}
        />
        <Tab.Screen
            name="Wants"
            component={WantsStack}
            options={{
                tabBarIcon: props => (
                    <Icon name="wants" color={props.color} size={props.focused ? 36 : 30} />
                ),
            }}
        />
        <Tab.Screen
            name="Goals"
            component={GoalsStack}
            options={{
                tabBarIcon: props => (
                    <Icon name="goals" color={props.color} size={props.focused ? 36 : 30} />
                ),
            }}
        />
        <Tab.Screen
            name="New"
            component={NewTransactionStack}
            options={{
                tabBarIcon: props => (
                    <Icon name="new" color={props.color} size={props.focused ? 36 : 30} />
                ),
            }}
        />
    </Tab.Navigator>
}

export default TabNavigator;