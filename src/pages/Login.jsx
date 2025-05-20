// src/pages/Login.jsx
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';
import { FormControl, FormLabel, Input, Button, VStack, useToast, Heading } from '@chakra-ui/react';

import { Link,useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await dispatch(login({ email, password })).unwrap();
      toast({ title: 'Login successful', status: 'success', duration: 3000 });
      navigate('/');
    } catch (error) {
      toast({ title: 'Login failed', description: error, status: 'error', duration: 3000 });
    }
  };

  return (
    <VStack spacing={4} p={8} maxW="400px" mx="auto">
      <Heading>Login</Heading>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
      </FormControl>
      <Button colorScheme="blue" onClick={handleLogin}>Login</Button>
      <Link to="/signup">Don't have an account? Sign up</Link>
    </VStack>
  );
};

export default Login;