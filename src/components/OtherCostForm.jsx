import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addOtherCost } from '../redux/otherCostsSlice';
import { FormControl, FormLabel, Input, NumberInput, NumberInputField, Button, VStack, useToast } from '@chakra-ui/react';

const OtherCostForm = () => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const toast = useToast();

  const handleSubmit = () => {
    if (!description || amount <= 0) {
      toast({ title: 'Invalid input', description: 'Description and positive amount required', status: 'error', duration: 3000 });
      return;
    }
    dispatch(addOtherCost({ userId: user.uid, description, amount: Number(amount) }));
    setDescription('');
    setAmount('');
    toast({ title: 'Other cost added', status: 'success', duration: 3000 });
  };

  return (
    <VStack spacing={4} w="full" maxW="400px">
      <FormControl>
        <FormLabel>Description</FormLabel>
        <Input value={description} onChange={(e) => setDescription(e.target.value)} />
      </FormControl>
      <FormControl>
        <FormLabel>Amount ($)</FormLabel>
        <NumberInput>
          <NumberInputField value={amount} onChange={(e) => setAmount(e.target.value)} />
        </NumberInput>
      </FormControl>
      <Button colorScheme="blue" onClick={handleSubmit}>Add Other Cost</Button>
    </VStack>
  );
};

export default OtherCostForm;