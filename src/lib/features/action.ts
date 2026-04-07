// import { child, get, getDatabase, onValue, ref } from "firebase/database";
import { onValue, ref } from "firebase/database";
import database from "@/config/database";
import { setContact } from "./contact/contactSlice";
const serviceApp = 'accountingProfit';

// export const getContactFromAPI = (id) => () => {
//   // get once
//   return new Promise((resolve) => {
//     const dbRef = ref(getDatabase());
//     get(child(dbRef, `accountingProfit/contacts/${id}`))
//       .then((snapshot) => {
//         if (snapshot.exists()) {
//           const temp = { ...snapshot.val(), id };
//           resolve(temp);
//         } else {
//           resolve(snapshot.val());
//           console.log('No contact available');
//         }
//       })
//       .catch((error) => console.error(error));
//   });
// };

// export const getContactsFromAPI = () => (dispatch) => {
//   return new Promise((resolve) => {
//     const starCountRef = ref(database, `${serviceApp}/contacts`);
//     onValue(starCountRef, (snapshot) => {
//       let temp = { ...snapshot.val() },
//         contacts = [];
//       for (let x in temp) {
//         temp[x].id = x;
//         contacts.push(temp[x]);
//       }
//       contacts.sort((a, b) => new Intl.Collator('de').compare(a.name, b.name));
//       // contacts.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
//       dispatch(setContact({ value: contacts }));
//       resolve(contacts);
//     });
//   });
// };


export const getContactsFromAPI = () => {
  return function(dispatch) {
    return new Promise((resolve) => {
      const starCountRef = ref(database, `${serviceApp}/contacts`);
      onValue(starCountRef, (snapshot) => {
        let temp = { ...snapshot.val() },
          contacts = [];
        for (let x in temp) {
          temp[x].id = x;
          contacts.push(temp[x]);
        }
        contacts.sort((a, b) => new Intl.Collator('de').compare(a.name, b.name));
        // contacts.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
        dispatch(setContact({ value: contacts }));
        resolve(contacts);
      });
    });
    
  };
}

