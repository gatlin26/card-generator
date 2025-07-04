import { useRef, useState, useCallback } from 'react';
import { CardElement } from '@/hooks/use-card-editor';
import { ResizeHandles } from './resize-handles';
import { Image as ImageIcon, Upload } from 'lucide-react';

interface EditableImageProps {
  element: CardElement;
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (updates: Partial<CardElement>) => void;
  onUploadImage: (file: File) => Promise<{ url: string }>;
  zoom: number;
}

export function EditableImage({
  element,
  isSelected,
  onSelect,
  onUpdate,
  onUploadImage,
  zoom
}: EditableImageProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, elementX: 0, elementY: 0 });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const position = element.style.position || { x: 0, y: 0 };
  const size = element.style.size || { width: 100, height: 100 };

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isSelected) {
      onSelect();
    }
  }, [isSelected, onSelect]);

  const handleDoubleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  }, []);

  // 处理拖拽移动
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect();
    
    setIsDragging(true);
    const newDragStart = {
      x: e.clientX,
      y: e.clientY,
      elementX: position.x,
      elementY: position.y
    };
    setDragStart(newDragStart);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = (moveEvent.clientX - newDragStart.x) / zoom;
      const deltaY = (moveEvent.clientY - newDragStart.y) / zoom;
      
      onUpdate({
        style: {
          ...element.style,
          position: {
            x: newDragStart.elementX + deltaX,
            y: newDragStart.elementY + deltaY
          }
        }
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [onSelect, position.x, position.y, zoom, element.style, onUpdate]);

  const handleFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const result = await onUploadImage(file);
        onUpdate({ content: result.url });
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  }, [onUploadImage, onUpdate]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    
    if (imageFile) {
      try {
        const result = await onUploadImage(imageFile);
        onUpdate({ content: result.url });
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  }, [onUploadImage, onUpdate]);

  return (
    <>
      <div
        ref={containerRef}
        className={`absolute select-none ${isSelected ? 'ring-2 ring-blue-500' : ''} ${
          isDragging ? 'cursor-grabbing' : 'cursor-pointer'
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: `${size.width}px`,
          height: `${size.height}px`,
          transform: `scale(${zoom})`,
          transformOrigin: 'top left',
        }}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        onMouseDown={handleMouseDown}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        data-testid={`image-element-${element.id}`}
      >
        {element.content && element.content !== 'placeholder' ? (
          <img
            src={element.content}
            alt="Card element"
            className="w-full h-full object-cover rounded-lg"
            draggable={false}
            onError={(e) => {
              // 如果图片加载失败，显示占位符
              e.currentTarget.style.display = 'none';
              onUpdate({ content: 'placeholder' });
            }}
          />
        ) : (
          // 占位符显示
          <div className="w-full h-full bg-gray-100 dark:bg-gray-800 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600">
            <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
            <span className="text-xs text-gray-500 text-center px-2">
              点击上传图片
            </span>
          </div>
        )}
        
        {/* Upload overlay on hover */}
        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 flex items-center justify-center rounded-lg transition-all">
          <Upload className="w-6 h-6 text-white opacity-0 hover:opacity-100 transition-opacity" />
        </div>
        
        {/* Resize handles - only show when selected */}
        {isSelected && (
          <ResizeHandles 
            element={element}
            isSelected={isSelected}
            onUpdate={onUpdate}
            zoom={zoom}
          />
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </>
  );
} 