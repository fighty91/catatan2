'use client';
import { Typography } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { useAppDispatch } from '@/lib/hooks';
import { useEffect } from 'react';
import { getContactsFromAPI } from '@/lib/features/contact/action';

const Customer = () => {
  const dispatch = useAppDispatch()

  // useEffect(() => {
  //   const fetchContacts = async () => {
  //     try {
  //       // Redux Toolkit dispatch akan mengembalikan promise dari Thunk
  //       const contacts = await dispatch(getContactsFromAPI());
  //       console.log("Data kontak diterima:", contacts);
  //     } catch (error) {
  //       console.error("Gagal mengambil kontak:", error);
  //     }
  //   }

  //   fetchContacts();
  // }, [dispatch]);


  return (
    <PageContainer title="Customer Page" description="this is Customer page">
      <DashboardCard title="Customer">
        <Typography>This is a customer page</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Customer;

