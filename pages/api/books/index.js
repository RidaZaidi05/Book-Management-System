import Book from "@/models/book";
import Author from "@/models/author"; 
import Genre from "@/models/genre";
import dbConnect from "@/lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // Connect to the database
      await dbConnect();

      // Step 1: Fetch all books
      const books = await Book.find();

      // Step 2: Fetch all authors and genres
      const authors = await Author.find();
      const genres = await Genre.find();

      // Step 3: Construct the result array
      const result = books.map((book) => {
        // Find the matching author and genre
        const author = authors.find((a) => a.id === book.authorId);
        const genre = genres.find((g) => g.id === book.genreId);

        return {
          id: book.id,
          title: book.title,
          description: book.description,
          price: book.price,
          rating: book.rating,
          author: author ? author.name : "Unknown Author",
          genre: genre ? genre.name : "Unknown Genre",
        };
      });

      // Step 4: Return the result
      res.status(200).json(result);
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
