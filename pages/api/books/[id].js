import Book from "@/models/book";
import Author from "@/models/author";
import Genre from "@/models/genre";
import dbConnect from "@/lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await dbConnect();
      const { id } = req.query;

      console.log("fyhhr", id);

      if (id) {
        const book = await Book.findOne({ id });

        if (!book) {
          return res.status(404).json({ message: "Book not found" });
        }
        const author = await Author.findOne({ id: book.authorId });
        const genre = await Genre.findOne({ id: book.genreId });

        return res.status(200).json({
          id: book.id,
          title: book.title,
          description: book.description,
          price: book.price,
          rating: book.rating,
          author: author ? author.name : "Unknown Author",
          authorId : author ? author.id : 1,
          genre: genre ? genre.name : "Unknown Genre",
        });
      } else {
        return res.status(404).json({ message: "id not found" });
      }
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
