import * as SQLite from 'expo-sqlite';
import {getCurrentMonth} from "../utilities/helper";

const db = SQLite.openDatabase("db.db");

// Functions to set up the database on first use of app

const setUpDatabase = async () => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql("CREATE TABLE IF NOT EXISTS Reminders (ID INTEGER PRIMARY KEY, Description TEXT NOT NULL, Date TEXT NOT NULL, Complete INTEGER DEFAULT 0);");
        tx.executeSql("CREATE TABLE IF NOT EXISTS Categories (ID INTEGER PRIMARY KEY, Value TEXT NOT NULL, Label TEXT NOT NULL, Percent INTEGER NOT NULL);");
        tx.executeSql("CREATE TABLE IF NOT EXISTS Income (ID INTEGER PRIMARY KEY, Amount INTEGER NOT NULL);");
        tx.executeSql("CREATE TABLE IF NOT EXISTS Tags (ID INTEGER PRIMARY KEY, Name TEXT NOT NULL);");
        tx.executeSql("CREATE TABLE IF NOT EXISTS Transactions (ID INTEGER PRIMARY KEY, Amount INTEGER NOT NULL, Date TEXT NOT NULL, Description TEXT, Tag INTEGER, Category INTEGER NOT NULL, CONSTRAINT tag_constraint FOREIGN KEY (Tag) REFERENCES Tags (ID) ON DELETE SET NULL, CONSTRAINT category_constraint FOREIGN KEY (Category) REFERENCES Categories (ID));");
        },
        (_, error) => {console.log("Error creating tables in the database"); reject(console.log(error));},
        (_, success) => resolve(success)
      );
    });
  };

  const setUpData = async () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
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
            tx.executeSql("INSERT INTO Income (Amount) VALUES (?);", [0]);
        },
        (error) => {console.log("Error adding initial data to the database"); console.log(error); reject(error)},
        (success) => resolve(success)
        );
    });
};

// INCOME read and update in the database

const getIncome = async () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                "SELECT * from Income;",
                [],
                (_, result) => resolve(result.rows._array),
                (_, error) => {console.log("Error getting income from the database"); reject(console.log(error));},
            );
        });
    });
};

const updateIncome = async (amount) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                "UPDATE Income SET Amount = ?;",
                [amount]
            );
        },
        (error) => {console.log("Error updating income in the database"); reject(console.log(error));},
        (success) => resolve(success)
        );
    });
};

// CATEGORIES read and update in the database

const getAllCategories = async () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                "SELECT ID, Value AS CategoryValue, Label as CategoryLabel, Percent FROM Categories",
                [],
                (_, result) => resolve(result.rows._array),
                (_, error) => {console.log("Error getting all categories from the database"); reject(console.log(error));},
            );
        });
    });
};

const updateCategories = async (newAliasOne, newPercentOne, newAliasTwo, newPercentTwo, newAliasThree, newPercentThree) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql("UPDATE Categories SET Label = ?, Percent = ? WHERE Value = ?;", [newAliasOne, newPercentOne, "one"]);
            tx.executeSql("UPDATE Categories SET Label = ?, Percent = ? WHERE Value = ?;", [newAliasTwo, newPercentTwo, "two"]);
            tx.executeSql("UPDATE Categories SET Label = ?, Percent = ? WHERE Value = ?;", [newAliasThree, newPercentThree, "three"]);
        },
        (error) => {console.log("Error updating categories in the database"); reject(console.log(error));},
        (success) => resolve(success)
        );
    });
};

// SPENT data for the current month read from the database

const currentMonth = getCurrentMonth();

const getSpent = async () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                "SELECT SUM(Amount), Category FROM Transactions WHERE Date LIKE '" + currentMonth + "%" + "' GROUP BY Category",
                [],
                (_, result) => resolve(result.rows._array),
                (_, error) => {console.log("Error getting the spent amounts from the database"); reject(console.log(error));},
            );
        });
    });
};

// TRANSACTIONS CRUD database functions

const addTransaction = async (amount, date, description, tag, category) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                "INSERT INTO Transactions (Amount, Date, Description, Tag, Category ) VALUES (?,?,?,?,?);",
                [amount, date, description, tag, category],
                (_, result) => resolve(result.insertId),
                (_, error) => {console.log("Error adding transaction to the database"); reject(console.log(error));},
            );
        });
    });
};

