import React, {useContext, useState} from "react";
import {View, StyleSheet, FlatList, TouchableOpacity} from "react-native";
import {Context as TagContext} from "../context/TagContext";
import {Context as TransactionContext} from "../context/TransactionContext";
import SettingsHeader from "../components/SettingsHeader";
import TagListDetail from "../components/TagListDetail";
import PopUp from "../components/PopUp";
import {sortAscending, findTag} from "../utilities/helper";
import TwoButtonToast from "../components/TwoButtonToast";

/*
 * Returns settings screen JSX for the tags list and sets the FlatList header
 * Also handles the warnings and pop-ups associated with editing/deleting tags
 */

const Settings = () => {
    const tag = useContext(TagContext);
    const transaction = useContext(TransactionContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [ID, setID] = useState(0);
    const [name, setName] = useState("");
    const [warning, setWarning] = useState(false);
    const [warningText, setWarningText] = useState("");
    const [showToast, setShowToast] = useState(false);

    // Edits tag in global store after verifying user input
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

    // Closes the tag details and options pop-up
    const handleClose = () => {
        setModalVisible(false);
        setWarning(false);
    };

    // Deletes a tag from the global store
    const handleDelete = () => {
        tag.deleteTag(ID);
        setModalVisible(false);
        transaction.deleteTransactionTag(ID);
        setWarning(false);
        setShowToast(false);
    };

    // Opens pop up that displays tag info and options
    const openPopUp = (name, ID) => {
        setModalVisible(true);
        setName(name);
        setID(ID);
    };

    return (
        <View style={styles.container}>
            <TwoButtonToast
                show={showToast}
                onRequestClose={() => {setShowToast(false); setModalVisible(true);}}
                cancel={() => {setShowToast(false); setModalVisible(true);}}
                delete={handleDelete}
                text="Permanently delete this tag?"
            />
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
                delete={() => {setModalVisible(false); setShowToast(true);}}
            />
            <View style={styles.listWidth}>
                <FlatList 
                    data={sortAscending(tag.state, "Name")}
                    ListHeaderComponent={SettingsHeader}
                    contentContainerStyle={styles.flatList}
                    keyExtractor={(item) => item.ID.toString()}
                    renderItem={({item}) => (
                        <TouchableOpacity onPress={() => {openPopUp(item["Name"], item["ID"])}}> 
                            <TagListDetail
                                key={item["ID"]}
                                name={item["Name"]}
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