import React from "react";
import { View, Text, StyleSheet } from "react-native";
import NewTransactionButton from "./NewTransactionButton";
import {percentSpentString} from "../utilities/helper";

const NeedWantGoalHeader = (props) => {
    return (
        <View style={{alignItems: "center"}}>
            <View style={{width: "100%"}}>
                <View style={{flexDirection: "row", justifyContent: "flex-end", paddingTop: 20, paddingBottom: 5}}>
                    <Text>
                        <Text style={{fontFamily: "Nunito-Regular", color: "#03045e"}}>REMAINING: </Text>
                        <Text style={{fontFamily: "Nunito-Bold", color: "#03045e"}}>{props.remaining}</Text>
                    </Text>
                </View>
                <View>
                        <View style={{height: 50, borderRadius: 5, backgroundColor: "#efefef"}}>
                            <View style={{width: props.percent >= 100 ? "100%" : percentSpentString(props.percent), height: 50, borderRadius: 5, backgroundColor: props.barColor}}>
                            </View>
                        </View>
                    </View>
                <View style={{flexDirection: "row", justifyContent: "space-between", paddingTop: 5}}>
                    <View >
                        <Text>
                            <Text style={{fontFamily: "Nunito-Regular", color: "#03045e"}}>SPENT: </Text>
                            <Text style={{fontFamily: "Nunito-Bold", color: "#03045e"}}>{props.spent}</Text>
                        </Text>
                    </View>
                    <View >
                        <Text>
                            <Text style={{fontFamily: "Nunito-Regular", color: "#03045e"}}>TOTAL: </Text>
                            <Text style={{fontFamily: "Nunito-Bold", color: "#03045e"}}>{props.total}</Text>
                        </Text>
                    </View>
                </View>
                <View style={{width: "100%", marginTop: 15}}>
                    <NewTransactionButton onPress={props.onPress}/>
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({

    title: {
        fontFamily: "Nunito-Regular",
        fontSize: 24,
        color: "#03045e"
    },

    columnHeadings: {
        fontFamily: "Nunito-Bold",
        color: "#03045e"
    },
});

export default NeedWantGoalHeader;