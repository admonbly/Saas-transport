import React from 'react';
import { Box, Heading, Card, Text } from '@chakra-ui/react';

const FAQ = () => (
  <Box maxW="2xl" mx="auto" py={10} minH="100vh">
    <Heading as="h2" size="xl" mb={8} color="blue.600" textAlign="center">FAQ - Questions fréquentes</Heading>
    <Card mb={4} p={6} borderRadius="xl" boxShadow="md">
      <Heading as="h4" size="md" mb={2}>Comment réserver un billet ?</Heading>
      <Text>Utilisez la page "Vente ticket" ou "Réservations" pour choisir votre trajet, sélectionner votre siège et payer en ligne.</Text>
    </Card>
    <Card mb={4} p={6} borderRadius="xl" boxShadow="md">
      <Heading as="h4" size="md" mb={2}>Comment utiliser mes points de fidélité ?</Heading>
      <Text>Lors de la réservation, cliquez sur "Utiliser mes points" pour bénéficier d'une réduction.</Text>
    </Card>
    <Card mb={4} p={6} borderRadius="xl" boxShadow="md">
      <Heading as="h4" size="md" mb={2}>Comment signaler un incident ?</Heading>
      <Text>Depuis la page "Réservations" ou "Gestion trajets", remplissez le formulaire de signalement d'incident associé à votre trajet.</Text>
    </Card>
    <Card mb={4} p={6} borderRadius="xl" boxShadow="md">
      <Heading as="h4" size="md" mb={2}>Comment contacter le support ?</Heading>
      <Text>Utilisez le module de chat en bas à droite ou envoyez un feedback via le bouton dédié.</Text>
    </Card>
  </Box>
);

export default FAQ;
