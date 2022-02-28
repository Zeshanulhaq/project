import React, { useState } from "react";
import GipyCard from "../Card";
import Grid from "@mui/material/Grid";
// import favourites from '../Ghipy'
const MyFavorites = ({ favourites }) => {
  // console.log(favourites);

  return (
    <Grid container spacing={2} style={{ paddingTop: "20px" }}>
      {/* {console.log("asad:",favourites)}
       */}
      <h1>Favorite</h1>
      {favourites.map((el) => (
        <Grid item key={el.id} xs={12} md={6} lg={4}>
          <GipyCard el={el} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MyFavorites;
