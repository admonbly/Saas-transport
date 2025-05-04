import React, { useState, useEffect } from 'react';
import { getUsers, addUser, updateUser, deleteUser } from '../api/api';
import {
  Box, Heading, Flex, Table, Thead, Tbody, Tr, Th, Td, Select, Input, Button, Card, useToast
} from '@chakra-ui/react';

const Admin = ({ showNotification }) => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', role: '' });
  const toast = useToast();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUsers(response.data);
      } catch (error) {
        toast({ title: 'Erreur lors de la récupération des utilisateurs', status: 'error', duration: 3000, isClosable: true });
      }
    };
    fetchUsers();
  }, [toast]);

  const handleAddUser = async () => {
    if (newUser.name && newUser.role) {
      try {
        const addedUser = await addUser(newUser);
        setUsers([...users, addedUser.data]);
        setNewUser({ name: '', role: '' });
        toast({ title: 'Utilisateur ajouté avec succès !', status: 'success', duration: 3000, isClosable: true });
      } catch (error) {
        toast({ title: "Erreur lors de l'ajout de l'utilisateur", status: 'error', duration: 3000, isClosable: true });
      }
    } else {
      toast({ title: 'Veuillez remplir tous les champs.', status: 'warning', duration: 3000, isClosable: true });
    }
  };

  const handleUpdateUserRole = async (userId, role) => {
    try {
      await updateUser(userId, { role });
      setUsers(users.map((user) => (user.id === userId ? { ...user, role } : user)));
      toast({ title: 'Rôle mis à jour', status: 'success', duration: 3000, isClosable: true });
    } catch (error) {
      toast({ title: 'Erreur lors de la mise à jour du rôle', status: 'error', duration: 3000, isClosable: true });
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers(users.filter((user) => user.id !== userId));
      toast({ title: 'Utilisateur supprimé.', status: 'success', duration: 3000, isClosable: true });
    } catch (error) {
      toast({ title: 'Erreur lors de la suppression', status: 'error', duration: 3000, isClosable: true });
    }
  };

  return (
    <Box maxW="5xl" mx="auto" py={10} minH="100vh">
      <Heading as="h2" size="xl" mb={8} color="blue.600">Gestion des Utilisateurs</Heading>
      <Card p={6} borderRadius="xl" boxShadow="md" mb={8}>
        <Box overflowX="auto">
          <Table variant="simple">
            <Thead bg="gray.100">
              <Tr>
                <Th>Nom</Th>
                <Th>Rôle</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user) => (
                <Tr key={user.id} _hover={{ bg: 'gray.50' }}>
                  <Td>{user.name}</Td>
                  <Td>
                    <Select
                      value={user.role}
                      onChange={(e) => handleUpdateUserRole(user.id, e.target.value)}
                      size="sm"
                      w="120px"
                    >
                      <option value="Admin">Admin</option>
                      <option value="Driver">Driver</option>
                      <option value="User">User</option>
                    </Select>
                  </Td>
                  <Td>
                    <Button colorScheme="red" size="sm" onClick={() => handleDeleteUser(user.id)}>
                      Supprimer
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Card>
      <Card p={6} borderRadius="xl" boxShadow="md">
        <Heading as="h3" size="md" mb={4} color="blue.600">Ajouter un Utilisateur</Heading>
        <Flex gap={4} wrap="wrap" mb={4}>
          <Input
            placeholder="Nom"
            value={newUser.name}
            onChange={e => setNewUser({ ...newUser, name: e.target.value })}
            maxW="220px"
          />
          <Select
            placeholder="Rôle"
            value={newUser.role}
            onChange={e => setNewUser({ ...newUser, role: e.target.value })}
            maxW="180px"
          >
            <option value="Admin">Admin</option>
            <option value="Driver">Driver</option>
            <option value="User">User</option>
          </Select>
          <Button colorScheme="blue" onClick={handleAddUser}>Ajouter</Button>
        </Flex>
      </Card>
    </Box>
  );
};

export default Admin;
