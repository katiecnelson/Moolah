import React, {useContext, useEffect} from "react";
import {View, StyleSheet, Text, TouchableOpacity} from "react-native";
import Icon from "./Icon";
import DashBarDetail from "./DashBarDetail";
import NeedWantGoalDetail from "../components/NeedWantGoalDetail"
import {Context as CategoryIncomeContext} from "../context/CategoryIncomeContext";
import {formatAmountString} from "../utilities/helper";
import NewTransactionButton from "./NewTransactionButton";
import {TabActions, useNavigation} from "@react-navigation/native";
import GlobalStyle from "./GlobalStyle";

/*
 * Component returns JSX for everything on the dashboard from the top
 * to the "NEW TRANSACTION" button
 */

const DashboardHeader = () => {
    const categoryIncome = useContext(CategoryIncomeContext);
    const navigation = useNavigation();

    // Loads categories into data store
    useEffect(() => {
        categoryIncome.getCategoriesIncome();
      }, []);
    
    // Handles all buttons on dashboard that link to other tabs in bottom nav
    const jumpTabs = (tab) => {
        navigation.dispatch(TabActions.jumpTo(tab));
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate("Settings")} style={styles.opacity}>
                <Text style={[GlobalStyle.BlueBold ,styles.smallTitle]}>INCOME:</Text>
                <Text style={[GlobalStyle.BlueBold, styles.largeFont]}>{formatAmountString(categoryIncome.state.income)}</Text>
                <Icon name="edit" style={styles.editIcon} />
            </TouchableOpacity>
            <View style={styles.needWantGoalIcons}>
                <TouchableOpacity style={styles.detail} onPress={() => jumpTabs("Needs")}>
                    <NeedWantGoalDetail
                        title={categoryIncome.state.labelOne}
                        iconName="needs"
                        color="#9ce0ff"
                        amount={formatAmountString(categoryIncome.state.toSpendOne)}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.detail} onPress={() => jumpTabs("Wants")}>
                    <NeedWantGoalDetail
                        title={categoryIncome.state.labelTwo}
                        iconName="wants"
                        color="#1489cc"
                        amount={formatAmountString(categoryIncome.state.toSpendTwo)}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.detail} onPress={() => jumpTabs("Goals")}>
                    <NeedWantGoalDetail
                        title={categoryIncome.state.labelThree}
                        iconName="goals"
                        color="#024f86"
                        amount={formatAmountString(categoryIncome.state.toSpendThree)}
                    />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.detailOpacity} onPress={() => jumpTabs("Needs")}>
                    <DashBarDetail
                        label={categoryIncome.state.labelOne + " REMAINING: "}
                        amountRemaining={formatAmountString(categoryIncome.state.remainingOne)}
                        amountSpent={formatAmountString(categoryIncome.state.spentOne)}
                        color="#9ce0ff"
                        percentSpent={categoryIncome.state.percentSpentOne}
                    />
            </TouchableOpacity>
            <TouchableOpacity style={styles.detailOpacity} onPress={() => jumpTabs("Wants")}>
                    <DashBarDetail
                        label={categoryIncome.state.labelTwo + " REMAINING: "}
                        amountRemaining={formatAmountString(categoryIncome.state.remainingTwo)}
                        amountSpent={formatAmountString(categoryIncome.state.spentTwo)}
                        color="#1489cc"
                        percentSpent={categoryIncome.state.percentSpentTwo}
                    />
            </TouchableOpacity>
            <TouchableOpacity style={styles.detailOpacity} onPress={() => jumpTabs("Goals")}>
                    <DashBarDetail
                        label={categoryIncome.state.labelThree + " REMAINING: "}
                        amountRemaining={formatAmountString(categoryIncome.state.remainingThree)}
                        amountSpent={formatAmountString(categoryIncome.state.spentThree)}
                        color="#024f86"
                        percentSpent={categoryIncome.state.percentSpentThree}
                    />
            </TouchableOpacity>
            <View style={styles.historyView}>
                <TouchableOpacity onPress={() => navigation.navigate("History")} style={styles.historyOpacity}>
                    <Icon name="history" style={styles.history}/>
                </TouchableOpacity>
            </View>
            <View style={styles.lowerTitle}>
                <Text style={[GlobalStyle.BlueRegular, styles.largeFont]}>TRANSACTIONS</Text>
            </View>
            <View style={styles.newTransact}>
                <NewTransactionButton onPress={() => jumpTabs("New")} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center"
    },
    largeFont: {
        fontSize: 24,
    },
    smallTitle: {
        paddingTop: 15,
        fontSize: 14,
    },
    needWantGoalIcons: {
        paddingTop: 15,
        paddingBottom: 20,
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-around"
    },
    opacity: {
        alignItems: "center"
    },
    detailOpacity: {
        width: "98%"
    },
    editIcon: {
        fontSize: 28,
        color: "#48cae4"
    },
    historyOpacity: {
        marginTop: 20,
        marginBottom: 4,
        alignItems: "flex-end"
    },
    history: {
        padding: 3,
        fontSize: 28,
        color: "#03045e"
    },
    historyView: {
        width: "100%",
        alignItems: "flex-end"
    },
    lowerTitle: {
        borderBottomColor: "#48cae4",
        borderBottomWidth: 1,
        marginBottom: 10
    },
    newTransact: {
        width: "100%"
    },
    detail: {
        width: "28%"
    }
});

export default DashboardHeader;