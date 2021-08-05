import React, {useContext, useState} from "react";
import {View, StyleSheet, FlatList, TouchableOpacity} from "react-native";
import {Context as TagContext} from "../context/TagContext";
import {Context as TransactionContext} from "../context/TransactionContext";
import SettingsHeader from "../components/SettingsHeader";
import TagListDetail from "../components/TagListDetail";
import PopUp from "../components/PopUp";
import {sortDescending, findTag} from "../utilities/helper";

const Settings = () => {
    const tag = useContext(TagContext);
    const transaction = useContext(TransactionContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [ID, setID] = useState(0);
    const [name, setName] = useState("");
    const [warning, setWarning] = useState(false);
    const [warningText, setWarningText] = useState("");

    const deleteWithX = (idNum) => {
        setID(idNum);
        tag.deleteTag(idNum);
        transaction.deleteTransactionTag(idNum);
    };

    const handleOnUpdate = () => {
        if (name === "") {
            setWarningText("Tags must contain at least one character!");
            setWarning(true); 
        } else if (findTag(tag.state, name)) {
            setWarningText("You already have a tag with this name!")
            setWarning(true);
        } else {
            setWarning(false);
            tag.updateTag(ID, name);
            setModalVisible(false);
            transaction.editTransactionTag(ID, name);
        }
    };

    const handleClose = () => {
        setModalVisible(false);
        setWarning(false);
    };

    const handleDelete = () => {
        tag.deleteTag(ID);
        setModalVisible(false);
        transaction.deleteTransactionTag(ID);
        setWarning(false);
    };

    const openPopUp = (name, ID) => {
        setModalVisible(true);
        setName(name);
        setID(ID);
    };

    return (
        <View style={styles.container}>
            <PopUp
                showDate={false}
                showWarning={warning}
                warningText={warningText}
                visible={modalVisible}
                close={handleClose}
                text={name}
                maxLength={15}
                onChangeText={text => setName(text)}
                onUpdate={handleOnUpdate}
                delete={handleDelete}
            />
            <View style={styles.listWidth}>
                <FlatList 
                    data={sortDescending(tag.state, "Name")}
                    ListHeaderComponent={SettingsHeader}
                    contentContainerStyle={styles.flatList}
                    keyExtractor={(item) => item.ID.toString()}
                    renderItem={({item}) => (
                        <TouchableOpacity onPress={() => {openPopUp(item["Name"], item["ID"])}}> 
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
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
    },
    listWidth: {
        width: "100%",
    },
    flatList: {
        alignItems: "center",
        width: "100%",
        paddingBottom: 25
    }
});

export default Settings;