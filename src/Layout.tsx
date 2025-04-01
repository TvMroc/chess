import { Box, Button } from "@mui/material";
import { useLocation } from "wouter";

function Layout() {   
  const [location, setLocation] = useLocation();
  return (
    <Box display='flex' flexDirection='row' gap={2} margin={1}> 
      <Button variant={location == '/#/' ? "contained" : "outlined"} href="/#/">About Us</Button>
      <Button variant={location == '/#/chess' ? "contained" : "outlined"} href="/#/chess">Chess</Button>
    </Box>
  )
}

export default Layout
