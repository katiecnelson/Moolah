import React from "react";
import {StyleSheet, TouchableOpacity, Text, View} from "react-native";

export default function TagListDetail(props) {
    return (
        <View style={styles.tagBackground}>
            <TouchableOpacity onPress={props.onPress}>
                <Text style={styles.deleteText}>X</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={props.onPress}> */}
                <Text style={styles.buttonText}>{props.name}</Text>
            {/* </TouchableOpacity> */}
        </View>
    )
}

const styles = StyleSheet.create({
    tagBackground: {
        borderRadius: 10,
        backgroundColor: "#efefef",
        flexDirection: "row",
        marginBottom: 10,
    },

    buttonText: {
        color: "#03045e",
        fontFamily: "Nunito-Bold",
        textTransform: "uppercase",
        textAlign: "center",
        paddingVertical: 10,
        paddingHorizontal: 10,

    },

    deleteText: {
        fontSize: 20,
        fontFamily: "Nunito-Black",
        color: "#03045e",
        lineHeight: 40,
        paddingLeft: 15
    },
})