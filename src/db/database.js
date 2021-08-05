
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("db.db");
import {getCurrentMonth} from "../utilities/helper";

const currentMonth = getCurrentMonth();

const dropDatabaseTables = async () => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
            "DROP TABLE IF EXISTS Reminders");
        tx.executeSql(
            "DROP TABLE IF EXISTS Categories");
        tx.executeSql(
            "DROP TABLE IF EXISTS Income");
        tx.executeSql(
            "DROP TABLE IF EXISTS Tags");
        tx.executeSql(
            "DROP TABLE IF EXISTS Transactions");
        },
        (error) => { console.log(error); console.log("db error creating tables"); reject(error) },
        (success) => { console.log("Dropped all tables"); resolve(success)}
      )
    });
  };

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
            "CREATE TABLE IF NOT EXISTS Transactions (ID INTEGER PRIMARY KEY, Amount INTEGER NOT NULL, Date TEXT NOT NULL, Description TEXT, Tag INTEGER, Category INTEGER, CONSTRAINT tag_constraint FOREIGN KEY (Tag) REFERENCES Tags (ID) ON DELETE SET NULL, CONSTRAINT category_constraint FOREIGN KEY (Category) REFERENCES Categories (ID));");
        },
        (_, error) => { console.log("db error creating and populating tables"); console.log(error); reject(error) },
        (_, success) => { console.log("Created and populated All Tables in DB!"); resolve(success)}
      )
    })
  }

  const setUpData = async () => {
    return new Promise((resolve, _reject) => {
        db.transaction( tx => {
            tx.executeSql("INSERT INTO Categories (Value, Label, Percent) VALUES (?,?,?);", ["one", "NEEDS", 50]);
            tx.executeSql("INSERT INTO Categories (Value, Label, Percent) VALUES (?,?,?);", ["two", "WANTS", 30]);
            tx.executeSql("INSERT INTO Categories (Value, Label, Percent) VALUES (?,?,?);", ["three", "GOALS", 20]);
            tx.executeSql("INSERT INTO Tags (Name) VALUES (?);", ["Credit Payoff"]);
            tx.executeSql("INSERT INTO Tags (Name) VALUES (?);", ["Donations"]);
            tx.executeSql("INSERT INTO Tags (Name) VALUES (?);", ["Entertainment"]);
            tx.executeSql("INSERT INTO Tags (Name) VALUES (?);", ["Fees"]);
            tx.executeSql("INSERT INTO Tags (Name) VALUES (?);", ["Food"]);
            tx.executeSql("INSERT INTO Tags (Name) VALUES (?);", ["Hobbies"]);
            tx.executeSql("INSERT INTO Tags (Name) VALUES (?);", ["Household"]);
            tx.executeSql("INSERT INTO Tags (Name) VALUES (?);", ["Insurance"]);
            tx.executeSql("INSERT INTO Tags (Name) VALUES (?);", ["Investing"]);
            tx.executeSql("INSERT INTO Tags (Name) VALUES (?);", ["Mortgage"]);
            tx.executeSql("INSERT INTO Tags (Name) VALUES (?);", ["Personal"]);
            tx.executeSql("INSERT INTO Tags (Name) VALUES (?);", ["Rent"]);
            tx.executeSql("INSERT INTO Tags (Name) VALUES (?);", ["Saving"]);
            tx.executeSql("INSERT INTO Tags (Name) VALUES (?);", ["Transportation"]);
            tx.executeSql("INSERT INTO Tags (Name) VALUES (?);", ["Utilities"]);
            tx.executeSql("INSERT INTO Income (Amount) VALUES (?);", [100000]);
        },
        (error) => {console.log("db error setting up Reminders"); console.log(error); resolve()},
        (success) => {console.log("Test data loaded!"); resolve(success)}
        )
        })
    };

