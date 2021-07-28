import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "./Icon";

const TransactionListDetail = (props) => {
    return (
        <View>
            <View style={{padding: 5}}>
                <View style={{flexDirection: "row", justifyContent: "space-around"}}>
                    <Text style={{...styles.text, flex: 1.4, lineHeight: 28}}>{props.date}</Text>
                    <Text numberOfLines={1} style={{...styles.text, flex: 2, lineHeight: 28}}>{props.description}</Text>
                    <View style={{flex: 1, alignItems: "flex-end"}}>
                        <Text style={{...styles.text, lineHeight: 28}}>{props.amount}</Text>
                    </View>
                    
                </View>
                <View style={{flexDirection: "row", width: "100%", paddingTop: 5}}>
                    <Text style={{...styles.text, flex: 1.4, lineHeight: 28}}>{props.category}</Text>
                    <View style={{flex: 2}}>
                    <View style={{backgroundColor: props.tag === null ? "rgba(0, 0, 0, 0)" : "#48cae4", borderRadius: 5, alignSelf: "flex-start"}}>
                            <Text style={{fontFamily: "Nunito-Regular", color: "white", padding: 3, alignSelf: "center"}}>{props.tag}</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={{flex: 1, alignItems: "flex-end"}} onPress={props.onPress}>
                        <Icon name="edit" style={{fontSize: 28, color: "#48cae4", padding: 1.5}} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{width: "94%"}} >
                <View style={{flexDirection: "row"}}>

                </View>

            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    text: {
        fontFamily: "Nunito-Bold",
        color: "#03045e",
    },
});

export default TransactionListDetail;