// src/pages/SignUp.jsx
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signup } from '../redux/authSlice';
import { FormControl, FormLabel, Input, Button, VStack, useToast, Heading } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const toast = useToast();

  const handleSignUp = async () => {
    try {
      await dispatch(signup({ email, password })).unwrap();
      toast({ title: 'Sign-up successful', status: 'success', duration: 3000 });
    } catch (error) {
      toast({ title: 'Sign-up failed', description: error, status: 'error', duration: 3000 });
    }
  };

  return (
    <VStack spacing={4} p={8} maxW="400px" mx="auto">
      <Heading>Sign Up</Heading>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
      </FormControl>
      <Button colorScheme="blue" onClick={handleSignUp}>Sign Up</Button>
      <Link to="/login">Already have an account? Login</Link>
    </VStack>
  );
};

export default SignUp;