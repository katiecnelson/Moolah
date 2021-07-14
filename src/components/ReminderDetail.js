import React, {useState} from "react";
import { View, StyleSheet, Text } from "react-native";
import CustomCheckbox from "../components/CustomCheckbox";
import Icon from "./Icon";

const ReminderDetail = (props) => {

    const [checked, onChange] = useState(false);

    return (
        <View style={styles.container}>
                <CustomCheckbox 
                    checked={checked}
                    onChange={onChange}
                />
                <Text style={{flex: 1.15, lineHeight: 24, paddingLeft: 10, fontFamily: "Nunito-Regular", color: "#03045e"}}>{props.date}</Text>
                <Text style={{flex: 3, lineHeight: 24, fontFamily: "Nunito-Regular", color: "#03045e"}}>{props.description}</Text>
                <Icon name="edit" style={{...styles.editIcon, flex: .5}}/>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flexDirection: "row",
        marginVertical: 3
    },

    editIcon: {
        fontSize: 28,
        color: "#48cae4"
    },
})

export default ReminderDetail;