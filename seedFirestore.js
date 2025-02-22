const admin = require("firebase-admin");
const serviceAccount = require("./service-account-key.json");

// Initialize Firebase Admin SDK (connects to the Firestore Emulator)
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "http://localhost:8080" // Firestore Emulator URL
});

const db = admin.firestore();

// Sample data
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
      dietRestrictions: { restriction1: { type: "Vegetarian" } },
      dislikedFoods: { dislike1: { name: "Mushrooms" } },
      allergies: { allergy1: { name: "Peanuts" } }
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
      dislikedFoods: { dislike2: { name: "Olives" } },
      allergies: {}
    }
  },
  houses: {
    house1: {
      nickname: "Cozy Home",
      manager: "user1"
    }
  },
  items: {
    item1: {
      ownerID: "user1",
      houseID: "house1",
      location: "Fridge",
      itemName: "Tomatoes",
      communal: true,
      numRemaining: 5,
      date_created: "2025-02-01T12:00:00Z"
    },
    item2: {
      ownerID: "user2",
      houseID: "house1",
      location: "Pantry",
      itemName: "Pasta",
      communal: false,
      numRemaining: 2,
      date_created: "2025-02-10T15:30:00Z"
    },
    item3: {
      ownerID: "user1",
      houseID: "house1",
      location: "Fridge",
      itemName: "Cheese",
      communal: true,
      numRemaining: 1,
      date_created: "2025-01-28T08:45:00Z"
    }
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
      cookTime: 20
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
      cookTime: 10
    }
  }
};

// Function to seed Firestore
async function seedFirestore() {
  try {
    console.log("🚀 Seeding Firestore...");

    for (const [collectionName, documents] of Object.entries(seedData)) {
      const collectionRef = db.collection(collectionName);

      for (const [docID, docData] of Object.entries(documents)) {
        await collectionRef.doc(docID).set(docData);
        console.log(`✅ Seeded ${collectionName}/${docID}`);
      }
    }

    console.log("🎉 Firestore seeding complete!");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding Firestore:", error);
    process.exit(1);
  }
}

seedFirestore();
