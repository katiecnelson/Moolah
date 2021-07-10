import React from "react";
import { View, StyleSheet, Text, TextInput, FlatList } from "react-native";
import Icon from "../components/Icon";
import CustomButton from "../components/CustomButton";
import GlobalStyle from "../components/GlobalStyle";

const Settings = () => {
    return (
        <View style={styles.container}>
            <View style={{flexDirection: "row", width: "90%", justifyContent: "center", marginVertical: 20}}>
                <Text style={{...styles.text, lineHeight: 55, paddingRight: 10}}>INCOME:</Text>
                <TextInput
                    placeholder="£1,300.00" 
                    clearTextOnFocus={true}
                    placeholderTextColor="#03045e"
                    textAlign={"center"}
                    style={{padding: 10, backgroundColor: "#efefef", borderRadius: 10, fontSize: 28, color: "#03045e"}}
                />
            </View>
            <View style={{width: "94%"}}>
                <View style={{flexDirection: "row", alignContent: "center", paddingTop: 10}}>
                    <TextInput
                        placeholder="NEEDS" 
                        clearTextOnFocus={true}
                        placeholderTextColor="#03045e"
                        textAlign={"center"}
                        style={{fontFamily: "Nunito-Bold", flex: 1, marginHorizontal: 5, padding: 10, backgroundColor: "#efefef", borderRadius: 10, fontSize: 18, color: "#03045e"}}
                    />
                    <TextInput
                        placeholder="WANTS" 
                        clearTextOnFocus={true}
                        placeholderTextColor="#03045e"
                        textAlign={"center"}
                        style={{fontFamily: "Nunito-Bold", flex: 1, marginHorizontal: 5, padding: 10, backgroundColor: "#efefef", borderRadius: 10, fontSize: 18, color: "#03045e"}}
                    />
                    <TextInput
                        placeholder="GOALS" 
                        clearTextOnFocus={true}
                        placeholderTextColor="#03045e"
                        textAlign={"center"}
                        style={{fontFamily: "Nunito-Bold", flex: 1, marginHorizontal: 5, padding: 10, backgroundColor: "#efefef", borderRadius: 10, fontSize: 18, color: "#03045e"}}
                    />
                </View>
                <View style={{flexDirection: "row", alignContent: "center", paddingTop: 15}}>
                    <Icon name="needs" style={{flex: 1, color: "#9ce0ff", fontSize: 42, textAlign: "center"}}/>
                    <Icon name="wants" style={{flex: 1, color: "#1489cc", fontSize: 42, textAlign: "center"}}/>
                    <Icon name="goals" style={{flex: 1, color: "#024f86", fontSize: 42, textAlign: "center"}}/>
                </View>
                <View style={{flexDirection: "row", alignContent: "center", paddingVertical: 15}}>
                    <View style={{flex: 1, flexDirection: "row", justifyContent: "center"}}>
                        <TextInput
                            placeholder="50" 
                            clearTextOnFocus={true}
                            placeholderTextColor="#03045e"
                            textAlign={"center"}
                            style={{fontFamily: "Nunito-Bold", marginHorizontal: 5, paddingVertical: 10, paddingHorizontal: 20, backgroundColor: "#efefef", borderRadius: 10, fontSize: 18, color: "#03045e"}}
                        />
                        <Text style={[GlobalStyle.BlueRegular, styles.percent]}>%</Text>
                    </View>
                    <View style={{flex: 1, flexDirection: "row", justifyContent: "center"}}>
                        <TextInput
                            placeholder="30" 
                            clearTextOnFocus={true}
                            placeholderTextColor="#03045e"
                            textAlign={"center"}
                            style={{fontFamily: "Nunito-Bold", marginHorizontal: 5, paddingVertical: 10, paddingHorizontal: 20, backgroundColor: "#efefef", borderRadius: 10, fontSize: 18, color: "#03045e"}}
                        />
                        <Text style={[GlobalStyle.BlueRegular, styles.percent]}>%</Text>
                    </View>
                    <View style={{flex: 1, flexDirection: "row", justifyContent: "center"}}>
                        <TextInput
                            placeholder="20" 
                            clearTextOnFocus={true}
                            placeholderTextColor="#03045e"
                            textAlign={"center"}
                            style={{fontFamily: "Nunito-Bold", marginHorizontal: 5, paddingVertical: 10, paddingHorizontal: 20, backgroundColor: "#efefef", borderRadius: 10, fontSize: 18, color: "#03045e"}}
                        />
                        <Text style={[GlobalStyle.BlueRegular, styles.percent]}>%</Text>
                    </View>
                </View>
                <View style={{flexDirection: "row", alignItems: "center", paddingBottom: 20}}>
                    <Text style={[GlobalStyle.BlueBold, styles.amountText]}>£650.00</Text>
                    <Text style={[GlobalStyle.BlueBold, styles.amountText]}>£390.00</Text>
                    <Text style={[GlobalStyle.BlueBold, styles.amountText]}>£260.00</Text>
                </View>
            </View>
                <CustomButton text="save" onPress={() => console.log("updates saved")}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "white",
    },
    text: {
        fontFamily: "Nunito-Bold",
        color: "#03045e"
    },
    amountText: {
        flex: 1,
        fontSize: 18,
        textAlign: "center"
    },
    percent: {
        fontSize: 20,
        lineHeight: 42
    }
})

export default Settings;