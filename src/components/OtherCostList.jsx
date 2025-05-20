import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateOtherCost, deleteOtherCost } from '../redux/otherCostsSlice';
import { Table, Thead, Tbody, Tr, Th, Td, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, NumberInput, NumberInputField, useDisclosure } from '@chakra-ui/react';

const OtherCostList = () => {
  const otherCosts = useSelector((state) => state.otherCosts.otherCosts);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editCost, setEditCost] = useState(null);

  const handleEdit = (cost) => {
    setEditCost(cost);
    onOpen();
  };

  const handleUpdate = () => {
    if (!editCost.description || editCost.amount <= 0) return;
    dispatch(updateOtherCost({ userId: user.uid, id: editCost.id, description: editCost.description, amount: Number(editCost.amount) }));
    onClose();
  };

  const handleDelete = (id) => {
    dispatch(deleteOtherCost({ userId: user.uid, id }));
  };

  return (
    <>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Description</Th>
            <Th>Amount ($)</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {otherCosts.map((cost) => (
            <Tr key={cost.id}>
              <Td>{cost.description}</Td>
              <Td>{cost.amount}</Td>
              <Td>
                <Button size="sm" colorScheme="blue" onClick={() => handleEdit(cost)}>Edit</Button>
                <Button size="sm" colorScheme="red" ml={2} onClick={() => handleDelete(cost.id)}>Delete</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Other Cost</ModalHeader>
          <ModalBody>
            <Input
              value={editCost?.description || ''}
              onChange={(e) => setEditCost({ ...editCost, description: e.target.value })}
              mb={4}
            />
            <NumberInput>
              <NumberInputField
                value={editCost?.amount || ''}
                onChange={(e) => setEditCost({ ...editCost, amount: e.target.value })}
              />
            </NumberInput>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleUpdate}>Save</Button>
            <Button ml={2} onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default OtherCostList;