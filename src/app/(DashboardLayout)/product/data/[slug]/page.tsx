// "use client"
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import { MoreVert } from "@mui/icons-material";
import { Button, Card, CardContent, Grid, IconButton, Stack, Typography } from "@mui/material";
import Link from "next/link";
// import { useState } from "react";
// import { getContactsFromAPI } from "@/lib/features/contact/action";
// import { useAppDispatch, useAppSelector } from "@/lib/hooks";
// import { useEffect } from "react";

export default async function ProductData({
  params
} : {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;

  // const [temp, setTemp] = useState('');
  

  return (
    <PageContainer title="Product Data" description="this is Product page">
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
              Produk Buket
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
            <CardContent sx={{ pr: 1 }}>
              <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "end", }}>
                <Typography variant="h5" gutterBottom>
                  Detail
                </Typography>
                <IconButton aria-label="settings" sx={{ mr: 0 }}>
                  <MoreVert />
                </IconButton>
              </Stack>
              <Typography gutterBottom>
                Id: {slug}
              </Typography>
              <Typography gutterBottom>
                Name: Produk Buket
              </Typography>
              <Typography gutterBottom>
                Category: Buket
              </Typography>
              <Typography gutterBottom>
                Unit: Pcs
              </Typography>
              <Typography gutterBottom>
                Active: true
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4}}>
          <Card variant="outlined" sx={{ height: "100%" }}>
            <CardContent sx={{ pr: 1 }}>
              <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "end", }}>
                <Typography variant="h5" gutterBottom>
                  Price
                </Typography>
                <IconButton aria-label="settings" sx={{ mr: 0 }}>
                  <MoreVert />
                </IconButton>
              </Stack>
              <Typography gutterBottom>
                Size S: 100,000
              </Typography>
              <Typography gutterBottom>
                Size M: 200,000
              </Typography>
              <Typography gutterBottom>
                Size L: 300,000
              </Typography>
              <Typography gutterBottom>
                Size XL: 400,000
              </Typography>
              <Typography gutterBottom>
                Size Custom: 500,000
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4}}>
          <Card variant="outlined" sx={{ height: "100%" }}>
            <CardContent sx={{ pr: 1 }}>
              <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "end", }}>
                <Typography variant="h5" gutterBottom>
                  Rules
                </Typography>
                <IconButton aria-label="settings" sx={{ mr: 0 }}>
                  <MoreVert />
                </IconButton>
              </Stack>
              <Typography gutterBottom>
                Sell this Product: true
              </Typography>
              <Typography gutterBottom>
                Buy this Product: false
              </Typography>
              <Typography gutterBottom>
                Monitoring Stock: false
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {/* <MenuOption/> */}
    </PageContainer>
  );
}
