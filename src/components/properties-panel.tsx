import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { BackgroundPanel } from './background-panel';
import { AlignmentPanel } from './alignment-panel';
import { useCardEditor } from '@/hooks/use-card-editor';
import { useI18n } from '@/lib/i18n';

interface PropertiesPanelProps {
  editor: ReturnType<typeof useCardEditor>;
  className?: string;
}

export function PropertiesPanel({ editor, className = "" }: PropertiesPanelProps) {
  const { cardContent, editorState } = editor;
  const { t } = useI18n();

  const selectedIds = editorState.multiSelect.length > 0 
    ? editorState.multiSelect 
    : editorState.selectedElementId 
      ? [editorState.selectedElementId] 
      : [];

  // 获取选中的元素
  const selectedElement = editorState.selectedElementId 
    ? cardContent.elements.find(el => el.id === editorState.selectedElementId)
    : null;

  if (!selectedElement) {
    return (
      <aside className={`w-80 bg-white border-l border-slate-200 overflow-y-auto ${className}`}>
        <div className="p-4 space-y-4">
          <h2 className="text-sm font-semibold text-slate-800 mb-4">{t('properties')}</h2>
          
          {/* Layout Assistant Panel */}
          <AlignmentPanel
            selectedElements={selectedIds}
            alignmentSuggestions={[]}
            onApplyAlignment={() => console.log('Apply alignment')}
            onToggleGrid={editor.toggleGrid}
            onToggleSnapping={editor.toggleSnap}
            onResetPositions={() => console.log('Reset positions')}
            gridEnabled={editorState.showGrid}
            snappingEnabled={editorState.snapEnabled}
          />
          
          {/* Background Panel - always visible */}
          <BackgroundPanel 
            content={cardContent}
            onUpdateBackground={(background) => editor.updateBackground(background)}
            onUploadImage={editor.uploadImage}
          />
        </div>
      </aside>
    );
  }

  const updateElementStyle = (styleUpdates: any) => {
    editor.updateElement(selectedElement.id, {
      style: { ...selectedElement.style, ...styleUpdates }
    });
  };

  const updateBackground = (backgroundUpdates: any) => {
    editor.updateBackground(backgroundUpdates);
  };

  return (
    <aside className={`w-80 bg-white border-l border-slate-200 overflow-y-auto ${className}`}>
      <div className="p-4">
        <h2 className="text-sm font-semibold text-slate-800 mb-4">Properties</h2>
        
        {/* Element Type Indicator */}
        <Card className="mb-4 p-3 bg-blue-50 border-blue-200">
          <div className="flex items-center space-x-2">
            <i className={`fas ${selectedElement.type === 'text' ? 'fa-font' : 'fa-image'} text-blue-600`}></i>
            <span className="text-sm font-medium text-blue-800">
              {selectedElement.type === 'text' ? 'Text Element' : 'Image Element'} Selected
            </span>
          </div>
        </Card>
        
        {/* Text Properties */}
        {selectedElement.type === 'text' && (
          <div className="space-y-4">
            {/* Font Family */}
            <div>
              <Label className="text-xs font-medium text-slate-700 mb-2">Font Family</Label>
              <Select
                value={selectedElement.style.fontFamily || 'Inter'}
                onValueChange={(value) => updateElementStyle({ fontFamily: value })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Inter">Inter</SelectItem>
                  <SelectItem value="Helvetica">Helvetica</SelectItem>
                  <SelectItem value="Georgia">Georgia</SelectItem>
                  <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Font Size */}
            <div>
              <Label className="text-xs font-medium text-slate-700 mb-2">
                Font Size: {selectedElement.style.fontSize || 16}px
              </Label>
              <Slider
                value={[selectedElement.style.fontSize || 16]}
                onValueChange={(value) => updateElementStyle({ fontSize: value[0] })}
                min={12}
                max={48}
                step={1}
                className="w-full"
              />
            </div>
            
            {/* Font Weight */}
            <div>
              <Label className="text-xs font-medium text-slate-700 mb-2">Font Weight</Label>
              <div className="grid grid-cols-4 gap-1">
                {['300', '400', '500', '700'].map((weight) => (
                  <Button
                    key={weight}
                    variant={selectedElement.style.fontWeight === weight ? "default" : "outline"}
                    size="sm"
                    className="text-xs"
                    onClick={() => updateElementStyle({ fontWeight: weight })}
                  >
                    {weight === '300' ? 'Light' : weight === '400' ? 'Regular' : weight === '500' ? 'Medium' : 'Bold'}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Text Color */}
            <div>
              <Label className="text-xs font-medium text-slate-700 mb-2">Text Color</Label>
              <div className="flex items-center space-x-2">
                <Input
                  type="color"
                  value={selectedElement.style.color || '#000000'}
                  onChange={(e) => updateElementStyle({ color: e.target.value })}
                  className="w-16 h-8 p-1 border border-slate-200 rounded"
                />
                <span className="text-sm text-slate-600 flex-1">
                  {selectedElement.style.color || '#000000'}
                </span>
              </div>
            </div>
            
            {/* Text Alignment */}
            <div>
              <Label className="text-xs font-medium text-slate-700 mb-2">Text Alignment</Label>
              <div className="grid grid-cols-4 gap-1">
                {['left', 'center', 'right', 'justify'].map((align) => (
                  <Button
                    key={align}
                    variant={selectedElement.style.textAlign === align ? "default" : "outline"}
                    size="sm"
                    onClick={() => updateElementStyle({ textAlign: align })}
                  >
                    <i className={`fas fa-align-${align}`}></i>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Background Properties */}
        <div className="mt-6 pt-6 border-t border-slate-200">
          <h3 className="text-sm font-semibold text-slate-800 mb-4">Background</h3>
          
          {/* Background Type */}
          <div className="mb-4">
            <div className="grid grid-cols-3 gap-1">
              {['gradient', 'solid', 'image'].map((type) => (
                <Button
                  key={type}
                  variant={cardContent.background?.type === type ? "default" : "outline"}
                  size="sm"
                  className="text-xs"
                  onClick={() => updateBackground({ type })}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Gradient Colors */}
          {cardContent.background?.type === 'gradient' && (
            <div className="space-y-3">
              <div>
                <Label className="text-xs font-medium text-slate-700 mb-2">Start Color</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    type="color"
                    value={cardContent.background.gradientStart || '#3B82F6'}
                    onChange={(e) => updateBackground({
                      gradientStart: e.target.value,
                      value: `linear-gradient(135deg, ${e.target.value}, ${cardContent.background.gradientEnd || '#2563EB'})`
                    })}
                    className="w-16 h-8 p-1 border border-slate-200 rounded"
                  />
                  <span className="text-sm text-slate-600">
                    {cardContent.background.gradientStart || '#3B82F6'}
                  </span>
                </div>
              </div>
              
              <div>
                <Label className="text-xs font-medium text-slate-700 mb-2">End Color</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    type="color"
                    value={cardContent.background.gradientEnd || '#2563EB'}
                    onChange={(e) => updateBackground({
                      gradientEnd: e.target.value,
                      value: `linear-gradient(135deg, ${cardContent.background.gradientStart || '#3B82F6'}, ${e.target.value})`
                    })}
                    className="w-16 h-8 p-1 border border-slate-200 rounded"
                  />
                  <span className="text-sm text-slate-600">
                    {cardContent.background.gradientEnd || '#2563EB'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Solid Color */}
          {cardContent.background?.type === 'solid' && (
            <div>
              <Label className="text-xs font-medium text-slate-700 mb-2">Background Color</Label>
              <div className="flex items-center space-x-2">
                <Input
                  type="color"
                  value={cardContent.background.value || '#3B82F6'}
                  onChange={(e) => updateBackground({ value: e.target.value })}
                  className="w-16 h-8 p-1 border border-slate-200 rounded"
                />
                <span className="text-sm text-slate-600">
                  {cardContent.background.value || '#3B82F6'}
                </span>
              </div>
            </div>
          )}
        </div>
        
        {/* Layer Actions */}
        <div className="mt-6 pt-6 border-t border-slate-200">
          <h3 className="text-sm font-semibold text-slate-800 mb-4">Actions</h3>
          
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
              onClick={() => {
                // Create a duplicate element
                const newElement = {
                  ...selectedElement,
                  id: `${selectedElement.id}-copy-${Date.now()}`,
                  style: {
                    ...selectedElement.style,
                    position: {
                      x: (selectedElement.style.position?.x || 0) + 20,
                      y: (selectedElement.style.position?.y || 0) + 20,
                    }
                  }
                };
                editor.setCardContent(prev => ({
                  ...prev,
                  elements: [...prev.elements, newElement]
                }));
              }}
            >
              <i className="fas fa-copy mr-2"></i>
              Duplicate Element
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
              onClick={() => {
                // Reset to default styles based on type
                const defaultStyle = selectedElement.type === 'text' 
                  ? { fontSize: 16, fontWeight: '400', fontFamily: 'Inter', color: '#000000', textAlign: 'left' }
                  : {};
                editor.updateElement(selectedElement.id, { style: defaultStyle });
              }}
            >
              <i className="fas fa-undo mr-2"></i>
              Reset to Default
            </Button>
            
            <Button
              variant="destructive"
              size="sm"
              className="w-full justify-start"
              onClick={() => editor.removeElement(selectedElement.id)}
            >
              <i className="fas fa-trash mr-2"></i>
              Delete Element
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
} 