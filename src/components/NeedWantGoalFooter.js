import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "./Icon";

const NeedWantGoalFooter = (props) => {
    return (
        <View style={{alignItems: "center"}}>
            <TouchableOpacity style={{alignItems: "center"}} onPress={props.onPress}>
                <Icon name="history" style={styles.icon}/>
                <Text style={{fontFamily: "Nunito-Bold", color: "#03045e"}}>PAST DATA</Text>
            </TouchableOpacity>
            <View style= {{height: 30}}></View>
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
