// import { child, DataSnapshot, get, getDatabase, onValue, ref } from "firebase/database";
import { DataSnapshot, onValue, ref } from "firebase/database";
import database from "@/lib/database";
import { setProduct } from "./productSlice";
import { Dispatch } from "@reduxjs/toolkit";
import { Product } from "../type";

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

export const getProductsFromAPI = () => {
  return (dispatch: Dispatch): Promise<Product[]> => {
    return new Promise((resolve) => {
      const starCountRef = ref(database, `${serviceApp}/products/items`);
      onValue(starCountRef, (snapshot: DataSnapshot) => {
        const data = snapshot.val();

        if(!data) {
          dispatch(setProduct([]));
          return resolve([]);
        }

        const products: Product[] = Object.keys(data).map((key) => ({
          ...data[key],
          id: key,
        }));

        // sortir menggunakan Intl.Collator
        const collator = new Intl.Collator('de');
        products.sort((a, b) => collator.compare(a.name, b.name));

        dispatch(setProduct(products));
        resolve(products);
      })
    })
  }
}