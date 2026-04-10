"use client";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import { MoreVert } from "@mui/icons-material";
import { Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, IconButton, Stack, TextField, Typography } from "@mui/material";
import { use, useState, useEffect } from "react";
import { getContactsFromAPI } from "@/lib/features/contact/action";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import PhoneInput from "react-phone-input-2";

import 'react-phone-input-2/lib/material.css';
import './add-customer.css';

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
  const [phone, setPhone] = useState<any>(0);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    let data = { ...contact };

    data[name] = value;
    setContact(data)
    console.log(e)
  }

  const handleChangePhone = (e: any) => {
    console.log(e)
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

      // console.log(contact)
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
      <Grid container spacing={3} sx={{ height: "450px"}}>
        <Grid size={{ xs: 12, md: 6 }} sx={{ height: "100%" }}>
          <Card variant="outlined" sx={{ height: "100%" }}>
            <CardHeader
              title="Biodata"
              sx={{ pr: 1, pb: 0, height: '64px' }}
            />
            <CardContent sx={{ pt: 1 }}>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6 }}>
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
                <Grid size={{ xs: 12, sm: 6 }}>
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
                <Grid size={{ xs: 12, sm: 6 }}>
                  <PhoneInput
                    country="id"
                    preferredCountries={["id"]}
                    specialLabel="Phone"
                    placeholder="Phone"
                    value={phone}
                    enableSearch
                    onChange={handleChangePhone}
                    countryCodeEditable={false}
                    containerStyle={{
                      width: '100%'
                    }}
                    inputStyle={{
                      width: '100%',
                      height: '53px', // atau '40px' untuk small
                      // fontSize: '16px',
                      borderColor: 'rgba(0, 0, 0, 0.23)',
                      color: 'rgba(0, 0, 0, 0.7)', // Membuat teks input lebih pudar
                      fontSize: '15px',           // Sedikit mengecilkan font agar kesan "pudar" lebih terasa
                      // opacity: 0.9                // Alternatif lain untuk memudarkan seluruh elemen input
                    }}
                    // buttonStyle={{
                    //   borderRadius: '4px 0 0 4px',
                    //   backgroundColor: 'transparent',
                    //   borderRight: '1px solid rgba(0, 0, 0, 0.23)'
                    // }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <PhoneInput
                    country="id"
                    preferredCountries={["id"]}
                    specialLabel="Phone 2"
                    placeholder="Phone 2"
                    enableSearch
                    // value={phone}
                    // onChange={handleChangePhone}
                    countryCodeEditable={false}
                    containerStyle={{
                      width: '100%'
                    }}
                    inputStyle={{
                      width: '100%',
                      height: '53px', // atau '40px' untuk small
                      // fontSize: '16px',
                      borderColor: 'rgba(0, 0, 0, 0.23)',
                      color: 'rgba(0, 0, 0, 0.7)', // Membuat teks input lebih pudar
                      fontSize: '15px',           // Sedikit mengecilkan font agar kesan "pudar" lebih terasa
                      // opacity: 0.9                // Alternatif lain untuk memudarkan seluruh elemen input
                    }}
                    // buttonStyle={{
                    //   borderRadius: '4px 0 0 4px',
                    //   backgroundColor: 'transparent',
                    //   borderRight: '1px solid rgba(0, 0, 0, 0.23)'
                    // }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
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
              </Grid>
              <br />
              <Divider />
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
