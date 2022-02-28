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

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    const fetchData = async () => {
      setloading(true);
      setiserror(false);
      try {
        const results = await axios("https://api.giphy.com/v1/gifs/trending", {
          params: {
            api_key: "WbVhYZ2ykeHizFW6NvZZ8mUztvPxhJ8s",
            limit: 6,
          },
        });
        console.log("favourites:", favourites);
        setdata(results.data.data);
      } catch (err) {
        setiserror(true);
        setTimeout(() => setiserror(false), 4000);
      }
      setloading(false);
    };
    fetchData();
  }, []);

  // const handleScroll = (e) => {
  //   console.log("hi");
  // };
  // useEffect(({ fetchData }) => {
  //   fetchData();
  //   window.addEventListener("scroll", handleScroll);
  // }, []);

  const handleSearch = (e) => {
    setsearch(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const results = await axios("https://api.giphy.com/v1/gifs/search", {
      params: {
        api_key: "WbVhYZ2ykeHizFW6NvZZ8mUztvPxhJ8s",
        q: search,
        limit: 50,
      },
    });
    console.log(results);
    setdata(results.data.data);
  };
  const addFavorite = (el) => {
    const newFavouriteList = [...favourites, el];
    setfavourites(newFavouriteList);
  };
  // const pageSelected = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  // };
  if (loading) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress />
        <Typography>Please wait while Gifs are loading</Typography>
      </Box>
    );
  }

  return (
    <Container>
      <Header
        handleSearch={handleSearch}
        handleSubmit={handleSubmit}
        search={search}
      />

      <Grid container spacing={2} style={{ paddingTop: "20px" }}>
        {data.map((el) => (
          <Grid item key={el.id} xs={12} md={6} lg={4}>
            <GipyCard el={el} handleFavorite={addFavorite} />
          </Grid>
        ))}
      </Grid>

      {/* <LoadMore
        pageSelected={pageSelected}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={data.length}
      /> */}
      <MyFavorites favourites={favourites} handleFavorite={addFavorite} />
      {/* {favourites.length>0  ? <MyFavorites favourites={favourites}/> : ""   }   */}
    </Container>
  );
};

export default Ghipy;
