import React, { useEffect, useState } from 'react';
import { getFleet, addVehicle } from '../api/api';
import { Bar } from 'react-chartjs-2';
import {
  Box, Heading, Flex, Text, Button, Input, Select, Table, Thead, Tbody, Tr, Th, Td, Card, useToast, SimpleGrid
} from '@chakra-ui/react';
import { DownloadIcon, CheckCircleIcon, WarningIcon } from '@chakra-ui/icons';

const FleetManagement = ({ showNotification }) => {
  const [fleet, setFleet] = useState([]);
  const [newVehicle, setNewVehicle] = useState({
    registrationNumber: '',
    model: '',
    type: '',
  });
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const toast = useToast();

  useEffect(() => {
    const fetchFleet = async () => {
      const response = await getFleet();
      setFleet(response.data);
    };
    fetchFleet();
  }, []);

  const getStatus = (vehicle) => {
    if (vehicle.status) return vehicle.status;
    return vehicle._id && vehicle._id.endsWith('0') ? 'maintenance' : 'service';
  };

  const filteredFleet = fleet.filter(v =>
    (!filterType || v.type === filterType) &&
    (!filterStatus || getStatus(v) === filterStatus)
  );

  const totalService = fleet.filter(v => getStatus(v) === 'service').length;
  const totalMaintenance = fleet.filter(v => getStatus(v) === 'maintenance').length;

  const vehicleTypes = fleet.reduce((acc, vehicle) => {
    acc[vehicle.type] = (acc[vehicle.type] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(vehicleTypes),
    datasets: [
      {
        label: 'Nombre de véhicules',
        data: Object.values(vehicleTypes),
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
      },
    ],
  };

  const handleAddVehicle = async () => {
    if (
      newVehicle.registrationNumber &&
      newVehicle.model &&
      newVehicle.type
    ) {
      const response = await addVehicle(newVehicle);
      setFleet([...fleet, response.data]);
      setNewVehicle({ registrationNumber: '', model: '', type: '' });
      toast({ title: 'Véhicule ajouté avec succès !', status: 'success', duration: 3000, isClosable: true });
    } else {
      toast({ title: 'Veuillez remplir tous les champs.', status: 'warning', duration: 3000, isClosable: true });
    }
  };

  const handleExportCSV = () => {
    const csv = [
      ['Immatriculation', 'Modèle', 'Type', 'Statut'],
      ...filteredFleet.map(v => [v.registrationNumber, v.model, v.type, getStatus(v)])
    ].map(row => row.join(';')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'flotte.csv';
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: 'Export CSV généré.', status: 'success', duration: 3000, isClosable: true });
  };

  return (
    <Box maxW="7xl" mx="auto" py={10} minH="100vh">
      <Flex align="center" gap={4} mb={8}>
        <CheckCircleIcon boxSize={10} color="blue.500" />
        <Box>
          <Heading as="h2" size="xl" color="blue.600">Gestion de la Flotte</Heading>
          <Text fontSize="md" color="gray.500" fontWeight="medium">
            Suivi, ajout, export et analyse de tous vos véhicules en temps réel
          </Text>
        </Box>
      </Flex>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={8}>
        <Card p={4} borderRadius="xl" boxShadow="md" align="center">
          <Text fontSize="2xl" fontWeight="bold" color="blue.600">{fleet.length}</Text>
          <Text>Véhicules enregistrés</Text>
        </Card>
        <Card p={4} borderRadius="xl" boxShadow="md" align="center">
          <Text fontSize="2xl" fontWeight="bold" color="green.500">{totalService}</Text>
          <Text>En service</Text>
        </Card>
        <Card p={4} borderRadius="xl" boxShadow="md" align="center">
          <Text fontSize="2xl" fontWeight="bold" color="orange.400">{totalMaintenance}</Text>
          <Text>En maintenance</Text>
        </Card>
      </SimpleGrid>
      <Card p={6} borderRadius="xl" boxShadow="md" mb={8}>
        <Flex gap={4} mb={4} wrap="wrap" align="center">
          <Select placeholder="Filtrer par type" value={filterType} onChange={e => setFilterType(e.target.value)} maxW="180px">
            <option value="Bus">Bus</option>
            <option value="Van">Van</option>
            <option value="Minibus">Minibus</option>
          </Select>
          <Select placeholder="Filtrer par statut" value={filterStatus} onChange={e => setFilterStatus(e.target.value)} maxW="180px">
            <option value="service">En service</option>
            <option value="maintenance">En maintenance</option>
          </Select>
          <Button leftIcon={<DownloadIcon />} colorScheme="blue" variant="outline" onClick={handleExportCSV}>Exporter CSV</Button>
        </Flex>
        <Box overflowX="auto">
          <Table variant="simple">
            <Thead bg="gray.100">
              <Tr>
                <Th>Immatriculation</Th>
                <Th>Modèle</Th>
                <Th>Type</Th>
                <Th>Statut</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredFleet.map((vehicle) => (
                <Tr key={vehicle._id} _hover={{ bg: 'gray.50' }}>
                  <Td>{vehicle.registrationNumber}</Td>
                  <Td>{vehicle.model}</Td>
                  <Td>{vehicle.type}</Td>
                  <Td>
                    {getStatus(vehicle) === 'service' ? (
                      <Flex align="center" gap={1}><CheckCircleIcon color="green.400" /> <Text color="green.600">En service</Text></Flex>
                    ) : (
                      <Flex align="center" gap={1}><WarningIcon color="orange.400" /> <Text color="orange.600">Maintenance</Text></Flex>
                    )}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Card>
      <Card p={6} borderRadius="xl" boxShadow="md" mb={8}>
        <Heading as="h3" size="md" mb={4} color="blue.600">Ajouter un Nouveau Véhicule</Heading>
        <Flex gap={4} wrap="wrap" mb={4}>
          <Input
            placeholder="Numéro d'immatriculation"
            value={newVehicle.registrationNumber}
            onChange={e => setNewVehicle({ ...newVehicle, registrationNumber: e.target.value })}
            maxW="220px"
          />
          <Input
            placeholder="Modèle"
            value={newVehicle.model}
            onChange={e => setNewVehicle({ ...newVehicle, model: e.target.value })}
            maxW="220px"
          />
          <Select
            placeholder="Type"
            value={newVehicle.type}
            onChange={e => setNewVehicle({ ...newVehicle, type: e.target.value })}
            maxW="180px"
          >
            <option value="Bus">Bus</option>
            <option value="Van">Van</option>
            <option value="Minibus">Minibus</option>
          </Select>
          <Button colorScheme="blue" onClick={handleAddVehicle}>Ajouter</Button>
        </Flex>
      </Card>
      <Card p={6} borderRadius="xl" boxShadow="md">
        <Heading as="h3" size="md" mb={4} color="blue.600">Répartition des Véhicules par Type</Heading>
        <Bar data={chartData} />
      </Card>
    </Box>
  );
};

export default FleetManagement;
