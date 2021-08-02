import React, {useContext} from "react";
import {View, StyleSheet, Text, TouchableOpacity, Modal, FlatList} from "react-native";
import AddTag from "./AddTag";
import {Context as TagContext} from "../context/TagContext"

const TagModal = (props) => {
    const tags = useContext(TagContext);

    return (
    <Modal
        visible={props.open}
        onRequestClose={props.close}
        transparent
        >
        <View style={styles.modalView}>
            <View style={{height: "75%", width: "80%", backgroundColor: "#efefef", borderRadius: 10}}>
                <TouchableOpacity style={styles.exitOpacity} onPress={props.press}> 
                    <Text style={styles.exit}>X</Text>
                </TouchableOpacity>
            <FlatList
                data={tags.state.sort((a, b) => a["Name"].localeCompare(b["Name"]))}
                ListHeaderComponent={() => 
                <View style={{borderBottomColor: "#03045e", borderBottomWidth: 1}}>
                <AddTag
                    text="NEW TAG ..."
                    color="#fcfcfc"
                />
                <TouchableOpacity onPress={() => props.done("TAG (OPTIONAL)", null)}>
                    <Text style={{fontFamily: "Nunito-Bold", color: "#48cae4", fontSize: 18, padding: 15}}>None</Text>
                </TouchableOpacity>
                </View>
                }
                keyExtractor={(item, index) => item.ID.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => props.done(item["Name"], item["ID"])}>
                        <View style={{borderBottomColor: "#03045e", borderBottomWidth: 1}}>
                            <Text style={{fontFamily: "Nunito-Regular", color: "#03045e", fontSize: 18, padding: 15}}>{item["Name"]}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
            </View>
        </View>
    </Modal>
    )
}

const styles = StyleSheet.create({
    modalView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(75, 75, 75, 0.25)",
    },
    exitOpacity: {
        width: 50,
    },
    exit: {
        fontFamily: "Nunito-Black",
        color: "#03045e",
        fontSize: 24,
        paddingLeft: 10,
        paddingVertical: 7
    },
})

export default TagModal;