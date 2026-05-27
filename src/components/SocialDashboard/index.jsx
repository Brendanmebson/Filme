import React from 'react';
import { Box, Container, Grid, GridItem } from '@chakra-ui/react';
import FriendsSidebar from './FriendsSidebar';
import ActivityFeed from './ActivityFeed';

const SocialDashboard = () => {
  return (
    <Box id="social-dashboard" py={24} position="relative" overflow="hidden">
      {/* Cinematic Background Glows */}
      <Box 
        position="absolute" 
        top="40%" 
        right="-10%" 
        w="400px" 
        h="400px" 
        bg="blue.600" 
        filter="blur(150px)" 
        opacity={0.05}
        pointerEvents="none"
      />
      
      <Container maxW="container.2xl" px={{ base: 6, md: 12 }}>
        <Grid 
          templateColumns={{ base: '1fr', lg: '300px 1fr' }} 
          gap={{ base: 12, lg: 16 }}
          alignItems="start"
        >
          {/* Sidebar */}
          <GridItem>
            <FriendsSidebar />
          </GridItem>

          {/* Main Feed */}
          <GridItem>
            <ActivityFeed />
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default SocialDashboard;
