import React from 'react';
import { Bell, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

interface BottomTabsProps {
  onNotifyClick: () => void;
  onPublishClick: () => void;
}

const BottomTabs: React.FC<BottomTabsProps> = ({ onNotifyClick, onPublishClick }) => {
  return (
    <div className="bg-white border-t border-gray-200 flex h-16 items-center">
      <motion.button
        className="flex-1 flex flex-col items-center justify-center h-full"
        whileTap={{ scale: 0.95 }}
        onClick={onPublishClick}
      >
        <Calendar size={20} className="text-gray-600" />
        <span className="text-xs mt-1 text-gray-600">Publicar un Evento</span>
      </motion.button>
      
      <motion.button
        className="flex-1 flex flex-col items-center justify-center h-full bg-indigo-600 text-white"
        whileTap={{ scale: 0.95 }}
        onClick={onNotifyClick}
      >
        <Bell size={20} />
        <span className="text-xs mt-1 font-medium">Avísame</span>
      </motion.button>
    </div>
  );
};

export default BottomTabs;