const setUpTestData = async () => {
return new Promise((resolve, _reject) => {
    db.transaction( tx => {
        tx.executeSql( "INSERT INTO Reminders (Description, Date) VALUES (?,?);", ["Test TWO", "2021-06-05"] );
        tx.executeSql( "INSERT INTO Categories (Value, Label, Percent) VALUES (?,?,?);", ["one", "NEEDS", 50] );
        tx.executeSql( "INSERT INTO Categories (Value, Label, Percent) VALUES (?,?,?);", ["two", "WANTS", 30] );
        tx.executeSql( "INSERT INTO Categories (Value, Label, Percent) VALUES (?,?,?);", ["three", "GOALS", 20] );
        tx.executeSql( "INSERT INTO Tags (Name) VALUES (?);", ["Alcohol"] );
        tx.executeSql( "INSERT INTO Tags (Name) VALUES (?);", ["Charity"] );
        tx.executeSql( "INSERT INTO Tags (Name) VALUES (?);", ["Credit Payoff"] );
        tx.executeSql( "INSERT INTO Tags (Name) VALUES (?);", ["Fees"] );
        tx.executeSql( "INSERT INTO Tags (Name) VALUES (?);", ["Food"] );
        tx.executeSql( "INSERT INTO Tags (Name) VALUES (?);", ["Hobbies"] );
        tx.executeSql( "INSERT INTO Tags (Name) VALUES (?);", ["Italy savings"] );
        tx.executeSql( "INSERT INTO Tags (Name) VALUES (?);", ["Rent"] );
        tx.executeSql( "INSERT INTO Tags (Name) VALUES (?);", ["Retirement"] );
        tx.executeSql( "INSERT INTO Tags (Name) VALUES (?);", ["Takeaway"] );
        tx.executeSql( "INSERT INTO Tags (Name) VALUES (?);", ["Transportation"] );
        tx.executeSql( "INSERT INTO Tags (Name) VALUES (?);", ["Utilities"] );
        tx.executeSql( "INSERT INTO Income (Amount) VALUES (?);", [130000] );
        tx.executeSql( "INSERT INTO Transactions (Amount, Date, Description, Tag, Category) VALUES (?,?,?,?,?);", [2150, "2021-08-04", "Tesco", 5, 1] );
        tx.executeSql( "INSERT INTO Transactions (Amount, Date, Description, Tag, Category) VALUES (?,?,?,?,?);", [6325, "2021-08-12", "RBS Savings", 7, 3] );
        tx.executeSql( "INSERT INTO Transactions (Amount, Date, Description, Tag, Category) VALUES (?,?,?,?,?);", [4500, "2021-08-01", "Gym membership fee", 6, 2] );
        tx.executeSql( "INSERT INTO Transactions (Amount, Date, Description, Tag, Category) VALUES (?,?,?,?,?);", [6575, "2021-08-03", "Vanguard", 9, 3] );

        tx.executeSql( "INSERT INTO Transactions (Amount, Date, Description, Tag, Category) VALUES (?,?,?,?,?);", [2853, "2021-02-11", "Debenhams", 10, 2] );
        tx.executeSql( "INSERT INTO Transactions (Amount, Date, Description, Tag, Category) VALUES (?,?,?,?,?);", [1999, "2021-01-04", "Co-Op", 5, 1] );
        tx.executeSql( "INSERT INTO Transactions (Amount, Date, Description, Tag, Category) VALUES (?,?,?,?,?);", [2485, "2021-05-12", "Savings", 7, 3] );
        tx.executeSql( "INSERT INTO Transactions (Amount, Date, Description, Tag, Category) VALUES (?,?,?,?,?);", [9044, "2021-02-01", null, null, 2] );
        tx.executeSql( "INSERT INTO Transactions (Amount, Date, Description, Tag, Category) VALUES (?,?,?,?,?);", [2411, "2021-03-03", "Retirement funds", 9, 3] );
        tx.executeSql( "INSERT INTO Transactions (Amount, Date, Description, Tag, Category) VALUES (?,?,?,?,?);", [1557, "2021-05-10", "Cell phone bill", 12, 1] );
        tx.executeSql( "INSERT INTO Transactions (Amount, Date, Description, Tag, Category) VALUES (?,?,?,?,?);", [2455, "2021-03-07", null, null, 2] );
        tx.executeSql( "INSERT INTO Transactions (Amount, Date, Description, Tag, Category) VALUES (?,?,?,?,?);", [8309, "2021-05-06", "Apple store", 6, 2] );
        tx.executeSql( "INSERT INTO Transactions (Amount, Date, Description, Tag, Category) VALUES (?,?,?,?,?);", [9974, "2021-04-12", "Electric bill", 12, 1] );
        tx.executeSql( "INSERT INTO Transactions (Amount, Date, Description, Tag, Category) VALUES (?,?,?,?,?);", [6735, "2021-02-02", "Waitrose", 5, 1] );

        tx.executeSql( "INSERT INTO Transactions (Amount, Date, Description, Tag, Category) VALUES (?,?,?,?,?);", [6575, "2021-08-10", "Glasgow City Council", 12, 1] );
        tx.executeSql( "INSERT INTO Transactions (Amount, Date, Description, Tag, Category) VALUES (?,?,?,?,?);", [1575, "2021-08-07", null, null, 2] );
        tx.executeSql( "INSERT INTO Transactions (Amount, Date, Description, Tag, Category) VALUES (?,?,?,?,?);", [5825, "2021-08-06", "John Lewis", null, 2] );
        tx.executeSql( "INSERT INTO Transactions (Amount, Date, Description, Tag, Category) VALUES (?,?,?,?,?);", [6325, "2021-08-12", "Scottish Power", 12, 1] );
        tx.executeSql( "INSERT INTO Transactions (Amount, Date, Description, Tag, Category) VALUES (?,?,?,?,?);", [1200, "2021-08-02", "Sainsbury’s", 5, 1] );
        tx.executeSql( "INSERT INTO Transactions (Amount, Date, Description, Tag, Category) VALUES (?,?,?,?,?);", [6325, "2021-08-11", "Uber Eats", 10, 2] );
        tx.executeSql( "INSERT INTO Transactions (Amount, Date, Description, Tag, Category) VALUES (?,?,?,?,?);", [2150, "2021-06-04", "Sainsbury's", 5, 1] );
        tx.executeSql( "INSERT INTO Transactions (Amount, Date, Description, Tag, Category) VALUES (?,?,?,?,?);", [6325, "2021-06-12", "RBS save", 7, 3] );
        tx.executeSql( "INSERT INTO Transactions (Amount, Date, Description, Tag, Category) VALUES (?,?,?,?,?);", [4500, "2021-06-01", "Gym payment", 6, 2] );
        tx.executeSql( "INSERT INTO Transactions (Amount, Date, Description, Tag, Category) VALUES (?,?,?,?,?);", [6575, "2021-06-03", "Vanguard savings", 9, 3] );
        tx.executeSql( "INSERT INTO Transactions (Amount, Date, Description, Tag, Category) VALUES (?,?,?,?,?);", [6575, "2021-05-10", "Glasgow tax", 12, 1] );
        tx.executeSql( "INSERT INTO Transactions (Amount, Date, Description, Tag, Category) VALUES (?,?,?,?,?);", [1575, "2021-05-07", null, null, 2] );
        tx.executeSql( "INSERT INTO Transactions (Amount, Date, Description, Tag, Category) VALUES (?,?,?,?,?);", [5825, "2021-05-06", "TK Max", 6, 2] );
        tx.executeSql( "INSERT INTO Transactions (Amount, Date, Description, Tag, Category) VALUES (?,?,?,?,?);", [6325, "2021-04-12", "Scottish Power", 12, 1] );
        tx.executeSql( "INSERT INTO Transactions (Amount, Date, Description, Tag, Category) VALUES (?,?,?,?,?);", [1200, "2021-04-02", "Tesco", 5, 1] );
        tx.executeSql( "INSERT INTO Transactions (Amount, Date, Description, Tag, Category) VALUES (?,?,?,?,?);", [6325, "2021-04-11", "Deliveroo", 10, 2] );
    },
    (error) => {console.log("db error setting up Reminders"); console.log(error); resolve()},
    (success) => {console.log("Test data loaded!"); resolve(success)}
    )
    })
};

