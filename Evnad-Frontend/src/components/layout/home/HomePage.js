import React from "react";
import { Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid"; 
import Organizer from "../../blog/Organizer";
import Evand from "../../blog/Evand";

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
          <Organizer />
        </Grid>

        
        <Grid size={{ xs: 12, md: 9 }} sx={{ mt: 4 }}>
          <Typography component="h3" variant="h5" mb={3} fontWeight={700}>
            رویداد ها
          </Typography>
          <Evand />
        </Grid>
      </Grid>
    </Container>
  );
}

export default HomePage;
