import Dexie from 'dexie';

const db = new Dexie("GroceryDB");
db.version(2).stores({
    groceries: "++id, name, quantity, location",
    locations: "++id, name"
});

export default db;

