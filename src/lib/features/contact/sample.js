// Contoh di komponen React (client-side) atau di fungsi getServerSideProps (server-side)
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, query, orderByChild, equalTo, onValue } from 'firebase/database';

// Konfigurasi Firebase Anda (pastikan Anda telah mengaturnya)
const firebaseConfig = {
  // ... detail konfigurasi proyek Anda
};

// Inisialisasi Firebase (jika belum)
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function getContactsByName(nameToSearch) {
  const contactsRef = ref(database, 'contacts'); // Ganti 'contacts' dengan path data Anda
  const q = query(contactsRef, orderByChild('name'), equalTo(nameToSearch));

  onValue(q, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      console.log("Data kontak yang ditemukan:", data);
      // Anda dapat memperbarui state komponen Next.js Anda di sini
    } else {
      console.log("Tidak ada kontak yang ditemukan dengan nama tersebut.");
    }
  }, {
    onlyOnce: true // Jika Anda hanya ingin mengambil data sekali
  });
}

// Contoh penggunaan:
// getContactsByName("John Doe");
