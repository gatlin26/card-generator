import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { CardPreview } from './card-preview';
import { ShareDialog } from './share-dialog';
import { useCardEditor } from '@/hooks/use-card-editor';
import { Slider } from '@/components/ui/slider';
import { useI18n } from '@/lib/i18n';
import { Share2, Download } from 'lucide-react';

interface MainCanvasProps {
  editor: ReturnType<typeof useCardEditor>;
  onToggleSidebar?: () => void;
  className?: string;
}

export function MainCanvas({ editor, onToggleSidebar, className = "" }: MainCanvasProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { cardContent, editorState } = editor;
  const { t } = useI18n();

  const handleZoomChange = (value: number[]) => {
    editor.setZoom(value[0]);
  };

  const zoomIn = () => {
    editor.setZoom(editorState.zoom + 0.25);
  };

  const zoomOut = () => {
    editor.setZoom(editorState.zoom - 0.25);
  };

  const fitToScreen = () => {
    editor.setZoom(1);
  };

  return (
    <main className={`flex-1 flex flex-col overflow-hidden ${className}`}>
      {/* Canvas Toolbar */}
      <div className="bg-white border-b border-slate-200 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={onToggleSidebar}
          >
            <i className="fas fa-bars"></i>
          </Button>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-slate-500">{t('zoom')}:</span>
            <Button variant="ghost" size="sm" onClick={zoomOut}>
              <i className="fas fa-minus"></i>
            </Button>
            <div className="w-20">
              <Slider
                value={[editorState.zoom]}
                onValueChange={handleZoomChange}
                min={0.25}
                max={2}
                step={0.25}
                className="w-full"
              />
            </div>
            <span className="text-sm text-slate-600 min-w-12 text-center">
              {Math.round(editorState.zoom * 100)}%
            </span>
            <Button variant="ghost" size="sm" onClick={zoomIn}>
              <i className="fas fa-plus"></i>
            </Button>
            <Button variant="ghost" size="sm" onClick={fitToScreen}>
              <i className="fas fa-expand-arrows-alt"></i>
            </Button>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Action Buttons */}
          <Button
            variant="ghost"
            size="sm"
            onClick={editor.undo}
            disabled={editorState.historyIndex <= 0}
            title={t('undo')}
          >
            <i className="fas fa-undo"></i>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={editor.redo}
            disabled={editorState.historyIndex >= editorState.history.length - 1}
            title={t('redo')}
          >
            <i className="fas fa-redo"></i>
          </Button>
          <div className="h-4 w-px bg-slate-300 mx-1"></div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              // 简单的下载功能，可以后续实现
              console.log('Download card');
            }}
            title={t('download')}
          >
            <Download className="w-4 h-4 mr-1" />
            <span className="hidden sm:inline">{t('download')}</span>
          </Button>
          <ShareDialog cardRef={cardRef}>
            <Button
              variant="ghost"
              size="sm"
              title={t('share')}
            >
              <Share2 className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">{t('share')}</span>
            </Button>
          </ShareDialog>
        </div>
      </div>
      
      {/* Canvas Area */}
      <div className="flex-1 card-canvas flex items-center justify-center p-4 overflow-auto">
        <CardPreview
          ref={cardRef}
          content={cardContent}
          editorState={editorState}
          onSelectElement={editor.selectElement}
          onStartEditing={editor.startEditing}
          onStopEditing={editor.stopEditing}
          onUpdateElement={editor.updateElement}
          onUploadImage={editor.uploadImage}
        />
      </div>
    </main>
  );
} 