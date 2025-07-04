import React, { useState, useRef, useCallback, useEffect } from 'react';
import { CardElement } from '@/hooks/use-card-editor';
import { ResizeHandles } from './resize-handles';

interface EditableTextProps {
  element: CardElement;
  isSelected: boolean;
  isEditing: boolean;
  onSelect: () => void;
  onStartEdit: () => void;
  onStopEdit: () => void;
  onUpdate: (updates: Partial<CardElement>) => void;
  zoom: number;
}

// 光标位置保存和恢复工具函数
const saveSelection = (containerEl: HTMLElement): Range | null => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return null;
  
  const range = selection.getRangeAt(0);
  // 确保选区在容器内
  if (containerEl.contains(range.commonAncestorContainer)) {
    return range.cloneRange();
  }
  return null;
};

const restoreSelection = (containerEl: HTMLElement, range: Range): void => {
  const selection = window.getSelection();
  if (!selection) return;
  
  try {
    selection.removeAllRanges();
    selection.addRange(range);
  } catch (e) {
    // 如果恢复失败，将光标设置到末尾
    const newRange = document.createRange();
    newRange.selectNodeContents(containerEl);
    newRange.collapse(false);
    selection.removeAllRanges();
    selection.addRange(newRange);
  }
};

const getCursorPosition = (containerEl: HTMLElement): number => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return 0;
  
  const range = selection.getRangeAt(0);
  const preCaretRange = range.cloneRange();
  preCaretRange.selectNodeContents(containerEl);
  preCaretRange.setEnd(range.endContainer, range.endOffset);
  
  return preCaretRange.toString().length;
};

const setCursorPosition = (containerEl: HTMLElement, position: number): void => {
  const selection = window.getSelection();
  if (!selection) return;
  
  let charIndex = 0;
  const walker = document.createTreeWalker(
    containerEl,
    NodeFilter.SHOW_TEXT,
    null
  );
  
  let node: Node | null;
  while (node = walker.nextNode()) {
    const nextCharIndex = charIndex + (node.textContent?.length || 0);
    if (position <= nextCharIndex) {
      const range = document.createRange();
      range.setStart(node, position - charIndex);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
      return;
    }
    charIndex = nextCharIndex;
  }
  
  // 如果没找到位置，设置到末尾
  const range = document.createRange();
  range.selectNodeContents(containerEl);
  range.collapse(false);
  selection.removeAllRanges();
  selection.addRange(range);
};

export function EditableText({
  element,
  isSelected,
  isEditing,
  onSelect,
  onStartEdit,
  onStopEdit,
  onUpdate,
  zoom
}: EditableTextProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, elementX: 0, elementY: 0 });
  const textRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const savedRangeRef = useRef<Range | null>(null);
  const isInternalUpdateRef = useRef(false);
  const lastContentRef = useRef(element.content);

  const position = element.style.position || { x: 0, y: 0 };
  const size = element.style.size || { width: 200, height: 50 };

  // 只在编辑模式开始时设置内容，避免后续更新干扰
  useEffect(() => {
    if (isEditing && textRef.current) {
      // 只在刚进入编辑模式时设置内容
      const currentContent = textRef.current.textContent || '';
      
      // 如果不是内部更新且内容确实不同，才设置新内容
      if (!isInternalUpdateRef.current && currentContent !== element.content) {
        textRef.current.textContent = element.content;
        lastContentRef.current = element.content;
        
        // 设置光标到末尾，只在首次进入编辑模式时
        requestAnimationFrame(() => {
          if (textRef.current) {
            textRef.current.focus();
            setCursorPosition(textRef.current, element.content.length);
          }
        });
      }
      
      // 重置内部更新标志
      isInternalUpdateRef.current = false;
    } else if (!isEditing) {
      // 退出编辑模式时重置标志
      isInternalUpdateRef.current = false;
      lastContentRef.current = element.content;
    }
  }, [isEditing]);

  // 处理点击选择
  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isSelected) {
      onSelect();
    }
  }, [isSelected, onSelect]);

  // 处理双击编辑
  const handleDoubleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isEditing) {
      onStartEdit();
    }
  }, [isEditing, onStartEdit]);

  // 处理单击进入编辑模式（如果已选中）
  const handleTextClick = useCallback((e: React.MouseEvent) => {
    if (isSelected && !isEditing) {
      e.stopPropagation();
      onStartEdit();
    }
  }, [isSelected, isEditing, onStartEdit]);

  // 处理拖拽
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (isEditing) return;
    
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
  }, [isEditing, onSelect, position.x, position.y, zoom, element.style, onUpdate]);

  // 处理文字输入 - 关键：避免光标跳动
  const handleInput = useCallback((e: React.FormEvent<HTMLDivElement>) => {
    if (!textRef.current) return;
    
    const newContent = textRef.current.textContent || '';
    
    // 只有内容真正改变时才更新
    if (newContent !== lastContentRef.current) {
      // 标记这是内部更新，避免useEffect重新设置内容
      isInternalUpdateRef.current = true;
      lastContentRef.current = newContent;
      
      // 延迟更新以避免打断用户输入
      setTimeout(() => {
        onUpdate({ content: newContent });
      }, 0);
    }
  }, [onUpdate]);

  // 处理编辑结束
  const handleBlur = useCallback(() => {
    if (isEditing) {
      onStopEdit();
    }
  }, [isEditing, onStopEdit]);

  // 处理键盘事件
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onStopEdit();
    }
    if (e.key === 'Escape') {
      onStopEdit();
    }
    e.stopPropagation();
  }, [onStopEdit]);

  return (
    <div
      ref={containerRef}
      className={`absolute select-none ${isSelected ? 'ring-2 ring-blue-500' : ''} ${
        isDragging ? 'cursor-grabbing' : 'cursor-pointer'
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        minHeight: `${size.height}px`,
        transform: `scale(${zoom})`,
        transformOrigin: 'top left',
      }}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onMouseDown={handleMouseDown}
    >
      {isEditing ? (
        // 编辑模式：使用 contentEditable div
        <div
          ref={textRef}
          contentEditable={true}
          suppressContentEditableWarning={true}
          onInput={handleInput}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="w-full h-full outline-none cursor-text"
          style={{
            fontSize: `${element.style.fontSize || 16}px`,
            fontWeight: element.style.fontWeight || 'normal',
            fontFamily: element.style.fontFamily || 'Arial, sans-serif',
            color: element.style.color || '#000000',
            textAlign: (element.style.textAlign as any) || 'left',
            lineHeight: '1.4',
            padding: '4px',
            wordWrap: 'break-word',
            whiteSpace: 'pre-wrap',
            background: 'transparent',
            border: 'none'
          }}
        />
      ) : (
        // 显示模式：使用普通 div 显示内容
        <div
          className="w-full h-full cursor-pointer"
          onClick={handleTextClick}
          style={{
            fontSize: `${element.style.fontSize || 16}px`,
            fontWeight: element.style.fontWeight || 'normal',
            fontFamily: element.style.fontFamily || 'Arial, sans-serif',
            color: element.style.color || '#000000',
            textAlign: (element.style.textAlign as any) || 'left',
            lineHeight: '1.4',
            padding: '4px',
            wordWrap: 'break-word',
            whiteSpace: 'pre-wrap'
          }}
          dangerouslySetInnerHTML={{ __html: element.content.replace(/\n/g, '<br>') }}
        />
      )}
      
      {isSelected && !isEditing && (
        <ResizeHandles
          element={element}
          isSelected={isSelected}
          onUpdate={onUpdate}
          zoom={zoom}
        />
      )}
    </div>
  );
} 