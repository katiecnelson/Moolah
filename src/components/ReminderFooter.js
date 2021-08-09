import React from "react";
import {View, StyleSheet, Text} from "react-native";
import GlobalStyle from "./GlobalStyle";

const ReminderFooter = (props) => {

    return (
        <View style={styles.container}>
            <Text style={[GlobalStyle.TealBold, styles.text]}>{props.showCompleted ? "SHOW COMPLETED" : "HIDE COMPLETED"}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        marginBottom: 20,
        alignItems: "center"
    },
    text: {
        fontSize: 16,
    }
});

export default ReminderFooter;