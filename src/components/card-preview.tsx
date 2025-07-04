import { forwardRef } from 'react';
import { CardContent } from '@/shared/schema';
import { EditableText } from './editable-text';
import { EditableImage } from './editable-image';
import { LayoutGuides } from './layout-guides';
import { useCardEditor } from '@/hooks/use-card-editor';

interface CardPreviewProps {
  content: CardContent;
  editorState: ReturnType<typeof useCardEditor>['editorState'];
  onSelectElement: (id: string | null) => void;
  onStartEditing: (id: string) => void;
  onStopEditing: () => void;
  onUpdateElement: (id: string, updates: any) => void;
  onUploadImage: (file: File) => Promise<{ url: string }>;
  className?: string;
}

export const CardPreview = forwardRef<HTMLDivElement, CardPreviewProps>(({
  content,
  editorState,
  onSelectElement,
  onStartEditing,
  onStopEditing,
  onUpdateElement,
  onUploadImage,
  className = ""
}, ref) => {
  const handleCardClick = () => {
    if (editorState.selectedElementId) {
      onSelectElement(null);
    }
  };

  const backgroundStyle = () => {
    const bg = content.background;
    switch (bg.type) {
      case 'gradient':
        return {
          background: bg.value || `linear-gradient(135deg, ${bg.gradientStart}, ${bg.gradientEnd})`
        };
      case 'solid':
        return {
          backgroundColor: bg.value
        };
      case 'image':
        return {
          backgroundImage: `url(${bg.value})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        };
      default:
        return {
          background: 'linear-gradient(135deg, #3B82F6, #2563EB)'
        };
    }
  };

  return (
    <div
      ref={ref}
      className={`relative bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden transition-all duration-200 hover:shadow-2xl ${className}`}
      style={{
        width: content.dimensions.width,
        height: content.dimensions.height,
        transform: `scale(${editorState.zoom})`,
        transformOrigin: 'center center'
      }}
      onClick={handleCardClick}
    >
      <div
        className="h-full w-full relative"
        style={backgroundStyle()}
        data-card-content
      >
        {/* Decorative quote icon */}
        <div className="absolute top-6 left-6 text-white opacity-30">
          <i className="fas fa-quote-left text-2xl"></i>
        </div>

        {/* Render all elements */}
        {content.elements.map((element) => {
          const isSelected = element.id === editorState.selectedElementId;
          const isEditing = isSelected && editorState.isEditing;

          if (element.type === 'text') {
            return (
              <EditableText
                key={element.id}
                element={element}
                isSelected={isSelected}
                isEditing={isEditing}
                onSelect={() => onSelectElement(element.id)}
                onStartEdit={() => onStartEditing(element.id)}
                onStopEdit={onStopEditing}
                onUpdate={(updates) => onUpdateElement(element.id, updates)}
                zoom={1} // Don't apply zoom to individual elements, applied to container
              />
            );
          }

          if (element.type === 'image') {
            return (
              <EditableImage
                key={element.id}
                element={element}
                isSelected={isSelected}
                onSelect={() => onSelectElement(element.id)}
                onUpdate={(updates) => onUpdateElement(element.id, updates)}
                onUploadImage={onUploadImage}
                zoom={1}
              />
            );
          }

          return null;
        })}

        {/* Layout Guides Overlay */}
        <LayoutGuides 
          guides={editorState.layoutGuides}
          zoom={editorState.zoom}
        />

        {/* Grid Overlay */}
        {editorState.showGrid && (
          <div 
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(to right, #e5e7eb 1px, transparent 1px),
                linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
              `,
              backgroundSize: '10px 10px'
            }}
          />
        )}

        {/* Selection indicators */}
        {editorState.selectedElementId && (
          <div className="absolute inset-0 border-2 border-blue-500 rounded-2xl pointer-events-none">
            <div className="absolute -top-1 -left-1 w-3 h-3 bg-blue-500 rounded-full"></div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"></div>
            <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-blue-500 rounded-full"></div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"></div>
          </div>
        )}
      </div>
    </div>
  );
});

CardPreview.displayName = 'CardPreview'; 