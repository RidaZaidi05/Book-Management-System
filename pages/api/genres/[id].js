import Book from "@/models/book";
import Genre from "@/models/genre"; // Ensure the path is correct
import dbConnect from "@/lib/mongodb";
import Author from "@/models/author";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await dbConnect();
      const {id} = req.query;
      if(!id){
        return res.status(400).json({message:"Id not Found"});
      }
      const genre = await Genre.findOne({ id });
      const books = await Book.find();
      const authors = await Author.find();

      const filterdBooks = books.filter(b => b.genreId === genre.id);


      const result = filterdBooks.map((book) => {
        const author = authors.find((a) => a.id === book.authorId);

        return {
          id: book.id,
          title: book.title,
          description: book.description,
          price: book.price,
          rating: book.rating,
          author: author ? author.name : "Unknown Author",
          genre: genre.name
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
