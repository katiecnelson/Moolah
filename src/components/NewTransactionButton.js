import React from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import Icon from "./Icon";
import GlobalStyle from "./GlobalStyle";

const NewTransactionButton = (props) => {
    return (
        <View style={styles.container} >
            <TouchableOpacity style={styles.opacity} onPress={props.onPress}>
                <Icon name="new" style={styles.icon}/>
                <Text style={[GlobalStyle.TealBold, styles.text]}>NEW TRANSACTION</Text>
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
        lineHeight: 28,
    },
});

export default NewTransactionButton;