const getAllReminders = async () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                "SELECT * FROM Reminders;",
                [],
                (_, result) => {console.log("GetAllRemindersWorked!"); resolve(result.rows._array)}, //console.log(result.rows._array);
                (_, error) => {console.log("GetAllReminders failed"); reject(console.log(error))},
            );
        });
    });
}

const doneReminder = async (bool, ID) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                "UPDATE Reminders SET Complete = ? WHERE ID = ?;",
                [bool, ID],
                (_, result) => {console.log("Reminder complete status updated in the DB!"); console.log(result.rows._array); resolve(result.rows._array)},
                (_, error) => {console.log("Changing reminder complete status failed in DB"); reject(console.log(error))},
            );
        });
    });
}

const updateReminder = async (ID, newDescription, newDate, newComplete) => {
    return new Promise((resolve, _reject) => {
        db.transaction(tx => {
            tx.executeSql(
                "UPDATE Reminders SET Description = ?, Date = ?, Complete = ? WHERE ID = ?;",
                [newDescription, newDate, newComplete, ID]
            );
        },
        (error) => { console.log("Database error updating reminder!"); console.log(error); resolve() },
        (success) => { console.log("Reminder successfully updated!"); resolve(success)}
        )
        })
    }

const deleteReminder = async (ID) => {
    return new Promise((resolve, _reject) => {
        db.transaction(tx => {
            tx.executeSql(
                "DELETE FROM Reminders WHERE ID = ?;",
                [ID]
            );
        },
        (error) => { console.log("Database error deleting reminder!"); console.log(error); resolve() },
        (success) => { console.log("Reminder successfully deleted from DB!"); resolve(success)}
        )
        })
    }

