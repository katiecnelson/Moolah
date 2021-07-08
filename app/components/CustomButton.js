import { styleSheets } from "min-document";
import React from "react";
import {StyleSheet, TouchableOpacity, Text, View} from "react-native";

export default function CustomButton({ text, onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.button}>
                <Text style={styles.buttonText}>{ text }</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
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
        paddingHorizontal: 20,
    }
})