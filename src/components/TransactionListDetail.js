import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "./Icon";

const TransactionListDetail = (props) => {
    return (
        <View>
            <View style={{padding: 5}}>
                <View style={{flexDirection: "row"}}>
                    <Text style={{...styles.text, flex: 1, lineHeight: 28}}>{props.date}</Text>
                    <Text style={{...styles.text, flex: 1.5, lineHeight: 28}}>{props.description}</Text>
                    <Text style={{...styles.text, flex: 1, lineHeight: 28}}>{props.amount}</Text>
                    <Icon name="edit" style={{fontSize: 28, color: "#48cae4", flex: .5}} />
                </View>
                <View style={{flexDirection: "row", width: "100%"}}>
                    <View style={{flex: 1}}/>
                    <Text style={{...styles.text, flex: 1.5, lineHeight: 28}}>{props.category}</Text>
                    <View style={{flex: 1.5}}>
                        <View style={{backgroundColor: "#48cae4", borderRadius: 5, alignSelf: "flex-start"}}>
                            <Text style={{fontFamily: "Nunito-Regular", color: "white", padding: 3, alignSelf: "center"}}>{props.tag}</Text>
                        </View>
                    </View>
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