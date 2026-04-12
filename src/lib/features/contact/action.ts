// import { child, DataSnapshot, get, getDatabase, onValue, ref } from "firebase/database";
import { DataSnapshot, equalTo, get, limitToFirst, onValue, orderByChild, push, query, ref, set } from "firebase/database";
import database from "@/lib/database";
import { setContact } from "./contactSlice";
import { Dispatch } from "@reduxjs/toolkit";
import { Contact } from "../type";

const serviceApp = 'accountingProfit';

export const addContact = async (contactData: Contact) => {
  try {
    const contactsRef = ref(database, `${serviceApp}/contacts`);
    // Ketika Anda memanggil push(), itu sudah membuat ID unik untuk entri baru
    const newContactRef = push(contactsRef);

    // Dapatkan ID unik ini sebelum menulis data
    const newContactId = newContactRef.key;

    // Tulis data ke referensi dengan ID baru
    await set(newContactRef, contactData);

    console.log('Kontak baru berhasil ditambahkan dengan ID:', newContactId);
    return newContactId; // Mengembalikan ID kontak yang baru saja dibuat
  } catch (error) {
    console.error('Gagal menambahkan kontak:', error);
    return null; // Mengembalikan null atau melempar error jika gagal
  }
}

// Contoh penggunaan:
// const newContact = {
//   name: 'Jane Doe',
//   email: 'jane.doe@example.com',
//   phone: '987-654-3210'
// };

// (async () => {
//   const contactId = await addContact(newContact);
//   if (contactId) {
//     console.log('ID kontak yang dikembalikan:', contactId);
//   } else {
//     console.log('Penambahan kontak gagal.');
//   }
// })();




export const getContactFromAPI = (id: string) => () => {
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
};

export const getContactsFromAPI = () => {
  return (dispatch: Dispatch): Promise<Contact[]> => {
    return new Promise((resolve) => {
      const starCountRef = ref(database, `${serviceApp}/contacts`);
      onValue(starCountRef, (snapshot: DataSnapshot) => {
        const data = snapshot.val();

        if(!data) {
          dispatch(setContact([]));
          return resolve([]);
        }

        const contacts: Contact[] = Object.keys(data).map((key) => ({
          ...data[key],
          id: key,
        }));

        // sortir menggunakan Intl.Collator
        const collator = new Intl.Collator('de');
        contacts.sort((a, b) => collator.compare(a.name, b.name));

        dispatch(setContact(contacts));
        resolve(contacts);
      })
    })
  }
}

/**
 * Mencari satu kontak berdasarkan nama (case-insensitive) di Firebase Realtime Database.
 * Mengembalikan Promise yang berisi objek Contact pertama yang cocok atau null jika tidak ditemukan.
 * @param searchTerm Kata kunci pencarian nama.
 */
export async function searchContactByName(searchTerm: string): Promise<Contact | null> {
  if (!database) {
    console.error("Firebase Realtime Database belum diinisialisasi.");
    return null;
  }

  if (!searchTerm) {
    console.warn("Kata kunci pencarian kosong.");
    return null;
  }

  try {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const contactsRef = ref(database, `${serviceApp}/contacts`);

    // Buat kueri untuk mencari berdasarkan nameLower, ambil hanya 1 hasil pertama
    const q = query(
      contactsRef,
      orderByChild('nameLower'),
      equalTo(lowerCaseSearchTerm),
      limitToFirst(1) // Memastikan hanya satu hasil yang diambil
    );

    const snapshot = await get(q); // Mengambil data sekali

    if (snapshot.exists()) {
      // Jika ada data, ambil child pertama (karena kita sudah limitToFirst(1))
      const firstChildKey = Object.keys(snapshot.val())[0];
      return snapshot.val()[firstChildKey] as Contact;
    } else {
      console.log(`Tidak ada kontak ditemukan untuk '${searchTerm}'.`);
      return null;
    }
  } catch (error) {
    console.error('Error mencari kontak:', error);
    return null;
  }
}
