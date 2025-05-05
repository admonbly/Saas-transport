import React from 'react';
import { Box, Flex, Button, Select, Image, Heading } from '@chakra-ui/react';
import { useLang } from './i18n';

const navLinks = [
  { label: 'Accueil', href: '/' },
  { label: 'Vente ticket', href: '/ticket-sale' },
  { label: 'Recherche', href: '/search' },
  { label: 'Réservations', href: '/booking' },
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Gestion de flotte', href: '/fleet-management' },
  { label: 'FAQ', href: '/faq' },
];

const Layout = ({ children }) => {
  const { lang, setLang } = useLang();
  return (
    <Box minH="100vh" bg="bg.default">
      <Box as="header" bg="white" borderBottomWidth={1} borderColor="gray.200" boxShadow="sm" px={4} py={2}>
        <Flex align="center" justify="space-between" maxW="7xl" mx="auto">
          <Flex align="center" gap={3}>
            <Image src="/logo192.png" alt="Logo" boxSize="40px" borderRadius="full" boxShadow="md" />
            <Heading as="h1" size="md" color="blue.600" letterSpacing={1} fontWeight={700}>
              SaaS Transport
            </Heading>
          </Flex>
          <Flex gap={2} flex={1} ml={8}>
            {navLinks.map(link => (
              <Button
                as="a"
                key={link.href}
                href={link.href}
                variant="ghost"
                colorScheme="blue"
                fontWeight={500}
                _hover={{ bg: 'blue.50', color: 'blue.700' }}
              >
                {link.label}
              </Button>
            ))}
          </Flex>
          <Flex align="center" gap={2}>
            <Button as="a" href="/login" colorScheme="blue" variant="outline" size="sm">Connexion</Button>
            <Button as="a" href="/register" colorScheme="blue" size="sm">Inscription</Button>
            <Button colorScheme="orange" size="sm" borderRadius={20} onClick={() => window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'})}>
              Feedback
            </Button>
            <Select
              value={lang}
              onChange={e => setLang(e.target.value)}
              size="sm"
              w="70px"
              bg="white"
              borderRadius={8}
              ml={2}
            >
              <option value="fr">FR</option>
              <option value="en">EN</option>
            </Select>
          </Flex>
        </Flex>
      </Box>
      <Box as="main" maxW="7xl" mx="auto" py={8} px={4}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
