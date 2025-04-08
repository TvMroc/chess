import { Box, Button } from "@mui/material";
import { useLocation } from "wouter";

function Layout() {   
  const [location, setLocation] = useLocation();
  return (
    <Box display='flex' flexDirection='row' gap={2} margin={1}> 
      <Button variant={location == '/#/chess' ? "contained" : "outlined"} onClick={() => setLocation("/chess")} href="/#/chess">Chess</Button>
    </Box>
  )
}

export default Layout
