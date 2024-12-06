"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { Check, X, Shuffle, ArrowLeftRight } from "lucide-react";

interface GridItem {
  id: string;
  content: string;
  position: number;
  gridId: number;
}

interface ItemProps {
  item: GridItem;
  onDragStart?: (e: React.DragEvent<HTMLDivElement>, item: GridItem) => void;
  onDragOver?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop?: (e: React.DragEvent<HTMLDivElement>, targetItem: GridItem) => void;
  isDragged: boolean;
  isSelectable: boolean;
}

const Item: React.FC<ItemProps> = ({
  item,
  onDragStart,
  onDragOver,
  onDrop,
  isDragged,
  isSelectable
}) => {
  return (
    <div
      draggable={isSelectable}
      onDragStart={(e) => onDragStart?.(e, item)}
      onDragOver={(e) => onDragOver?.(e)}
      onDrop={(e) => onDrop?.(e, item)}
      className={`bg-white dark:bg-gray-800 p-4 shadow text-center text-gray-600 dark:text-gray-300 w-[100px] h-[100px] border-2 transition-all duration-200 
        ${isSelectable ? "cursor-move hover:shadow-lg hover:border-blue-500" : "cursor-not-allowed"} 
        ${isDragged ? "border-blue-500 opacity-50" : "border-black"}
        ${!isSelectable ? "opacity-75" : ""}`}
    >
      {item.content}
    </div>
  );
};

