// import { child, DataSnapshot, get, getDatabase, onValue, ref } from "firebase/database";
import { DataSnapshot, onValue, ref } from "firebase/database";
import database from "@/lib/database";
import { setContact } from "./contact/contactSlice";
import { Dispatch } from "@reduxjs/toolkit";
// import { useAppDispatch } from "../hooks";
// const dispatch = useAppDispatch();

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

// types.ts (atau letakkan di file yang sama)
export interface Contact {
  id: string;
  name: string;
  [key: string]: any; // Untuk properti tambahan lainnya
}


export const getContactsFromAPI = () => {
  return (dispatch: Dispatch): Promise<Contact[]> => {
    return new Promise((resolve) => {
      const starCountRef = ref(database, `${serviceApp}/contacts`);
      onValue(starCountRef, (snapshot: DataSnapshot) => {
        const data = snapshot.val();

        if(!data) {
          dispatch(setContact({ value: [] }));
          return resolve([]);
        }

        const contacts: Contact[] = Object.keys(data).map((key) => ({
          ...data[key],
          id: key,
        }));

        // sortir menggunakan Intl.Collator
        const collator = new Intl.Collator('de');
        contacts.sort((a, b) => collator.compare(a.name, b.name));

        dispatch(setContact({ value: contacts }));
        resolve(contacts);
      })
    })
  }
}