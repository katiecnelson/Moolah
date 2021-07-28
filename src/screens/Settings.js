import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Modal, Text, TouchableOpacity, TextInput } from "react-native";
import { Context as TagContext } from "../context/TagContext";
import SettingsHeader from "../components/SettingsHeader";
import SettingsFooter from "../components/SettingsFooter";
import TagListDetail from "../components/TagListDetail";
import Icon from "../components/Icon";
import CustomButton from "../components/CustomButton";

const Settings = () => {
    const tag = useContext(TagContext)
    const [modalVisible, setModalVisible] = useState(false)
    const [ID, setID] = useState(0)
    const [name, setName] = useState("")

    const deleteWithX = (idNum) => {
        setID(idNum);
        tag.deleteTag(idNum);
    }

    useEffect(() => {
        console.log("Use effect from settings ran okay!")
        tag.getTags();
      }, []);

    return (
        <View style={styles.container}>
            <Modal
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
                transparent
                >
                <View style={styles.modalView}>
                    <View style={styles.width} >
                        <View style={styles.modal}>
                            <View>
                                <TouchableOpacity
                                    style={styles.exitOpacity}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Text style={styles.exit}>X</Text>
                                </TouchableOpacity>
                            </View>
                            <TextInput
                                value={name}
                                maxLength={15}
                                style={styles.textInput}
                                onChangeText={text => setName(text)}
                            />
                            <View style={styles.updateView}>
                                <CustomButton
                                    text="UPDATE" 
                                    onPress={() => {tag.updateTag(ID, name), setModalVisible(false)}}
                                />
                            </View>
                            <View style={styles.deleteView}>
                                <TouchableOpacity onPress={() => {tag.deleteTag(ID), setModalVisible(false)}}>
                                    <Icon name="delete" style={styles.deleteIcon}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
            <View style={styles.flatList}>
                <FlatList 
                    data={tag.state.sort((a, b) => a["Name"].localeCompare(b["Name"]))}
                    numColumns={2}
                    columnWrapperStyle={{justifyContent: "space-around"}}
                    ListHeaderComponent={SettingsHeader}
                    ListFooterComponent={() => <SettingsFooter
                        text="Your tag here ..."
                        color="#efefef"
                        styling={{paddingVertical: 30}}
                    />
                    }
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