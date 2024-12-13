import Author from "@/models/author";
import dbConnect from "@/lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await dbConnect();
      const { id } = req.query;
      if (id) {
        const author = await Author.findOne({ id });
        if (!author) {
          return res.status(404).json({ message: "Author not found" });
        }
        return res.status(200).json(author);
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
