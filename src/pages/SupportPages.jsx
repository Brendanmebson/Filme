import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  VStack, 
  HStack, 
  Input, 
  Button, 
  Icon, 
  Separator, 
  Flex,
  Badge
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HelpCircle, 
  Shield, 
  FileText, 
  Settings, 
  Search, 
  ChevronRight, 
  CheckCircle,
  AlertCircle
} from 'lucide-react';

// Common wrapper layout for support pages
const SupportLayout = ({ title, icon, subtitle, children }) => {
  return (
    <Box
      as={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      pt="150px"
      pb="100px"
      minH="100vh"
      position="relative"
    >
      {/* Background Orbs */}
      <Box position="fixed" top="10%" left="5%" w="300px" h="300px" bg="purple.600" filter="blur(150px)" opacity={0.06} pointerEvents="none" />
      <Box position="fixed" bottom="10%" right="5%" w="400px" h="400px" bg="blue.600" filter="blur(200px)" opacity={0.04} pointerEvents="none" />

      <Container maxW="container.md">
        <VStack align="flex-start" gap={8} p={{ base: 6, md: 10 }} bg="rgba(255, 255, 255, 0.02)" backdropFilter="blur(30px)" rounded="3xl" border="1px solid" borderColor="whiteAlpha.100" boxShadow="0 25px 50px rgba(0,0,0,0.4)">
          <Flex align="center" gap={4} wrap="wrap">
            <CircleIconButton icon={icon} />
            <VStack align="flex-start" gap={1}>
              <Heading size="2xl" fontWeight="black" color="white" letterSpacing="tight">{title}</Heading>
              {subtitle && <Text color="whiteAlpha.500" fontSize="sm" fontWeight="medium">{subtitle}</Text>}
            </VStack>
          </Flex>
          <Separator borderColor="whiteAlpha.100" />
          {children}
        </VStack>
      </Container>
    </Box>
  );
};

const CircleIconButton = ({ icon }) => (
  <Box 
    w="56px" 
    h="56px" 
    bg="purple.600" 
    rounded="2xl" 
    display="flex" 
    alignItems="center" 
    justifyContent="center"
    boxShadow="0 0 25px rgba(120, 100, 255, 0.4)"
  >
    <Icon as={icon} color="white" boxSize={6} />
  </Box>
);

// HELP CENTER
export const HelpCenter = () => {
  const [search, setSearch] = useState('');
  const [expandedIndex, setExpandedIndex] = useState(null);

  const faqs = [
    { 
      question: "How do I add movies or series to my watchlist?", 
      answer: "Simply hover over any movie or series card and click the Heart icon, or click 'Watch' to go to the detail page and hit the 'Add to Wishlist' button. All selected items will immediately appear in your 'Watchlist' tab." 
    },
    { 
      question: "Is the video trailer quality adjustable?", 
      answer: "Our trailer playback leverages advanced YouTube cinematic embeds which automatically stream at the highest resolution available (up to 4K) based on your current network connection bandwidth." 
    },
    { 
      question: "How does the Social Dashboard work?", 
      answer: "The Social Dashboard showcases real-time updates from your friends. You can see what they are watching, rating, and discovering, and even join a co-watching party directly by clicking 'Watch' next to their live status!" 
    },
    { 
      question: "Can I use Filme on multiple devices?", 
      answer: "Yes! Filme is designed with responsive, adaptive layouts suitable for desktops, laptops, tablets, and smartphones. Your watchlist and preferences sync automatically across all platforms." 
    },
    { 
      question: "How can I update my profile avatar?", 
      answer: "Currently, Filme displays a default high-end gradient or guest avatar. You can customize your profile settings in future releases as we expand individual member dashboard profiles." 
    },
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(search.toLowerCase()) || 
    faq.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SupportLayout title="Help Center" icon={HelpCircle} subtitle="Find answers & support for the Filme platform">
      <VStack w="100%" gap={6}>
        {/* Search bar */}
        <Box position="relative" w="100%">
          <Input 
            placeholder="Search help topics, FAQs..." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)}
            bg="whiteAlpha.50" 
            border="1px solid" 
            borderColor="whiteAlpha.100" 
            rounded="full" 
            py={6} 
            pl={12} 
            pr={6} 
            color="white"
            _placeholder={{ color: 'whiteAlpha.400' }}
            _focus={{ bg: "whiteAlpha.100", borderColor: "purple.500", boxShadow: "0 0 15px rgba(120, 100, 255, 0.2)" }}
          />
          <Box position="absolute" left={4} top="50%" transform="translateY(-50%)">
            <Icon as={Search} color="whiteAlpha.400" boxSize={5} />
          </Box>
        </Box>

        {/* FAQs */}
        <VStack w="100%" gap={4} align="stretch">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => {
              const isOpen = expandedIndex === index;
              return (
                <Box 
                  key={index} 
                  bg="rgba(255, 255, 255, 0.02)" 
                  border="1px solid" 
                  borderColor={isOpen ? "purple.500" : "whiteAlpha.100"} 
                  rounded="2xl" 
                  overflow="hidden" 
                  transition="all 0.3s"
                >
                  <Box 
                    p={5} 
                    cursor="pointer" 
                    onClick={() => setExpandedIndex(isOpen ? null : index)}
                    display="flex" 
                    justifyContent="space-between" 
                    alignItems="center"
                    _hover={{ bg: "whiteAlpha.50" }}
                  >
                    <Text fontWeight="black" color="white" pr={4}>{faq.question}</Text>
                    <Icon 
                      as={ChevronRight} 
                      color="purple.400" 
                      boxSize={5} 
                      transform={isOpen ? "rotate(90deg)" : "none"} 
                      transition="transform 0.3s"
                    />
                  </Box>
                  <AnimatePresence>
                    {isOpen && (
                      <Box 
                        as={motion.div} 
                        initial={{ height: 0, opacity: 0 }} 
                        animate={{ height: "auto", opacity: 1 }} 
                        exit={{ height: 0, opacity: 0 }} 
                        transition={{ duration: 0.3 }}
                        borderTop="1px solid" 
                        borderColor="whiteAlpha.100"
                        bg="blackAlpha.300"
                        p={5}
                      >
                        <Text color="whiteAlpha.800" fontSize="sm" lineHeight="relaxed">{faq.answer}</Text>
                      </Box>
                    )}
                  </AnimatePresence>
                </Box>
              );
            })
          ) : (
            <Center py={10} flexDirection="column" gap={2}>
              <Icon as={AlertCircle} color="whiteAlpha.400" boxSize={10} />
              <Text color="whiteAlpha.500">No help topics found matching "{search}"</Text>
            </Center>
          )}
        </VStack>
      </VStack>
    </SupportLayout>
  );
};

