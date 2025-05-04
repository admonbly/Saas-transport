// frontend/src/pages/Home.js
import React from 'react';
import { Box, Heading, Card, Text, Button, SimpleGrid } from '@chakra-ui/react';
import { useLang } from '../i18n';

const Home = () => {
  const { lang } = useLang();
  const t = {
    fr: {
      welcome: "Bienvenue sur la page d'accueil",
      discover: 'Découvrir les fonctionnalités',
      saas: "Solution SaaS pour la gestion digitale des sociétés de transport en Côte d'Ivoire."
    },
    en: {
      welcome: 'Welcome to the home page',
      discover: 'Discover features',
      saas: 'SaaS solution for digital management of transport companies in Ivory Coast.'
    }
  };
  return (
    <Box minH="70vh" display="flex" flexDirection="column" alignItems="center" justifyContent="center" gap={8}>
      <Card bg="whiteAlpha.800" borderRadius="2xl" boxShadow="xl" p={10} maxW="2xl" w="full" display="flex" flexDirection="column" alignItems="center">
        <Heading as="h1" size="2xl" color="blue.700" mb={4} textAlign="center" fontWeight="extrabold">{t[lang].welcome}</Heading>
        <Text fontSize="lg" color="gray.700" mb={6} textAlign="center" fontWeight="medium">{t[lang].saas}</Text>
        <Button colorScheme="blue" size="lg" px={8} py={3} boxShadow="lg">{t[lang].discover}</Button>
      </Card>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} mt={8} w="full" justifyItems="center">
        <Card w="72" p={6} borderRadius="xl" boxShadow="md">
          <Heading as="h3" size="md" mb={2}>Réservations en ligne</Heading>
          <Text color="gray.600">Réservez, payez et gérez vos trajets en toute simplicité depuis la plateforme.</Text>
        </Card>
        <Card w="72" p={6} borderRadius="xl" boxShadow="md">
          <Heading as="h3" size="md" mb={2}>Gestion de flotte</Heading>
          <Text color="gray.600">Suivi des véhicules, maintenance, statistiques et alertes en temps réel.</Text>
        </Card>
        <Card w="72" p={6} borderRadius="xl" boxShadow="md">
          <Heading as="h3" size="md" mb={2}>Fidélité & avis</Heading>
          <Text color="gray.600">Points de fidélité, avis clients, gestion des incidents et support intégré.</Text>
        </Card>
      </SimpleGrid>
    </Box>
  );
};

export default Home;
