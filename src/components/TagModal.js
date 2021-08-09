import React, {useContext} from "react";
import {View, StyleSheet, Text, TouchableOpacity, Modal, FlatList} from "react-native";
import AddTag from "./AddTag";
import {Context as TagContext} from "../context/TagContext";
import GlobalStyle from "./GlobalStyle";

const TagModal = (props) => {
    const tags = useContext(TagContext);

    return (
        <Modal
            visible={props.open}
            onRequestClose={props.close}
            transparent
            >
            <View style={styles.modalView}>
                <View style={styles.innerContainer}>
                    <TouchableOpacity style={styles.exitOpacity} onPress={props.press}> 
                        <Text style={[GlobalStyle.BlueBlack, styles.exit]}>X</Text>
                    </TouchableOpacity>
                    <FlatList
                        data={tags.state.sort((a, b) => a["Name"].localeCompare(b["Name"]))}
                        ListHeaderComponent={() => 
                        <View style={styles.line}>
                        <AddTag
                            text="NEW TAG ..."
                            color="#fcfcfc"
                        />
                        <TouchableOpacity onPress={() => props.done("TAG (OPTIONAL)", null)}>
                            <Text style={[GlobalStyle.TealBold, styles.none]}>None</Text>
                        </TouchableOpacity>
                        </View>
                        }
                        keyExtractor={(item) => item.ID.toString()}
                        renderItem={({item}) => (
                            <TouchableOpacity onPress={() => props.done(item["Name"], item["ID"])}>
                                <View style={styles.line}>
                                    <Text style={[GlobalStyle.BlueRegular, styles.item]}>{item["Name"]}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </View>
        </Modal>
    );
};

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
        fontSize: 24,
        paddingLeft: 10,
        paddingVertical: 7
    },
    innerContainer: {
        height: "75%",
        width: "80%",
        backgroundColor: "#efefef",
        borderRadius: 10
    },
    line: {
        borderBottomColor: "#03045e",
        borderBottomWidth: 1
    },
    none: {
        fontSize: 18,
        padding: 15
    },
    item: {
        fontSize: 18,
        padding: 15
    },
});

export default TagModal;