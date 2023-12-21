const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { addDoc, collection, doc, setDoc } = require('firebase/firestore');
admin.initializeApp();
const db = admin.firestore();

exports.makeUppercase = functions.firestore.document('/messages/{documentId}')
    .onCreate((snap, context) => {
      const original = snap.data().original;
      console.log('Uppercasing', context.params.documentId, original);
      const uppercase = original.toUpperCase();
      return snap.ref.set({uppercase}, {merge: true});
    });

exports.helloWorld = functions.https.onRequest((req, res) => {
  res.send('Hello from firebase function');
});

exports.api = functions.https.onRequest((req, res) => {
    switch (req.method){
      case 'GET':
        res.send('it was a GET request');
        break;
      case 'POST':
        const body = req.body;
        res.send(body);
        break;
      case 'DELETE':
        res.send('it was a DELETE request');
        break;
      default:
        res.send('it was a default request....')
    }
  });
  
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