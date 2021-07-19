import createDataContext from "./createDataContext";
import { database } from "../db/database";

const tagReducer = (state, action) => {
  switch (action.type) {
    case 'get_tags':
      return action.payload;
    case 'update_tag':
      return state.map(tag => {
        return tag["ID"] === action.payload.id ? action.payload : tag;
      });
    case 'delete_tag':
      return state.filter(tag => tag["ID"] !== action.payload);
    default:
      return state;
  }
};

const getTags = dispatch => {
  return async () => {
    const response = await database.getAllTags();
    console.log("this is what response is for getTags: " + response.length)

    dispatch({ type: 'get_tags', payload: response });
  };
};

const updateTag = dispatch => {
  return async (ID, newName, callback) => {
    await database.updateTag(ID, newName);

    dispatch({
      type: 'update_tag',
      payload: { ID, newName }
    });
    if (callback) {
      callback();
    }
  };
};

const deleteTag = dispatch => {
  return async ID => {
    await database.deleteTag(ID);

    dispatch({ type: 'delete_tag', payload: ID });
  };
};

//TODO: does dispatch need to be replaced with () on line below? What about callback two lines below?
const addTag = dispatch => {
  return async (name, callback) => {
    await database.addTag(name);

    if (callback) {
      callback();
    }
  };
};

export const { Context, Provider } = createDataContext(
    tagReducer,
  { getTags, updateTag, deleteTag, addTag },
  []
);