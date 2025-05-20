import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export const addOtherCost = createAsyncThunk('otherCosts/addOtherCost', async ({ userId, description, amount }) => {
  const docRef = await addDoc(collection(db, 'users', userId, 'otherCosts'), { description, amount });
  return { id: docRef.id, description, amount };
});

export const updateOtherCost = createAsyncThunk('otherCosts/updateOtherCost', async ({ userId, id, description, amount }) => {
  const costRef = doc(db, 'users', userId, 'otherCosts', id);
  await updateDoc(costRef, { description, amount });
  return { id, description, amount };
});

export const deleteOtherCost = createAsyncThunk('otherCosts/deleteOtherCost', async ({ userId, id }) => {
  await deleteDoc(doc(db, 'users', userId, 'otherCosts', id));
  return id;
});

export const fetchOtherCosts = createAsyncThunk('otherCosts/fetchOtherCosts', async (userId, { dispatch }) => {
  const costsRef = collection(db, 'users', userId, 'otherCosts');
  onSnapshot(costsRef, (snapshot) => {
    const otherCosts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    dispatch(setOtherCosts(otherCosts));
  });
});

const otherCostsSlice = createSlice({
  name: 'otherCosts',
  initialState: { otherCosts: [], loading: false },
  reducers: {
    setOtherCosts(state, action) {
      state.otherCosts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addOtherCost.fulfilled, (state, action) => {
        state.otherCosts.push(action.payload);
      })
      .addCase(updateOtherCost.fulfilled, (state, action) => {
        const index = state.otherCosts.findIndex((cost) => cost.id === action.payload.id);
        state.otherCosts[index] = action.payload;
      })
      .addCase(deleteOtherCost.fulfilled, (state, action) => {
        state.otherCosts = state.otherCosts.filter((cost) => cost.id !== action.payload);
      });
  },
});

export const { setOtherCosts } = otherCostsSlice.actions;
export default otherCostsSlice.reducer;