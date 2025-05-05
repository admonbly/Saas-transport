// frontend/src/pages/Search.js
import React, { useState } from 'react';
import {
  Box, Heading, Input, Button, Card, Stack, useToast
} from '@chakra-ui/react';

const Search = ({ showNotification }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const toast = useToast();

  const handleSearch = (e) => {
    e.preventDefault();
    toast({ title: `Recherche pour : ${searchTerm}`, status: 'info', duration: 3000, isClosable: true });
  };

  return (
    <Box maxW="lg" mx="auto" py={10} minH="60vh">
      <Heading as="h1" size="xl" mb={8} color="blue.600">Recherche de Trajets</Heading>
      <Card p={6} borderRadius="xl" boxShadow="md">
        <form onSubmit={handleSearch}>
          <Stack direction={{ base: 'column', md: 'row' }} spacing={4} align="end">
            <Input
              type="text"
              placeholder="Entrez un terme de recherche"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button type="submit" colorScheme="blue">Rechercher</Button>
          </Stack>
        </form>
      </Card>
    </Box>
  );
};

export default Search;
