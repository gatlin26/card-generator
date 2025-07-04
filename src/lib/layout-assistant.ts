import type { CardElement } from '@/hooks/use-card-editor';

export interface SnapPoint {
  type: 'edge' | 'center' | 'grid';
  x?: number;
  y?: number;
  elementId?: string;
  direction?: 'horizontal' | 'vertical';
}

export interface LayoutGuide {
  type: 'alignment' | 'spacing' | 'grid';
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
  width: number;
}

export interface AlignmentSuggestion {
  type: 'left' | 'center' | 'right' | 'top' | 'middle' | 'bottom' | 'distribute-horizontal' | 'distribute-vertical';
  elements: string[];
  description: string;
}

export class LayoutAssistant {
  private snapThreshold = 8; // pixels
  private gridSize = 10; // pixels
  private canvasWidth = 500;
  private canvasHeight = 700;

  constructor(canvasWidth?: number, canvasHeight?: number) {
    if (canvasWidth) this.canvasWidth = canvasWidth;
    if (canvasHeight) this.canvasHeight = canvasHeight;
  }

  // Generate snap points for an element being dragged
  generateSnapPoints(elements: CardElement[], draggingElementId: string): SnapPoint[] {
    const snapPoints: SnapPoint[] = [];
    const otherElements = elements.filter(el => el.id !== draggingElementId);

    // Add canvas edge snap points
    snapPoints.push(
      { type: 'edge', x: 0 },
      { type: 'edge', x: this.canvasWidth / 2 },
      { type: 'edge', x: this.canvasWidth },
      { type: 'edge', y: 0 },
      { type: 'edge', y: this.canvasHeight / 2 },
      { type: 'edge', y: this.canvasHeight }
    );

    // Add grid snap points
    for (let x = 0; x <= this.canvasWidth; x += this.gridSize) {
      snapPoints.push({ type: 'grid', x });
    }
    for (let y = 0; y <= this.canvasHeight; y += this.gridSize) {
      snapPoints.push({ type: 'grid', y });
    }

    // Add element edge and center snap points
    otherElements.forEach(element => {
      const pos = element.style.position || { x: 0, y: 0 };
      const size = element.style.size || { width: 100, height: 50 };

      // Element edges
      snapPoints.push(
        { type: 'edge', x: pos.x, elementId: element.id },
        { type: 'edge', x: pos.x + size.width, elementId: element.id },
        { type: 'edge', y: pos.y, elementId: element.id },
        { type: 'edge', y: pos.y + size.height, elementId: element.id }
      );

      // Element centers
      snapPoints.push(
        { type: 'center', x: pos.x + size.width / 2, elementId: element.id },
        { type: 'center', y: pos.y + size.height / 2, elementId: element.id }
      );
    });

    return snapPoints;
  }

