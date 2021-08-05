import React from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import Icon from "./Icon";

const NewTransactionButton = (props) => {
    return (
        <View style={styles.container} >
            <TouchableOpacity style={styles.opacity} onPress={props.onPress}>
                <Icon name="new" style={styles.icon}/>
                <Text style={styles.text}>NEW TRANSACTION</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "flex-start",
        marginTop: 15,
        marginBottom: 10
    },
    opacity: {
        flexDirection: "row",
        padding: 3,
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