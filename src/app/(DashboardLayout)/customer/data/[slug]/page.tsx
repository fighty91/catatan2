// app/blog/[slug]/page.js

import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import { MoreVert } from "@mui/icons-material";
import { Button, Card, CardActions, CardContent, CardHeader, Grid, IconButton, Stack, Typography } from "@mui/material";
import Link from "next/link";
// import { getContactsFromAPI } from "@/lib/features/contact/action";
// import { useAppDispatch, useAppSelector } from "@/lib/hooks";
// import { useEffect } from "react";

export default async function CustomerData({
  params
} : {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;

  // const dispatch = useAppDispatch();
  // const contacts = useAppSelector(state => state.contact.value);

  // const fetchContacts = async () => {
  //   try {
  //     // Redux Toolkit dispatch akan mengembalikan promise dari Thunk
  //     const contacts = await dispatch(getContactsFromAPI());
  //     console.log("Data kontak diterima:", contacts);
  //   } catch (error) {
  //     console.error("Gagal mengambil kontak:", error);
  //   }
  // }
  
  // useEffect(() => {
  //   if (contacts.length < 1) {
  //     fetchContacts();
  //   }
  //   console.log(contacts);
  // }, [contacts])

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
              Fighty Elia Ratag
            </Typography>
          </Stack>
        </Grid>
        {/* BUTTON CREATE */}
        <Grid >
          <Stack direction="row" spacing={1} alignItems="center" justifyContent="flex-end">
            {/* <Button variant="contained" sx={{ width: 100 }} component={Link} to="create"> */}
            <Button>
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
              sx={{ pr: 1, pb: 0 }}
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
                Id: {slug}
              </Typography>
              <Typography gutterBottom>
                Name: Fighty Elia Ratag
              </Typography>
              <Typography gutterBottom>
                Address: Jalan Protokol Koya Barat
              </Typography>
              <Typography gutterBottom>
                NPWP: 9171040909910002
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
                  082231110632
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
                  082231110632
                </Typography>
              </Stack>
              <Typography gutterBottom>
                Active: true
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4}}>
          <Card variant="outlined" sx={{ height: "100%" }}>
            <CardHeader
              title="Position"
              sx={{ pr: 1, pb: 0 }}
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
                Customer: true
              </Typography>
              <Typography gutterBottom>
                Supplier: true
              </Typography>
              <Typography gutterBottom>
                Vendor: true
              </Typography>
              <Typography gutterBottom>
                Employ: true
              </Typography>
              <Typography gutterBottom>
                Other: true
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid size={{ xs: 12, sm: 6, md: 4}}>
          <Card variant="outlined" sx={{ height: "100%" }}>
            <CardHeader
              title="Default Account"
              sx={{ pr: 1, pb: 0 }}
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
                Account Payable: Hutang Usaha
              </Typography>
              <Typography gutterBottom>
                Account Receivable: Piutang Usaha
              </Typography>
              <Typography gutterBottom>
                Expense Payable: Hutang Usaha
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </PageContainer>
  );
}
