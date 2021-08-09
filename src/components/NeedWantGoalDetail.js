import React from "react";
import { View, Text, StyleSheet} from "react-native";
import Icon from "./Icon";
import GlobalStyle from "./GlobalStyle";

const NeedWantGoalDetail = (props) => {

    return (
        <View style={styles.container}>
            <Text style={[GlobalStyle.BlueBold ,styles.text]}>{props.title}</Text>
            <Icon name={props.iconName} style={{...styles.icon, color: props.color}} />
            <Text style={[GlobalStyle.BlueBold ,styles.text]}>{props.amount}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 14,
    },
    icon: {
        fontSize: 32,
        paddingVertical: 5
    }
});

export default NeedWantGoalDetail;