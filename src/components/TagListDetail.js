import React from "react";
import {StyleSheet, TouchableOpacity, Text, View} from "react-native";

const TagListDetail = (props) => {
    return (
        <View style={styles.tagBackground}>
            <TouchableOpacity onPress={props.onPress}>
                <Text style={styles.deleteText}>X</Text>
            </TouchableOpacity>
            <Text style={styles.buttonText}>{props.name}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    tagBackground: {
        borderRadius: 10,
        backgroundColor: "#efefef",
        flexDirection: "row",
        marginBottom: 10,
    },
    deleteText: {
        fontSize: 20,
        fontFamily: "Nunito-Black",
        color: "#03045e",
        lineHeight: 40,
        paddingLeft: 15
    },
    buttonText: {
        color: "#03045e",
        fontFamily: "Nunito-Bold",
        textTransform: "uppercase",
        textAlign: "center",
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
});

export default TagListDetail;