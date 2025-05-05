import React, { useEffect, useState } from 'react';
import { getTrips, addTrip } from '../api/api';
import axios from 'axios';
import {
  Box, Heading, Flex, Table, Thead, Tbody, Tr, Th, Td, Input, Button, Card, useToast, Stack, Text
} from '@chakra-ui/react';

const TripManagement = ({ showNotification }) => {
  const [trips, setTrips] = useState([]);
  const [newTrip, setNewTrip] = useState({ routeName: '', departure: '', arrival: '' });
  const [reviews, setReviews] = useState({});
  const [incidentForms, setIncidentForms] = useState({});
  const [incidents, setIncidents] = useState({});
  const toast = useToast();

  useEffect(() => {
    const fetchTrips = async () => {
      const response = await getTrips();
      setTrips(response.data);
    };
    fetchTrips();
  }, []);

  useEffect(() => {
    trips.forEach((trip) => {
      axios.get(`/api/review/trip/${trip.id}`).then(res => {
        setReviews(prev => ({ ...prev, [trip.id]: res.data }));
      });
    });
  }, [trips]);

  const fetchIncidents = async (tripId) => {
    try {
      const res = await axios.get(`/api/incidents?trip=${tripId}`);
      setIncidents((prev) => ({ ...prev, [tripId]: res.data }));
    } catch {}
  };

  useEffect(() => {
    trips.forEach((trip) => fetchIncidents(trip.id));
  }, [trips]);

  const handleIncidentChange = (tripId, value) => {
    setIncidentForms((prev) => ({ ...prev, [tripId]: value }));
  };

  const handleIncidentSubmit = async (tripId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/incidents', { trip: tripId, description: incidentForms[tripId] }, { headers: { Authorization: `Bearer ${token}` } });
      setIncidentForms((prev) => ({ ...prev, [tripId]: '' }));
      fetchIncidents(tripId);
      toast({ title: 'Incident signalé', status: 'success', duration: 3000, isClosable: true });
    } catch {
      toast({ title: 'Erreur lors du signalement', status: 'error', duration: 3000, isClosable: true });
    }
  };

  const handleAddTrip = async () => {
    await addTrip(newTrip);
    setTrips([...trips, newTrip]);
    setNewTrip({ routeName: '', departure: '', arrival: '' });
    toast({ title: 'Trajet ajouté avec succès !', status: 'success', duration: 3000, isClosable: true });
  };

  return (
    <Box maxW="6xl" mx="auto" py={10} minH="100vh">
      <Heading as="h2" size="xl" mb={8} color="blue.600">Gestion des Trajets</Heading>
      <Flex gap={8} mb={8} wrap="wrap">
        <Card p={6} borderRadius="xl" boxShadow="md" flex="1 1 300px">
          <Text fontSize="2xl" fontWeight="bold" color="blue.600">{trips.length}</Text>
          <Text>Nombre de trajets</Text>
        </Card>
      </Flex>
      <Card p={6} borderRadius="xl" boxShadow="md" mb={8}>
        <Box overflowX="auto">
          <Table variant="simple">
            <Thead bg="gray.100">
              <Tr>
                <Th>Nom du trajet</Th>
                <Th>Départ</Th>
                <Th>Arrivée</Th>
                <Th>Note moyenne</Th>
                <Th>Incidents</Th>
              </Tr>
            </Thead>
            <Tbody>
              {trips.map((trip) => {
                const avis = reviews[trip.id] || [];
                const moyenne = avis.length ? (avis.reduce((acc, r) => acc + r.rating, 0) / avis.length).toFixed(1) : '-';
                return (
                  <Tr key={trip.id} _hover={{ bg: 'gray.50' }}>
                    <Td>{trip.routeName}</Td>
                    <Td>{trip.departure}</Td>
                    <Td>{trip.arrival}</Td>
                    <Td>{moyenne !== '-' ? `${moyenne} ⭐` : '-'}</Td>
                    <Td>
                      <Stack spacing={1}>
                        <Input
                          size="sm"
                          placeholder="Signaler un incident..."
                          value={incidentForms[trip.id] || ''}
                          onChange={e => handleIncidentChange(trip.id, e.target.value)}
                        />
                        <Button colorScheme="red" size="sm" onClick={() => handleIncidentSubmit(trip.id)}>
                          Signaler
                        </Button>
                        <Box pl={2} fontSize="xs">
                          {(incidents[trip.id] || []).map(i => (
                            <Text key={i._id}>{i.description} <span>[{i.status}]</span></Text>
                          ))}
                        </Box>
                      </Stack>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </Box>
      </Card>
      <Card p={6} borderRadius="xl" boxShadow="md">
        <Heading as="h3" size="md" mb={4} color="blue.600">Ajouter un Trajet</Heading>
        <Flex gap={4} wrap="wrap" mb={4}>
          <Input
            placeholder="Nom du trajet"
            value={newTrip.routeName}
            onChange={(e) => setNewTrip({ ...newTrip, routeName: e.target.value })}
            maxW="220px"
          />
          <Input
            placeholder="Départ"
            value={newTrip.departure}
            onChange={(e) => setNewTrip({ ...newTrip, departure: e.target.value })}
            maxW="180px"
          />
          <Input
            placeholder="Arrivée"
            value={newTrip.arrival}
            onChange={(e) => setNewTrip({ ...newTrip, arrival: e.target.value })}
            maxW="180px"
          />
          <Button colorScheme="blue" onClick={handleAddTrip}>Ajouter</Button>
        </Flex>
      </Card>
    </Box>
  );
};

export default TripManagement;
