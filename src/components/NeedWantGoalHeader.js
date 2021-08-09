import React from "react";
import {View, Text, StyleSheet} from "react-native";
import NewTransactionButton from "./NewTransactionButton";
import {percentSpentString} from "../utilities/helper";
import GlobalStyle from "./GlobalStyle";

const NeedWantGoalHeader = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.remainRow}>
                    <Text>
                        <Text style={GlobalStyle.BlueRegular}>REMAINING: </Text>
                        <Text style={GlobalStyle.BlueBold}>{props.remaining}</Text>
                    </Text>
                </View>
                <View>
                    <View style={[styles.progressBar, styles.barOutter]}>
                        {( props.percent > 0 ?
                        <View
                            style={{
                            ...styles.progressBar, 
                            backgroundColor: props.barColor, 
                            width: props.percent >= 100 
                            ? "100%" 
                            : percentSpentString(props.percent)
                            }} />
                            : null
                        )}
                    </View>
                </View>
                <View style={styles.bottomRow}>
                    <View >
                        <Text>
                            <Text style={GlobalStyle.BlueRegular}>SPENT: </Text>
                            <Text style={GlobalStyle.BlueBold}>{props.spent}</Text>
                        </Text>
                    </View>
                    <View >
                        <Text>
                            <Text style={GlobalStyle.BlueRegular}>TOTAL: </Text>
                            <Text style={GlobalStyle.BlueBold}>{props.total}</Text>
                        </Text>
                    </View>
                </View>
                <View style={styles.newTransact}>
                    <NewTransactionButton onPress={props.onPress}/>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center"
    },
    innerContainer: {
        width: "100%"
    },
    remainRow: {
        flexDirection: "row",
        justifyContent: "flex-end",
        paddingTop: 20,
        paddingBottom: 5
    },
    progressBar: {
        height: 50,
        borderRadius: 5,
    },
    barOutter: {
        backgroundColor: "#efefef"
    },
    bottomRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 5
    },
    newTransact: {
        width: "100%",
        marginTop: 15
    }
});

export default NeedWantGoalHeader;