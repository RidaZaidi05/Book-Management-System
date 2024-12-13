import { useState, useEffect } from "react";
import Book from "@/components/book";
import { useRouter } from "next/router";
import { Grid } from "@mui/material";

const BookDetailsonGenres = () => {
  const r = useRouter();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch(`/api/genres/${r.query.gID}`)
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
      });
  }, []);

  return (
    <>
      <h1 className="heading" style={{marginTop:'20px'}}>Books in this Genre</h1>
      <div className="booksContainer">
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          {books.map((book) => (
            <Grid item xs={12} sm={6} md={4} key={book.id}>
              <Book
                id={book.id}
                title={book.title}
                description={book.description}
                price={book.price}
                rating={book.rating}
                author={book.author}
                genre={book.genre}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};

export default BookDetailsonGenres;
