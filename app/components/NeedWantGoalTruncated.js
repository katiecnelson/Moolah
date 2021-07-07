import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "./Icon";

const NeedWantGoalTruncated = (props) => {
    return (
        <View style={styles.container}>
            <Icon name={props.iconName} style={{...styles.icon, color: props.color}} />
            <Text style={styles.text}>{props.title}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontFamily: "Nunito-Bold",
        color: "#03045e"
    },

    icon: {
        fontSize: 42,
        paddingVertical: 10
    }
});

export default NeedWantGoalTruncated;