import { useState, useEffect } from 'react';
import { EventoReminder, RemindersStorage } from '../types';

const REMINDERS_STORAGE_KEY = 'event-reminders';

// Helper function to load reminders from localStorage
const loadRemindersFromStorage = (): RemindersStorage => {
  try {
    const stored = localStorage.getItem(REMINDERS_STORAGE_KEY);
    if (stored) {
      const parsedReminders = JSON.parse(stored);
      // Clean up past reminders
      const now = new Date();
      const validReminders: RemindersStorage = {};
      
      Object.entries(parsedReminders).forEach(([eventoId, reminder]) => {
        const reminderDate = new Date((reminder as EventoReminder).reminderDate);
        if (reminderDate >= now) {
          validReminders[parseInt(eventoId)] = reminder as EventoReminder;
        }
      });
      
      return validReminders;
    }
  } catch (error) {
    console.error('Error loading reminders:', error);
  }
  return {};
};

export function useReminders() {
  // Initialize state with data from localStorage immediately
  const [reminders, setReminders] = useState<RemindersStorage>(() => loadRemindersFromStorage());

  // Save reminders to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(REMINDERS_STORAGE_KEY, JSON.stringify(reminders));
    } catch (error) {
      console.error('Error saving reminders:', error);
    }
  }, [reminders]);

  // Listen for storage changes from other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === REMINDERS_STORAGE_KEY) {
        setReminders(loadRemindersFromStorage());
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const addReminder = (eventoId: number, reminderDate: Date): void => {
    const reminder: EventoReminder = {
      eventoId,
      reminderDate: reminderDate.toISOString(),
      createdAt: new Date().toISOString()
    };

    setReminders(prev => ({
      ...prev,
      [eventoId]: reminder
    }));
  };

  const removeReminder = (eventoId: number): void => {
    setReminders(prev => {
      const newReminders = { ...prev };
      delete newReminders[eventoId];
      return newReminders;
    });
  };

  const hasReminder = (eventoId: number): boolean => {
    return eventoId in reminders;
  };

  const getReminder = (eventoId: number): EventoReminder | null => {
    return reminders[eventoId] || null;
  };

  const getAllReminders = (): EventoReminder[] => {
    return Object.values(reminders);
  };

  return {
    addReminder,
    removeReminder,
    hasReminder,
    getReminder,
    getAllReminders
  };
}