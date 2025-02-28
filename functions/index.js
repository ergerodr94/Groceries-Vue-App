const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const app = express(); 

//This includes the firebase admin SDK, which is different from the client side SDK
const admin = require('firebase-admin');

const { Auth } = require('firebase-admin/auth');

admin.initializeApp();
const db = admin.firestore();

app.use(cors({origin: true}));
app.use(express.json());

// Array of user data
const users = [
  { email: "user1@example.com", password: "password123" },
  { email: "user2@example.com", password: "password123" },
  { email: "user3@example.com", password: "password123" },
  { email: "user4@example.com", password: "password123" },
  { email: "user5@example.com", password: "password123" },
  { email: "user6@example.com", password: "password123" },
  { email: "user7@example.com", password: "password123" },
  { email: "user8@example.com", password: "password123" },
  { email: "user9@example.com", password: "password123" },
  { email: "user10@example.com", password: "password123" },
];


const createUsers = async () => {
  for (const user of users) {
    try {
      const userRecord = await admin.auth().createUser({
        email: user.email,
        password: user.password
      });
      console.log(`User created: ${userRecord.uid}`);
    } catch (error) {
      console.error(`Error creating user ${user.email}:`, error);
    }
  }
};

const seedData = {
  users: {
    user1: {
      houseID: "house1",
      email: "alice@example.com",
      firstName: "Alice",
      lastName: "Smith",
      accepted: true,
      profPic: "https://example.com/alice.jpg",
      prof_blob: "",
      dietRestrictions: {
        restriction1: { type: "Vegetarian" },
      },
      dislikedFoods: {
        dislike1: { name: "Mushrooms" },
      },
      allergies: {
        allergy1: { name: "Peanuts" },
      },
    },
    user2: {
      houseID: "house1",
      email: "bob@example.com",
      firstName: "Bob",
      lastName: "Johnson",
      accepted: true,
      profPic: "https://example.com/bob.jpg",
      prof_blob: "",
      dietRestrictions: {},
      dislikedFoods: {
        dislike2: { name: "Olives" },
      },
      allergies: {},
    },
  },
  houses: {
    house1: {
      nickname: "Cozy Home",
      manager: "user1",
    },
  },
  items: {
    item1: {
      ownerID: "user1",
      houseID: "house1",
      location: "Fridge",
      itemName: "Tomatoes",
      communal: true,
      numRemaining: 5,
      date_created: "2025-02-01T12:00:00Z",
    },
    item2: {
      ownerID: "user2",
      houseID: "house1",
      location: "Pantry",
      itemName: "Pasta",
      communal: false,
      numRemaining: 2,
      date_created: "2025-02-10T15:30:00Z",
    },
    item3: {
      ownerID: "user1",
      houseID: "house1",
      location: "Fridge",
      itemName: "Cheese",
      communal: true,
      numRemaining: 1,
      date_created: "2025-01-28T08:45:00Z",
    },
    item4: {
      ownerID: "user1",
      houseID: "house1",
      location: "Table",
      itemName: "Yellow Onion",
      communal: true,
      numRemaining: 2,
      date_created: "2025-01-28T08:45:00Z",
    },
    item5: {
      ownerID: "user1",
      houseID: "house1",
      location: "Fridge",
      itemName: "Sour Cream",
      communal: true,
      numRemaining: 1,
      date_created: "2025-01-28T08:45:00Z",
    },
    item6: {
      ownerID: "user1",
      houseID: "house1",
      location: "Fridge",
      itemName: "Skim Milk",
      communal: true,
      numRemaining: 1,
      date_created: "2025-01-28T08:45:00Z",
    },
    item7: {
      ownerID: "user1",
      houseID: "house1",
      location: "Spice Cabinet",
      itemName: "Tumeric",
      communal: true,
      numRemaining: 1,
      date_created: "2025-01-28T08:45:00Z",
    },
    item8: {
      ownerID: "user1",
      houseID: "house1",
      location: "Spice Cabinet",
      itemName: "Black Cumin",
      communal: true,
      numRemaining: 1,
      date_created: "2025-01-28T08:45:00Z",
    },
    item9: {
      ownerID: "user1",
      houseID: "house1",
      location: "Fridge",
      itemName: "Coconut oil",
      communal: true,
      numRemaining: 1,
      date_created: "2025-01-28T08:45:00Z",
    },
    item10: {
      ownerID: "user1",
      houseID: "house1",
      location: "Fridge",
      itemName: "Garbanzo Beans",
      communal: true,
      numRemaining: 1,
      date_created: "2025-01-28T08:45:00Z",
    },
    item11: {
      ownerID: "user1",
      houseID: "house1",
      location: "Fridge",
      itemName: "All Purpose Flour",
      communal: true,
      numRemaining: 1,
      date_created: "2025-01-28T08:45:00Z",
    },
    item12: {
      ownerID: "user1",
      houseID: "house1",
      location: "Fridge",
      itemName: "Tomato Paste",
      communal: true,
      numRemaining: 1,
      date_created: "2025-01-28T08:45:00Z",
    },
    item13: {
      ownerID: "user1",
      houseID: "house1",
      location: "Fridge",
      itemName: "Penne Pasta",
      communal: true,
      numRemaining: 1,
      date_created: "2025-01-28T08:45:00Z",
    },
    item14: {
      ownerID: "user1",
      houseID: "house1",
      location: "Fridge",
      itemName: "Fusilli Pasta",
      communal: true,
      numRemaining: 1,
      date_created: "2025-01-28T08:45:00Z",
    },
    item15: {
      ownerID: "user1",
      houseID: "house1",
      location: "Fridge",
      itemName: "Gemelli Pasta",
      communal: true,
      numRemaining: 1,
      date_created: "2025-01-28T08:45:00Z",
    },
    item16: {
      ownerID: "user1",
      houseID: "house1",
      location: "Fridge",
      itemName: "Macaroni Pasta",
      communal: true,
      numRemaining: 1,
      date_created: "2025-01-28T08:45:00Z",
    },
    item17: {
      ownerID: "user1",
      houseID: "house1",
      location: "Fridge",
      itemName: "Black Cumin",
      communal: true,
      numRemaining: 1,
      date_created: "2025-01-28T08:45:00Z",
    },
    item18: {
      ownerID: "user1",
      houseID: "house1",
      location: "Fridge",
      itemName: "Green Lentils",
      communal: true,
      numRemaining: 1,
      date_created: "2025-01-28T08:45:00Z",
    },
    item19: {
      ownerID: "user1",
      houseID: "house1",
      location: "Fridge",
      itemName: "Black Lentils",
      communal: true,
      numRemaining: 1,
      date_created: "2025-01-28T08:45:00Z",
    },
    item20: {
      ownerID: "user1",
      houseID: "house1",
      location: "Fridge",
      itemName: "Red Lentils",
      communal: true,
      numRemaining: 1,
      date_created: "2025-01-28T08:45:00Z",
    },
    item21: {
      ownerID: "user1",
      houseID: "house1",
      location: "Fridge",
      itemName: "Spring Mix",
      communal: true,
      numRemaining: 1,
      date_created: "2025-01-28T08:45:00Z",
    },
    item22: {
      ownerID: "user1",
      houseID: "house1",
      location: "Fridge",
      itemName: "Eggplant",
      communal: true,
      numRemaining: 1,
      date_created: "2025-01-28T08:45:00Z",
    },
    item23: {
      ownerID: "user1",
      houseID: "house1",
      location: "Fridge",
      itemName: "Beets",
      communal: true,
      numRemaining: 1,
      date_created: "2025-01-28T08:45:00Z",
    },
  },
  favoriteRecipes: {
    fav1: {
      userID: "user1",
      houseID: "house1",
      recipeID: "recipe123",
      recipeAPI: "some-api",
      recipeName: "Tomato Pasta",
      cuisine: "Italian",
      htmlLink: "https://example.com/tomato-pasta",
      ingredients: ["Tomatoes", "Pasta", "Cheese"],
      numIngredients: 3,
      prepTime: 10,
      cookTime: 20,
    },
    fav2: {
      userID: "user2",
      houseID: "house1",
      recipeID: "recipe456",
      recipeAPI: "some-api",
      recipeName: "Grilled Cheese",
      cuisine: "American",
      htmlLink: "https://example.com/grilled-cheese",
      ingredients: ["Bread", "Cheese", "Butter"],
      numIngredients: 3,
      prepTime: 5,
      cookTime: 10,
    },
  },
};

