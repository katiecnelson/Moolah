import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "./Icon";

const NeedWantGoalList = (props) => {
    return (
        <View>
            <View style={{flexDirection: "row"}}>
                <Text style={{...styles.columnContents, flex: 1.25}}>{props.date}</Text>
                <Text style={{...styles.columnContents, flex: 2}}>{props.description}</Text>
                <Text style={{...styles.columnContents, flex: 1.40}}>{props.tag}</Text>
                <Text style={{...styles.columnContents, flex: 1.60}}>{props.amount}</Text>
                <Icon name="edit" style={{fontSize: 28, color: "#48cae4", flex: .75}}/>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    text: {
        fontFamily: "Nunito-Bold",
        color: "#03045e",
    },

    columnContents: {
        fontFamily: "Nunito-Regular",
        color: "#03045e",
        lineHeight: 28
    },
});

export default NeedWantGoalList;