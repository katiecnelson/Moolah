import React from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import Icon from "./Icon";
import GlobalStyle from "./GlobalStyle";

const TransactionListDetail = (props) => {
    return (
        <View>
            <View style={styles.container}>
                <View style={styles.topView}>
                    <Text style={[GlobalStyle.BlueRegular, styles.text]}>{props.date}</Text>
                    <Text numberOfLines={1} style={[GlobalStyle.BlueRegular, styles.textTwo]}>{props.description}</Text>
                    <View style={styles.leftColumn}>
                        <Text style={[GlobalStyle.BlueBold, styles.lineHeight]}>{props.amount}</Text>
                    </View>
                </View>
                <View style={styles.rowTwo}>
                    <Text style={[GlobalStyle.BlueRegular, styles.text]}>{props.category}</Text>
                    <View style={styles.flexTwo}>
                    <View style={{...styles.tagBack, backgroundColor: props.tag === null ? "rgba(0, 0, 0, 0)" : "#48cae4"}}>
                            <Text style={styles.tagText}>{props.tag}</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.leftColumn} onPress={props.onPress}>
                        <Icon name="edit" style={styles.edit} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 5
    },
    text: {
        flex: 1.4,
        lineHeight: 28
    },
    textTwo: {
        flex: 2,
        lineHeight: 28
    },
    lineHeight: {
        lineHeight: 28
    },
    topView: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    leftColumn: {
        flex: 1,
        alignItems: "flex-end"
    },
    rowTwo: {
        flexDirection: "row",
        width: "100%",
        paddingTop: 5
    },
    flexTwo: {
        flex: 2
    },
    tagBack: {
        borderRadius: 5,
        alignSelf: "flex-start"
    },
    tagText: {
        fontFamily: "Nunito-Bold",
        color: "white",
        padding: 3,
        alignSelf: "center"
    },
    edit: {
        fontSize: 28,
        color: "#48cae4",
        padding: 1.5
    }
});

export default TransactionListDetail;