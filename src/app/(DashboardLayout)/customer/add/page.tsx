"use client";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import { MoreVert } from "@mui/icons-material";
import { Box, Button, Card, CardActions, CardContent, CardHeader, Checkbox, Container, Divider, FormControlLabel, FormGroup, Grid, IconButton, Stack, TextField, Typography } from "@mui/material";
import { use, useState, useEffect } from "react";
import { getContactByName, getContactsFromAPI, searchContactByName, searchContacts } from "@/lib/features/contact/action";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import PhoneInput from "react-phone-input-2";

import 'react-phone-input-2/lib/material.css';
import './add-customer.css';
import { PhoneInputComponent } from "./Component";
import Link from "next/link";

export default function AddCustomer() {
  const dispatch = useAppDispatch();
  // Ambil data dari Redux
  const contacts = useAppSelector(state => state.contact.value);
  
  // Berikan tipe data yang jelas pada state (sesuaikan dengan interface Contact kamu)
  const [nameValidation, setNameValidation] = useState<any>(null);
  const [contact, setContact] = useState<any>({
    name: '',
    address: '',
    npwp: '',
    phone: { value: '', country: {} },
    phone2: { value: '', country: {} },
    position: { customer: true, supplier: false, employee: false, other: false }
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    let data = { ...contact };

    data[name] = value;
    setContact(data)
  }

  const handleChangePhone = (value: string, country: object, e: any) => {
    const { name } = e.target;
    let data = { ...contact };
    
    data[name] = { value, country };
    setContact(data);
  }

  const handleChangePositon = (e: any) => {
    const { name, checked } = e.target;
    let data = { ...contact };

    data.position[name] = checked;
    setContact(data);
  }

  const handleSubmit = async () => {
    try {
      // await searchContacts(contact.name);
      const found = await searchContactByName(contact.name);
      console.log(found);
      found ?
        setNameValidation("unavailable") :
        setNameValidation(null);
    } catch (error) {
      console.error("error");
    }
  }


  // NANTI DIHAPUS
  // useEffect(() => {
  //   const fetchAndFindContact = async () => {
  //     // Jika data di Redux kosong, ambil dari API dulu
  //     if (contacts.length === 0) {
  //       try {
  //         await dispatch(getContactsFromAPI()); // Gunakan .unwrap() untuk handle error thunk
  //       } catch (error) {
  //         console.error("Gagal mengambil kontak:", error);
  //       }
  //     }
  //   };

  //   fetchAndFindContact();
  // }, [contacts, dispatch]); // Masukkan contacts dan dispatch ke dependency array
  
  useEffect(() => {
      // Cari kontak berdasarkan nama
      const found = contacts.find((item: any) => item.nameLower === contact.name.toLowerCase());
      found ?
        setNameValidation('unavailable') :
        setNameValidation(null);
      
  }, [contacts, contact]); // Masukkan contacts dan contact ke dependency array

  return (
    <PageContainer title="Add Customer" description="this is Customer page">
      <Grid container direction="row" spacing={2} sx={{ justifyContent: "space-between" }}>
        <Grid size={{ sm: 6, md: 10 }}>
          <Typography variant="h3" color="#616161">
            Add Customer
          </Typography>
        </Grid>
      </Grid>
      <br />
      <br />
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Box sx={{ height: "100%", border: "1px solid #6b728021", borderRadius: "8px", px: 2, py: 3 }}>
            <Grid container direction="column" spacing={2}>
              <Typography variant="h5" gutterBottom>
                Biodata
              </Typography>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    autoFocus
                    error={nameValidation}
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
                    label="NPWP / NIK"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={contact.npwp}
                    onChange={handleChange}
                  />
                </Grid>
                <PhoneInputComponent name="phone" label="Phone" value={contact.phone.value} onValueChange={handleChangePhone} />
                <PhoneInputComponent name="phone2" label="Phone 2" value={contact.phone2.value} onValueChange={handleChangePhone} />
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
            </Grid>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ height: "100%", border: "1px solid #6b728021", borderRadius: "8px", px: 2, py: 3 }}>
            <Grid container direction="column" spacing={2}>
              <Typography variant="h5" gutterBottom>
                Position
              </Typography>
              <FormGroup>
                <FormControlLabel
                  label="Customer"
                  control={<Checkbox checked={contact.position.customer} name="customer" disabled required />}
                />
                <FormControlLabel
                  label="Supplier"
                  control={<Checkbox checked={contact.position.supplier} name="supplier" onChange={handleChangePositon} />}
                />
                <FormControlLabel
                  label="Employee"
                  control={<Checkbox checked={contact.position.employee} name="employee" onChange={handleChangePositon} />}
                />
                <FormControlLabel
                  label="Other"
                  control={<Checkbox checked={contact.position.other} name="other" onChange={handleChangePositon} />}
                />
              </FormGroup>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Stack direction="row" sx={{ px: 2, pt: 4, justifyContent: "flex-start" }} spacing={1}>
        <Button variant="contained" onClick={handleSubmit}>
          Create
        </Button>
        <Button variant="contained" color="error" LinkComponent={Link} href="/customer">
          Cancel
        </Button>
      </Stack>
    </PageContainer>
  );
}
