'use client';
import { Button, Card, CardActionArea, CardActions, CardContent, CardHeader, Divider, Grid, IconButton, Stack, Typography } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useEffect } from 'react';
import { IconCirclePlus } from '@tabler/icons-react';
import { MoreVert } from '@mui/icons-material';
import Link from 'next/link';
import { getProductsFromAPI } from '@/lib/features/product/action';

const Product = () => {
  const dispatch = useAppDispatch()
  const products = useAppSelector(state => state.product.value);
  
  const fetchProducts = async () => {
    try {
      // Redux Toolkit dispatch akan mengembalikan promise dari Thunk
      // await dispatch(getProductsFromAPI());
      const products = await dispatch(getProductsFromAPI());
      console.log("Data produk diterima:", products);
    } catch (error) {
      console.error("Gagal mengambil produk:", error);
    }
  }
  
  useEffect(() => {
    if (products.length < 1) {
      fetchProducts();
    }
    console.log(products);
  }, [products])

  return (
    <PageContainer title="Product Page" description="this is Product page">
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
            Product
          </Typography>
        </Grid>
        {/* BUTTON CREATE */}
        <Grid >
          <Stack direction="row" spacing={1} alignItems="center" justifyContent="flex-end">
            {/* <Button variant="contained" sx={{ width: 100 }} component={Link} to="create"> */}
            <Button variant="text">
              add product &nbsp;<IconCirclePlus width="20" height="20" />
            </Button>
          </Stack>
        </Grid>
      </Grid>
      <br />
      <br />

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4}}>
            <Card variant="outlined">
              {/* <CardActionArea> */}
                <CardContent sx={{ pr: 1 }}>
                  <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "end", }}>
                    <Typography
                      className="clear-link"
                      component={Link}
                      href={`/product/data/${product.id}`}
                      variant="h5"
                      gutterBottom
                      color="text.primary"
                    >
                      {product.name}
                    </Typography>
                    <IconButton aria-label="settings" sx={{ mr: 0 }}>
                      <MoreVert />
                    </IconButton>
                  </Stack>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }} gutterBottom>
                    {product.sellPrice}
                  </Typography>
                  <Typography>
                    {product.uId}
                  </Typography>
                </CardContent>
              {/* </CardActionArea> */}
            </Card>
          </Grid>
        ))}
      </Grid>
    </PageContainer>
  );
};

export default Product;
