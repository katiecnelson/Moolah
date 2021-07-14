import createDataContext from "./createDataContext";
import { database } from "../db/database"

const reminderReducer = (state, action) => {
  switch (action.type) {
    case 'get_reminders':
      return action.payload;
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
  return async (description, date, callback) => {
    await database.addNewReminder(description, date);

    if (callback) {
      callback();
    }
  };
};


export const { Context, Provider } = createDataContext(
  reminderReducer,
  { addReminder, getReminders },
  []
);