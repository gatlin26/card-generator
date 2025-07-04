import { useState, useCallback, useEffect } from 'react';
import { CardElement } from '@/hooks/use-card-editor';

interface ResizeHandlesProps {
  element: CardElement;
  isSelected: boolean;
  onUpdate: (updates: Partial<CardElement>) => void;
  zoom: number;
}

export function ResizeHandles({ element, isSelected, onUpdate, zoom }: ResizeHandlesProps) {
  const [isResizing, setIsResizing] = useState(false);

  const position = element.style.position || { x: 0, y: 0 };
  const size = element.style.size || { width: 200, height: 50 };

  // 清理事件监听器
  useEffect(() => {
    return () => {
      // 组件卸载时清理可能残留的事件监听器
      const handlers = ['mousemove', 'mouseup'];
      handlers.forEach(event => {
        document.removeEventListener(event, () => {});
      });
    };
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent, direction: string) => {
    e.stopPropagation();
    e.preventDefault();
    
    const startValues = {
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height,
      posX: position.x,
      posY: position.y
    };
    
    setIsResizing(true);

    const mouseMoveHandler = (moveEvent: MouseEvent) => {
      const deltaX = (moveEvent.clientX - startValues.x) / zoom;
      const deltaY = (moveEvent.clientY - startValues.y) / zoom;
      
      let newWidth = startValues.width;
      let newHeight = startValues.height;
      let newX = startValues.posX;
      let newY = startValues.posY;

      switch (direction) {
        case 'se':
          newWidth = Math.max(20, startValues.width + deltaX);
          newHeight = Math.max(20, startValues.height + deltaY);
          break;
        case 'sw':
          newWidth = Math.max(20, startValues.width - deltaX);
          newHeight = Math.max(20, startValues.height + deltaY);
          newX = startValues.posX + (startValues.width - newWidth);
          break;
        case 'ne':
          newWidth = Math.max(20, startValues.width + deltaX);
          newHeight = Math.max(20, startValues.height - deltaY);
          newY = startValues.posY + (startValues.height - newHeight);
          break;
        case 'nw':
          newWidth = Math.max(20, startValues.width - deltaX);
          newHeight = Math.max(20, startValues.height - deltaY);
          newX = startValues.posX + (startValues.width - newWidth);
          newY = startValues.posY + (startValues.height - newHeight);
          break;
        case 'n':
          newHeight = Math.max(20, startValues.height - deltaY);
          newY = startValues.posY + (startValues.height - newHeight);
          break;
        case 's':
          newHeight = Math.max(20, startValues.height + deltaY);
          break;
        case 'e':
          newWidth = Math.max(20, startValues.width + deltaX);
          break;
        case 'w':
          newWidth = Math.max(20, startValues.width - deltaX);
          newX = startValues.posX + (startValues.width - newWidth);
          break;
      }

      onUpdate({
        style: {
          ...element.style,
          size: { width: newWidth, height: newHeight },
          position: { x: newX, y: newY }
        }
      });
    };

    const mouseUpHandler = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  }, [element.style, onUpdate, position, size, zoom]);

  if (!isSelected) return null;

  const handleStyle = "absolute w-3 h-3 bg-blue-500 border border-white rounded-full cursor-pointer hover:bg-blue-600 transition-colors";

  return (
    <>
      {/* Corner handles */}
      <div
        className={`${handleStyle} -top-1.5 -left-1.5 cursor-nw-resize`}
        onMouseDown={(e) => handleMouseDown(e, 'nw')}
      />
      <div
        className={`${handleStyle} -top-1.5 -right-1.5 cursor-ne-resize`}
        onMouseDown={(e) => handleMouseDown(e, 'ne')}
      />
      <div
        className={`${handleStyle} -bottom-1.5 -left-1.5 cursor-sw-resize`}
        onMouseDown={(e) => handleMouseDown(e, 'sw')}
      />
      <div
        className={`${handleStyle} -bottom-1.5 -right-1.5 cursor-se-resize`}
        onMouseDown={(e) => handleMouseDown(e, 'se')}
      />
      
      {/* Edge handles */}
      <div
        className={`${handleStyle} -top-1.5 left-1/2 transform -translate-x-1/2 cursor-n-resize`}
        onMouseDown={(e) => handleMouseDown(e, 'n')}
      />
      <div
        className={`${handleStyle} -bottom-1.5 left-1/2 transform -translate-x-1/2 cursor-s-resize`}
        onMouseDown={(e) => handleMouseDown(e, 's')}
      />
      <div
        className={`${handleStyle} -left-1.5 top-1/2 transform -translate-y-1/2 cursor-w-resize`}
        onMouseDown={(e) => handleMouseDown(e, 'w')}
      />
      <div
        className={`${handleStyle} -right-1.5 top-1/2 transform -translate-y-1/2 cursor-e-resize`}
        onMouseDown={(e) => handleMouseDown(e, 'e')}
      />
    </>
  );
} 