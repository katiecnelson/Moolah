import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "./Icon";

const NewTransactionButton = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={styles.container}>
                <Icon name="new" style={styles.icon}/>
                <Text style={styles.text}>NEW TRANSACTION</Text>
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({

    container: {
        flexDirection: "row",
        paddingTop: 15,
        paddingBottom: 10,
    },

    icon: {
        fontSize: 28,
        color: "#48cae4",
        paddingRight: 7
    },

    text: {
        color: "#48cae4",
        lineHeight: 28,
        fontFamily: "Nunito-Bold"
    },
});

export default NewTransactionButton;