  // Calculate snap position for a dragging element
  calculateSnapPosition(
    elements: CardElement[],
    draggingElementId: string,
    currentX: number,
    currentY: number
  ): { x: number; y: number; snapPoints: SnapPoint[]; guides: LayoutGuide[] } {
    const snapPoints = this.generateSnapPoints(elements, draggingElementId);
    const draggingElement = elements.find(el => el.id === draggingElementId);
    
    if (!draggingElement) {
      return { x: currentX, y: currentY, snapPoints: [], guides: [] };
    }

    const size = draggingElement.style.size || { width: 100, height: 50 };
    let snappedX = currentX;
    let snappedY = currentY;
    const activeSnapPoints: SnapPoint[] = [];
    const guides: LayoutGuide[] = [];

    // Check X snapping
    const elementCenterX = currentX + size.width / 2;
    const elementRightX = currentX + size.width;

    for (const snapPoint of snapPoints) {
      if (snapPoint.x !== undefined) {
        // Snap left edge
        if (Math.abs(currentX - snapPoint.x) <= this.snapThreshold) {
          snappedX = snapPoint.x;
          activeSnapPoints.push(snapPoint);
          guides.push({
            type: 'alignment',
            x1: snapPoint.x,
            y1: 0,
            x2: snapPoint.x,
            y2: this.canvasHeight,
            color: snapPoint.type === 'grid' ? '#E5E7EB' : '#3B82F6',
            width: snapPoint.type === 'grid' ? 1 : 2
          });
          break;
        }
        // Snap center
        if (Math.abs(elementCenterX - snapPoint.x) <= this.snapThreshold) {
          snappedX = snapPoint.x - size.width / 2;
          activeSnapPoints.push(snapPoint);
          guides.push({
            type: 'alignment',
            x1: snapPoint.x,
            y1: 0,
            x2: snapPoint.x,
            y2: this.canvasHeight,
            color: '#10B981',
            width: 2
          });
          break;
        }
        // Snap right edge
        if (Math.abs(elementRightX - snapPoint.x) <= this.snapThreshold) {
          snappedX = snapPoint.x - size.width;
          activeSnapPoints.push(snapPoint);
          guides.push({
            type: 'alignment',
            x1: snapPoint.x,
            y1: 0,
            x2: snapPoint.x,
            y2: this.canvasHeight,
            color: '#3B82F6',
            width: 2
          });
          break;
        }
      }
    }

    // Check Y snapping
    const elementCenterY = currentY + size.height / 2;
    const elementBottomY = currentY + size.height;

    for (const snapPoint of snapPoints) {
      if (snapPoint.y !== undefined) {
        // Snap top edge
        if (Math.abs(currentY - snapPoint.y) <= this.snapThreshold) {
          snappedY = snapPoint.y;
          activeSnapPoints.push(snapPoint);
          guides.push({
            type: 'alignment',
            x1: 0,
            y1: snapPoint.y,
            x2: this.canvasWidth,
            y2: snapPoint.y,
            color: snapPoint.type === 'grid' ? '#E5E7EB' : '#3B82F6',
            width: snapPoint.type === 'grid' ? 1 : 2
          });
          break;
        }
        // Snap center
        if (Math.abs(elementCenterY - snapPoint.y) <= this.snapThreshold) {
          snappedY = snapPoint.y - size.height / 2;
          activeSnapPoints.push(snapPoint);
          guides.push({
            type: 'alignment',
            x1: 0,
            y1: snapPoint.y,
            x2: this.canvasWidth,
            y2: snapPoint.y,
            color: '#10B981',
            width: 2
          });
          break;
        }
        // Snap bottom edge
        if (Math.abs(elementBottomY - snapPoint.y) <= this.snapThreshold) {
          snappedY = snapPoint.y - size.height;
          activeSnapPoints.push(snapPoint);
          guides.push({
            type: 'alignment',
            x1: 0,
            y1: snapPoint.y,
            x2: this.canvasWidth,
            y2: snapPoint.y,
            color: '#3B82F6',
            width: 2
          });
          break;
        }
      }
    }

    return { x: snappedX, y: snappedY, snapPoints: activeSnapPoints, guides };
  }

  // Generate alignment suggestions for selected elements
  generateAlignmentSuggestions(elements: CardElement[], selectedIds: string[]): AlignmentSuggestion[] {
    if (selectedIds.length < 2) return [];

    const selectedElements = elements.filter(el => selectedIds.includes(el.id));
    const suggestions: AlignmentSuggestion[] = [];

    // Alignment suggestions
    suggestions.push(
      {
        type: 'left',
        elements: selectedIds,
        description: 'Align left edges'
      },
      {
        type: 'center',
        elements: selectedIds,
        description: 'Align horizontal centers'
      },
      {
        type: 'right',
        elements: selectedIds,
        description: 'Align right edges'
      },
      {
        type: 'top',
        elements: selectedIds,
        description: 'Align top edges'
      },
      {
        type: 'middle',
        elements: selectedIds,
        description: 'Align vertical centers'
      },
      {
        type: 'bottom',
        elements: selectedIds,
        description: 'Align bottom edges'
      }
    );

    // Distribution suggestions (only for 3+ elements)
    if (selectedIds.length >= 3) {
      suggestions.push(
        {
          type: 'distribute-horizontal',
          elements: selectedIds,
          description: 'Distribute horizontally'
        },
        {
          type: 'distribute-vertical',
          elements: selectedIds,
          description: 'Distribute vertically'
        }
      );
    }

    return suggestions;
  }

