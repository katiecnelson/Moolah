import createDataContext from "./createDataContext";
import { database } from "../db/database"

const reminderReducer = (state, action) => {
  switch (action.type) {
    case 'get_reminders':
      return action.payload;
    case "add_reminder":
      return [
        ...state,
        {
          "ID": action.payload["ID"],
          "Description": action.payload["Description"],
          "Date": action.payload["Date"],
        },
      ];
    default:
      return state;
  }
};

const getReminders = dispatch => {
  return async () => {
    const response = await database.getAllReminders();

    dispatch({ type: "get_reminders", payload: response });
  };
};

const addReminder = dispatch => {
  return async (description, date) => {
    const response = await database.addNewReminder(description, date);

    dispatch({
      type: "add_reminder",
      payload: {"ID": response, "Description": description, "Date": date }
    });
  };
};



export const { Context, Provider } = createDataContext(
  reminderReducer,
  { addReminder, getReminders },
  []
);