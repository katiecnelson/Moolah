import React from "react";
import {StyleSheet, View} from "react-native";

export default function CustomCheckbox({doneStatus}) {

    return (
        <View style={{...styles.checkBox, backgroundColor: doneStatus ? "#48cae4" : "transparent"}}/>
    );
}

const styles = StyleSheet.create({
    checkBox: {
        width: 24,
        height: 24,
        borderRadius: 5,
        borderWidth: 4,
        borderColor: "#48cae4",
      },
})