import React from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import Icon from "./Icon";
import GlobalStyle from "./GlobalStyle";

// A reusable component that shows all of the details of a transaction on a card

const TransactionListDetail = (props) => {
    return (
        <View>
            <View style={styles.container}>
                <View style={styles.topView}>
                    <Text numberOfLines={1} style={[GlobalStyle.BlueRegular, styles.leftColumn]}>{props.date}</Text>
                    <Text numberOfLines={1} style={[GlobalStyle.BlueRegular, styles.textTwo]}>{props.description}</Text>
                    <View style={styles.rightColumn}>
                        <Text numberOfLines={1} style={[GlobalStyle.BlueBold, styles.lineHeight]}>{props.amount}</Text>
                    </View>
                </View>
                <View style={styles.rowTwo}>
                    <Text numberOfLines={1} style={[GlobalStyle.BlueRegular, styles.leftColumn]}>{props.category}</Text>
                    <View style={styles.flexTwo}>
                    <View style={{...styles.tagBack, backgroundColor: props.tag === null ? "rgba(0, 0, 0, 0)" : "#48cae4"}}>
                            <Text numberOfLines={1} style={[GlobalStyle.WhiteBold, styles.tagText]}>{props.tag}</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.rightColumn} onPress={props.onPress}>
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
    leftColumn: {
        flex: 1.25,
        lineHeight: 28
    },
    lineHeight: {
        lineHeight: 28
    },
    topView: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    rightColumn: {
        flex: 1.25,
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
    textTwo: {
        flex: 2,
        lineHeight: 28
    },
    tagText: {
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