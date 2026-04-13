"use client";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import { Box, Button, Checkbox, FormControlLabel, FormGroup, Grid, Stack, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { addContact, searchContactByName } from "@/lib/features/contact/action";
import { useAppSelector } from "@/lib/hooks";

import 'react-phone-input-2/lib/material.css';
import './add-customer.css';
import { PhoneInputComponent } from "./Component";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AddCustomer() {
  const router = useRouter();
  // Ambil data dari Redux
  const contacts = useAppSelector(state => state.contact.value);
  
  // Berikan tipe data yang jelas pada state (sesuaikan dengan interface Contact kamu)
  const [nameValidation, setNameValidation] = useState<any>(null);
  const [contact, setContact] = useState<any>({
    name: '',
    nameLower: '',
    address: '',
    npwp: '',
    phone: { value: '', country: {} },
    phone2: { value: '', country: {} },
    position: { customer: true, supplier: false, employee: false, other: false },
    defaultAccount: { accountPayable: 'accountPayable', accountReceivable: 'accountReceivable', expensePayable: 'accountPayable' },
    isActive: true
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    let data = { ...contact };
    data[name] = value;

    if (name === "name") {
      data.nameLower = value.toLowerCase();
    }

    setContact(data);
  }

  const handleChangePhone = (value: string, country: object, e: any) => {
    // const newPhone = { ...country, value }
    const { name } = e.target;
    let data = { ...contact };
    data[name] = { ...country, value};
    setContact(data);
  }

  const handleChangePositon = (e: any) => {
    const { name, checked } = e.target;
    let data = { ...contact };

    data.position[name] = checked;
    setContact(data);
  }

  const handlePost = async () => {
    let newContact: any = { ...contact };
    const { npwp, address, phone, phone2 } = newContact;

    npwp == "" && delete newContact.npwp;
    address == "" && delete newContact.address;
    
    if(phone.value == "" || phone.value == phone.dialCode) {
      delete newContact.phone;
    } else {
      const temp = phone.dialCode.length;
      const temp2 = Number(phone.value.slice(temp));
      newContact.phone.value = phone.dialCode + String(temp2);
    }
    
    if(phone2.value == "" || phone2.value == phone2.dialCode) {
      delete newContact.phone2;
    } else {
      const temp = phone2.dialCode.length;
      const temp2 = Number(phone2.value.slice(temp));
      newContact.phone2.value = phone2.dialCode + String(temp2);
    }

    const contactId = await addContact(newContact);
    if (contactId) {
      // console.log('ID kontak yang dikembalikan:', contactId);
      router.push(`/customer/data/${contactId}`)
    } else {
      console.log('Penambahan kontak gagal.');
    }
  }

  const handleSubmit = async () => {
    let i: number = 0;
    Object.keys(contact.name).map((key) => key != "" && i++);

    if(i > 1) { // tidak boleh hanya 1 karakter
      try {
        const found = await searchContactByName(contact.name);
        if (found) {
          setNameValidation("unavailable");
        } else {
          setNameValidation(null);
          handlePost();
        }
      } catch (error) {
        console.error("error");
      }
    } else {
      setNameValidation("required");
    }
  }

  useEffect(() => {
      // Cari kontak berdasarkan nama
      const found = contacts.find((item: any) => item.nameLower === contact.name.toLowerCase());
      found ?
        setNameValidation('unavailable') :
        setNameValidation(null);
      
  }, [contact]); // Masukkan contacts dan contact ke dependency array

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
