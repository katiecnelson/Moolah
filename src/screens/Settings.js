import React, { useContext, useState } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Context as TagContext } from "../context/TagContext";
import { Context as TransactionContext } from "../context/TransactionContext";
import SettingsHeader from "../components/SettingsHeader";
import TagListDetail from "../components/TagListDetail";
import PopUp from "../components/PopUp";

const Settings = () => {
    const tag = useContext(TagContext)
    const transaction = useContext(TransactionContext)
    const [modalVisible, setModalVisible] = useState(false)
    const [ID, setID] = useState(0)
    const [name, setName] = useState("")

    const deleteWithX = (idNum) => {
        setID(idNum);
        tag.deleteTag(idNum);
        transaction.deleteTransactionTag(idNum);
    }

    return (
        <View style={styles.container}>
            <PopUp
                showDate={false} 
                visible={modalVisible}
                close={() => setModalVisible(false)}
                text={name}
                maxLength={15}
                onChangeText={text => setName(text)}
                onUpdate={() => {tag.updateTag(ID, name), setModalVisible(false), transaction.editTransactionTag(ID, name)}}
                delete={() => {tag.deleteTag(ID), setModalVisible(false), transaction.deleteTransactionTag(ID)}}
            />
            <View style={styles.flatList}>
                <FlatList 
                    data={tag.state.sort((a, b) => a["Name"].localeCompare(b["Name"]))}
                    numColumns={2}
                    columnWrapperStyle={{justifyContent: "space-around"}}
                    ListHeaderComponent={SettingsHeader}
                    keyExtractor={(item, index) => item.ID}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => {setModalVisible(true), setName(item["Name"]), setID(item["ID"])}}> 
                            <TagListDetail
                                key={item["ID"]}
                                name={item["Name"]}
                                onPress={() => deleteWithX(item["ID"])}
                            />
                        </TouchableOpacity>
                    )}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
    },
    text: {
        fontFamily: "Nunito-Bold",
        color: "#03045e"
    },
    modalView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(75, 75, 75, 0.25)",
    },
    width: {
        width: "84%",
    },
    modal: {
        borderLeftWidth: 10,
        borderTopWidth: 10,
        borderTopLeftRadius:15,
        borderBottomLeftRadius: 15,
        borderTopRightRadius: 15,
        borderColor: "#03045e",
        backgroundColor: "white",
        paddingHorizontal: 7,
        paddingVertical: 7,
        borderRadius: 10,
        elevation: 35,
    },
    exitOpacity: {
        width: 20,
    },
    exit: {
        fontFamily: "Nunito-Black",
        color: "#03045e",
        fontSize: 24,
    },
    textInput: {
        padding: 10,
        marginTop:10,
        marginBottom: 30,
        marginHorizontal: 7,
        backgroundColor: "#efefef",
        borderRadius: 10,
        fontSize: 20,
        color: "#03045e",
    },
    deleteView: {
        alignItems: "flex-end",
        width: "100%",
    },
    deleteIcon: {
        fontSize: 36,
        color: "#03045e",
        padding: 5,
    },
    flatList: {
        width: "94%",
    },
    updateView: {
        alignItems: "center",
    }
})

export default Settings;