const getAllTransactions = async () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                "SELECT Transactions.ID AS ID, Date, Description, Amount, Categories.Label AS CategoryLabel, Categories.Value AS CategoryValue, Tag AS TagID, Tags.Name AS Tag FROM Transactions LEFT OUTER JOIN Categories ON Transactions.Category = Categories.ID LEFT OUTER JOIN Tags ON Transactions.Tag = Tags.ID",
                [],
                (_, result) => {console.log("GetAllTransactions Worked!"); console.log(result.rows._array); resolve(result.rows._array)},
                (_, error) => {console.log("GetAllTransactions failed"); reject(console.log(error))},
            );
        });
    });
}

const addTransaction = async (amount, date, description, tag, category) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                "INSERT INTO Transactions (Amount, Date, Description, Tag, Category ) VALUES (?,?,?,?,?);",
                [amount, date, description, tag, category],
                (_, result) => {console.log("ADD TRANSACTION TO DB WORKED!"); resolve(result.insertId)},
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
                "SELECT * from Income;",
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
                (_, result) => {console.log("getAllTags database call Worked!"); resolve(result.rows._array)}, //console.log(result.rows._array);
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
                "SELECT SUM(Amount), Category FROM Transactions WHERE Date LIKE '" + currentMonth + "%" + "' GROUP BY Category",
                [],
                (_, result) => {console.log("getSpent db call Worked!"); console.log(result.rows._array); resolve(result.rows._array)},
                (_, error) => {console.log("getSpent db call failed"); reject(console.log(error))},
            );
        });
    });
}

export const database = {
    dropDatabaseTables,
    setUpTestData,
    setUpDatabase,
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
    deleteTransaction,
    doneReminder,
    updateReminder,
    deleteReminder,
    setUpData,
}