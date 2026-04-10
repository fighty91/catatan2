"use client";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import { MoreVert } from "@mui/icons-material";
import { Button, Card, CardActions, CardContent, CardHeader, Grid, IconButton, Stack, TextField, Typography } from "@mui/material";
import { use, useState, useEffect } from "react";
import { getContactsFromAPI } from "@/lib/features/contact/action";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

export default function AddCustomer() {
  const dispatch = useAppDispatch();
  // Ambil data dari Redux
  const contacts = useAppSelector(state => state.contact.value);
  
  interface Position {
    [key: string]: boolean;
  }

  interface DefaultAccount {
    [key: string]: string;
  }

  // Berikan tipe data yang jelas pada state (sesuaikan dengan interface Contact kamu)
  const [contact, setContact] = useState<any>({
    name: '',
    address: '',
    npwp: ''
  });
  const [nameValidation, setNameValidation] = useState<any>(null);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    let data = { ...contact };

    data[name] = value;
    setContact(data)
  }

  useEffect(() => {
    const fetchAndFindContact = async () => {
      // Jika data di Redux kosong, ambil dari API dulu
      if (contacts.length === 0) {
        try {
          await dispatch(getContactsFromAPI()); // Gunakan .unwrap() untuk handle error thunk
        } catch (error) {
          console.error("Gagal mengambil kontak:", error);
        }
      }
    };

    fetchAndFindContact();
  }, [contacts, dispatch]); // Masukkan contacts dan dispatch ke dependency array
  
  useEffect(() => {
      // Cari kontak berdasarkan nama
      const found = contacts.find((item: any) => item.name === contact.name);
      found ?
        setNameValidation('unavilable') :
        setNameValidation(null);

      console.log(contact)
  }, [contacts, contact]); // Masukkan contacts dan contact ke dependency array

  return (
    <PageContainer title="Add Customer" description="this is Customer page">
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
          <Typography variant="h3" color="#616161">
            Add Customer
          </Typography>
        </Grid>
      </Grid>
      <br />
      <br />
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card variant="outlined">
            <CardHeader
              title="Biodata"
              sx={{ pr: 1, pb: 0, height: '64px' }}
            />
            <CardContent sx={{ pt: 1 }}>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 7 }}>
                  <TextField
                    autoFocus
                    error={nameValidation ? true : false}
                    helperText={nameValidation}
                    name="name"
                    label="Name"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={contact.name}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 7 }}>
                  <TextField
                    name="address"
                    label="Address"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={contact.address}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 7 }}>
                  <TextField
                    name="npwp"
                    label="NPWP"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={contact.npwp}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 7 }}>
                  <TextField
                    name="phone"
                    label="Phone"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={contact.phone}
                    // onChange={handleChange}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 7 }}>
                  <TextField
                    name="phone2"
                    label="Phone 2"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={contact.phone2}
                    // onChange={handleChange}
                  />
                </Grid>
                
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
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
                Customer: ...
              </Typography>
              <Typography gutterBottom>
                Supplier: ...
              </Typography>
              <Typography gutterBottom>
                Employee: ...
              </Typography>
              <Typography gutterBottom>
                Other: ...
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </PageContainer>
  );
}
