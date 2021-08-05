import React from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import Icon from "./Icon";
import GlobalStyle from "./GlobalStyle";

const NeedWantGoalFooter = (props) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.container} onPress={props.onPress}>
                <Icon name="history" style={styles.icon}/>
                <Text style={GlobalStyle.BlueBold}>PAST DATA</Text>
            </TouchableOpacity>
            <View style= {styles.bottomView}></View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center"
    },
    icon : {
        color: "#03045e",
        fontSize: 28,
        paddingTop: 20,
    },
    bottomView: {
        height: 30
    }
});

export default NeedWantGoalFooter;
