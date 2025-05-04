import React, { useState, useEffect } from 'react';
import { getBookings, addBooking, cancelBooking } from '../api/api';
import axios from 'axios';
import * as XLSX from 'xlsx';
import {
  Box, Heading, Flex, Text, Button, Input, Table, Thead, Tbody, Tr, Th, Td, useToast, Stack, IconButton, Card
} from '@chakra-ui/react';
import { DeleteIcon, DownloadIcon } from '@chakra-ui/icons';

const Booking = ({ showNotification }) => {
  const [bookings, setBookings] = useState([]);
  const [newBooking, setNewBooking] = useState({ passengerName: '', tripId: '' });
  const [loyalty, setLoyalty] = useState(null);
  const [usePoints, setUsePoints] = useState(false);
  const [pointsToUse, setPointsToUse] = useState(0);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const toast = useToast();

  useEffect(() => {
    const fetchBookings = async () => {
      const response = await getBookings();
      setBookings(response.data);
    };
    fetchBookings();
  }, []);

  useEffect(() => {
    const fetchLoyalty = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/loyalty', { headers: { Authorization: `Bearer ${token}` } });
        setLoyalty(res.data);
      } catch {}
    };
    fetchLoyalty();
  }, []);

  const handleAddBooking = async () => {
    try {
      const response = await addBooking(newBooking);
      setBookings([...bookings, response.data]);
      setNewBooking({ passengerName: '', tripId: '' });
      toast({ title: 'Réservation effectuée avec succès !', status: 'success', duration: 3000, isClosable: true });
    } catch (error) {
      toast({ title: "Erreur lors de l'ajout de la réservation", status: 'error', duration: 3000, isClosable: true });
    }
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      await cancelBooking(bookingId);
      setBookings(bookings.filter((booking) => booking.id !== bookingId));
      toast({ title: 'Réservation annulée.', status: 'success', duration: 3000, isClosable: true });
    } catch (error) {
      toast({ title: "Erreur lors de l'annulation", status: 'error', duration: 3000, isClosable: true });
    }
  };

  const handleUsePoints = async (tripId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/loyalty/use', { points: pointsToUse, action: `Réduction réservation ${tripId}` }, { headers: { Authorization: `Bearer ${token}` } });
      setUsePoints(false);
      setPointsToUse(0);
      toast({ title: 'Points utilisés avec succès !', status: 'success', duration: 3000, isClosable: true });
      // Refresh loyalty
      const res = await axios.get('/api/loyalty', { headers: { Authorization: `Bearer ${token}` } });
      setLoyalty(res.data);
    } catch (err) {
      toast({ title: err.response?.data?.message || "Erreur lors de l'utilisation des points", status: 'error', duration: 3000, isClosable: true });
    }
  };

  const filteredBookings = bookings
    .filter(b =>
      b.passengerName.toLowerCase().includes(search.toLowerCase()) ||
      b.tripId.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortBy) return 0;
      const valA = a[sortBy]?.toString().toLowerCase() || '';
      const valB = b[sortBy]?.toString().toLowerCase() || '';
      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

  const handleSort = (col) => {
    if (sortBy === col) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(col);
      setSortOrder('asc');
    }
  };

  const handleExportCSV = () => {
    const ws = XLSX.utils.json_to_sheet(filteredBookings);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Réservations');
    XLSX.writeFile(wb, 'reservations.csv');
    toast({ title: 'Export CSV généré.', status: 'success', duration: 3000, isClosable: true });
  };

  return (
    <Box maxW="6xl" mx="auto" py={10} minH="100vh">
      <Heading as="h2" size="xl" mb={8} color="blue.600">Gestion des Réservations</Heading>
      {loyalty && (
        <Card mb={6} p={4} borderRadius="xl" boxShadow="md">
          <Flex align="center" gap={4} wrap="wrap">
            <Text fontSize="lg" color="blue.600" fontWeight="bold">Points de fidélité :</Text>
            <Text fontSize="xl" fontWeight="bold">{loyalty.points} points</Text>
            <Button colorScheme="green" onClick={() => setUsePoints((v) => !v)}>
              {usePoints ? 'Annuler' : 'Utiliser mes points'}
            </Button>
            {usePoints && (
              <Flex gap={2} align="center">
                <Input
                  type="number"
                  min={1}
                  max={loyalty.points}
                  value={pointsToUse}
                  onChange={e => setPointsToUse(Number(e.target.value))}
                  w="100px"
                  placeholder="Points à utiliser"
                />
                <Button colorScheme="blue" onClick={() => handleUsePoints('réservation')}>Valider</Button>
              </Flex>
            )}
          </Flex>
        </Card>
      )}
      <Flex gap={4} mb={6} align="end" wrap="wrap">
        <Input
          type="text"
          placeholder="Recherche par nom ou trajet..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          maxW="250px"
        />
        <Button leftIcon={<DownloadIcon />} colorScheme="blue" onClick={handleExportCSV}>Exporter CSV</Button>
      </Flex>
      <Box overflowX="auto" borderRadius="xl" boxShadow="md" bg="white">
        <Table variant="simple">
          <Thead bg="gray.100">
            <Tr>
              <Th cursor="pointer" onClick={() => handleSort('passengerName')}>Nom du Passager {sortBy === 'passengerName' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}</Th>
              <Th cursor="pointer" onClick={() => handleSort('tripId')}>ID du Trajet {sortBy === 'tripId' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredBookings.map((booking) => (
              <Tr key={booking.id} _hover={{ bg: 'gray.50' }}>
                <Td>{booking.passengerName}</Td>
                <Td>{booking.tripId}</Td>
                <Td>
                  <IconButton
                    icon={<DeleteIcon />}
                    colorScheme="red"
                    aria-label="Annuler la réservation"
                    onClick={() => handleCancelBooking(booking.id)}
                    size="sm"
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <Card mt={10} p={6} borderRadius="xl" boxShadow="md">
        <Heading as="h3" size="md" mb={4} color="blue.600">Ajouter une Réservation</Heading>
        <Stack direction={{ base: 'column', md: 'row' }} gap={4} align="end">
          <Input
            type="text"
            placeholder="Nom du Passager"
            value={newBooking.passengerName}
            onChange={(e) => setNewBooking({ ...newBooking, passengerName: e.target.value })}
          />
          <Input
            type="text"
            placeholder="ID du Trajet"
            value={newBooking.tripId}
            onChange={(e) => setNewBooking({ ...newBooking, tripId: e.target.value })}
          />
          <Button colorScheme="blue" onClick={handleAddBooking}>Réserver</Button>
        </Stack>
      </Card>
    </Box>
  );
};

export default Booking;
