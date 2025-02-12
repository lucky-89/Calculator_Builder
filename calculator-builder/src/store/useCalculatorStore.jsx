// src/store/useCalculatorStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const MAX_HISTORY_SIZE = 10; // Limit history to the last 10 states

const useCalculatorStore = create(
  persist(
    (set, get) => ({
      // State
      components: [], // Stores all components (buttons, display)
      layout: [], // Stores the order of components in the layout
      calculation: '', // Stores the current calculation input
      result: '', // Stores the result of the calculation
      theme: 'light', // Tracks the current theme (light/dark)
      history: [], // Stores past states for undo functionality
      future: [], // Stores future states for redo functionality

      // Actions
      // Add a component to the layout
      addComponent: (component) =>
        set((state) => {
          const newState = {
            components: [...state.components, component],
            layout: [...state.layout, component.id],
          };
          return {
            ...newState,
            history: [...state.history.slice(-MAX_HISTORY_SIZE + 1), state], // Limit history size
            future: [], // Clear future states
          };
        }),

      // Remove a component from the layout
      removeComponent: (id) =>
        set((state) => {
          const newState = {
            components: state.components.filter((comp) => comp.id !== id),
            layout: state.layout.filter((compId) => compId !== id),
          };
          return {
            ...newState,
            history: [...state.history.slice(-MAX_HISTORY_SIZE + 1), state], // Limit history size
            future: [], // Clear future states
          };
        }),

      // Update the calculation input
      updateCalculation: (value) =>
        set((state) => ({
          calculation: state.calculation + value,
        })),

      // Calculate the result
      calculateResult: () =>
        set((state) => {
          try {
            const result = eval(state.calculation); // Use eval for simplicity
            return { result };
          } catch (error) {
            return { result: 'Error' };
          }
        }),

      // Clear the calculation and result
      clearCalculation: () =>
        set(() => ({
          calculation: '',
          result: '',
        })),

      // Toggle between light and dark themes
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),

      // Undo functionality
      undo: () =>
        set((state) => {
          if (state.history.length === 0) return state; // No history to undo
          const previousState = state.history[state.history.length - 1]; // Get the last state
          return {
            ...previousState,
            history: state.history.slice(0, -1), // Remove the last state from history
            future: [state, ...state.future.slice(0, MAX_HISTORY_SIZE - 1)], // Limit future size
          };
        }),

      // Redo functionality
      redo: () =>
        set((state) => {
          if (state.future.length === 0) return state; // No future to redo
          const nextState = state.future[0]; // Get the next state
          return {
            ...nextState,
            history: [...state.history.slice(-MAX_HISTORY_SIZE + 1), state], // Limit history size
            future: state.future.slice(1), // Remove the next state from future
          };
        }),
    }),
    {
      name: 'calculator-storage', // Local storage key
      partialize: (state) => ({
        components: state.components,
        layout: state.layout,
        theme: state.theme,
      }), // Only store essential data in localStorage
    }
  )
);

export default useCalculatorStore;