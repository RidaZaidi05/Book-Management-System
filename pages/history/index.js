import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Box, Typography } from "@mui/material";

const History = () => {
  const { user } = useAuth();
  const [searchHistory, setSearchHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchHistory = async () => {
      try {
        const response = await fetch(`/api/user/history?userId=${user.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch history");
        }

        const data = await response.json();
        if (data.success) {
          setSearchHistory(data.data);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [user]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1 className="heading" style={{ marginTop: "20px" }}>
        History
      </h1>
      <Box className="searchPageContainer" sx={{ marginTop: 4 }}>
        {searchHistory.length > 0 ? (
          <Box sx={{ paddingLeft: 2 }}>
            {searchHistory.map((item, index) => (
              <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body1" sx={{ marginRight: 1 }}>
                  &#8226; 
                </Typography>
                <Typography variant="body1">{item.searchQuery}</Typography>
              </Box>
            ))}
          </Box>
        ) : (
          <Typography
            variant="body1"
            sx={{ textAlign: "center", marginTop: 2 }}
          >
            No search history found.
          </Typography>
        )}
      </Box>
    </>
  );
};

export default History;
