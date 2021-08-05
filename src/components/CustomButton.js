import React from "react";
import {StyleSheet, TouchableOpacity, Text, View} from "react-native";

const CustomButton = (props) => {
    return (
        <TouchableOpacity style={styles.opacity} onPress={props.onPress}>
            <View style={styles.button}>
                <Text style={styles.buttonText}>{props.text}</Text>
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
        color: "white",
        fontFamily: "Nunito-Bold",
        textTransform: "uppercase",
        fontSize: 18,
        textAlign: "center",
        paddingVertical: 10,
        paddingHorizontal: 15,
    }
})

export default CustomButton;