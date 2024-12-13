import { TextField, IconButton, Paper, InputAdornment, FormControl, InputLabel, Select, MenuItem, Grid, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchAndFilter = ({ searchTerm, handleSearchChange, genres, handleSelectChange, handleSearchSubmit }) => {
  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ marginBottom: 3 }}>
      <Grid item xs={12} sm={8} md={6}>
        <Paper
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "6px 12px",
            backgroundColor: "var(--background-light)",
            borderRadius: 2,
            width: "100%",
            maxWidth: 600,
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)", // Subtle shadow
          }}
        >
          <TextField
            label="Search Books"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={handleSearchChange}
            InputLabelProps={{
              shrink: true, // This will move the label up
            }}
            InputProps={{
              sx: {
                backgroundColor: "white",
                borderRadius: 1,
                height: "40px", // Sleek, reduced height
                paddingLeft: "8px",
                "& .MuiOutlinedInput-root": {
                  borderColor: "var(--accent-color)",
                },
                "& .MuiInputLabel-root": {
                  color: "var(--foreground-light)",
                },
                "& .MuiOutlinedInput-root:hover": {
                  borderColor: "var(--accent-dark)",
                },
              },
            }}
          />
          {/* Search Button */}
          <IconButton
            onClick={handleSearchSubmit}
            sx={{
              color: "var(--accent-color)",
              backgroundColor: "white",
              borderRadius: "50%",
              padding: "8px",
              "&:hover": {
                backgroundColor: "var(--accent-light)",
              },
            }}
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </Grid>

      {/* Genre Dropdown */}
      <Grid item xs={12} sm={4} md={3}>
  <FormControl fullWidth sx={{ backgroundColor: "var(--background-light)", borderRadius: 1 }}>
    <InputLabel sx={{ color: "var(--foreground-light)", fontSize: "0.875rem" }}>--Select Genre</InputLabel>
    <Select
      onChange={handleSelectChange}
      defaultValue=""
      label="Select Genre"
      sx={{
        backgroundColor: "var(--background-light)",
        color: "var(--foreground-light)",
        fontSize: "0.875rem", // Smaller font size
        height: "45px", // Reduced height for the select box
        paddingTop: "4px", // Reduced top padding
        paddingBottom: "4px", // Reduced bottom padding
        "& .MuiSelect-icon": {
          color: "var(--accent-color)",
        },
        "& .MuiOutlinedInput-root": {
          borderColor: "var(--accent-color)",
        },
        "& .MuiOutlinedInput-root:hover": {
          borderColor: "var(--accent-dark)",
        },
      }}
    >
      <MenuItem value="">
        <em>--Select Genre</em>
      </MenuItem>
      {genres.map((g, index) => (
        <MenuItem key={index} value={g.name} sx={{ color: "var(--foreground-light)" }}>
          {g.name}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
</Grid>

    </Grid>
  );
};

export default SearchAndFilter;
