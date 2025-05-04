import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box, Heading, Input, Button, useToast, Stack
} from '@chakra-ui/react';

const Profile = ({ showNotification }) => {
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const user = JSON.parse(atob(token.split('.')[1]));
      setForm({ name: user.name || '', email: user.email || '', phone: user.phone || '' });
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.put('/api/users/profile', form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast({ title: 'Profil mis à jour !', status: 'success', duration: 3000, isClosable: true });
    } catch (err) {
      toast({ title: 'Erreur lors de la mise à jour', status: 'error', duration: 3000, isClosable: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxW="md" mx="auto" bg="white" p={8} borderRadius="xl" boxShadow="md" mt={10}>
      <Heading as="h2" size="lg" mb={6} color="blue.600">Mon profil</Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <Input name="name" type="text" placeholder="Nom" value={form.name} onChange={handleChange} required />
          <Input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <Input name="phone" type="tel" placeholder="Téléphone" value={form.phone} onChange={handleChange} />
          <Button type="submit" colorScheme="blue" isLoading={loading} loadingText="Mise à jour...">Mettre à jour</Button>
        </Stack>
      </form>
    </Box>
  );
};

export default Profile;
