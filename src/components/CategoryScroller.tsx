import React, { useRef } from 'react';
import { categories } from '../data/categories';
import CategoryIcon from './CategoryIcon';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface CategoryScrollerProps {
  selectedCategories: number[];
  onSelectCategory: (categoryId: number) => void;
}

const CategoryScroller: React.FC<CategoryScrollerProps> = ({ 
  selectedCategories, 
  onSelectCategory 
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 200;
      current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative py-4">
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10">
        <motion.button 
          className="bg-white rounded-full p-1 shadow-md text-gray-700"
          whileTap={{ scale: 0.9 }}
          onClick={() => scroll('left')}
        >
          <ChevronLeft size={24} />
        </motion.button>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto hide-scrollbar py-2 px-8 snap-x snap-mandatory"
      >
        {categories.map((category) => (
          <div key={category.id} className="snap-start">
            <CategoryIcon 
              category={category} 
              isSelected={selectedCategories.includes(category.id)}
              onClick={onSelectCategory}
            />
          </div>
        ))}
      </div>
      
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10">
        <motion.button 
          className="bg-white rounded-full p-1 shadow-md text-gray-700"
          whileTap={{ scale: 0.9 }}
          onClick={() => scroll('right')}
        >
          <ChevronRight size={24} />
        </motion.button>
      </div>
    </div>
  );
};

export default CategoryScroller;