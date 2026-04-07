'use client';
import { Typography } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

import { getContactsFromAPI } from '@/lib/features/action';
import { useAppDispatch } from '@/lib/hooks';


// import database from '../../../config/firebase'
import database from '@/config/database'
import { onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react';

const Customer = () => {
  const dispatch = useAppDispatch()
  // const getContactsFromAPI = () => {
  //   return new Promise((resolve) => {
  //     const startCountRef = ref(database, 'accountingProfit/contacts');
  //     onValue(startCountRef, (snapshot) => {
  //       let temp = { ...snapshot.val() };
  //       let newContacts = [];
  //       for (let x in temp) {
  //         temp[x].id = x;
  //         newContacts.push(temp[x]);
  //       }
  //       newContacts.sort((a, b) => new Intl.Collator('de').compare(a.name, b.name));
  //       resolve(newContacts);
  //       console.log(newContacts);
  //     })
  //   })
  // }

  // const [contacts, setContacts] = useState([]);

  useEffect(() => {
    (async () => {
      // interface Contacts {
      //   id: string,
      //   name: string
      // }
      // const newContacts: Array<Contacts> = await getContactsFromAPI();
      // setContacts(newContacts);
      // const contacts = await dispatch(getContactsFromAPI());
      const contacts = await dispatch(getContactsFromAPI());
      console.log(contacts);
      
    })();

  }, []);


  return (
    <PageContainer title="Customer Page" description="this is Customer page">
      <DashboardCard title="Customer">
        <Typography>This is a customer page</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Customer;

