import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "./Icon";

const NeedWantGoalHeader = (props) => {
    return (
        <View style={{alignItems: "center"}}>
            <View style={{paddingTop: 25, borderBottomColor: "#48cae4", borderBottomWidth: 1}}>
                <Text style={styles.title}>{props.title}</Text>
            </View>
            <View style={{width: "100%"}}>
                <View style={{flexDirection: "row", justifyContent: "flex-end", paddingTop: 20}}>
                    <Text>
                        <Text style={{fontFamily: "Nunito-Regular", color: "#03045e"}}>REMAINING: </Text>
                        <Text style={{fontFamily: "Nunito-Bold", color: "#03045e"}}>{props.remaining}</Text>
                    </Text>
                </View>
                <View>
                        <View style={{height: 45, borderRadius: 5, backgroundColor: "#efefef"}}>
                            <View style={{width: props.percent, height: 45, borderRadius: 5, backgroundColor: props.barColor}}>
                            </View>
                        </View>
                    </View>
                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
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
                <View style={{flexDirection: "row", paddingTop: 25, paddingBottom: 10}}>
                    <Icon name="new" style={{fontSize: 28, color: "#48cae4", paddingRight: 7}}/>
                    <Text style={{color: "#48cae4", lineHeight: 28, fontFamily: "Nunito-Bold"}}>NEW TRANSACTION</Text>
                </View>
                <View style={{flexDirection: "row", paddingBottom: 3}}>
                    <Text style={{...styles.columnHeadings, flex: 1.25}}>DATE</Text>
                    <Text style={{...styles.columnHeadings, flex: 2}}>DESC.</Text>
                    <Text style={{...styles.columnHeadings, flex: 1.40}}>TAG</Text>
                    <Text style={{...styles.columnHeadings, flex: 1.60}}>£</Text>
                    <Text style={{...styles.columnHeadings, flex: .75}}>EDIT</Text>
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