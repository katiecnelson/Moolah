import React, {useEffect} from "react";
import {database} from "../db/database";

export default function useDatabase() {
  const [isDBLoadingComplete, setDBLoadingComplete] = React.useState(false);

  useEffect(() => {
    async function loadDataAsync() {
      try {
        // await database.dropDatabaseTables();
        // await database.setUpTestData();
        // await database.setUpData();
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