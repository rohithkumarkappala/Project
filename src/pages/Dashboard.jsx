// src/pages/Dashboard.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems } from '../redux/itemsSlice';
import { fetchOtherCosts } from '../redux/otherCostsSlice';
import { Button, VStack, HStack, Heading } from '@chakra-ui/react';
import ItemForm from '../components/ItemForm';
import ItemList from '../components/ItemList';
import OtherCostForm from '../components/OtherCostForm';
import OtherCostList from '../components/OtherCostList';
import TotalCost from '../components/TotalCost';
import { logout } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { Grid, GridItem } from '@chakra-ui/react';

const Dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      dispatch(fetchItems(user.uid));
      dispatch(fetchOtherCosts(user.uid));
    }
  }, [user, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    // <VStack spacing={6} p={8}>
    //   <HStack w="full" justify="space-between">
    //     <Heading>Project Cost Tracker</Heading>
    //     <Button colorScheme="red" onClick={handleLogout}>Logout</Button>
    //   </HStack>
    //   <ItemForm />
    //   <ItemList />
    //   <OtherCostForm />
    //   <OtherCostList />
    //   <TotalCost />
    // </VStack>
    <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6} p={8}>
      <GridItem>
        <ItemForm />
        <ItemList />
      </GridItem>
      <GridItem>
        <OtherCostForm />
        <OtherCostList />
      </GridItem>
      <GridItem colSpan={{ base: 1, md: 2 }}>
        <TotalCost />
      </GridItem>
    </Grid>
  );
};

export default Dashboard;