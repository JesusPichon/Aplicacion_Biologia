import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({name: 'Test.db', location: 'default'});

export default db;