import {useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import Book from '@/components/book';

const BookDetails = ()=>{  
    const r = useRouter();
    const button = "Author Detail"
    const [book, setBook] = useState({});

    useEffect(()=>{
        fetch(`/api/books/${r.query.bookId}`).then(res=>res.json()).then(data=> setBook(data));
    }, []);

    
    return(
        <>
            <h1 className='heading' style={{marginTop:'20px'}}>Book Deail Page</h1>
            <div className='booksContainer' style={{marginTop:'-20px'}}>
                <Book id={book.id} title={book.title}  description={book.description}
                    price={book.price} rating ={book.rating} author ={book.author} 
                    genre={book.genre}  AuthorButton = {button} authorID = {book.authorId}
                
                />
            </div>
        </>
    ) 
}



export default BookDetails;