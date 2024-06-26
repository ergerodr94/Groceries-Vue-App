const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const app = express(); 

const admin = require('firebase-admin');
const { addDoc, collection, doc, setDoc } = require('firebase/firestore');
const { user } = require('firebase-functions/v1/auth');
const { Auth } = require('firebase-admin/auth');
admin.initializeApp();
const db = admin.firestore();

app.use(cors({origin: true}));
app.use(express.json());

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