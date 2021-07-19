import React, {useState, useContext} from "react";
import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import Icon from "./Icon";
import { Context as TagContext } from "../context/TagContext";

const SettingsFooter = (props) => {
    const tag = useContext(TagContext);
    const [name, setName] = useState("");

    return (
        <View style={styles.container}>
            <View style={styles.flex}>
                <TextInput
                    value={name}
                    maxLength={15}
                    placeholder="Your tag here ..."
                    placeholderTextColor="#b7b7b7"
                    style={styles.textInput}
                    onChangeText={text => setName(text)}
                />
                <TouchableOpacity onPress={() => {tag.addTag(name), tag.getTags()}}>
                    <Icon name="add" style={styles.icon}/>
                </TouchableOpacity>
                
            </View>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        marginTop: 25,
        marginBottom: 200,
    },
    textInput: {
        paddingVertical: 10,
        paddingLeft: 10,
        paddingRight: 40,
        marginTop:10,
        marginBottom: 30,
        marginHorizontal: 7,
        backgroundColor: "#efefef",
        borderRadius: 10,
        fontSize: 20,
        color: "#03045e",
        width: "75%",
    },
    flex: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    icon: {
        fontSize: 43,
        color: "#48cae4",
        lineHeight: 65,
    },
})

export default SettingsFooter;