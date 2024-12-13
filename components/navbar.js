import { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { useRouter } from "next/router"; // Import useRouter from next/router
import { useAuth } from "../contexts/AuthContext"; // Import useAuth context

const Navbar = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const { user, logout } = useAuth(); // Get user and logout from useAuth context
    const router = useRouter(); // Initialize the router

    const toggleDrawer = (open) => () => {
        setIsDrawerOpen(open);
    };

    const handleHistoryClick=()=>{
        if (!user) {
            router.push('/login?redirectTo=/history');
        } else {
            router.push('/history');
        }
    }

    const navLinks = [
        { title: "Books", path: "/books" },
        { title: "Genres", path: "/genres" },
        { title: "Authors", path: "/authors" },
    ];

    const linkStyle = {
        textDecoration: "none",
        color: "#0070f3",
        fontWeight: "bold",
        fontSize: "1.1rem", // Slightly smaller text
    };

    const handleLoginClick = () => {
        router.push("/login"); // Navigate to /login page on button click
    };

    const handleLogoutClick = () => {
        logout(); // Call logout function from useAuth context
    };

    return (
        <AppBar position="static" color="default">
            <Toolbar sx={{ justifyContent: "space-between", flexWrap: "wrap" }}>
                {/* Mobile Menu Icon */}
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={toggleDrawer(true)}
                    sx={{ display: { xs: "flex", md: "none" } }}
                >
                    <MenuIcon />
                </IconButton>

                {/* Navigation Links for Larger Screens */}
                <Box
                    sx={{
                        display: { xs: "none", md: "flex" },
                        justifyContent: "center", // Center the links
                        alignItems: "center",
                        gap: 2,
                        flexGrow: 1, // Allow it to take available space
                        marginLeft: user ? '280px' : '80px'
                    }}
                >
                    {navLinks.map((link) => (
                        <Typography variant="h6" key={link.title}>
                            <Link href={link.path} style={linkStyle}>
                                {link.title}
                            </Link>
                        </Typography>
                    ))}
                    <Typography variant="h6" onClick={handleHistoryClick} sx={{ ...linkStyle, cursor: "pointer" }}>
                        History
                    </Typography>
                </Box>

                {/* Conditional Login/Logout Button */}
                {user ? (
                    <Box sx={{ display: "flex", alignItems: "center" , }}>
                        <Typography sx={{ marginRight: 2, color: "#0070f3", fontWeight: "bold" }}>
                            {user.email}
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ textTransform: "none" , display: { xs: "none", md: "flex" }}}
                            onClick={handleLogoutClick} // Logout on click
                        >
                            Logout
                        </Button>
                    </Box>
                ) : (
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{
                            textTransform: "none",
                            display: { xs: "none", md: "flex" }, // Hide on small screens
                        }}
                        onClick={handleLoginClick} // Navigate to /login page
                    >
                        Login
                    </Button>
                )}

                {/* Drawer for Mobile Screens */}
                <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
                    <Box
                        sx={{ width: 250 }}
                        role="presentation"
                        onClick={toggleDrawer(false)}
                        onKeyDown={toggleDrawer(false)}
                    >
                        <List>
                            {navLinks.map((link) => (
                                <ListItem button key={link.title}>
                                    <Link href={link.path} style={{ ...linkStyle, width: "100%" }}>
                                        <ListItemText primary={link.title} />
                                    </Link>
                                </ListItem>

                            ))}
                             <ListItem button onClick={handleHistoryClick} sx={{ width: "100%" }}>
                                <Typography  sx={{ ...linkStyle, width: "100%", cursor: "pointer" , fontWeight:"light"}}>
                                    History
                                </Typography>
                            </ListItem>
                            <ListItem button>
                                {user ? (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        sx={{ width: "100%", textTransform: "none" }}
                                        onClick={handleLogoutClick} // Logout on click
                                    >
                                        Logout
                                    </Button>
                                ) : (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        sx={{ width: "100%", textTransform: "none" }}
                                        onClick={handleLoginClick} // Navigate to /login page
                                    >
                                        Login
                                    </Button>
                                )}
                            </ListItem>
                        </List>
                    </Box>
                </Drawer>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
