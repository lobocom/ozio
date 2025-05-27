import React from 'react';
import { Category } from '../types';
import { getCategoryIcon } from '../data/categories';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface CategoryIconProps {
  category: Category;
  isSelected: boolean;
  onClick: (categoryId: number) => void;
}

const CategoryIcon: React.FC<CategoryIconProps> = ({ category, isSelected, onClick }) => {
  const Icon = getCategoryIcon(category.icon);
  
  return (
    <motion.div 
      className="flex flex-col items-center mx-2 min-w-[80px]"
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick(category.id)}
    >
      <motion.div 
        className={clsx(
          "w-16 h-16 rounded-full flex items-center justify-center mb-2",
          isSelected ? "ring-2 ring-offset-2" : "opacity-80"
        )}
        style={{ 
          backgroundColor: isSelected ? category.color : '#d1d5db', 
          color: isSelected ? 'white' : '#4b5563',
          //ringColor: isSelected ? category.color : 'transparent'
        }}
      >
        <Icon size={24} />
      </motion.div>
      <span 
        className={clsx(
          "text-xs font-medium text-center",
          isSelected ? "text-gray-900" : "text-gray-600"
        )}
      >
        {category.tituloEs}
      </span>
    </motion.div>
  );
};

export default CategoryIcon;