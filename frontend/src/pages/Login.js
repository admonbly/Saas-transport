import React, { useState } from 'react';
import axios from 'axios';
import {
  Box, Heading, Input, Button, useToast, Stack
} from '@chakra-ui/react';

const Login = ({ showNotification }) => {
  const [form, setForm] = useState({ emailOrPhone: '', password: '' });
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = form.emailOrPhone.includes('@')
        ? { email: form.emailOrPhone, password: form.password }
        : { phone: form.emailOrPhone, password: form.password };
      const res = await axios.post('/api/auth/login', payload);
      localStorage.setItem('token', res.data.token);
      toast({ title: 'Connexion réussie !', status: 'success', duration: 3000, isClosable: true });
      window.location.href = '/dashboard';
    } catch (err) {
      toast({ title: err.response?.data?.message || 'Erreur lors de la connexion', status: 'error', duration: 3000, isClosable: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxW="md" mx="auto" bg="white" p={8} borderRadius="xl" boxShadow="md" mt={10}>
      <Heading as="h2" size="lg" mb={6} color="blue.600">Connexion</Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <Input
            name="emailOrPhone"
            type="text"
            placeholder="Email ou Téléphone"
            value={form.emailOrPhone}
            onChange={handleChange}
            required
          />
          <Input
            name="password"
            type="password"
            placeholder="Mot de passe"
            value={form.password}
            onChange={handleChange}
            required
          />
          <Button type="submit" colorScheme="blue" isLoading={loading} loadingText="Connexion...">Se connecter</Button>
        </Stack>
      </form>
    </Box>
  );
};

export default Login;
