import createDataContext from "./createDataContext";
import {database} from "../db/database";

const mapDoneReminder = (reminder, bool) => {
  reminder["Complete"] = bool;
  return reminder;
};

/*
 * Reducer that takes actions and data and updates the global state of
 * reminders data accordingly
 */

const reminderReducer = (state, action) => {
  switch (action.type) {
    case "get_reminders":
      return action.payload;
    case "done_reminder":
      return state.map(reminder => {
        return reminder["ID"] === action.payload["ID"] 
        ? mapDoneReminder(reminder, action.payload["Complete"]) 
        : reminder;
      });
    case "add_reminder":
      return [
        ...state,
        {
          "ID": action.payload["ID"],
          "Description": action.payload["Description"],
          "Date": action.payload["Date"],
        },
      ];
    case "update_reminder":
      return state.map(reminder => {
        return reminder["ID"] === action.payload["ID"] ? action.payload : reminder;
      });
    case "delete_reminder":
      return state.filter(reminder => reminder["ID"] !== action.payload);
    default:
      return state;
  }
};

/*
 * Fetches all reminder data from the database and sends the
 * information to the reducer (above) to update the global state
 */

const getReminders = dispatch => {
  return async () => {
    const response = await database.getAllReminders();

    dispatch({type: "get_reminders", payload: response});
  };
};

/*
 * Adds the new reminder with all information to the database
 * then sends the data to the reducer (above) to update global state for reminders
 */

const addReminder = dispatch => {
  return async (description, date) => {
    const response = await database.addNewReminder(description, date);

    dispatch({
      type: "add_reminder",
      payload: {"ID": response, "Description": description, "Date": date}
    });
  };
};

/*
 * Sets a reminder as done in the database and then sends the data
 * to the reducer (above) to update global state for reminders
 */

const doneReminder = dispatch => {
  return async (bool, ID) => {
    await database.doneReminder(bool, ID);

    dispatch({
      type: "done_reminder",
      payload: {"ID": ID, "Complete": bool}
    });
  };
};

/*
 * Deletes a reminder from the database and then sends the data
 * to the reducer (above) to update global state for reminders
 */

const deleteReminder = dispatch => {
  return async ID => {
    await database.deleteReminder(ID);

    dispatch({type: "delete_reminder", payload: ID});
  };
};

/*
 * Sets a reminder as done in the database and then sends the data
 * to the reducer (above) to update global state for reminders
 */

const updateReminder = dispatch => {
  return async (ID, newDescription, newDate, newComplete) => {
    await database.updateReminder(ID, newDescription, newDate, newComplete);

    dispatch({
      type: "update_reminder",
      payload: {"ID": ID, "Description": newDescription, "Date": newDate, "Complete": newComplete}
    });
  };
};

export const {Context, Provider} = createDataContext(
  reminderReducer,
  {addReminder, getReminders, doneReminder, deleteReminder, updateReminder},
  []
);