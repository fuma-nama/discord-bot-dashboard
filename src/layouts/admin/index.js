// Chakra imports
import { Box } from "@chakra-ui/react";
import Footer from "components/footer/FooterAdmin.js";
import Profile from "views/admin/profile";
// Layout components
import { UserDataProvider } from "contexts/DataContext";

// Custom Chakra theme
export default function Dashboard() {
  // functions for changing the states from components
  document.documentElement.dir = "ltr";

  return (
    <Box
      minHeight="100vh"
      height="100%"
      overflow="auto"
      position="relative"
      maxWidth={{ base: "100%" }}
      px={{ md: "80px", xl: "120px" }}
    >
      <UserDataProvider>
        <Profile />
        <Box>
          <Footer />
        </Box>
      </UserDataProvider>
    </Box>
  );
}
