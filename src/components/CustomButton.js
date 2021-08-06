import React from "react";
import {StyleSheet, TouchableOpacity, Text, View} from "react-native";
import GlobalStyle from "./GlobalStyle";

const CustomButton = (props) => {
    return (
        <TouchableOpacity style={styles.opacity} onPress={props.onPress}>
            <View style={styles.button}>
                <Text style={[GlobalStyle.WhiteBold, styles.buttonText]}>{props.text}</Text>
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    opacity: {
        alignItems: "center"
    },
    button: {
        borderRadius: 10,
        backgroundColor: "#48cae4",
    },
    buttonText: {
        textTransform: "uppercase",
        fontSize: 18,
        textAlign: "center",
        paddingVertical: 10,
        paddingHorizontal: 15,
    }
})

export default CustomButton;