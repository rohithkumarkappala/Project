// src/components/ItemList.jsx
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateItem, deleteItem } from '../redux/itemsSlice';
import { Table, Thead, Tbody, Tr, Th, Td, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, NumberInput, NumberInputField, useDisclosure } from '@chakra-ui/react';
import { HStack } from '@chakra-ui/react';
const ItemList = () => {
    const [sortBy, setSortBy] = useState('name');
    const items = useSelector((state) => state.items.items);
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [editItem, setEditItem] = useState(null);


    const handleEdit = (item) => {
        setEditItem(item);
        onOpen();
    };

    const handleUpdate = () => {
        if (!editItem.name || editItem.cost <= 0) return;
        dispatch(updateItem({ userId: user.uid, id: editItem.id, name: editItem.name, cost: Number(editItem.cost) }));
        onClose();
    };

    const handleDelete = (id) => {
        dispatch(deleteItem({ userId: user.uid, id }));
    };

    const sortedItems = [...items].sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return a.cost - b.cost;
    });

    return (
        <>
            <HStack mb={4}>
                <Button onClick={() => setSortBy('name')}>Sort by Name</Button>
                <Button onClick={() => setSortBy('cost')}>Sort by Cost</Button>
            </HStack>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>Name</Th>
                        <Th>Cost ($)</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {sortedItems.map((item) => (
                        <Tr key={item.id}>
                            <Td>{item.name}</Td>
                            <Td>{item.cost}</Td>
                            <Td>
                                <Button size="sm" colorScheme="blue" onClick={() => handleEdit(item)}>Edit</Button>
                                <Button size="sm" colorScheme="red" ml={2} onClick={() => handleDelete(item.id)}>Delete</Button>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Item</ModalHeader>
                    <ModalBody>
                        <Input
                            value={editItem?.name || ''}
                            onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
                            mb={4}
                        />
                        <NumberInput>
                            <NumberInputField
                                value={editItem?.cost || ''}
                                onChange={(e) => setEditItem({ ...editItem, cost: e.target.value })}
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

export default ItemList;