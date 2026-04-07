'use client';
import { Button, Card, CardActionArea, CardActions, CardContent, Divider, Grid, Link, Stack, Typography } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useEffect } from 'react';
import { getContactsFromAPI } from '@/lib/features/contact/action';
import { IconCirclePlus } from '@tabler/icons-react';

const Customer = () => {
  const dispatch = useAppDispatch()

  const fetchContacts = async () => {
    try {
      // Redux Toolkit dispatch akan mengembalikan promise dari Thunk
      const contacts = await dispatch(getContactsFromAPI());
      console.log("Data kontak diterima:", contacts);
    } catch (error) {
      console.error("Gagal mengambil kontak:", error);
    }
  }
  
  const contacts = useAppSelector(state => state.contact.value);
  
  useEffect(() => {
    if (contacts.length < 1) {
      fetchContacts();
    }
    console.log(contacts);
  }, [contacts])

  return (
    <PageContainer title="Customer Page" description="this is Customer page">
      <Grid
        container
        direction="row"
        spacing={2}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Grid size={{ sm: 6, md: 10 }}>
          <Stack direction="row" spacing={0} alignItems="center">
            <Typography variant="h3" color="#616161">
              Customer
            </Typography>
          </Stack>
        </Grid>
        {/* BUTTON CREATE */}
        <Grid >
          <Stack direction="row" spacing={1} alignItems="center" justifyContent="flex-end">
            {/* <Button variant="contained" sx={{ width: 100 }} component={Link} to="create"> */}
            <Button>
              add customer &nbsp;<IconCirclePlus width="20" height="20" />
            </Button>
          </Stack>
        </Grid>
      </Grid>
      <br />
      <br />

      <Grid container spacing={3}>
        {contacts.map((contact, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, md: 4}}>
            <Card variant="outlined">
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {contact.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }} gutterBottom>
                    {contact.address}
                  </Typography>
                  <Typography
                    className='phone'
                    component="a"
                    variant="body2"
                    gutterBottom
                    href={`https://wa.me/62${Number(contact.phone)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    color="primary"
                  >
                    {contact.phone}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </PageContainer>
  );
};

export default Customer;

