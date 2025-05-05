import React, { useEffect, useState } from 'react';
import { getTransactions, getTrips } from '../api/api';
import { Line, Pie } from 'react-chartjs-2';
import * as XLSX from 'xlsx';
import {
  Box, Heading, Flex, Button, Card, useToast
} from '@chakra-ui/react';

const Reports = ({ showNotification }) => {
  const [transactions, setTransactions] = useState([]);
  const [trips, setTrips] = useState([]);
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const transactionsData = await getTransactions();
        const tripsData = await getTrips();
        setTransactions(transactionsData.data);
        setTrips(tripsData.data);
      } catch (error) {
        toast({ title: 'Erreur lors du chargement des rapports.', status: 'error', duration: 3000, isClosable: true });
      }
    };
    fetchData();
  }, [toast]);

  const handleExportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(transactions);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Transactions');
    XLSX.writeFile(wb, 'transactions_report.xlsx');
    toast({ title: 'Export Excel généré.', status: 'success', duration: 3000, isClosable: true });
  };

  const monthlyIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, transaction) => {
      const month = new Date(transaction.date).toLocaleString('default', { month: 'long' });
      acc[month] = (acc[month] || 0) + transaction.amount;
      return acc;
    }, {});

  const incomeData = {
    labels: Object.keys(monthlyIncome),
    datasets: [
      {
        label: 'Revenus mensuels',
        data: Object.values(monthlyIncome),
        borderColor: '#FFD700',
        backgroundColor: 'rgba(255, 215, 0, 0.3)',
        fill: true,
      },
    ],
  };

  const tripRoutes = trips.reduce((acc, trip) => {
    acc[trip.routeName] = (acc[trip.routeName] || 0) + 1;
    return acc;
  }, {});

  const routeData = {
    labels: Object.keys(tripRoutes),
    datasets: [
      {
        data: Object.values(tripRoutes),
        backgroundColor: ['#FFD700', '#FF8C00', '#8B0000'],
      },
    ],
  };

  return (
    <Box maxW="5xl" mx="auto" py={10} minH="100vh">
      <Heading as="h2" size="xl" mb={8} color="blue.600">Rapports et Analytique</Heading>
      <Card p={6} borderRadius="xl" boxShadow="md" mb={8}>
        <Flex gap={4} mb={4}>
          <Button colorScheme="blue" onClick={handleExportExcel}>Exporter Excel</Button>
        </Flex>
        <Box mb={8}>
          <Heading as="h3" size="md" mb={2} color="blue.600">Revenus Mensuels</Heading>
          <Line data={incomeData} />
        </Box>
        <Box>
          <Heading as="h3" size="md" mb={2} color="blue.600">Répartition des Trajets par Route</Heading>
          <Pie data={routeData} />
        </Box>
      </Card>
    </Box>
  );
};

export default Reports;
