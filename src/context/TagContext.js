import createDataContext from "./createDataContext";
import {database} from "../db/database";

/*
 * Reducer that takes actions and data and updates the global state of
 * tags data accordingly
 */

const tagReducer = (state, action) => {
  switch (action.type) {
    case "get_tags":
      return action.payload;
    case "update_tag":
      return state.map(tag => {
        return tag["ID"] === action.payload["ID"] ? action.payload : tag;
      });
    case "add_tag":
      return [
        ...state,
        {
          "ID": action.payload["ID"],
          "Name": action.payload["Name"],
        },
      ];
    case "delete_tag":
      return state.filter(tag => tag["ID"] !== action.payload);
    default:
      return state;
  }
};

/*
 * Fetches all tag data from the database and sends the
 * information to the reducer (above) to update the global state
 */

const getTags = dispatch => {
  return async () => {
    const response = await database.getAllTags();

    dispatch({type: "get_tags", payload: response});
  };
};

/*
 * Makes changes to a tag in the database and then sends the data
 * to the reducer (above) to update global state for tags
 */

const updateTag = dispatch => {
  return async (ID, newName) => {
    await database.updateTag(ID, newName);

    dispatch({
      type: "update_tag",
      payload: {"ID": ID, "Name": newName}
    });
  };
};

/*
 * Deletes a tag in the database and then sends the data
 * to the reducer (above) to update global state for tags
 */

const deleteTag = dispatch => {
  return async ID => {
    await database.deleteTag(ID);

    dispatch({type: "delete_tag", payload: ID});
  };
};

/*
 * Adds a tag in the database and then sends the data
 * to the reducer (above) to update global state for tags
 */

const addTag = dispatch => {
  return async (name) => {
    const response = await database.addTag(name);

    dispatch({
      type: "add_tag",
      payload: {"ID": response, "Name": name }
    });
  };
};

export const {Context, Provider} = createDataContext(
    tagReducer,
  {getTags, updateTag, deleteTag, addTag},
  []
);