  // Apply alignment to selected elements
  applyAlignment(elements: CardElement[], selectedIds: string[], type: AlignmentSuggestion['type']): CardElement[] {
    if (selectedIds.length < 2) return elements;

    const selectedElements = elements.filter(el => selectedIds.includes(el.id));
    const updatedElements = [...elements];

    switch (type) {
      case 'left': {
        const leftmostX = Math.min(...selectedElements.map(el => el.style.position?.x || 0));
        selectedIds.forEach(id => {
          const elementIndex = updatedElements.findIndex(el => el.id === id);
          if (elementIndex !== -1) {
            updatedElements[elementIndex] = {
              ...updatedElements[elementIndex],
              style: {
                ...updatedElements[elementIndex].style,
                position: {
                  ...updatedElements[elementIndex].style.position,
                  x: leftmostX,
                  y: updatedElements[elementIndex].style.position?.y || 0
                }
              }
            };
          }
        });
        break;
      }

      case 'center': {
        const centerX = selectedElements.reduce((sum, el) => {
          const pos = el.style.position || { x: 0, y: 0 };
          const size = el.style.size || { width: 100, height: 50 };
          return sum + pos.x + size.width / 2;
        }, 0) / selectedElements.length;

        selectedIds.forEach(id => {
          const elementIndex = updatedElements.findIndex(el => el.id === id);
          if (elementIndex !== -1) {
            const size = updatedElements[elementIndex].style.size || { width: 100, height: 50 };
            updatedElements[elementIndex] = {
              ...updatedElements[elementIndex],
              style: {
                ...updatedElements[elementIndex].style,
                position: {
                  ...updatedElements[elementIndex].style.position,
                  x: centerX - size.width / 2,
                  y: updatedElements[elementIndex].style.position?.y || 0
                }
              }
            };
          }
        });
        break;
      }

      case 'right': {
        const rightmostX = Math.max(...selectedElements.map(el => {
          const pos = el.style.position || { x: 0, y: 0 };
          const size = el.style.size || { width: 100, height: 50 };
          return pos.x + size.width;
        }));

        selectedIds.forEach(id => {
          const elementIndex = updatedElements.findIndex(el => el.id === id);
          if (elementIndex !== -1) {
            const size = updatedElements[elementIndex].style.size || { width: 100, height: 50 };
            updatedElements[elementIndex] = {
              ...updatedElements[elementIndex],
              style: {
                ...updatedElements[elementIndex].style,
                position: {
                  ...updatedElements[elementIndex].style.position,
                  x: rightmostX - size.width,
                  y: updatedElements[elementIndex].style.position?.y || 0
                }
              }
            };
          }
        });
        break;
      }

      case 'top': {
        const topmostY = Math.min(...selectedElements.map(el => el.style.position?.y || 0));
        selectedIds.forEach(id => {
          const elementIndex = updatedElements.findIndex(el => el.id === id);
          if (elementIndex !== -1) {
            updatedElements[elementIndex] = {
              ...updatedElements[elementIndex],
              style: {
                ...updatedElements[elementIndex].style,
                position: {
                  ...updatedElements[elementIndex].style.position,
                  x: updatedElements[elementIndex].style.position?.x || 0,
                  y: topmostY
                }
              }
            };
          }
        });
        break;
      }

      case 'middle': {
        const centerY = selectedElements.reduce((sum, el) => {
          const pos = el.style.position || { x: 0, y: 0 };
          const size = el.style.size || { width: 100, height: 50 };
          return sum + pos.y + size.height / 2;
        }, 0) / selectedElements.length;

        selectedIds.forEach(id => {
          const elementIndex = updatedElements.findIndex(el => el.id === id);
          if (elementIndex !== -1) {
            const size = updatedElements[elementIndex].style.size || { width: 100, height: 50 };
            updatedElements[elementIndex] = {
              ...updatedElements[elementIndex],
              style: {
                ...updatedElements[elementIndex].style,
                position: {
                  ...updatedElements[elementIndex].style.position,
                  x: updatedElements[elementIndex].style.position?.x || 0,
                  y: centerY - size.height / 2
                }
              }
            };
          }
        });
        break;
      }

      case 'bottom': {
        const bottommostY = Math.max(...selectedElements.map(el => {
          const pos = el.style.position || { x: 0, y: 0 };
          const size = el.style.size || { width: 100, height: 50 };
          return pos.y + size.height;
        }));

        selectedIds.forEach(id => {
          const elementIndex = updatedElements.findIndex(el => el.id === id);
          if (elementIndex !== -1) {
            const size = updatedElements[elementIndex].style.size || { width: 100, height: 50 };
            updatedElements[elementIndex] = {
              ...updatedElements[elementIndex],
              style: {
                ...updatedElements[elementIndex].style,
                position: {
                  ...updatedElements[elementIndex].style.position,
                  x: updatedElements[elementIndex].style.position?.x || 0,
                  y: bottommostY - size.height
                }
              }
            };
          }
        });
        break;
      }

      case 'distribute-horizontal': {
        const sortedElements = selectedElements
          .map(el => ({
            ...el,
            centerX: (el.style.position?.x || 0) + (el.style.size?.width || 100) / 2
          }))
          .sort((a, b) => a.centerX - b.centerX);

        const leftmost = sortedElements[0].centerX;
        const rightmost = sortedElements[sortedElements.length - 1].centerX;
        const spacing = (rightmost - leftmost) / (sortedElements.length - 1);

        sortedElements.forEach((element, index) => {
          if (index > 0 && index < sortedElements.length - 1) {
            const newCenterX = leftmost + spacing * index;
            const elementIndex = updatedElements.findIndex(el => el.id === element.id);
            if (elementIndex !== -1) {
              const size = updatedElements[elementIndex].style.size || { width: 100, height: 50 };
              updatedElements[elementIndex] = {
                ...updatedElements[elementIndex],
                style: {
                  ...updatedElements[elementIndex].style,
                  position: {
                    ...updatedElements[elementIndex].style.position,
                    x: newCenterX - size.width / 2,
                    y: updatedElements[elementIndex].style.position?.y || 0
                  }
                }
              };
            }
          }
        });
        break;
      }

      case 'distribute-vertical': {
        const sortedElements = selectedElements
          .map(el => ({
            ...el,
            centerY: (el.style.position?.y || 0) + (el.style.size?.height || 50) / 2
          }))
          .sort((a, b) => a.centerY - b.centerY);

        const topmost = sortedElements[0].centerY;
        const bottommost = sortedElements[sortedElements.length - 1].centerY;
        const spacing = (bottommost - topmost) / (sortedElements.length - 1);

        sortedElements.forEach((element, index) => {
          if (index > 0 && index < sortedElements.length - 1) {
            const newCenterY = topmost + spacing * index;
            const elementIndex = updatedElements.findIndex(el => el.id === element.id);
            if (elementIndex !== -1) {
              const size = updatedElements[elementIndex].style.size || { width: 100, height: 50 };
              updatedElements[elementIndex] = {
                ...updatedElements[elementIndex],
                style: {
                  ...updatedElements[elementIndex].style,
                  position: {
                    ...updatedElements[elementIndex].style.position,
                    x: updatedElements[elementIndex].style.position?.x || 0,
                    y: newCenterY - size.height / 2
                  }
                }
              };
            }
          }
        });
        break;
      }
    }

    return updatedElements;
  }

