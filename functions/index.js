const functions = require('firebase-functions');
const admin = require('firebase-admin');
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

  var docRef = db.collection("users").doc().set({
    UID: user.uid,
    name: user.displayName,
    houseId: null, 
    email: user.email,
    accepted: false
  });

  console.log(docRef);

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