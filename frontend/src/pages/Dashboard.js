import React, { useEffect, useState } from 'react';
import { getStats } from '../api/api';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import '../App.css';
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
  DoughnutController,
  BarController,
  PointElement,
  LineElement,
} from 'chart.js';
import {
  Box,
  Heading,
  Flex,
  SimpleGrid,
  Card,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Button,
  Select,
  useToast,
  Tooltip as ChakraTooltip,
  Spinner,
} from '@chakra-ui/react';
import { RepeatIcon } from '@chakra-ui/icons';

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
  DoughnutController,
  BarController,
  PointElement,
  LineElement
);

const Dashboard = ({ showNotification }) => {
  const [stats, setStats] = useState(null);
  const [revenueData, setRevenueData] = useState(null);
  const [tripOccupancyData, setTripOccupancyData] = useState(null);
  const [kpi, setKpi] = useState({});
  const [period, setPeriod] = useState('mois');
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const response = await getStats({ period });
        const data = response.data;
        setStats(data);
        setKpi({
          tauxOccupation: data.tauxOccupation || 0,
          reservationsJour: data.reservationsJour || 0,
          reservationsMois: data.reservationsMois || 0,
          incidentsOuverts: data.incidentsOuverts || 0,
          incidentsResolus: data.incidentsResolus || 0,
          satisfaction: data.satisfaction || 0,
          ticketsVendus: data.ticketsVendus || 0,
          fidelisation: data.fidelisation || 0,
        });
        setRevenueData({
          labels: ['Revenus', 'Dépenses'],
          datasets: [
            {
              label: 'Finances',
              data: [data.totalRevenue || 0, data.totalExpenses || 0],
              backgroundColor: ['#22c55e', '#ef4444'],
            },
          ],
        });
        setTripOccupancyData({
          labels: data.topRoutes.map((route) => route.name),
          datasets: [
            {
              label: "Taux d'occupation",
              data: data.topRoutes.map((route) => route.occupancy),
              backgroundColor: ['#2563eb', '#f59e42', '#1e293b', '#a3e635', '#fbbf24'],
            },
          ],
        });
      } catch (error) {
        toast({ title: 'Erreur lors de la récupération des statistiques.', status: 'error', duration: 3000, isClosable: true });
      }
      setLoading(false);
    };
    fetchStats();
  }, [period, toast]);

  if (loading || !stats) {
    return <Flex justify="center" align="center" minH="60vh"><Spinner size="xl" /></Flex>;
  }

  const evolutionData = {
    labels: stats.evolutionLabels || ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'],
    datasets: [
      {
        label: 'Revenus',
        data: stats.evolutionRevenus || [1200, 1500, 1800, 2000, 1700, 2100, 2300, 2200, 2000, 2500, 2700, 3000],
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37,99,235,0.2)',
        fill: true,
      },
    ],
  };

  return (
    <Box maxW="7xl" mx="auto" py={8} minH="100vh">
      <Flex align="center" justify="space-between" mb={6} gap={4} wrap="wrap">
        <Heading as="h2" size="xl" color="blue.600">Tableau de Bord</Heading>
        <Flex gap={2} align="center">
          <Select value={period} onChange={e => setPeriod(e.target.value)} w="120px" size="sm">
            <option value="jour">Jour</option>
            <option value="semaine">Semaine</option>
            <option value="mois">Mois</option>
            <option value="annee">Année</option>
          </Select>
          <ChakraTooltip label="Rafraîchir les données">
            <Button onClick={() => window.location.reload()} leftIcon={<RepeatIcon />} size="sm" colorScheme="blue" variant="outline">Rafraîchir</Button>
          </ChakraTooltip>
        </Flex>
      </Flex>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
        <Card p={4} borderRadius="xl" boxShadow="md" align="center">
          <Stat>
            <StatLabel>Nombre de trajets</StatLabel>
            <StatNumber color="blue.600">{stats.tripCount}</StatNumber>
            <StatHelpText>Sur la période</StatHelpText>
          </Stat>
        </Card>
        <Card p={4} borderRadius="xl" boxShadow="md" align="center">
          <Stat>
            <StatLabel>Nombre de véhicules</StatLabel>
            <StatNumber color="blue.600">{stats.vehicleCount}</StatNumber>
            <StatHelpText>Flotte totale</StatHelpText>
          </Stat>
        </Card>
        <Card p={4} borderRadius="xl" boxShadow="md" align="center">
          <Stat>
            <StatLabel>Revenus Totaux</StatLabel>
            <StatNumber color="green.500">{stats.totalRevenue} €</StatNumber>
            <StatHelpText>Sur la période</StatHelpText>
          </Stat>
        </Card>
        <Card p={4} borderRadius="xl" boxShadow="md" align="center">
          <Stat>
            <StatLabel>Réservations en attente</StatLabel>
            <StatNumber color="orange.400">{stats.pendingBookings}</StatNumber>
            <StatHelpText>À traiter</StatHelpText>
          </Stat>
        </Card>
        <Card p={4} borderRadius="xl" boxShadow="md" align="center">
          <Stat>
            <StatLabel>Taux d'occupation moyen</StatLabel>
            <StatNumber color="purple.500">{kpi.tauxOccupation}%</StatNumber>
            <StatHelpText>Période : {period}</StatHelpText>
          </Stat>
        </Card>
        <Card p={4} borderRadius="xl" boxShadow="md" align="center">
          <Stat>
            <StatLabel>Réservations du jour</StatLabel>
            <StatNumber color="blue.400">{kpi.reservationsJour}</StatNumber>
            <StatHelpText>Aujourd'hui</StatHelpText>
          </Stat>
        </Card>
        <Card p={4} borderRadius="xl" boxShadow="md" align="center">
          <Stat>
            <StatLabel>Incidents ouverts</StatLabel>
            <StatNumber color="red.500">{kpi.incidentsOuverts}</StatNumber>
            <StatHelpText>En cours</StatHelpText>
          </Stat>
        </Card>
        <Card p={4} borderRadius="xl" boxShadow="md" align="center">
          <Stat>
            <StatLabel>Incidents résolus</StatLabel>
            <StatNumber color="green.400">{kpi.incidentsResolus}</StatNumber>
            <StatHelpText>Sur la période</StatHelpText>
          </Stat>
        </Card>
        <Card p={4} borderRadius="xl" boxShadow="md" align="center">
          <Stat>
            <StatLabel>Taux de satisfaction</StatLabel>
            <StatNumber color="teal.500">{kpi.satisfaction} / 5</StatNumber>
            <StatHelpText>Note moyenne</StatHelpText>
          </Stat>
        </Card>
        <Card p={4} borderRadius="xl" boxShadow="md" align="center">
          <Stat>
            <StatLabel>Tickets vendus</StatLabel>
            <StatNumber color="blue.700">{kpi.ticketsVendus}</StatNumber>
            <StatHelpText>Sur la période</StatHelpText>
          </Stat>
        </Card>
        <Card p={4} borderRadius="xl" boxShadow="md" align="center">
          <Stat>
            <StatLabel>Taux de fidélisation</StatLabel>
            <StatNumber color="pink.500">{kpi.fidelisation}%</StatNumber>
            <StatHelpText>Clients récurrents</StatHelpText>
          </Stat>
        </Card>
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} mb={8}>
        <Card p={6} borderRadius="xl" boxShadow="md">
          <Heading as="h3" size="md" mb={4} color="blue.600">Répartition des Finances</Heading>
          {revenueData && <Doughnut data={revenueData} />}
        </Card>
        <Card p={6} borderRadius="xl" boxShadow="md">
          <Heading as="h3" size="md" mb={4} color="blue.600">Taux d'Occupation des Routes</Heading>
          {tripOccupancyData && <Bar data={tripOccupancyData} />}
        </Card>
      </SimpleGrid>
      <Card p={6} borderRadius="xl" boxShadow="md" mb={8}>
        <Heading as="h3" size="md" mb={4} color="blue.600">Évolution des Revenus</Heading>
        <Line data={evolutionData} />
      </Card>
    </Box>
  );
};

export default Dashboard;
