/**
 * This custom hook was inspired by code written by Jake Sparling and can be found here:
 * https://www.jsparling.com/using-hooks-and-context-with-sqlite-for-expo-in-react-native/
 */

import React, {useEffect} from "react";
import {database} from "../db/database";

export default function useDatabase() {
  const [isDBLoadingComplete, setDBLoadingComplete] = React.useState(false);

  useEffect(() => {
    async function loadDataAsync() {
      try {
        await database.setUpDatabase();
        const response = await database.getAllCategories();
        if (response.length === 0) {
          await database.setUpData();
        }
        setDBLoadingComplete(true);
      } catch (error) {
        console.warn(error);
      }
    }
    loadDataAsync();
  }, []);

  return isDBLoadingComplete;
};