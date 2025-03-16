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
export const deleteGroceryItem = async (id) => {
    return await db.groceries.delete(id);
};