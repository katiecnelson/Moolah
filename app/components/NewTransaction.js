import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import Icon from "./Icon";
import NeedWantGoalTruncated from "./NeedWantGoalTruncated";
import { Picker } from "@react-native-picker/picker";
import CustomButton from "./CustomButton";

const NewTransaction = () => {

    const[selectedTag, setSelectedTag] = useState();

    return (
        <View style={styles.container}>
            <View style={{borderBottomColor: "#48cae4", borderBottomWidth: 1}}>
                <Text style={{...styles.text, paddingTop: 25, fontSize: 24}}>NEW TRANSACTION</Text>
            </View>
            <View style={{flexDirection: "row", paddingBottom: 15, paddingTop: 25}}>
                <Icon name="edit" style={{fontSize: 32, color: "#48cae4", paddingRight: 10}}/>
                <Text style={{color: "#48cae4", lineHeight: 32}}>EDIT INCOME</Text>
            </View>
            <View style={{flexDirection: "row", justifyContent: "space-between", width: "94%"}}>
                <TextInput
                    placeholder="£00.00" 
                    clearTextOnFocus={true}
                    placeholderTextColor="#b7b7b7"
                    textAlign={"center"}
                    style={{padding: 10, backgroundColor: "#efefef", borderRadius: 10, fontSize: 28, color: "#03045e", width: "48%"}}
                />
                <TextInput
                    placeholder="29/06/21" 
                    clearTextOnFocus={true}
                    placeholderTextColor="#03045e"
                    textAlign={"center"}
                    style={{padding: 15, backgroundColor: "#efefef", borderRadius: 10, fontSize: 28, color: "#03045e", width: "48%"}}
                />
            </View>
            
            <View style={styles.needsWantsGoals}>
                <NeedWantGoalTruncated iconName="needs" color="#9ce0ff" title="NEEDS" />
                <NeedWantGoalTruncated iconName="wants" color="#1489cc" title="WANTS" />
                <NeedWantGoalTruncated iconName="goals" color="#024f86" title="GOALS" />
            </View>
            <TextInput
                placeholder="DESCRIPTION (OPTIONAL) ..." 
                clearTextOnFocus={true}
                placeholderTextColor="#b7b7b7"
                style={{marginTop: 10, padding: 15, backgroundColor: "#efefef", borderRadius: 10, fontSize: 18, color: "#03045e", width: "94%", fontFamily: "Nunito-Regular"}}
            />
            
            <Picker
                style={{width: "98%"}}
                itemStyle={{height: 75, fontSize: 18, color: "#b7b7b7", fontFamily: "Nunito-Regular"}}
                selectedValue={selectedTag}
                onValueChange={(itemValue, itemIndex) =>
                    setSelectedTag(itemValue)
                }>
                <Picker.Item label="TAG (OPTIONAL)" value="tag" />
                <Picker.Item label="Alcohol" value="alcohol" />
                <Picker.Item label="Charity" value="charity" />
                <Picker.Item label="Credit payoff" value="credit payoff" />
                <Picker.Item label="Fees" value="fees" />
                <Picker.Item label="Food" value="food" />
                <Picker.Item label="Hobbies" value="hobbies" />
                <Picker.Item label="Italy savings" value="italy savings" />
                <Picker.Item label="Rent" value="rent" />
                <Picker.Item label="Retirement" value="retirement" />
                <Picker.Item label="Takeaway" value="takeaway" />
                <Picker.Item label="Transportation" value="transportion" />
                <Picker.Item label="Utilities" value="utilities" />
            </Picker> 
            <CustomButton text="add" onPress={() => console.log("pressed")}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: "#ffffff",
        flex: 1,
    },

    needsWantsGoals: {
        paddingHorizontal: 15,
        paddingVertical: 15,
        alignSelf: "stretch",
        flexDirection: "row",
        justifyContent: "space-around",
        marginHorizontal: "auto"
    },

    text: {
        fontFamily: "Nunito-Regular",
        color: "#03045e"
    }


})

export default NewTransaction;