import Genre from "@/models/genre";
import dbConnect from "@/lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await dbConnect();
      const genres = await Genre.find();
      res.status(200).json(genres);
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
