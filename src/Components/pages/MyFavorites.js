import React from "react";
import GipyCard from "../Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import Typography from "@mui/material/Typography";

// import favourites from '../Ghipy'
const MyFavorites = ({ favourites, remove }) => {
  // console.log(favourites);

  return (
    <Grid container spacing={2} style={{ paddingTop: "20px" }}>
      <Typography variant="h3" style={{ color: "white" }}>
        Favorite
      </Typography>
      {favourites.map((el) => (
        <Grid item key={el.id} xs={12} md={6} lg={4}>
          <Button onClick={() => remove(el)} style={{ color: "white" }}>
            remove
          </Button>
          <GipyCard el={el} remove={remove} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MyFavorites;
