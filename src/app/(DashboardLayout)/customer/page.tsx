'use client';
import { Typography } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { useAppDispatch } from '@/lib/hooks';
import { getContactsFromAPI } from '@/lib/features/contact/action';
import { useEffect, useState } from 'react';

const Customer = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    // (async () => {
    //   const contacts = await dispatch(getContactsFromAPI());
    //   console.log(contacts);
      
    // })();

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