  // Calculate equal spacing between elements
  calculateEqualSpacing(elements: CardElement[], selectedIds: string[], direction: 'horizontal' | 'vertical'): CardElement[] {
    if (selectedIds.length < 3) return elements;

    const selectedElements = elements.filter(el => selectedIds.includes(el.id));
    const updatedElements = [...elements];

    if (direction === 'horizontal') {
      const sortedElements = selectedElements
        .map(el => ({
          ...el,
          left: el.style.position?.x || 0,
          right: (el.style.position?.x || 0) + (el.style.size?.width || 100)
        }))
        .sort((a, b) => a.left - b.left);

      const totalWidth = sortedElements[sortedElements.length - 1].right - sortedElements[0].left;
      const totalElementWidth = sortedElements.reduce((sum, el) => sum + (el.style.size?.width || 100), 0);
      const spacing = (totalWidth - totalElementWidth) / (sortedElements.length - 1);

      let currentX = sortedElements[0].left;
      sortedElements.forEach((element, index) => {
        if (index > 0) {
          currentX += (sortedElements[index - 1].style.size?.width || 100) + spacing;
          const elementIndex = updatedElements.findIndex(el => el.id === element.id);
          if (elementIndex !== -1) {
            updatedElements[elementIndex] = {
              ...updatedElements[elementIndex],
              style: {
                ...updatedElements[elementIndex].style,
                position: {
                  ...updatedElements[elementIndex].style.position,
                  x: currentX,
                  y: updatedElements[elementIndex].style.position?.y || 0
                }
              }
            };
          }
        }
      });
    } else {
      const sortedElements = selectedElements
        .map(el => ({
          ...el,
          top: el.style.position?.y || 0,
          bottom: (el.style.position?.y || 0) + (el.style.size?.height || 50)
        }))
        .sort((a, b) => a.top - b.top);

      const totalHeight = sortedElements[sortedElements.length - 1].bottom - sortedElements[0].top;
      const totalElementHeight = sortedElements.reduce((sum, el) => sum + (el.style.size?.height || 50), 0);
      const spacing = (totalHeight - totalElementHeight) / (sortedElements.length - 1);

      let currentY = sortedElements[0].top;
      sortedElements.forEach((element, index) => {
        if (index > 0) {
          currentY += (sortedElements[index - 1].style.size?.height || 50) + spacing;
          const elementIndex = updatedElements.findIndex(el => el.id === element.id);
          if (elementIndex !== -1) {
            updatedElements[elementIndex] = {
              ...updatedElements[elementIndex],
              style: {
                ...updatedElements[elementIndex].style,
                position: {
                  ...updatedElements[elementIndex].style.position,
                  x: updatedElements[elementIndex].style.position?.x || 0,
                  y: currentY
                }
              }
            };
          }
        }
      });
    }

    return updatedElements;
  }
}