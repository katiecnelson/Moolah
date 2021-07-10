import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "./Icon";

const NeedWantGoalFooter = () => {
    return (
        <View style={{alignItems: "center"}}>
            <Icon name="history" style={styles.icon}/>
            <Text style={{fontFamily: "Nunito-Bold", color: "#03045e"}}>PAST DATA</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    icon : {
        color: "#03045e",
        fontSize: 28,
        paddingTop: 20,
    }
});

export default NeedWantGoalFooter;
