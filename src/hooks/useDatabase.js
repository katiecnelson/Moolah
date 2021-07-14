import React, {useEffect} from 'react';

import { database } from '../db/database'

export default function useDatabase() {
  const [isDBLoadingComplete, setDBLoadingComplete] = React.useState(false);

  useEffect(() => {
    async function loadDataAsync() {
      try {
        await database.dropDatabaseTables()
        await database.setUpDatabase()
        await database.setUpTestData()

        setDBLoadingComplete(true);
      } catch (e) {
        console.warn(e);
      }
    }
    loadDataAsync();
  }, []);

  return isDBLoadingComplete;
}