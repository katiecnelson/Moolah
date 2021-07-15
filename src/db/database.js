import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("db.db");

const dropDatabaseTables = async () => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
            "DROP TABLE Reminders");
        tx.executeSql(
            "DROP TABLE Categories");
        tx.executeSql(
            "DROP TABLE Income");
        tx.executeSql(
            "DROP TABLE Tags");
        tx.executeSql(
            "DROP TABLE Transactions");
        },
        (error) => { console.log(error); console.log("db error creating tables"); reject(error) },
        (success) => { console.log("Dropped all tables"); resolve(success)}
      )
    })
  }

const setUpDatabase = async () => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS Reminders (ID INTEGER PRIMARY KEY, Description TEXT NOT NULL, Date TEXT NOT NULL, Complete INTEGER DEFAULT 0);");
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS Categories (ID INTEGER PRIMARY KEY, Name TEXT NOT NULL, Percent INTEGER NOT NULL);");
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS Income (ID INTEGER PRIMARY KEY, Amount INTEGER NOT NULL, Date TEXT NOT NULL);");
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS Tags (ID INTEGER PRIMARY KEY, Name TEXT NOT NULL);");
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS Transactions (ID INTEGER PRIMARY KEY, Amount INTEGER NOT NULL, Date TEXT NOT NULL, Description TEXT, Tag INTEGER, Category INTEGER, CONSTRAINT tag_constraint FOREIGN KEY (Tag) REFERENCES Tags (ID), CONSTRAINT category_constraint FOREIGN KEY (Category) REFERENCES Categories (ID));");
        },
        (_, error) => { console.log("db error creating tables"); console.log(error); reject(error) },
        (_, success) => { console.log("Created All Tables!"); resolve(success)}
      )
    })
  }

const setUpTestData = async () => {
return new Promise((resolve, _reject) => {
    db.transaction( tx => {
        tx.executeSql( "INSERT INTO Reminders (Description, Date) VALUES (?,?)", ["This is a test", "2021-06-01"] );
        tx.executeSql( "INSERT INTO Reminders (Description, Date) VALUES (?,?)", ["Test TWO", "2021-06-05"] );
        tx.executeSql( "INSERT INTO Categories (Name, Percent) VALUES (?,?)", ["Needs", 50] ); // 1 
        tx.executeSql( "INSERT INTO Categories (Name, Percent) VALUES (?,?)", ["Wants", 30] ); // 2
        tx.executeSql( "INSERT INTO Categories (Name, Percent) VALUES (?,?)", ["Goals", 20] ); // 3
        tx.executeSql( "INSERT INTO Tags (Name) VALUES (?)", ["Alcohol"] ); // 1
        tx.executeSql( "INSERT INTO Tags (Name) VALUES (?)", ["Charity"] ); // 2
        tx.executeSql( "INSERT INTO Tags (Name) VALUES (?)", ["Credit Payoff"] ); // 3
        tx.executeSql( "INSERT INTO Tags (Name) VALUES (?)", ["Fees"] ); // 4
        tx.executeSql( "INSERT INTO Tags (Name) VALUES (?)", ["Food"] ); // 5
        tx.executeSql( "INSERT INTO Tags (Name) VALUES (?)", ["Hobbies"] ); // 6
        tx.executeSql( "INSERT INTO Tags (Name) VALUES (?)", ["Italy savings"] ); // 7
        tx.executeSql( "INSERT INTO Tags (Name) VALUES (?)", ["Rent"] ); // 8
        tx.executeSql( "INSERT INTO Tags (Name) VALUES (?)", ["Retirement"] ); // 9
        tx.executeSql( "INSERT INTO Tags (Name) VALUES (?)", ["Takeaway"] ); // 10
        tx.executeSql( "INSERT INTO Tags (Name) VALUES (?)", ["Transportation"] ); // 11
        tx.executeSql( "INSERT INTO Tags (Name) VALUES (?)", ["Utilities"] ); // 12
        tx.executeSql( "INSERT INTO Income (Amount, Date) VALUES (?, ?)", [130000, "2021-07-01"] );
        tx.executeSql( "INSERT INTO Transactions (Amount, Date, Description, Tag, Category) VALUES (?,?,?,?,?)", [6325, "2021-07-12", "RBS Savings", 7, 3] );
        tx.executeSql( "INSERT INTO Transactions (Amount, Date, Description, Tag, Category) VALUES (?,?,?,?,?)", [6325, "2021-07-12", "Scottish Power", 12, 1] );
        tx.executeSql( "INSERT INTO Transactions (Amount, Date, Description, Tag, Category) VALUES (?,?,?,?,?)", [6325, "2021-07-11", "Uber Eats", 10, 2] );
        tx.executeSql( "INSERT INTO Transactions (Amount, Date, Description, Tag, Category) VALUES (?,?,?,?,?)", [6575, "2021-07-10", "Glasgow City", 12, 1] );
        tx.executeSql( "INSERT INTO Transactions (Amount, Date, Description, Tag, Category) VALUES (?,?,?,?,?)", [1575, "2021-07-07", "No description", 10, 2] );
        tx.executeSql( "INSERT INTO Transactions (Amount, Date, Description, Tag, Category) VALUES (?,?,?,?,?)", [5825, "2021-07-06", "John Lewis", 6, 2] );
        tx.executeSql( "INSERT INTO Transactions (Amount, Date, Description, Tag, Category) VALUES (?,?,?,?,?)", [2150, "2021-07-04", "Tesco", 5, 1] );
        tx.executeSql( "INSERT INTO Transactions (Amount, Date, Description, Tag, Category) VALUES (?,?,?,?,?)", [6575, "2021-07-03", "Vanguard", 9, 3] );
        tx.executeSql( "INSERT INTO Transactions (Amount, Date, Description, Tag, Category) VALUES (?,?,?,?,?)", [1200, "2021-07-02", "Sainsbury’s", 5, 1] );
        tx.executeSql( "INSERT INTO Transactions (Amount, Date, Description, Tag, Category) VALUES (?,?,?,?,?)", [4500, "2021-07-01", "Gym", 6, 2] );
    },
    (error) => { console.log("db error setting up Reminders"); console.log(error); resolve() },
    (success) => { console.log("Test data loaded!"); resolve(success)}
    )
    })
}

