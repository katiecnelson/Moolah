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
            "CREATE TABLE IF NOT EXISTS Categories (ID INTEGER PRIMARY KEY, Value TEXT NOT NULL, Label TEXT NOT NULL, Percent INTEGER NOT NULL);");
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS Income (ID INTEGER PRIMARY KEY, Amount INTEGER NOT NULL);");
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
        tx.executeSql( "INSERT INTO Categories (Value, Label, Percent) VALUES (?,?,?)", ["one", "NEEDS", 50] ); // 1 
        tx.executeSql( "INSERT INTO Categories (Value, Label, Percent) VALUES (?,?,?)", ["two", "WANTS", 30] ); // 2
        tx.executeSql( "INSERT INTO Categories (Value, Label, Percent) VALUES (?,?,?)", ["three", "GOALS", 20] ); // 3
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
        tx.executeSql( "INSERT INTO Income (Amount) VALUES (?)", [130000] );
        tx.executeSql( "INSERT INTO Transactions (Amount, Date, Description, Tag, Category) VALUES (?,?,?,?,?)", [6325, "2021-07-12", "RBS Savings", 7, 3] );
        tx.executeSql( "INSERT INTO Transactions (Amount, Date, Description, Tag, Category) VALUES (?,?,?,?,?)", [6325, "2021-07-12", "Scottish Power", 12, 1] );
        tx.executeSql( "INSERT INTO Transactions (Amount, Date, Description, Tag, Category) VALUES (?,?,?,?,?)", [6325, "2021-07-11", "Uber Eats", 10, 2] );
        tx.executeSql( "INSERT INTO Transactions (Amount, Date, Description, Tag, Category) VALUES (?,?,?,?,?)", [6575, "2021-07-10", "Glasgow City Council", 12, 1] );
        tx.executeSql( "INSERT INTO Transactions (Amount, Date, Description, Tag, Category) VALUES (?,?,?,?,?)", [1575, "2021-07-07", "No description", 10, 2] );
        tx.executeSql( "INSERT INTO Transactions (Amount, Date, Description, Tag, Category) VALUES (?,?,?,?,?)", [5825, "2021-07-06", "John Lewis", 6, 2] );
        tx.executeSql( "INSERT INTO Transactions (Amount, Date, Description, Tag, Category) VALUES (?,?,?,?,?)", [2150, "2021-07-04", "Tesco", 5, 1] );
        tx.executeSql( "INSERT INTO Transactions (Amount, Date, Description, Tag, Category) VALUES (?,?,?,?,?)", [6575, "2021-07-03", "Vanguard", 9, 3] );
        tx.executeSql( "INSERT INTO Transactions (Amount, Date, Description, Tag, Category) VALUES (?,?,?,?,?)", [1200, "2021-07-02", "Sainsbury’s", 5, 1] );
        tx.executeSql( "INSERT INTO Transactions (Amount, Date, Description, Tag, Category) VALUES (?,?,?,?,?)", [4500, "2021-07-01", "Gym membership fee", 6, 2] );
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
                "SELECT Transactions.ID AS ID, Date, Description, Amount, Categories.Label AS CategoryLabel, Categories.Value AS CategoryValue, Tag AS TagID, Tags.Name AS Tag FROM Transactions LEFT OUTER JOIN Categories ON Transactions.Category = Categories.ID LEFT OUTER JOIN Tags ON Transactions.Tag = Tags.ID",
                [],
                (_, result) => {console.log("GetAllTransactions Worked!"); console.log(result.rows._array); resolve(result.rows._array)}, //console.log(result.rows._array);
                (_, error) => {console.log("GetAllTransactions failed"); reject(console.log(error))},
            );
        });
    });
}

const addTransaction = async (amount, date, description, tag, category) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                "INSERT INTO Transactions (Amount, Date, Description, Tag, Category ) VALUES (?,?,?,?,?)",
                [amount, date, description, tag, category],
                (_, result) => {console.log("ADD TRANSACTION TO DB WORKED!"); console.log("THIS IS RETURNED BY ADD TRANSACT TO DB!!: " + result.insertId); resolve(result.insertId)},
                (_, error) => {console.log("ADD TRANSACTION TO DB failed"); reject(console.log(error))},
            );
        });
    });
}

const updateTransaction = async (ID, newAmount, newCategory, newDate, newDescription, newTagID) => {
    return new Promise((resolve, _reject) => {
        db.transaction(tx => {
            tx.executeSql(
                "UPDATE Transactions SET Amount = ?, Category = ?, Date = ?, Description = ?, Tag = ? WHERE ID = ?;",
                [newAmount, newCategory, newDate, newDescription, newTagID, ID]
            );
        },
        (error) => { console.log("Database error updating transaction!"); console.log(error); resolve() },
        (success) => { console.log("Transaction successfully updated in DB!"); resolve(success)}
        )
        })
    }

