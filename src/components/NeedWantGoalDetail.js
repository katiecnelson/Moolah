import React from "react";
import { View, Text, StyleSheet} from "react-native";
import Icon from "./Icon";

const NeedWantGoalDetail = (props) => {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{props.title}</Text>
            <Icon name={props.iconName} style={{...styles.icon, color: props.color}} />
            <Text style={styles.text}>{props.amount}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontFamily: "Nunito-Bold",
        fontSize: 14,
        color: "#03045e"
    },
    icon: {
        fontSize: 32,
        paddingVertical: 5
    }
});

export default NeedWantGoalDetail;