const getAllTransactions = async () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                "SELECT Transactions.ID AS ID, Date, Description, Amount, Categories.Label AS CategoryLabel, Categories.Value AS CategoryValue, Tag AS TagID, Tags.Name AS Tag FROM Transactions LEFT OUTER JOIN Categories ON Transactions.Category = Categories.ID LEFT OUTER JOIN Tags ON Transactions.Tag = Tags.ID",
                [],
                (_, result) => resolve(result.rows._array),
                (_, error) => {console.log("Error getting all transactions from the database"); reject(console.log(error));},
            );
        });
    });
};

const updateTransaction = async (ID, newAmount, newCategory, newDate, newDescription, newTagID) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                "UPDATE Transactions SET Amount = ?, Category = ?, Date = ?, Description = ?, Tag = ? WHERE ID = ?;",
                [newAmount, newCategory, newDate, newDescription, newTagID, ID]
            );
        },
        (error) => {console.log("Error updating transaction in the database"); reject(console.log(error))},
        (success) => resolve(success)
        );
    });
};

const deleteTransaction = async (ID) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                "DELETE FROM Transactions WHERE ID = ?;",
                [ID]
            );
        },
        (error) => {console.log("Error deleting transaction in the database"); reject(console.log(error))},
        (success) => resolve(success)
        );
    });
};

// TAGS CRUD database functions

const addTag = async (name) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                "INSERT INTO Tags (Name) VALUES (?)",
                [name],
                (_, result) => resolve(result.insertId),
                (_, error) => {console.log("Error adding tag to the database"); reject(console.log(error));},
            );
        });
    });
};

const getAllTags = async () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                "SELECT * from Tags",
                [],
                (_, result) => resolve(result.rows._array),
                (_, error) => {console.log("Error getting all tags from the database"); reject(console.log(error));},
            );
        });
    });
};

const updateTag = async (ID, newName) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                "UPDATE Tags SET Name = ? WHERE ID = ?;",
                [newName, ID]
            );
        },
        (error) => {console.log("Error updating tag in the database"); reject(console.log(error));},
        (success) => resolve(success)
        );
    });
};

const deleteTag = async (ID) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                "DELETE FROM Tags WHERE ID = ?;",
                [ID]
            );
        },
        (error) => {console.log("Error deleting tag from the database"); reject(console.log(error));},
        (success) => resolve(success)
        );
    });
};

// REMINDERS CRUD database functions

const addNewReminder = async (description, date) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                "INSERT INTO Reminders (Description, Date) VALUES (?,?)", 
                [description, date],
                (_, result) => resolve(result.insertId),
                (_, error) => {console.log("Error adding reminder to database"); reject(console.log(error));},
            );
        });
    });
};

const getAllReminders = async () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                "SELECT * FROM Reminders;",
                [],
                (_, result) => resolve(result.rows._array),
                (_, error) => {console.log("Error getting all reminders from the database"); reject(console.log(error));},
            );
        });
    });
};

const updateReminder = async (ID, newDescription, newDate, newComplete) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                "UPDATE Reminders SET Description = ?, Date = ?, Complete = ? WHERE ID = ?;",
                [newDescription, newDate, newComplete, ID]
            );
        },
        (error) => {console.log("Error updating reminder in the database"); reject(console.log(error));},
        (success) => resolve(success)
        );
    });
};

const doneReminder = async (bool, ID) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                "UPDATE Reminders SET Complete = ? WHERE ID = ?;",
                [bool, ID],
                (_, result) => resolve(result.rows._array),
                (_, error) => {console.log("Error changing done status of reminder in database"); reject(console.log(error));},
            );
        });
    });
};

const deleteReminder = async (ID) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                "DELETE FROM Reminders WHERE ID = ?;",
                [ID]
            );
        },
        (error) => {console.log("Error deleting reminder from the database"); reject(console.log(error));},
        (success) => resolve(success)
        );
    });
};

export const database = {
    setUpDatabase,
    setUpData,
    getIncome,
    updateIncome,
    getAllCategories,
    updateCategories,
    getSpent,
    addTransaction,
    getAllTransactions,
    updateTransaction,
    deleteTransaction,
    addTag,
    getAllTags,
    updateTag,
    deleteTag,
    addNewReminder,
    getAllReminders,
    updateReminder,
    doneReminder,
    deleteReminder
};