const getAllReminders = async () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                "SELECT * FROM Reminders",
                [],
                (_, result) => {console.log("GetAllRemindersWorked!"); resolve(result.rows._array)},
                (_, error) => {console.log("GetAllReminders failed"); reject(console.log(error))},
            );
        });
    });
}

const getAllTransactions = async () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                "SELECT cast(Transactions.ID as TEXT) AS ID, Date, Description, Amount, Categories.Name AS Category, Tags.Name AS Tag FROM Transactions LEFT OUTER JOIN Categories ON Transactions.Category = Categories.ID LEFT OUTER JOIN Tags ON Transactions.Tag = Tags.ID",
                [],
                (_, result) => {console.log("GetAllTransactions Worked!"); console.log(result.rows._array); resolve(result.rows._array)},
                (_, error) => {console.log("GetAllTransactions failed"); reject(console.log(error))},
            );
        });
    });
}

const getIncome = async () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                "SELECT * from Income",
                [],
                (_, result) => {console.log("getIncome Worked!"); console.log(result.rows._array); resolve(result.rows._array)},
                (_, error) => {console.log("getIncome failed"); reject(console.log(error))},
            );
        });
    });
}

const getAllCategories = async () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                "SELECT * from Categories",
                [],
                (_, result) => {console.log("getAllCategories database call Worked!"); console.log(result.rows._array); resolve(result.rows._array)},
                (_, error) => {console.log("getCategories failed"); reject(console.log(error))},
            );
        });
    });
}

const addNewReminder = async (description, date) => {
    return new Promise((resolve, _reject) => {
        db.transaction( tx => {
            tx.executeSql(
                "INSERT INTO Reminders (Description, Date) VALUES (?,?)", 
            [description, date] );
            },
            (error) => { console.log("db error adding a new reminder"); console.log(error); resolve() },
            (success) => { console.log("A new reminder was successfully added!"); resolve(success)}
        )
    })
}

const getNeedSpent = async () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                "SELECT SUM(Amount), Category FROM Transactions GROUP BY Category",
                [],
                (_, result) => {console.log("getNeedSpent database call Worked!"); console.log(result.rows._array); resolve(result.rows._array)},
                (_, error) => {console.log("getNeedSpent db call failed"); reject(console.log(error))},
            );
        });
    });
}

const getWantSpent = async () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                "SELECT * from Categories",
                [],
                (_, result) => {console.log("getWantSpent database call Worked!"); console.log(result.rows._array); resolve(result.rows._array)},
                (_, error) => {console.log("getWantSpent db call failed"); reject(console.log(error))},
            );
        });
    });
}

const getGoalSpent = async () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                "SELECT * from Categories",
                [],
                (_, result) => {console.log("getGoalSpent database call Worked!"); console.log(result.rows._array); resolve(result.rows._array)},
                (_, error) => {console.log("getGoalSpent db call failed"); reject(console.log(error))},
            );
        });
    });
}



export const database = {
    dropDatabaseTables,
    setUpDatabase,
    setUpTestData,
    getAllReminders,
    addNewReminder,
    getAllTransactions,
    getIncome,
    getAllCategories,
    getNeedSpent,
    getWantSpent,
    getGoalSpent
}