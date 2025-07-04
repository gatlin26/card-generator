'use client';

import { useState, useCallback, useMemo } from 'react';
import { nanoid } from 'nanoid';
import { CardContent } from '@/shared/schema';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { generateCardImage, downloadImage as downloadCardImage, copyToClipboard } from '@/lib/card-generator';

export interface CardElement {
  id: string;
  type: 'text' | 'image';
  content: string;
  style: {
    fontSize?: number;
    fontWeight?: string;
    fontFamily?: string;
    color?: string;
    textAlign?: string;
    position?: { x: number; y: number };
    size?: { width: number; height: number };
  };
}

export interface EditorState {
  selectedElementId: string | null;
  isEditing: boolean;
  zoom: number;
  isDragging: boolean;
  history: CardContent[];
  historyIndex: number;
  multiSelect: string[];
  showGrid: boolean;
  snapEnabled: boolean;
  layoutGuides: any[];
}

export function useCardEditor(initialContent?: CardContent) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [cardContent, setCardContent] = useState<CardContent>(initialContent || {
    elements: [],
    background: {
      type: 'gradient',
      value: 'linear-gradient(135deg, #3B82F6, #2563EB)',
      gradientStart: '#3B82F6',
      gradientEnd: '#2563EB'
    },
    dimensions: { width: 400, height: 500 }
  });

  const [editorState, setEditorState] = useState<EditorState>({
    selectedElementId: null,
    isEditing: false,
    zoom: 1,
    isDragging: false,
    history: [cardContent],
    historyIndex: 0,
    multiSelect: [],
    showGrid: false,
    snapEnabled: true,
    layoutGuides: [],
  });

  const saveCardMutation = useMutation({
    mutationFn: async (data: { id?: number; title: string; content: CardContent; templateId: string }) => {
      if (data.id) {
        const response = await fetch(`/api/cards/${data.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to update card');
        return response.json();
      } else {
        const response = await fetch('/api/cards', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...data,
            userId: 1, // Default user for MVP
            isPublic: true
          }),
        });
        if (!response.ok) throw new Error('Failed to save card');
        return response.json();
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cards'] });
      toast({
        title: "Card saved",
        description: "Your card has been saved successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save card. Please try again.",
        variant: "destructive",
      });
    },
  });

  const uploadImageMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('image', file);
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Failed to upload image');
      return response.json();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      });
    },
  });

  const addToHistory = useCallback((content: CardContent) => {
    setEditorState(prev => {
      const newHistory = prev.history.slice(0, prev.historyIndex + 1);
      newHistory.push(content);
      return {
        ...prev,
        history: newHistory,
        historyIndex: newHistory.length - 1
      };
    });
  }, []);

  const updateCardContent = useCallback((updater: (prev: CardContent) => CardContent) => {
    setCardContent(prev => {
      const newContent = updater(prev);
      addToHistory(newContent);
      return newContent;
    });
  }, [addToHistory]);

  const selectElement = useCallback((elementId: string | null) => {
    setEditorState(prev => ({
      ...prev,
      selectedElementId: elementId,
      isEditing: false
    }));
  }, []);

  const startEditing = useCallback((elementId: string) => {
    setEditorState(prev => ({
      ...prev,
      selectedElementId: elementId,
      isEditing: true
    }));
  }, []);

  const stopEditing = useCallback(() => {
    setEditorState(prev => ({
      ...prev,
      isEditing: false
    }));
  }, []);

  const updateElement = useCallback((elementId: string, updates: Partial<CardElement>) => {
    updateCardContent(prev => ({
      ...prev,
      elements: prev.elements.map(el =>
        el.id === elementId ? { ...el, ...updates } : el
      )
    }));
  }, [updateCardContent]);

  const addElement = useCallback((element: Omit<CardElement, 'id'>) => {
    const newElement = { ...element, id: nanoid() };
    updateCardContent(prev => ({
      ...prev,
      elements: [...prev.elements, newElement]
    }));
    return newElement.id;
  }, [updateCardContent]);

  const removeElement = useCallback((elementId: string) => {
    updateCardContent(prev => ({
      ...prev,
      elements: prev.elements.filter(el => el.id !== elementId)
    }));
    setEditorState(prev => ({
      ...prev,
      selectedElementId: prev.selectedElementId === elementId ? null : prev.selectedElementId
    }));
  }, [updateCardContent]);

  const duplicateElement = useCallback((elementId: string) => {
    const element = cardContent.elements.find(el => el.id === elementId);
    if (element) {
      const duplicate = {
        ...element,
        id: nanoid(),
        style: {
          ...element.style,
          position: element.style.position 
            ? { x: element.style.position.x + 20, y: element.style.position.y + 20 }
            : { x: 20, y: 20 }
        }
      };
      updateCardContent(prev => ({
        ...prev,
        elements: [...prev.elements, duplicate]
      }));
      return duplicate.id;
    }
  }, [cardContent.elements, updateCardContent]);

  const undo = useCallback(() => {
    if (editorState.historyIndex > 0) {
      const newIndex = editorState.historyIndex - 1;
      setCardContent(editorState.history[newIndex]);
      setEditorState(prev => ({ ...prev, historyIndex: newIndex }));
    }
  }, [editorState.historyIndex, editorState.history]);

  const redo = useCallback(() => {
    if (editorState.historyIndex < editorState.history.length - 1) {
      const newIndex = editorState.historyIndex + 1;
      setCardContent(editorState.history[newIndex]);
      setEditorState(prev => ({ ...prev, historyIndex: newIndex }));
    }
  }, [editorState.historyIndex, editorState.history]);

  const setZoom = useCallback((zoom: number) => {
    setEditorState(prev => ({ ...prev, zoom: Math.max(0.1, Math.min(3, zoom)) }));
  }, []);

  const toggleGrid = useCallback(() => {
    setEditorState(prev => ({ ...prev, showGrid: !prev.showGrid }));
  }, []);

  const toggleSnap = useCallback(() => {
    setEditorState(prev => ({ ...prev, snapEnabled: !prev.snapEnabled }));
  }, []);

  const clearCanvas = useCallback(() => {
    updateCardContent(prev => ({ ...prev, elements: [] }));
  }, [updateCardContent]);

  const updateBackground = useCallback((background: CardContent['background']) => {
    updateCardContent(prev => ({ ...prev, background }));
  }, [updateCardContent]);

  const saveCard = useCallback((
    cardData: { id?: number; title: string; templateId: string },
    options?: { onSuccess?: (data: any) => void }
  ) => {
    saveCardMutation.mutate({
      ...cardData,
      content: cardContent
    }, {
      onSuccess: options?.onSuccess
    });
  }, [cardContent, saveCardMutation]);

  const uploadImage = useCallback((file: File) => {
    return uploadImageMutation.mutateAsync(file);
  }, [uploadImageMutation]);

  const canUndo = editorState.historyIndex > 0;
  const canRedo = editorState.historyIndex < editorState.history.length - 1;

  return {
    // State
    cardContent,
    editorState,
    
    // Selection & Editing
    selectElement,
    startEditing,
    stopEditing,
    
    // Elements
    updateElement,
    addElement,
    removeElement,
    duplicateElement,
    
    // History
    undo,
    redo,
    canUndo,
    canRedo,
    
    // View
    setZoom,
    toggleGrid,
    toggleSnap,
    
    // Canvas
    clearCanvas,
    updateBackground,
    setCardContent,
    
    // Persistence
    saveCard,
    uploadImage,
    
    // Mutations
    saveCardMutation,
    uploadImageMutation
  };
} 