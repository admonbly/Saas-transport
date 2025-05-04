import React, { useState } from 'react';
import axios from 'axios';
import {
  Box, Heading, Input, Button, useToast, Stack
} from '@chakra-ui/react';

const Register = ({ showNotification }) => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/api/auth/register', form);
      toast({ title: 'Inscription réussie, vous pouvez vous connecter.', status: 'success', duration: 3000, isClosable: true });
      setForm({ name: '', email: '', phone: '', password: '' });
    } catch (err) {
      toast({ title: err.response?.data?.message || "Erreur lors de l'inscription", status: 'error', duration: 3000, isClosable: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxW="md" mx="auto" bg="white" p={8} borderRadius="xl" boxShadow="md" mt={10}>
      <Heading as="h2" size="lg" mb={6} color="blue.600">Créer un compte</Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <Input name="name" type="text" placeholder="Nom" value={form.name} onChange={handleChange} required />
          <Input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <Input name="phone" type="tel" placeholder="Téléphone (optionnel)" value={form.phone} onChange={handleChange} />
          <Input name="password" type="password" placeholder="Mot de passe" value={form.password} onChange={handleChange} required />
          <Button type="submit" colorScheme="blue" isLoading={loading} loadingText="Inscription...">S'inscrire</Button>
        </Stack>
      </form>
    </Box>
  );
};

export default Register;
