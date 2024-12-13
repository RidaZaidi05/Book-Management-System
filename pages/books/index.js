import { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import Book from "@/components/book";
import SearchAndFilter from "@/components/search";
import { useAuth } from "@/contexts/AuthContext";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [generes, setGenres] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const button = "View Details";
  const { user } = useAuth(); // Get user and logout from useAuth context
    

  useEffect(() => {
    fetch("/api/books")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setFilteredBooks(data);
      });
    fetch("/api/genres")
      .then((res) => res.json())
      .then((data) => {
        setGenres(data);
      });
  }, []);

  const handleSelectChange = (e) => {
    const genre = e.target.value;
    if (genre !== "") {
      const filteredBook = books.filter((book) => book.genre === genre);
      setFilteredBooks(filteredBook);
    } else {
      setFilteredBooks(books);
    }
  };

  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    if(searchValue === ""){
      setFilteredBooks(books);
    }
    setSearchTerm(searchValue);
  };

  const handleSearchSubmit = () => {
    if (user) {
      fetch('/api/user/history', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id, 
          searchQuery: searchTerm,
        }),
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
    }
    const filteredBySearch = books.filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBooks(filteredBySearch);
  };
  

  return (
    <>
      <div style={{marginTop:'20px'}}>
        <h1 className="heading">Books</h1>
        <SearchAndFilter
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
          handleSelectChange={handleSelectChange}
          genres={generes}
          handleSearchSubmit={handleSearchSubmit}
        />
        <Grid container spacing={1} justifyContent="center" className="booksContainer">
          {filteredBooks.map((book) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={book.id}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "-10px",
              }}
            >
              <Book id={book.id} title={book.title} button={button} />
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};

export default Books;
