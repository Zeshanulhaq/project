import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import GipyCard from "./Card";
import { CircularProgress } from "@mui/material";
import Header from "./Header";
import MyFavorites from "./pages/MyFavorites";

const Ghipy = () => {
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(false);
  const [search, setsearch] = useState("");
  const [iserror, setiserror] = useState(false);
  const [favourites, setfavourites] = useState([]);

  // const [currentPage, setCurrentPage] = useState(1);
  // const [itemsPerPage, setItemsPerPage] = useState(25);
  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    const fetchData = async () => {
      setloading(true);
      setiserror(false);
      try {
        const results = await axios("https://api.giphy.com/v1/gifs/trending", {
          params: {
            api_key: "WbVhYZ2ykeHizFW6NvZZ8mUztvPxhJ8s",
            limit: 10,
          },
        });
        console.log(results);
        setdata(results.data.data);
      } catch (err) {
        setiserror(true);
        setTimeout(() => setiserror(false), 4000);
      }
      setloading(false);
    };
    fetchData();
  }, []);

  const handleSearch = (e) => {
    setsearch(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const results = await axios("https://api.giphy.com/v1/gifs/search", {
      params: {
        api_key: "WbVhYZ2ykeHizFW6NvZZ8mUztvPxhJ8s",
        q: search,
        limit: 5,
      },
    });
    console.log(results);
    setdata(results.data.data);
  };

  useEffect(() => {
    const gifFavourites = JSON.parse(
      localStorage.getItem("react-gif-app-favourites")
    );
    setfavourites(gifFavourites);
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem("react-gif-app-favourites", JSON.stringify(items));
  };

  // const removeFromStorage = (items) => {
  //   localStorage.removeItem("react-movie-app-favourites");
  // };

  const addFavorite = (el) => {
    const newFavouriteList = [...favourites, el];
    setfavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };
  const removeFavourites = (el) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.id !== el.id
    );
    setfavourites(newFavouriteList);
    // removeFromStorage(newFavouriteList);
  };

  return (
    <Container style={{ backgroundColor: "#000" }}>
      <Header
        handleSearch={handleSearch}
        handleSubmit={handleSubmit}
        search={search}
      />
      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
          <Typography>Please wait while Gifs are loading</Typography>
        </Box>
      ) : (
        <Grid container spacing={2} style={{ paddingTop: "20px" }}>
          {data.map((el) => (
            <Grid item key={el.id} xs={12} md={6} lg={4}>
              <GipyCard el={el} handleFavorite={addFavorite} />
            </Grid>
          ))}
        </Grid>
      )}
      <MyFavorites
        favourites={favourites}
        handleFavorite={addFavorite}
        remove={removeFavourites}
      />
    </Container>
  );
};

export default Ghipy;