const FormRow: React.FC<{
  items: GridItem[];
  rowStart: number;
  gridId: number;
  onDragStart?: (e: React.DragEvent<HTMLDivElement>, item: GridItem) => void;
  onDragOver?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop?: (e: React.DragEvent<HTMLDivElement>, targetItem: GridItem) => void;
  draggedItem: GridItem | null;
  isSelectable: boolean;
}> = ({ items, rowStart, gridId, onDragStart, onDragOver, onDrop, draggedItem, isSelectable }) => {
  return (
    <div className="flex w-80 sm:max-w-150 mb-1">
      {[0, 1, 2].map((offset) => {
        const position = rowStart + offset;
        const item = items.find((i) => i.position === position && i.gridId === gridId);
        
        return (
          <div key={`${gridId}-${position}`} className="w-1/3">
            {item && (
              <Item
                item={item}
                onDragStart={onDragStart}
                onDragOver={onDragOver}
                onDrop={onDrop}
                isDragged={draggedItem?.id === item.id}
                isSelectable={isSelectable}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

const NestedGrid: React.FC<{
  gridId: number;
  items: GridItem[];
  draggedItem: GridItem | null;
  onDragStart?: (e: React.DragEvent<HTMLDivElement>, item: GridItem) => void;
  onDragOver?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop?: (e: React.DragEvent<HTMLDivElement>, targetItem: GridItem) => void;
  onShuffle?: () => void;
  isSelectable: boolean;
}> = ({ gridId, items, draggedItem, onDragStart, onDragOver, onDrop, onShuffle, isSelectable }) => {
  const gridItems = items.filter(item => item.gridId === gridId);
  
  return (
    <div className="flex-grow p-4 flex flex-col items-center gap-4">
      <div className="flex flex-col gap-1">
        {[0, 3, 6].map((rowStart) => (
          <FormRow
            key={`${gridId}-${rowStart}`}
            items={gridItems}
            rowStart={rowStart}
            gridId={gridId}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDrop={onDrop}
            draggedItem={draggedItem}
            isSelectable={isSelectable}
          />
        ))}
      </div>
      <Button 
        onClick={onShuffle}
        variant="outline"
        className="flex gap-2 items-center"
        disabled={!isSelectable}
      >
        <Shuffle className="w-4 h-4" />
        Shuffle Grid {gridId}
      </Button>
    </div>
  );
};

const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export default function Home() {
  const [items, setItems] = useState<GridItem[]>([]);
  const [draggedItem, setDraggedItem] = useState<GridItem | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [leftGridActive, setLeftGridActive] = useState<boolean>(false);

  useEffect(() => {
    const grid1Items = Array.from({ length: 9 }, (_, i) => ({
      id: `item-1-${i + 1}`,
      content: `Item ${i + 1}`,
      position: i,
      gridId: 1,
    }));

    const grid2Items = Array.from({ length: 9 }, (_, i) => ({
      id: `item-2-${i + 1}`,
      content: `Item ${i + 1}`,
      position: i,
      gridId: 2,
    }));

    setItems([...grid1Items, ...grid2Items]);
  }, []);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, item: GridItem) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(item));
    setDraggedItem(item);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetItem: GridItem) => {
    e.preventDefault();
    const sourceItemData = e.dataTransfer.getData('text/plain');
    
    if (!sourceItemData) return;
    
    const sourceItem: GridItem = JSON.parse(sourceItemData);
    if (sourceItem.id === targetItem.id) return;

    // Only allow swaps within the same grid
    if (sourceItem.gridId !== targetItem.gridId) return;

    setItems((prevItems) => {
      const newItems = [...prevItems];
      const sourceIndex = newItems.findIndex((item) => item.id === sourceItem.id);
      const targetIndex = newItems.findIndex((item) => item.id === targetItem.id);

      if (sourceIndex !== -1 && targetIndex !== -1) {
        const sourcePosition = newItems[sourceIndex].position;
        newItems[sourceIndex] = {
          ...newItems[sourceIndex],
          position: newItems[targetIndex].position,
        };
        newItems[targetIndex] = {
          ...newItems[targetIndex],
          position: sourcePosition,
        };
      }

      return newItems;
    });

    setDraggedItem(null);
    setIsCorrect(null);
  };

  const handleShuffle = (gridId: number) => {
    setItems((prevItems: GridItem[]) => {
      const gridItems = prevItems.filter(item => item.gridId === gridId);
      const otherItems = prevItems.filter(item => item.gridId !== gridId);
      
      const shuffledPositions = shuffleArray([...Array(9).keys()]);
      const newGridItems = gridItems.map((item, index) => ({
        ...item,
        position: shuffledPositions[index],
      }));
      
      return [...newGridItems, ...otherItems];
    });
    setIsCorrect(null);
  };

  const switchGrids = () => {
    handleShuffle(1);
    handleShuffle(2);
    setLeftGridActive(!leftGridActive);
    setIsCorrect(null);
  };

  const verifyPattern = () => {
    const grid1Items = items.filter(item => item.gridId === 1);
    const grid2Items = items.filter(item => item.gridId === 2);
    
    if (leftGridActive) {
      // Check if grid1 matches grid2's pattern
      const isMatch = grid1Items.every(grid1Item => {
        const matchingGrid2Item = grid2Items.find(
          grid2Item => grid2Item.content === grid1Item.content
        );
        return matchingGrid2Item && 
               matchingGrid2Item.position === grid1Item.position;
      });
      setIsCorrect(isMatch);
    } else {
      // Check if grid2 matches grid1's pattern
      const isMatch = grid2Items.every(grid2Item => {
        const matchingGrid1Item = grid1Items.find(
          grid1Item => grid1Item.content === grid2Item.content
        );
        return matchingGrid1Item && 
               matchingGrid1Item.position === grid2Item.position;
      });
      setIsCorrect(isMatch);
    }
  };

  useEffect(() => {
    if (!leftGridActive) {
      setItems(prevItems => {
        const grid1Items = prevItems
          .filter((item: GridItem) => item.gridId === 1)
          .map((item: GridItem, index: number) => ({ ...item, position: index }));
        const otherItems = prevItems.filter(item => item.gridId !== 1);
        return [...grid1Items, ...otherItems];
      });
    } else {
      setItems(prevItems => {
        const grid2Items = prevItems
          .filter((item: GridItem) => item.gridId === 2)
          .map((item, index) => ({ ...item, position: index }));
        const otherItems = prevItems.filter(item => item.gridId !== 2);
        return [...grid2Items, ...otherItems];
      });
    }
  }, [leftGridActive]);

  const FeedbackMessage = () => {
    if (isCorrect === null) return null;
    
    return (
      <div className={`flex items-center gap-2 p-4 rounded-lg ${
        isCorrect 
          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" 
          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
      }`}>
        {isCorrect ? (
          <Check className="h-5 w-5" />
        ) : (
          <X className="h-5 w-5" />
        )}
        <span>
          {isCorrect ? "Pattern matches! Well done!" : "Pattern doesn't match yet. Keep trying!"}
        </span>
      </div>
    );
  };

  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)] p-4">
      <div className="max-w-[1120px] mx-auto">
        <div className="flex flex-col items-center gap-8 pt-16 pb-16">
          <img
            className="dark:invert"
            src="/api/placeholder/180/38"
            alt="Next.js logo"
            width={180}
            height={38}
          />

              <div className="mt-6 flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <NestedGrid
                    gridId={1}
                    items={items}
                    draggedItem={leftGridActive ? draggedItem : null}
                    onDragStart={leftGridActive ? handleDragStart : undefined}
                    onDragOver={leftGridActive ? handleDragOver : undefined}
                    onDrop={leftGridActive ? handleDrop : undefined}
                    onShuffle={() => handleShuffle(1)}
                    isSelectable={leftGridActive}
                  />
                  <NestedGrid
                    gridId={2}
                    items={items}
                    draggedItem={!leftGridActive ? draggedItem : null}
                    onDragStart={!leftGridActive ? handleDragStart : undefined}
                    onDragOver={!leftGridActive ? handleDragOver : undefined}
                    onDrop={!leftGridActive ? handleDrop : undefined}
                    onShuffle={() => handleShuffle(2)}
                    isSelectable={!leftGridActive}
                  />
                </div>
                <div className="flex flex-col gap-4 items-center">
                  <div className="flex gap-4">
                    <Button onClick={switchGrids} variant="outline" className="flex gap-2 items-center">
                      <ArrowLeftRight className="w-4 h-4" />
                      Switch Active Grid
                    </Button>
                    <Button onClick={verifyPattern} className="px-8">
                      Check Pattern
                    </Button>
                  </div>
                  <FeedbackMessage />
                </div>
              </div>
        </div>
      </div>
    </div>
  );
}
