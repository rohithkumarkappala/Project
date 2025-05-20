// src/components/ItemForm.jsx
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../redux/itemsSlice';
import { FormControl, FormLabel, Input, NumberInput, NumberInputField, Button, VStack, useToast } from '@chakra-ui/react';

const ItemForm = () => {
  const [name, setName] = useState('');
  const [cost, setCost] = useState('');
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const toast = useToast();

  const handleSubmit = () => {
    if (!name || cost <= 0) {
      toast({ title: 'Invalid input', description: 'Name and positive cost required', status: 'error', duration: 3000 });
      return;
    }
    dispatch(addItem({ userId: user.uid, name, cost: Number(cost) }));
    setName('');
    setCost('');
    toast({ title: 'Item added', status: 'success', duration: 3000 });
  };

  return (
    <VStack spacing={4} w="full" maxW="400px">
      <FormControl>
        <FormLabel>Item Name</FormLabel>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </FormControl>
      <FormControl>
        <FormLabel>Cost ($)</FormLabel>
        <NumberInput>
          <NumberInputField value={cost} onChange={(e) => setCost(e.target.value)} />
        </NumberInput>
      </FormControl>
      <Button colorScheme="blue" onClick={handleSubmit}>Add Item</Button>
    </VStack>
  );
};

export default ItemForm;