const deleteTransaction = async (ID) => {
    return new Promise((resolve, _reject) => {
        db.transaction(tx => {
            tx.executeSql(
                "DELETE FROM Transactions WHERE ID = ?;",
                [ID]
            );
        },
        (error) => { console.log("Database error deleting transaction!"); console.log(error); resolve() },
        (success) => { console.log("Transaction successfully deleted from DB!"); resolve(success)}
        )
        })
    }

const getIncome = async () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                "SELECT * from Income",
                [],
                (_, result) => {console.log("getIncome DB call Worked!"); resolve(result.rows._array)}, //console.log(result.rows._array);
                (_, error) => {console.log("getIncome failed"); reject(console.log(error))},
            );
        });
    });
}

const updateIncome = async (amount) => {
    return new Promise((resolve, _reject) => {
        db.transaction(tx => {
            tx.executeSql(
                "UPDATE Income SET Amount = ?;",
                [amount]
            );
        },
        (error) => { console.log("Database error updating income!"); console.log(error); resolve() },
        (success) => { console.log("Income successfully updated!"); resolve(success)}
        )
        })
    }

const getAllCategories = async () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                "SELECT ID, Value AS CategoryValue, Label as CategoryLabel, Percent FROM Categories",
                [],
                (_, result) => {console.log("getAllCategories database call Worked!"); console.log(result.rows._array); resolve(result.rows._array)}, //
                (_, error) => {console.log("getCategories failed"); reject(console.log(error))},
            );
        });
    });
}

const updateCategories = async (newAliasOne, newPercentOne, newAliasTwo, newPercentTwo, newAliasThree, newPercentThree) => {
    return new Promise((resolve, _reject) => {
        db.transaction(tx => {
            tx.executeSql( "UPDATE Categories SET Label = ?, Percent = ? WHERE Value = ?;", [newAliasOne, newPercentOne, "one"] );
            tx.executeSql( "UPDATE Categories SET Label = ?, Percent = ? WHERE Value = ?;", [newAliasTwo, newPercentTwo, "two"] );
            tx.executeSql( "UPDATE Categories SET Label = ?, Percent = ? WHERE Value = ?;", [newAliasThree, newPercentThree, "three"] );
        },
        (error) => { console.log("Database error updating categories!"); console.log(error); resolve() },
        (success) => { console.log("Categories successfully updated!"); resolve(success)}
        )
        })
    }

const getAllTags = async () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                "SELECT * from Tags",
                [],
                (_, result) => {console.log("getAllTags database call Worked!"); console.log(result.rows._array); resolve(result.rows._array)}, //
                (_, error) => {console.log("getTags failed"); reject(console.log(error))},
            );
        });
    });
}

const updateTag = async (ID, newName) => {
    return new Promise((resolve, _reject) => {
        db.transaction(tx => {
            tx.executeSql(
                "UPDATE Tags SET Name = ? WHERE ID = ?;",
                [newName, ID]
            );
        },
        (error) => { console.log("Database error updating tag!"); console.log(error); resolve() },
        (success) => { console.log("Tag successfully updated!"); resolve(success)}
        )
        })
    }

const deleteTag = async (ID) => {
    return new Promise((resolve, _reject) => {
        db.transaction(tx => {
            tx.executeSql(
                "DELETE FROM Tags WHERE ID = ?;",
                [ID]
            );
        },
        (error) => { console.log("Database error deleting tag!"); console.log(error); resolve() },
        (success) => { console.log("Tag successfully deleted!"); resolve(success)}
        )
        })
    }

const addTag = async (name) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                "INSERT INTO Tags (Name) VALUES (?)",
                [name],
                (_, result) => {console.log("ADD TAG TO DB WORKED!"); console.log("THIS HERE!!: " + result.insertId); resolve(result.insertId)},
                (_, error) => {console.log("ADD TAG TO DB failed"); reject(console.log(error))},
            );
        });
    });
}

const addNewReminder = async (description, date) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                "INSERT INTO Reminders (Description, Date) VALUES (?,?)", 
                [description, date],
                (_, result) => {console.log("ADD NEW REMINDER TO WORKED!"); resolve(result.insertId)},
                (_, error) => {console.log("Add new reminder to DB failed"); reject(console.log(error))},
            );
        });
    });
}

const getSpent = async () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                "SELECT SUM(Amount), Category FROM Transactions GROUP BY Category",
                [],
                (_, result) => {console.log("getSpent db call Worked!"); resolve(result.rows._array)}, //console.log(result.rows._array);
                (_, error) => {console.log("getSpent db call failed"); reject(console.log(error))},
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
    getSpent,
    getAllTags,
    updateTag,
    deleteTag,
    addTag,
    addTransaction,
    updateIncome,
    updateCategories,
    updateTransaction,
    deleteTransaction
}