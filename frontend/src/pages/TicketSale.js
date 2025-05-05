import React, { useState, useEffect } from 'react';
import { createTicket, getTrips } from '../api/api';
import { QRCodeCanvas } from 'qrcode.react';
import {
  Box, Heading, Flex, Text, Button, Input, Select, Card, useToast, SimpleGrid
} from '@chakra-ui/react';

const MAX_ROWS = 11;
const MAX_COLUMNS = 3;
const SEATS_PER_ROW = MAX_COLUMNS * 2;

const TicketSale = ({ showNotification }) => {
  const [ticketData, setTicketData] = useState({
    passengerName: '',
    tripId: '',
    seatNumber: '',
    price: '',
  });
  const [qrCode, setQrCode] = useState(null);
  const [trips, setTrips] = useState([]);
  const [occupiedSeats, setOccupiedSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [isPaid, setIsPaid] = useState(false);
  const [paying, setPaying] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await getTrips();
        setTrips(response.data);
      } catch (error) {
        toast({ title: 'Erreur lors de la récupération des trajets', status: 'error', duration: 3000, isClosable: true });
      }
    };
    fetchTrips();
  }, [toast]);

  const handleTripSelection = (e) => {
    const selectedTripId = e.target.value;
    setTicketData((prev) => ({ ...prev, tripId: selectedTripId }));
    const occupiedSeats = [1, 5, 12, 20, 25];
    setOccupiedSeats(occupiedSeats);
    setSelectedSeat(null);
    setTicketData((prev) => ({ ...prev, seatNumber: '' }));
  };

  const handleSeatClick = (seatNumber) => {
    if (!occupiedSeats.includes(seatNumber)) {
      setSelectedSeat(seatNumber);
      setTicketData((prev) => ({ ...prev, seatNumber }));
    }
  };

  const handleCreateTicket = async () => {
    if (!ticketData.passengerName || !ticketData.tripId || !ticketData.seatNumber || !ticketData.price) {
      toast({ title: 'Veuillez remplir tous les champs.', status: 'warning', duration: 3000, isClosable: true });
      return;
    }
    try {
      const response = await createTicket(ticketData);
      setQrCode(response.data.qrCode);
      toast({ title: 'Billet créé avec succès!', status: 'success', duration: 3000, isClosable: true });
    } catch (error) {
      toast({ title: 'Erreur lors de la création du billet.', status: 'error', duration: 3000, isClosable: true });
    }
  };

  const handleDownloadTicket = () => {
    if (qrCode) {
      const canvas = document.querySelector('canvas');
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `ticket-${ticketData.passengerName}.png`;
      link.click();
      toast({ title: 'Billet téléchargé.', status: 'success', duration: 3000, isClosable: true });
    }
  };

  const handleMockPayment = async () => {
    setPaying(true);
    setTimeout(() => {
      setIsPaid(true);
      setPaying(false);
      toast({ title: 'Paiement réussi ! Vous pouvez générer votre billet.', status: 'success', duration: 3000, isClosable: true });
    }, 1500);
  };

  // Nouvelle fonction pour afficher un bus stylisé avec allée centrale, conducteur, légende
  const renderBusLayout = () => {
    const rows = [];
    // Première rangée : conducteur
    rows.push(
      <Flex key="driver" justify="center" align="center" mb={2}>
        <Box w="40px" h="40px" bg="yellow.400" borderRadius="full" display="flex" alignItems="center" justifyContent="center" fontWeight="bold" fontSize="lg" boxShadow="md">
          🧑‍✈️
        </Box>
        <Text ml={2} fontSize="sm">Conducteur</Text>
      </Flex>
    );
    // Sièges passagers
    for (let row = 1; row <= MAX_ROWS; row++) {
      const leftSeats = [];
      const rightSeats = [];
      for (let col = 1; col <= MAX_COLUMNS; col++) {
        const seatNumberLeft = (row - 1) * SEATS_PER_ROW + col;
        const seatNumberRight = (row - 1) * SEATS_PER_ROW + MAX_COLUMNS + col;
        // Left side
        leftSeats.push(
          <Button
            key={seatNumberLeft}
            size="sm"
            colorScheme={occupiedSeats.includes(seatNumberLeft) ? 'red' : selectedSeat === seatNumberLeft ? 'blue' : 'green'}
            variant={selectedSeat === seatNumberLeft ? 'solid' : 'outline'}
            isDisabled={occupiedSeats.includes(seatNumberLeft)}
            onClick={() => handleSeatClick(seatNumberLeft)}
            m={0.5}
            minW="38px"
            title={`Siège ${seatNumberLeft}`}
          >
            {seatNumberLeft}
          </Button>
        );
        // Right side
        rightSeats.push(
          <Button
            key={seatNumberRight}
            size="sm"
            colorScheme={occupiedSeats.includes(seatNumberRight) ? 'red' : selectedSeat === seatNumberRight ? 'blue' : 'green'}
            variant={selectedSeat === seatNumberRight ? 'solid' : 'outline'}
            isDisabled={occupiedSeats.includes(seatNumberRight)}
            onClick={() => handleSeatClick(seatNumberRight)}
            m={0.5}
            minW="38px"
            title={`Siège ${seatNumberRight}`}
          >
            {seatNumberRight}
          </Button>
        );
      }
      rows.push(
        <Flex key={row} justify="center" align="center" mb={1}>
          <Flex>{leftSeats}</Flex>
          <Box w="32px" /> {/* Allée centrale */}
          <Flex>{rightSeats}</Flex>
        </Flex>
      );
    }
    return rows;
  };

  return (
    <Box maxW="4xl" mx="auto" py={10} minH="100vh">
      <Heading as="h2" size="xl" mb={8} color="blue.600" textAlign="center">Vente de Billets</Heading>
      <Card p={6} borderRadius="xl" boxShadow="md" mb={8}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} mb={4}>
          <Box>
            <Text fontWeight="semibold" mb={1}>Nom du Passager :</Text>
            <Input
              name="passengerName"
              placeholder="Nom du passager"
              value={ticketData.passengerName}
              onChange={(e) => setTicketData((prev) => ({ ...prev, passengerName: e.target.value }))}
            />
          </Box>
          <Box>
            <Text fontWeight="semibold" mb={1}>Trajet :</Text>
            <Select
              name="tripId"
              value={ticketData.tripId}
              onChange={handleTripSelection}
            >
              <option value="">Sélectionnez un trajet</option>
              {trips.map((trip) => (
                <option key={trip.id} value={trip.id}>
                  {trip.routeName} ({trip.departure} - {trip.arrival})
                </option>
              ))}
            </Select>
          </Box>
          <Box>
            <Text fontWeight="semibold" mb={1}>Prix :</Text>
            <Input
              type="number"
              name="price"
              placeholder="Prix"
              value={ticketData.price}
              onChange={(e) => setTicketData((prev) => ({ ...prev, price: e.target.value }))}
            />
          </Box>
        </SimpleGrid>
        <Box mt={6}>
          <Text fontWeight="semibold" mb={2}>Sélectionnez votre siège :</Text>
          <Box bg="gray.50" borderRadius="md" p={3}>
            {renderBusLayout()}
            <Flex mt={4} gap={4} align="center" justify="center">
              <Flex align="center"><Box w="18px" h="18px" bg="green.400" borderRadius="sm" mr={1} /> <Text fontSize="sm">Libre</Text></Flex>
              <Flex align="center"><Box w="18px" h="18px" bg="red.400" borderRadius="sm" mr={1} /> <Text fontSize="sm">Occupé</Text></Flex>
              <Flex align="center"><Box w="18px" h="18px" bg="blue.400" borderRadius="sm" mr={1} /> <Text fontSize="sm">Votre choix</Text></Flex>
            </Flex>
          </Box>
        </Box>
        <Flex gap={4} mt={6} flexWrap="wrap">
          <Button colorScheme="orange" onClick={handleMockPayment} isLoading={paying} isDisabled={isPaid || !ticketData.passengerName || !ticketData.tripId || !ticketData.seatNumber || !ticketData.price}>
            {isPaid ? 'Paiement effectué' : 'Payer en ligne'}
          </Button>
          <Button colorScheme="blue" onClick={handleCreateTicket} isDisabled={!isPaid}>
            Générer le Billet
          </Button>
        </Flex>
        {qrCode && (
          <Box textAlign="center" mt={8}>
            <Text fontWeight="semibold" mb={2}>QR Code :</Text>
            <QRCodeCanvas value={qrCode} />
            <Button colorScheme="green" mt={4} onClick={handleDownloadTicket}>
              Télécharger le Billet
            </Button>
          </Box>
        )}
      </Card>
    </Box>
  );
};

export default TicketSale;
