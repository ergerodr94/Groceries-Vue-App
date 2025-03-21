import db from './index';

// Save grocery item
export const dexieSaveGroceryItem = async (groceryItem) => {
   return await db.groceries.add(groceryItem);
};
  
// Get all groceries
export const dexieGetGroceryItems = async () => {
    return await db.groceries.toArray();
};
  
// Delete a grocery item
export const dexieDeleteGroceryItem = async (id) => {
    return await db.groceries.delete(id);
};

//Update an existing grocery item
export const dexieUpdateGroceryItem = async (id, updatedData) => {
    return await db.groceries.update(id, updatedData);
};

export const dexieSaveLocation = async (locationName) => {
    const exists = await db.locations.where("name").equalsIgnoreCase(locationName).count(); 
    if (!exists) {
        return await db.locations.add({ name: locationName });
    }
};

export const dexieGetLocations = async () => {
    return await db.locations.toArray(); 
};

export const dexieDeleteLocation = async (id) => {
    return await db.locations.delete(id);
};