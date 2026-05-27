import React from 'react';
import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';

export const HelpCenter = () => (
  <SupportLayout title="Help Center">
    <Text color="whiteAlpha.700">Find answers to common questions about using Filme, managing your account, and troubleshooting playback issues.</Text>
  </SupportLayout>
);

export const TermsOfService = () => (
  <SupportLayout title="Terms of Service">
    <Text color="whiteAlpha.700">Please read these terms carefully before using Filme. They govern your access and use of our platform.</Text>
  </SupportLayout>
);

export const PrivacyPolicy = () => (
  <SupportLayout title="Privacy Policy">
    <Text color="whiteAlpha.700">We care deeply about your privacy. Learn how we collect, use, and protect your personal information.</Text>
  </SupportLayout>
);

export const CookieSettings = () => (
  <SupportLayout title="Cookie Settings">
    <Text color="whiteAlpha.700">Manage your cookie preferences. We use cookies to personalize your experience and analyze traffic.</Text>
  </SupportLayout>
);

const SupportLayout = ({ title, children }) => {
  return (
    <Box
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      pt="150px"
      pb="100px"
      minH="100vh"
    >
      <Container maxW="container.md">
        <VStack align="flex-start" gap={8} p={10} bg="rgba(255, 255, 255, 0.03)" rounded="3xl" border="1px solid" borderColor="whiteAlpha.100">
          <Heading size="2xl" fontWeight="black" color="white">{title}</Heading>
          {children}
        </VStack>
      </Container>
    </Box>
  );
};
