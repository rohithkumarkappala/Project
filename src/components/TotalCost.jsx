// src/components/TotalCost.jsx
import { useSelector } from 'react-redux';
import { Stat, StatLabel, StatNumber } from '@chakra-ui/react';

const TotalCost = () => {
  const totalCost = useSelector((state) =>
    state.items.items.reduce((sum, item) => sum + item.cost, 0) +
    state.otherCosts.otherCosts.reduce((sum, cost) => sum + cost.amount, 0)
  );

  return (
    <Stat>
      <StatLabel>Total Project Cost</StatLabel>
      <StatNumber>${totalCost.toFixed(2)}</StatNumber>
    </Stat>
  );
};

export default TotalCost;