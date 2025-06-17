import { useState, useEffect } from 'react';
import { EventoReminder, RemindersStorage } from '../types';

const REMINDERS_STORAGE_KEY = 'evento-reminders';

export function useReminders() {
  const [reminders, setReminders] = useState<RemindersStorage>({});

  // Load reminders from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(REMINDERS_STORAGE_KEY);
      if (stored) {
        const parsedReminders = JSON.parse(stored);
        // Clean up past reminders
        const now = new Date();
        const validReminders: RemindersStorage = {};
        
        Object.entries(parsedReminders).forEach(([eventId, reminder]) => {
          const reminderDate = new Date((reminder as EventoReminder).reminderDate);
          if (reminderDate >= now) {
            validReminders[parseInt(eventId)] = reminder as EventoReminder;
          }
        });
        
        setReminders(validReminders);
        // Update localStorage with cleaned reminders
        localStorage.setItem(REMINDERS_STORAGE_KEY, JSON.stringify(validReminders));
      }
    } catch (error) {
      console.error('Error loading reminders:', error);
    }
  }, []);

  // Save reminders to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(REMINDERS_STORAGE_KEY, JSON.stringify(reminders));
    } catch (error) {
      console.error('Error saving reminders:', error);
    }
  }, [reminders]);

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

  const removeReminder = (eventId: number): void => {
    setReminders(prev => {
      const newReminders = { ...prev };
      delete newReminders[eventId];
      return newReminders;
    });
  };

  const hasReminder = (eventId: number): boolean => {
    return eventId in reminders;
  };

  const getReminder = (eventId: number): EventoReminder | null => {
    return reminders[eventId] || null;
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