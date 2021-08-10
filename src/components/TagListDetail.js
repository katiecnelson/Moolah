import React from "react";
import {StyleSheet, Text, View} from "react-native";
import GlobalStyle from "./GlobalStyle";

// A reusable component that shows a single tag

const TagListDetail = (props) => {
    return (
        <View style={styles.tagBackground}>
            <Text style={[GlobalStyle.BlueBold, styles.buttonText]}>{props.name}</Text>
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
    buttonText: {
        textTransform: "uppercase",
        textAlign: "center",
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
});

export default TagListDetail;