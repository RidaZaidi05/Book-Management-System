import { useRouter } from 'next/router';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { useAuth } from '@/contexts/AuthContext';

const Book = (props)=>{ 
    const router = useRouter();
    const { user } = useAuth();

    const handleDetailButton =()=>{
      if (!user) {
        router.push(`/login?redirectTo=/books/${props.id}`);
      } else {
        router.push(`/books/${props.id}`);
      }
    }
    const handleAuthorDetailButton =()=>{
      if (!user) {
        router.push(`/login?redirectTo=/books/${props.id}/${props.authorID}`);
      } else {
        router.push(`/books/${props.id}/${props.authorID}`)
      }
    }
    return (
        <Card 
        key={props.id} 
        sx={{ 
          flex: '1 1 calc(33.333% - 20px)', 
          margin: '10px', 
          backgroundColor: 'var(--background-light)', 
          border: '1px solid #ddd', 
          borderRadius: '8px', 
          padding: '15px', 
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', 
          transition: 'transform 0.3s', 
          maxWidth: '400px',
          '&:hover': {
            transform: 'translateY(-5px)' 
          }
        }}
      >
        <CardContent>
          {props.title && (
            <Typography 
              variant="h5" 
              component="h2" 
              sx={{
                fontSize: '1.5em', 
                marginBottom: '10px', 
                textAlign: 'center',
                color: 'var(--foreground-light)', // Light mode text color
                fontWeight: 'bolder'
              }}
            >
              {props.title}
            </Typography>
          )}
          {props.rating && (
            <Typography 
              variant="body2" 
              color="textSecondary" 
              sx={{ 
                fontSize: '1rem', 
                color: '#ff9102', // Gold color for rating 
                marginBottom: '10px' 
              }}
            >
              <strong>Rating: </strong>{props.rating}
            </Typography>
          )}
          {props.price && (
            <Typography 
              variant="body2" 
              color="textSecondary" 
              sx={{
                fontSize: '1rem',
                color: 'var(--foreground-light)', 
                marginBottom: '10px'
              }}
            >
              <strong>Price: </strong>${props.price}
            </Typography>
          )}
          {props.genre && (
            <Typography 
              variant="body2" 
              color="textSecondary" 
              sx={{
                fontSize: '1rem',
                fontStyle: 'italic',
                color: 'var(--foreground-light)', 
                margin: '5px 0'
              }}
            >
              <strong>Genres: </strong>{props.genre}
            </Typography>
          )}
          {props.author && (
            <Typography 
              variant="body2" 
              color="textSecondary" 
              sx={{
                fontSize: '1rem',
                fontStyle: 'italic',
                color: 'var(--foreground-light)', 
                margin: '5px 0'
              }}
            >
              <strong>Author: </strong>{props.author}
            </Typography>
          )}
          {props.description && (
            <Typography 
              variant="body2" 
              color="textSecondary" 
              sx={{
                fontSize: '1rem',
                color: 'var(--foreground-light)', 
                marginBottom: '10px'
              }}
            >
              <strong>Description: </strong>{props.description}
            </Typography>
          )}
  
          {props.button && (
            <div className="buttonContainer" style={{ marginTop: '10px' }}>
              <Button 
                variant="contained" 
                sx={{
                  backgroundColor: 'var(--accent-color)', 
                  color: 'white',
                  padding: '10px 20px', 
                  borderRadius: '5px',
                  '&:hover': {
                    backgroundColor: 'var(--accent-dark)'
                  }
                }}
                onClick={handleDetailButton}
              >
                {props.button}
              </Button>
            </div>
          )}
  
          {props.AuthorButton && (
            <div className="buttonContainer" style={{ marginTop: '10px' }}>
              <Button 
                variant="outlined" 
                sx={{
                  borderColor: 'var(--accent-color)', 
                  color: 'var(--accent-color)',
                  padding: '10px 20px', 
                  borderRadius: '5px',
                  '&:hover': {
                    borderColor: 'var(--accent-dark)', 
                    color: 'var(--accent-dark)'
                  }
                }}
                onClick={handleAuthorDetailButton}
              >
                {props.AuthorButton}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    );
}

export default Book;