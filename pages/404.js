// pages/404.js
import Link from 'next/link';

const Custom404 = () => {
    return (
        <div className="notFoundcontainer">
            <h1 className="notFoundtitle">404 - Page Not Found</h1>
            <p className="notFoundmessage">Sorry, we couldn't find the page you're looking for.</p>
            <Link href="/" className="homeLink">
                Go back to Home
            </Link>
        </div>
    );
};

export default Custom404;