// TERMS OF SERVICE
export const TermsOfService = () => (
  <SupportLayout title="Terms of Service" icon={FileText} subtitle="Legal agreements & terms governing Filme">
    <VStack align="stretch" gap={6} color="whiteAlpha.800" fontSize="sm" lineHeight="relaxed">
      <Text>
        Welcome to Filme. By accessing or using our streaming, watchlist, and social synchronization services, you agree to comply with and be bound by these Terms of Service.
      </Text>

      <Box>
        <Heading size="xs" color="white" fontWeight="black" letterSpacing="widest" mb={2} textTransform="uppercase">1. Acceptance of Terms</Heading>
        <Text>
          Your access to and use of Filme is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.
        </Text>
      </Box>

      <Box>
        <Heading size="xs" color="white" fontWeight="black" letterSpacing="widest" mb={2} textTransform="uppercase">2. User Accounts & Security</Heading>
        <Text>
          To use certain features, such as building watchlists or syncing with the social dashboard, you may create an account. You are solely responsible for safeguarding your login credentials and are liable for all actions taken under your account.
        </Text>
      </Box>

      <Box>
        <Heading size="xs" color="white" fontWeight="black" letterSpacing="widest" mb={2} textTransform="uppercase">3. Intellectual Property Rights</Heading>
        <Text>
          All assets, cinematic designs, graphic modules, interactive dashboards, and video players are the proprietary property of Filme and our metadata providers. Third-party content (such as movie trailers, details, and reviews) are aggregated from TMDB under standard API terms and remain the properties of their respective rights holders.
        </Text>
      </Box>

      <Box>
        <Heading size="xs" color="white" fontWeight="black" letterSpacing="widest" mb={2} textTransform="uppercase">4. Limitation of Liability</Heading>
        <Text>
          Filme is provided on an "as-is" and "as-available" basis. We make no guarantees regarding streaming availability, data retention, or metadata accuracy. Under no circumstances shall Filme be liable for any direct, indirect, incidental, or consequential damages resulting from your use of the platform.
        </Text>
      </Box>
    </VStack>
  </SupportLayout>
);

// PRIVACY POLICY
export const PrivacyPolicy = () => (
  <SupportLayout title="Privacy Policy" icon={Shield} subtitle="How we protect & manage your data">
    <VStack align="stretch" gap={6} color="whiteAlpha.800" fontSize="sm" lineHeight="relaxed">
      <Text>
        At Filme, your privacy is paramount. This Privacy Policy details how we handle the personal information, watchlists, and activity data generated during your experience.
      </Text>

      <Box>
        <Heading size="xs" color="white" fontWeight="black" letterSpacing="widest" mb={2} textTransform="uppercase">1. Information We Collect</Heading>
        <Text>
          We collect basic usage information, including the movies you add to your watchlist, rating reviews you submit, and preferences you select. If you connect with the social dashboard, we index activity logs to keep your co-watching features synchronized in real-time.
        </Text>
      </Box>

      <Box>
        <Heading size="xs" color="white" fontWeight="black" letterSpacing="widest" mb={2} textTransform="uppercase">2. How We Use Your Data</Heading>
        <Text>
          We use data exclusively to personalize your experience, power the collaborative social dashboard features, analyze usage behavior, and ensure secure platform playback functionality. We never sell your personal metrics or sharing records to third parties.
        </Text>
      </Box>

      <Box>
        <Heading size="xs" color="white" fontWeight="black" letterSpacing="widest" mb={2} textTransform="uppercase">3. Third-Party Services</Heading>
        <Text>
          Filme integrates external APIs (specifically TMDB for movie metadata and YouTube for streaming trailer plays). These platforms may collect data in accordance with their individual privacy statements, which we suggest you review.
        </Text>
      </Box>

      <Box>
        <Heading size="xs" color="white" fontWeight="black" letterSpacing="widest" mb={2} textTransform="uppercase">4. Information Security</Heading>
        <Text>
          We employ state-of-the-art secure transmission protocols and encrypt sensitive profiles to prevent unauthorized access, alternation, or breach of platform databases.
        </Text>
      </Box>
    </VStack>
  </SupportLayout>
);

