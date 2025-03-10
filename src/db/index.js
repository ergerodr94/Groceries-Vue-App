import Dexie from 'dexie';

const db = new Dexie("GroceryDB");
db.version(1).stores({
    groceries: "++id, name, quantity, location"
});

export default db;