// Function to seed Firestore
const seedDatabase = async () => {
  try {
    console.log("Starting database seeding...");

    // Batch write for efficiency
    const batch = db.batch();

    // Seed Users
    Object.entries(seedData.users).forEach(([id, data]) => {
      const ref = db.collection("users").doc();
      batch.set(ref, data);
    });

    // Seed Houses
    Object.entries(seedData.houses).forEach(([id, data]) => {
      const ref = db.collection("houses").doc();
      batch.set(ref, data);
    });

    // Seed Items
    Object.entries(seedData.items).forEach(([id, data]) => {
      const ref = db.collection("items").doc();
      batch.set(ref, data);
    });

    // Seed Favorite Recipes
    Object.entries(seedData.favoriteRecipes).forEach(([id, data]) => {
      const ref = db.collection("favoriteRecipes").doc();
      batch.set(ref, data);
    });

    // Commit batch write
    await batch.commit();

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

// Run the seed function
seedDatabase();
createUsers();

app.post('/createHousehold', (req, res) => {
  console.log(req.body)
  try{//houseDocRef is a promise to write to database
    const houseDocRef = db.collection('houses').doc();
    
    houseDocRef.set({
      houseId: houseDocRef,
      houseName: req.body.household,
      manager: req.body.displayName,
      uid: req.body.userId
    });

    console.log("houseDocRef");
    console.log(houseDocRef.id);

    db.collection('users').where("UID", "==", req.body.userId).get()
      .then((snapshot) => {
        snapshot.docs.forEach(doc => {
          db.collection('users').doc(doc.id).update({
            houseId: houseDocRef.id
          })
          console.log("doc.data");
          console.log(doc.data());
        })
      });
      
    res.status(200).send({status: 'success', message: 'Household created successfully'});
  } catch(error){
    console.log("createHousehold: ");
    console.log(error);
    res.status(500).send({status: 'error', message: 'An Error Occurred while creating household'})
  }
})
exports.createHousehold = functions.https.onRequest(app);

app.post('/retrieveHouse', async (req, res) =>{
  console.log('retrieveHouse: ');
  console.log(req.body);
  try{
    db.collection('houses').where('uid', '==', req.body.uid).get()
      .then(snapshot => {
        if(snapshot.size == 1){
          const house = snapshot.docs[0].data();
          console.log(house);
          res.status(200).send({status: 'success', message: "Retrieved house", houseID: house});
        }
      });
  } catch(error) {
    console.log("Error: ")
    console.log(error);
    res.status(500).send({status: 'error', message: 'An Error Ocurred while retrieving user house information.'});
  }
})
exports.retrieveHouse = functions.https.onRequest(app);


app.post('/saveItem', (req, res) => {
  console.log(req.body);
  if(req.body.ownerID === ""){
    return ({"401":"Please Login To continue"})
  }
  try{
    const groceryDocRef = db.collection("items").doc().set({
      ownerID: req.body.ownerID,
      //houseID: req.body.household,
      groceryItem: req.body.groceryItem
    });
    res.status(200).send({status: 'success', message: 'Item Saved Successfully'});
  } catch(error){
    console.log("saveItem, Error: " + error);
  }
})
exports.saveItem = functions.https.onRequest(app);

exports.userAdded = functions.auth.user().onCreate(user => {
  console.log(`${user.email} is created` );

  var userDocRef = db.collection("users").doc(`${user.uid}`).set({
    UID: user.uid,
    name: user.displayName,
    houseId: null, 
    email: user.email,
    accepted: false,
    diet_restrictions: {
      vegetarian: true,
      pescatarian: false,
      gluten_free: false,
      lactose_intolerant: true, 
      gluten_intolerant: false, 
      vegetarian: true,
      diabetic: true, 
      low_carb: false
    },
    food_allergies: ["Milk", "Eggs", "Fish", "Peanuts", "Wheat", "Gluten"]
  });

  /* This code would be useful when generating items for a user
  var dietDocRef = db.collection("users").doc(user.uid).collection("items").doc("item_name").set({
    ownerId: user.uid,
    houseId: null,
    location: null, 
    itemName: name, 
    communal: false,
    numRemaining: quantity, 
    date_created: ?, 
  });
*/

  console.log("docRef: ", userDocRef);

  return Promise.resolve();
});
  
exports.userDeleted = functions.auth.user().onDelete(user => {
  console.log(`${user.email} was deleted` );
  return Promise.resolve();
});

exports.getUserItems = functions.https.onCall(async (data, context) => {
  const { userID } = data;

  if (!userID) {
      throw new functions.https.HttpsError("invalid-argument", "User ID is required.");
  }

  try {
      // Get user details to fetch houseID
      const userDoc = await db.collection("users").doc(userID).get();
      if (!userDoc.exists) {
          throw new functions.https.HttpsError("not-found", "User not found.");
      }

      const userData = userDoc.data();
      const houseID = userData.houseID;

      // Query Firestore for items that belong to the user or are communal in the house
      const userItemsQuery = db.collection("items").where("ownerID", "==", userID);
      const communalItemsQuery = db.collection("items").where("houseID", "==", houseID).where("communal", "==", true);

      const [userItemsSnapshot, communalItemsSnapshot] = await Promise.all([
          userItemsQuery.get(),
          communalItemsQuery.get(),
      ]);

      // Merge results
      const userItems = userItemsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const communalItems = communalItemsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // Use a Set to prevent duplicates (in case user owns a communal item)
      const allItems = [...userItems, ...communalItems.filter(item => item.ownerID !== userID)];

      return { items: allItems };
  } catch (error) {
      console.error("Error fetching user items:", error);
      throw new functions.https.HttpsError("internal", "Unable to fetch items.");
  }
});
  
exports.fruitAdded = functions.firestore
  .document('/fruits/{documentId}')
  .onCreate((snapshot, context) => {
    console.log(snapshot.data)
    return Promise.resolve();
})
  
exports.fruitDeleted = functions.firestore
  .document('/fruits/{documentId}')
  .onDelete((snapshot, context) => {
    console.log(snapshot.data, ' deleted')
    return Promise.resolve();
})
  
  
exports.fruitUpdated = functions.firestore
  .document('/fruits/{documentId}')
  .onUpdate((snapshot, context) => {
    console.log("Before", snapshot.before.data())
    console.log("After", snapshot.after.data())
    console.log(snapshot.data, ' deleted')
    return Promise.resolve();
})