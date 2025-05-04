import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box, Heading, Flex, Table, Thead, Tbody, Tr, Th, Td, Select, Spinner, useToast, Card
} from '@chakra-ui/react';

const Incidents = ({ showNotification }) => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/incidents', { headers: { Authorization: `Bearer ${token}` } });
        setIncidents(res.data);
      } catch {}
      setLoading(false);
    };
    fetchIncidents();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/incidents/${id}/status`, { status }, { headers: { Authorization: `Bearer ${token}` } });
      setIncidents(incidents.map(i => i._id === id ? { ...i, status } : i));
      toast({ title: 'Statut mis à jour', status: 'success', duration: 3000, isClosable: true });
    } catch (err) {
      toast({ title: 'Erreur lors de la mise à jour', status: 'error', duration: 3000, isClosable: true });
    }
  };

  if (loading) return <Flex justify="center" align="center" minH="60vh"><Spinner size="xl" /></Flex>;

  return (
    <Box maxW="6xl" mx="auto" py={10} minH="100vh">
      <Heading as="h2" size="xl" mb={8} color="blue.600">Suivi des Incidents</Heading>
      <Card p={6} borderRadius="xl" boxShadow="md">
        <Box overflowX="auto">
          <Table variant="simple">
            <Thead bg="gray.100">
              <Tr>
                <Th>Utilisateur</Th>
                <Th>Trajet</Th>
                <Th>Description</Th>
                <Th>Statut</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {incidents.map(i => (
                <Tr key={i._id} _hover={{ bg: 'gray.50' }}>
                  <Td>{i.user?.name || '-'}</Td>
                  <Td>{i.trip?.routeName || '-'}</Td>
                  <Td>{i.description}</Td>
                  <Td>{i.status}</Td>
                  <Td>
                    <Select
                      value={i.status}
                      onChange={e => handleStatusChange(i._id, e.target.value)}
                      size="sm"
                      w="120px"
                    >
                      <option value="Nouveau">Nouveau</option>
                      <option value="En cours">En cours</option>
                      <option value="Résolu">Résolu</option>
                    </Select>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Card>
    </Box>
  );
};

export default Incidents;
