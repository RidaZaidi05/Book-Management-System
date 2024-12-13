import Link from "next/link";
import { useState, useEffect } from "react";
const Genres = (props) => {


    const [generes, setGenres] = useState([]);

    useEffect(() => {
        fetch("/api/genres")
          .then((res) => res.json())
          .then((data) => {
            setGenres(data);
          });
      }, []);

    return (
        <>
            <h1 className="heading" style={{marginTop:'20px'}}>Book Genres</h1>
            <div className="genresContainer">
                <ul>
                    {generes.map(genre => (
                        <li key={genre.id}>
                            <Link href={`/genres/${genre.id}`}>
                                {genre.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};


export default Genres;