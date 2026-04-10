"use client";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import { MoreVert } from "@mui/icons-material";
import { Button, Card, CardActions, CardContent, CardHeader, Grid, IconButton, Stack, Typography } from "@mui/material";
import { use, useState, useEffect } from "react";
import { getContactsFromAPI } from "@/lib/features/contact/action";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

export default function CustomerData({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  // 1. Unwrap params dengan use()
  const { slug } = use(params);
  const dispatch = useAppDispatch();
  
  // 2. Ambil data dari Redux
  const contacts = useAppSelector(state => state.contact.value);
  
  interface Position {
    [key: string]: boolean;
  }

  interface DefaultAccount {
    [key: string]: string;
  }

  // Berikan tipe data yang jelas pada state (sesuaikan dengan interface Contact kamu)
  const [contact, setContact] = useState<any>(null);
  const [position, setPosition] = useState<Position>({});
  const [defaultAccount, setDefaultAccount] = useState<DefaultAccount>({});

  useEffect(() => {
    const fetchAndFindContact = async () => {
      // 3. Jika data di Redux kosong, ambil dari API dulu
      if (contacts.length === 0) {
        try {
          await dispatch(getContactsFromAPI()); // Gunakan .unwrap() untuk handle error thunk
        } catch (error) {
          console.error("Gagal mengambil kontak:", error);
        }
      } else {
        // 4. Cari kontak berdasarkan slug/id
        // Gunakan == atau Number() jika ID di redux adalah angka tapi slug adalah string
        const found = contacts.find((item: any) => String(item.id) === slug);
        setContact(found);
      }
    };

    fetchAndFindContact();
  }, [contacts, slug, dispatch]); // Masukkan slug dan dispatch ke dependency array

  useEffect(() => {
    if (contact) {
      const newPosition = contact.position;
      setPosition(newPosition);
      setDefaultAccount(contact.defaultAccount);
    }
  }, [contact]);

  // 5. Render Loading jika data belum ada
  if (!contact) {
    return <Typography>Loading data untuk ID: {slug}...</Typography>;
  }

  return (
    <PageContainer title="Customer Data" description="this is Customer page">
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
              {contact.name}
            </Typography>
          </Stack>
        </Grid>
        {/* BUTTON CREATE */}
        <Grid >
          <Stack direction="row" spacing={1} alignItems="center" justifyContent="flex-end">
            {/* <Button variant="contained" sx={{ width: 100 }}> */}
            <Button variant="text">
              action
            </Button>
          </Stack>
        </Grid>
      </Grid>
      <br />
      <br />
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 4}}>
          <Card variant="outlined">
            <CardHeader
              title="Biodata"
              sx={{ pr: 1, pb: 0, height: '64px' }}
              action={(
                <CardActions>
                  <IconButton aria-label="settings">
                    <MoreVert />
                  </IconButton>
                </CardActions>
              )}
            />
            <CardContent sx={{ pt: 1 }}>
              <Typography gutterBottom>
                Name: {contact.name}
              </Typography>
              <Typography gutterBottom>
                Address: {contact.address || '-'}
              </Typography>
              <Typography gutterBottom>
                NPWP: {contact.npwp || '-'}
              </Typography>
              <Stack direction="row">
                <Typography gutterBottom>
                  Phone: &nbsp;
                </Typography>
                <Typography
                  className='clear-link'
                  component="a"
                  gutterBottom
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  color="primary"
                >
                  {contact.phone || '-'}
                </Typography>
              </Stack>
              <Stack direction="row">
                <Typography gutterBottom>
                  Phone 2: &nbsp;
                </Typography>
                <Typography
                  className='clear-link'
                  component="a"
                  gutterBottom
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  color="primary"
                >
                  {contact.phone2 || '-'}
                </Typography>
              </Stack>
              <Typography gutterBottom>
                Active: {String(contact.isActive)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4}}>
          <Card variant="outlined" sx={{ height: "100%" }}>
            <CardHeader
              title="Position"
              sx={{ pr: 1, pb: 0, height: '64px' }}
              action={(
                <CardActions>
                  <IconButton aria-label="settings">
                    <MoreVert />
                  </IconButton>
                </CardActions>
              )}
            />
            <CardContent sx={{ pt: 1 }}>
              <Typography gutterBottom>
                Customer: {String(position.customer)}
              </Typography>
              <Typography gutterBottom>
                Supplier: {String(position.supplier)}
              </Typography>
              <Typography gutterBottom>
                Employee: {String(position.employee)}
              </Typography>
              <Typography gutterBottom>
                Other: {String(position.other)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid size={{ xs: 12, sm: 6, md: 4}}>
          <Card variant="outlined" sx={{ height: "100%" }}>
            <CardHeader
              title="Default Account"
              sx={{ pr: 1, pb: 0, height: '64px' }}
              // action={(
              //   <CardActions>
              //     <IconButton aria-label="settings">
              //       <MoreVert />
              //     </IconButton>
              //   </CardActions>
              // )}
            />
            <CardContent sx={{ pt: 1 }}>
              <Typography gutterBottom>
                Account Payable: {defaultAccount.accountPayable}
              </Typography>
              <Typography gutterBottom>
                Account Receivable: {defaultAccount.accountReceivable}
              </Typography>
              <Typography gutterBottom>
                Expense Payable: {defaultAccount.expensePayable}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </PageContainer>
  );
}
