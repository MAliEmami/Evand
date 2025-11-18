import React from "react";
import { Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid"; 
import Authors from "../../blog/Authors";
import Blogs from "../../blog/Blogs";

function HomePage() {
  return (
    <Container maxWidth="lg">
      <Grid
        container
        spacing={2}
        sx={{ p: 3, width: "100%" }}  
      >
        
        <Grid size={{ xs: 12, md: 3 }} sx={{ mt: 4 }}>
          <Typography component="h3" variant="h5" mb={3} fontWeight={700}>
            برگزارکنندگان
          </Typography>
          <Authors />
        </Grid>

        
        <Grid size={{ xs: 12, md: 9 }} sx={{ mt: 4 }}>
          <Typography component="h3" variant="h5" mb={3} fontWeight={700}>
            رویداد ها
          </Typography>
          <Blogs />
        </Grid>
      </Grid>
    </Container>
  );
}

export default HomePage;
