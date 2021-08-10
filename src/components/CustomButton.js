import React from "react";
import {TouchableOpacity, View, Text, StyleSheet} from "react-native";
import GlobalStyle from "./GlobalStyle";

 
 // Reusable button component with customisable text

const CustomButton = (props) => {
    return (
        <TouchableOpacity style={styles.opacity} onPress={props.onPress}>
            <View style={styles.button}>
                <Text style={[GlobalStyle.WhiteBold, styles.text]}>{props.text}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    opacity: {
        alignItems: "center"
    },
    button: {
        borderRadius: 10,
        backgroundColor: "#48cae4",
    },
    text: {
        fontSize: 18,
        textAlign: "center",
        paddingVertical: 10,
        paddingHorizontal: 15,
    }
});

export default CustomButton;