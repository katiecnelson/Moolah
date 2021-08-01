import React, { useContext } from "react";
import { View, StyleSheet, SectionList, Text } from "react-native";
import {Context as TransactionContext} from "../context/TransactionContext";
import { formatFullDate, formatAmountString, processHistoricalData, getMonthName } from "../utilities/helper";
import TransactionListDetail from "../components/TransactionListDetail";
import GlobalStyle from "../components/GlobalStyle";

const History = ({navigation}) => {

    const transaction = useContext(TransactionContext);

    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <SectionList
                    sections={processHistoricalData(transaction.state)}
                    stickySectionHeadersEnabled={false}
                    keyExtractor={(item, index) => item.ID.toString()}
                    renderItem={({ item, index }) => (
                        <View style={{backgroundColor: index % 2 === 0 ? "#efefef" : "white", borderRadius: 5}}>
                            <TransactionListDetail
                                key={item["ID"]}
                                ID={item["ID"]}
                                date={formatFullDate(item["Date"])}
                                description={item["Description"] === null ? "No description" : item["Description"]}
                                amount={formatAmountString(item["Amount"])}
                                category={item["CategoryLabel"]}
                                tag={item["Tag"]}
                                onPress={() => navigation.navigate("Edit Transaction", {ID: item["ID"]})}
                            />
                        </View>
                )}
                renderSectionHeader={({ section: { title, total} }) => (
                    <View style={styles.headerBackground}>
                        <Text style={[GlobalStyle.BlueBold, styles.headerText]}>{getMonthName(title)}</Text>
                        <Text style={[GlobalStyle.BlueRegular, styles.headerSubtitle]}>TOTAL TRANSACTIONS: {formatAmountString(total)}</Text>
                    </View>
                )}
                />
            </View>
        </View>    
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        flex: 1,
        alignItems: "center"
    },
    innerContainer: {
        flex: 1,
        width: "94%",
        justifyContent: "center"
    },
    headerText: {
        fontSize: 22,
        paddingTop: 2,
    },
    headerSubtitle: {
        paddingBottom: 5,
        fontSize: 17
    },
    headerBackground: {
        marginTop: 35,
        marginBottom: 15,
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#48cae4"
    }
});

export default History;