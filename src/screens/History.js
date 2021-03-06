import React, {useContext} from "react";
import {View, StyleSheet, SectionList, Text} from "react-native";
import {Context as TransactionContext} from "../context/TransactionContext";
import {formatFullDate, formatAmountString, processHistoricalData, getMonthName} from "../utilities/helper";
import TransactionListDetail from "../components/TransactionListDetail";
import GlobalStyle from "../components/GlobalStyle";

// Returns a section list of historical data, or a message if no data exists

const History = ({navigation}) => {

    const transaction = useContext(TransactionContext);
    const data = processHistoricalData(transaction.state);
    const length = data.length;

    return (
        length > 0
        ? <View style={styles.container}>
            <View style={styles.innerContainer}>
                <SectionList
                    sections={data}
                    stickySectionHeadersEnabled={false}
                    keyExtractor={(item) => item.ID.toString()}
                    renderItem={({item, index}) => (
                        <View style={{...styles.radius, backgroundColor: index % 2 === 0 ? "#efefef" : "white"}}>
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
                    renderSectionHeader={({section: {title, total}}) => (
                        <View style={styles.headerBackground}>
                            <Text style={[GlobalStyle.BlueBold, styles.headerText]}>{getMonthName(title)}</Text>
                            <Text style={[GlobalStyle.BlueRegular, styles.headerSubtitle]}>TOTAL TRANSACTIONS: {formatAmountString(total)}</Text>
                        </View>
                    )}
                />
            </View>
        </View> 
        : <View style={styles.noDataView}>
            <Text 
                style={[GlobalStyle.BlueRegular, styles.noDataText]}>
                No historical data yet! When you add transactions to past months, they will show up here.
                </Text>
        </View>   
    );
};

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
    },
    radius: {
        borderRadius: 5
    },
    noDataView: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "white"
    },
    noDataText: {
        textAlign: "center",
        padding: 15,
        paddingTop: 30
    }
});

export default History;