// COOKIE SETTINGS
export const CookieSettings = () => {
  const [preferences, setPreferences] = useState({
    essential: true, // Required
    functional: true,
    analytics: false,
    marketing: false
  });
  const [saved, setSaved] = useState(false);

  const handleToggle = (key) => {
    if (key === 'essential') return;
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 4000);
  };

  const cookieTypes = [
    {
      key: 'essential',
      title: 'Essential Cookies',
      desc: 'Necessary for platform security, basic routing, and watchlist retention. Cannot be disabled.',
      required: true
    },
    {
      key: 'functional',
      title: 'Functional Cookies',
      desc: 'Powers customizable dashboard layouts, co-watching room settings, and search suggestions.',
      required: false
    },
    {
      key: 'analytics',
      title: 'Analytics Cookies',
      desc: 'Helps us analyze streaming rates, popular content trends, and server efficiency audits.',
      required: false
    },
    {
      key: 'marketing',
      title: 'Marketing Cookies',
      desc: 'Enables curated platform recommendations and promo alerts aligned with your interests.',
      required: false
    }
  ];

  return (
    <SupportLayout title="Cookie Settings" icon={Settings} subtitle="Customize cookies & tracking preferences">
      <VStack w="100%" gap={6} align="stretch">
        <Text fontSize="sm" color="whiteAlpha.800" lineHeight="relaxed">
          Manage your cookie preferences. Filme uses cookies and local device tokens to personalize content, verify authentication state, and keep our co-watching social metrics alive in real-time.
        </Text>

        <VStack gap={4} align="stretch">
          {cookieTypes.map(({ key, title, desc, required }) => (
            <Box 
              key={key} 
              p={5} 
              bg="rgba(255,255,255,0.02)" 
              border="1px solid" 
              borderColor="whiteAlpha.100" 
              rounded="2xl"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              gap={6}
            >
              <VStack align="flex-start" gap={1} flex="1">
                <HStack gap={2}>
                  <Text fontWeight="black" color="white">{title}</Text>
                  {required && <Badge bg="purple.600" color="white" fontSize="3xs" px={2} rounded="full">REQUIRED</Badge>}
                </HStack>
                <Text fontSize="xs" color="whiteAlpha.600" lineHeight="relaxed">{desc}</Text>
              </VStack>

              <Box 
                as="button"
                onClick={() => handleToggle(key)}
                w="52px"
                h="28px"
                bg={preferences[key] ? "purple.600" : "whiteAlpha.200"}
                rounded="full"
                p="3px"
                transition="all 0.3s"
                cursor={required ? "not-allowed" : "pointer"}
                opacity={required ? 0.7 : 1}
                position="relative"
              >
                <Box 
                  w="22px" 
                  h="22px" 
                  bg="white" 
                  rounded="full" 
                  transition="all 0.3s"
                  transform={preferences[key] ? "translateX(24px)" : "translateX(0)"}
                  boxShadow="md"
                />
              </Box>
            </Box>
          ))}
        </VStack>

        <Separator borderColor="whiteAlpha.100" my={2} />

        <Flex align="center" justify="space-between" wrap="wrap" gap={4}>
          <Button
            onClick={handleSave}
            bg="purple.600"
            color="white"
            px={8}
            py={5}
            rounded="full"
            fontWeight="black"
            fontSize="xs"
            letterSpacing="widest"
            _hover={{ bg: "purple.700", boxShadow: "0 0 20px rgba(120, 100, 255, 0.4)" }}
          >
            SAVE PREFERENCES
          </Button>

          <AnimatePresence>
            {saved && (
              <Box 
                as={motion.div}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                color="green.400"
                display="flex"
                alignItems="center"
                gap={2}
              >
                <Icon as={CheckCircle} boxSize={5} />
                <Text fontSize="xs" fontWeight="black" letterSpacing="widest">PREFERENCES SAVED SUCCESSFULLY</Text>
              </Box>
            )}
          </AnimatePresence>
        </Flex>
      </VStack>
    </SupportLayout>
  );
};

const SupportPages = ({ page }) => {
  if (page === 'help') return <HelpCenter />;
  if (page === 'terms') return <TermsOfService />;
  if (page === 'privacy') return <PrivacyPolicy />;
  if (page === 'cookies') return <CookieSettings />;
  return <HelpCenter />;
};

export default SupportPages;

