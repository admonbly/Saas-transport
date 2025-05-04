import React, { useEffect, useState } from 'react';
import { getTransactions, downloadFinancialReport } from '../api/api';
import { Bar, Line } from 'react-chartjs-2';
import * as XLSX from 'xlsx';
import {
  Box, Heading, Flex, Text, Button, Table, Thead, Tbody, Tr, Th, Td, Card, useToast
} from '@chakra-ui/react';

const Financials = ({ showNotification }) => {
  const [transactions, setTransactions] = useState([]);
  const [projection, setProjection] = useState(null);
  const toast = useToast();

  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await getTransactions();
      setTransactions(response.data);
    };
    fetchTransactions();
  }, []);

  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  useEffect(() => {
    const calculateProjection = () => {
      const averageIncome = totalIncome / Math.max(1, transactions.filter((t) => t.type === 'income').length);
      const averageExpenses = totalExpenses / Math.max(1, transactions.filter((t) => t.type === 'expense').length);
      const projectedBalance = totalIncome - totalExpenses + (averageIncome - averageExpenses);
      setProjection(projectedBalance.toFixed(2));
    };
    if (transactions.length > 0) {
      calculateProjection();
    }
  }, [transactions, totalIncome, totalExpenses]);

  const handleDownloadReport = async () => {
    await downloadFinancialReport();
    toast({ title: 'Rapport financier téléchargé.', status: 'success', duration: 3000, isClosable: true });
  };

  const handleExportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(transactions);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Transactions');
    XLSX.writeFile(wb, 'financials_report.xlsx');
    toast({ title: 'Export Excel généré.', status: 'success', duration: 3000, isClosable: true });
  };

  const data = {
    labels: ['Revenus', 'Dépenses'],
    datasets: [
      {
        label: 'Finances',
        data: [totalIncome, totalExpenses],
        backgroundColor: ['#4CAF50', '#FF5733'],
      },
    ],
  };

  const projectionData = {
    labels: ['Balance actuelle', 'Projection'],
    datasets: [
      {
        label: 'Projection budgétaire',
        data: [totalIncome - totalExpenses, projection],
        borderColor: ['#2196F3'],
        backgroundColor: 'rgba(33, 150, 243, 0.5)',
        fill: true,
      },
    ],
  };

  return (
    <Box maxW="6xl" mx="auto" py={10} minH="100vh">
      <Heading as="h2" size="xl" mb={8} color="blue.600">Statistiques Financières</Heading>
      <Flex gap={8} mb={8} wrap="wrap">
        <Card p={6} borderRadius="xl" boxShadow="md" flex="1 1 300px">
          <Text fontSize="2xl" fontWeight="bold" color="green.600">{totalIncome} €</Text>
          <Text>Revenus totaux</Text>
        </Card>
        <Card p={6} borderRadius="xl" boxShadow="md" flex="1 1 300px">
          <Text fontSize="2xl" fontWeight="bold" color="red.500">{totalExpenses} €</Text>
          <Text>Dépenses totales</Text>
        </Card>
        <Card p={6} borderRadius="xl" boxShadow="md" flex="1 1 300px">
          <Text fontSize="2xl" fontWeight="bold" color="blue.600">{projection} €</Text>
          <Text>Projection budgétaire</Text>
        </Card>
      </Flex>
      <Card p={6} borderRadius="xl" boxShadow="md" mb={8}>
        <Heading as="h3" size="md" mb={4} color="blue.600">Répartition des Finances</Heading>
        <Bar data={data} />
      </Card>
      <Card p={6} borderRadius="xl" boxShadow="md" mb={8}>
        <Heading as="h3" size="md" mb={4} color="blue.600">Projection Budgétaire</Heading>
        <Line data={projectionData} />
      </Card>
      <Flex gap={4} mb={8} wrap="wrap">
        <Button colorScheme="blue" onClick={handleDownloadReport}>Télécharger le rapport financier</Button>
        <Button colorScheme="blue" onClick={handleExportExcel}>Exporter Excel</Button>
      </Flex>
      <Card p={6} borderRadius="xl" boxShadow="md">
        <Heading as="h3" size="md" mb={4} color="blue.600">Liste des Transactions</Heading>
        <Box overflowX="auto">
          <Table variant="simple">
            <Thead bg="gray.100">
              <Tr>
                <Th>Type</Th>
                <Th>Description</Th>
                <Th>Montant</Th>
                <Th>Date</Th>
              </Tr>
            </Thead>
            <Tbody>
              {transactions.map((transaction) => (
                <Tr key={transaction.id} _hover={{ bg: 'gray.50' }}>
                  <Td>{transaction.type}</Td>
                  <Td>{transaction.description}</Td>
                  <Td>{transaction.amount} €</Td>
                  <Td>{new Date(transaction.date).toLocaleDateString()}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Card>
    </Box>
  );
};

export default Financials;
