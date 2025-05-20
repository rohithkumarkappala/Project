// src/redux/itemsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export const addItem = createAsyncThunk('items/addItem', async ({ userId, name, cost }) => {
  const docRef = await addDoc(collection(db, 'users', userId, 'items'), { name, cost });
  return { id: docRef.id, name, cost };
});

export const updateItem = createAsyncThunk('items/updateItem', async ({ userId, id, name, cost }) => {
  const itemRef = doc(db, 'users', userId, 'items', id);
  await updateDoc(itemRef, { name, cost });
  return { id, name, cost };
});

export const deleteItem = createAsyncThunk('items/deleteItem', async ({ userId, id }) => {
  await deleteDoc(doc(db, 'users', userId, 'items', id));
  return id;
});

export const fetchItems = createAsyncThunk('items/fetchItems', async (userId, { dispatch }) => {
  const itemsRef = collection(db, 'users', userId, 'items');
  onSnapshot(itemsRef, (snapshot) => {
    const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    dispatch(setItems(items));
  });
});

const itemsSlice = createSlice({
  name: 'items',
  initialState: { items: [], loading: false },
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        state.items[index] = action.payload;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export const { setItems } = itemsSlice.actions;
export default itemsSlice.reducer;