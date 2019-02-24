import * as firebase from 'firebase';

  const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
  };

firebase.initializeApp(config);

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, database as default};

// database.ref('expenses').on('child_removed', (snapshot)=>{
//   console.log(snapshot.key, snapshot.val());
// })

// database.ref('expenses').on('child_changed', (snapshot)=>{
//   console.log(snapshot.key, snapshot.val());
// })

// database.ref('expenses').on('child_added', (snapshot)=>{
//   console.log(snapshot.key, snapshot.val());
// })

// database.ref('expenses')
//   .once('value')
//   .then((snapshot)=>{
//     const expenses = [];
//     snapshot.forEach((childSnapshot)=>{
//       expenses.push({
//         id:childSnapshot.key,
//         ...childSnapshot.val()
//       });
//     });
//     console.log(expenses)

//   })

// database.ref('expenses')
//   .on('value', (snapshot)=>{
//   const expenses = [];
//   snapshot.forEach((childSnapshot)=>{
//     expenses.push({
//       id: childSnapshot.key,
//       ...childSnapshot.val()
//     });
//   });
//   console.log(expenses);
// })

// database.ref('expenses').push({
//   description: 'Dinner',
//   amount: 722,
//   note: 'Ciao Pizza',
//   createdAt: 0
// })

// database.ref('notes/-LZ50dkcRZ202pmtX7qN').remove();

// database.ref('notes').push({
//   title: 'Course Topics',
//   body: 'React Native, Angular, Python'
// })

// const notes = [{
//   id: '12',
//   title: 'first note!',
//   body: 'This is my note'
// }, {
//   id: '761',
//   title: 'second note!',
//   body: 'This is my note'
// }]

// database.ref('notes').set(notes);

// database.ref().on('value', (snapshot)=>{
//   const val = snapshot.val();
//   console.log(`${val.name} is a ${val.job.title} at ${val.job.company}.`)
// }, (e) => {
//   console.log('cannot process', e)
// })

// database.ref().update({
//   name: 'daniel',
//   'job/company': 'werum'
// })

// database.ref('location/city')
//   .once('value')
//   .then((snapshot)=>{
//     const val = snapshot.val();
//     console.log(val);
//   })
//   .catch((e)=>{
//     console.log('Error fetching data', e);
//   })

// database.ref().set({
//     name: 'Hyun Chae',
//     age: 30,
//     stressLevel: 6,
//     job: {
//       title: 'Software developer',
//       company: 'Google'
//     },
//     location: {
//         city: 'Bangkok',
//         country: 'Thailand'
//     }
//   }).then(() => {
//     console.log('Data is saved')
//   }).catch((e)=>{
//     console.log('This failed.', e);
//   });

// database.ref().update({
//   stressLevel: 9,
//   'job/company': 'Amazon',
//   'location/city': 'Paris'
// }).then(()=>{
//   console.log('sucessful')
// }).catch((e)=>{
//   console.log('not successful', e)
// });

//   database.ref().set('This is my data.');

// database.ref('age').set(27);
// database.ref('location/city').set('Seoul');

// database.ref()
//   .remove()
//   .then(()=>{
//     console.log('isSingle is removed')
//   }).catch((e)=>{
//     console.log('isSingle cannot be removed', e)
//   });