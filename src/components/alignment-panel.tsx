import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  AlignVerticalJustifyCenter,
  AlignHorizontalJustifyCenter,
  AlignVerticalJustifyStart,
  AlignVerticalJustifyEnd,
  AlignHorizontalDistributeCenter,
  Grid3X3,
  Move,
  RotateCcw
} from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import type { AlignmentSuggestion } from '@/lib/layout-assistant';

interface AlignmentPanelProps {
  selectedElements: string[];
  alignmentSuggestions: AlignmentSuggestion[];
  onApplyAlignment: (type: AlignmentSuggestion['type']) => void;
  onToggleGrid: () => void;
  onToggleSnapping: () => void;
  onResetPositions: () => void;
  gridEnabled: boolean;
  snappingEnabled: boolean;
  className?: string;
}

export function AlignmentPanel({
  selectedElements,
  alignmentSuggestions,
  onApplyAlignment,
  onToggleGrid,
  onToggleSnapping,
  onResetPositions,
  gridEnabled,
  snappingEnabled,
  className = ""
}: AlignmentPanelProps) {
  const { t } = useI18n();

  const alignmentIcons = {
    'left': AlignLeft,
    'center': AlignCenter,
    'right': AlignRight,
    'top': AlignVerticalJustifyStart,
    'middle': AlignVerticalJustifyCenter,
    'bottom': AlignVerticalJustifyEnd,
    'distribute-horizontal': AlignHorizontalJustifyCenter,
    'distribute-vertical': AlignHorizontalDistributeCenter
  };

  const alignmentLabels = {
    'left': 'Left',
    'center': 'Center',
    'right': 'Right',
    'top': 'Top',
    'middle': 'Middle',
    'bottom': 'Bottom',
    'distribute-horizontal': 'Distribute H',
    'distribute-vertical': 'Distribute V'
  };

  return (
    <Card className={`w-full ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <Move className="w-5 h-5" />
          Layout Assistant
        </CardTitle>
        <div className="flex items-center gap-2">
          <Badge variant={selectedElements.length > 0 ? "default" : "secondary"} className="text-xs">
            {selectedElements.length} selected
          </Badge>
          {selectedElements.length >= 2 && (
            <Badge variant="outline" className="text-xs text-blue-600 dark:text-blue-400">
              {alignmentSuggestions.length} actions available
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Layout Controls */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Layout Controls
          </h4>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant={gridEnabled ? "default" : "outline"}
              size="sm"
              onClick={onToggleGrid}
              className="flex items-center gap-2 text-xs"
            >
              <Grid3X3 className="w-3 h-3" />
              Grid {gridEnabled ? 'On' : 'Off'}
            </Button>
            <Button
              variant={snappingEnabled ? "default" : "outline"}
              size="sm"
              onClick={onToggleSnapping}
              className="flex items-center gap-2 text-xs"
            >
              <Move className="w-3 h-3" />
              Snap {snappingEnabled ? 'On' : 'Off'}
            </Button>
          </div>
        </div>

        <Separator />

        {/* Alignment Actions */}
        {selectedElements.length >= 2 ? (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Alignment & Distribution
            </h4>
            
            {/* Basic Alignment */}
            <div className="space-y-2">
              <p className="text-xs text-gray-500 dark:text-gray-400">Horizontal Alignment</p>
              <div className="grid grid-cols-3 gap-1">
                {['left', 'center', 'right'].map((type) => {
                  const Icon = alignmentIcons[type as keyof typeof alignmentIcons];
                  const suggestion = alignmentSuggestions.find(s => s.type === type);
                  return (
                    <Button
                      key={type}
                      variant="outline"
                      size="sm"
                      disabled={!suggestion}
                      onClick={() => suggestion && onApplyAlignment(suggestion.type)}
                      className="flex items-center justify-center p-2 h-8"
                      title={alignmentLabels[type as keyof typeof alignmentLabels]}
                    >
                      <Icon className="w-3 h-3" />
                    </Button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs text-gray-500 dark:text-gray-400">Vertical Alignment</p>
              <div className="grid grid-cols-3 gap-1">
                {['top', 'middle', 'bottom'].map((type) => {
                  const Icon = alignmentIcons[type as keyof typeof alignmentIcons];
                  const suggestion = alignmentSuggestions.find(s => s.type === type);
                  return (
                    <Button
                      key={type}
                      variant="outline"
                      size="sm"
                      disabled={!suggestion}
                      onClick={() => suggestion && onApplyAlignment(suggestion.type)}
                      className="flex items-center justify-center p-2 h-8"
                      title={alignmentLabels[type as keyof typeof alignmentLabels]}
                    >
                      <Icon className="w-3 h-3" />
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Distribution */}
            {selectedElements.length >= 3 && (
              <div className="space-y-2">
                <p className="text-xs text-gray-500 dark:text-gray-400">Distribution</p>
                <div className="grid grid-cols-2 gap-1">
                  {['distribute-horizontal', 'distribute-vertical'].map((type) => {
                    const Icon = alignmentIcons[type as keyof typeof alignmentIcons];
                    const suggestion = alignmentSuggestions.find(s => s.type === type);
                    return (
                      <Button
                        key={type}
                        variant="outline"
                        size="sm"
                        disabled={!suggestion}
                        onClick={() => suggestion && onApplyAlignment(suggestion.type)}
                        className="flex items-center gap-1 text-xs h-8"
                        title={alignmentLabels[type as keyof typeof alignmentLabels]}
                      >
                        <Icon className="w-3 h-3" />
                        {type === 'distribute-horizontal' ? 'H' : 'V'}
                      </Button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-6">
            <Move className="w-8 h-8 text-gray-400 dark:text-gray-500 mx-auto mb-2" />
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              Select 2+ elements
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              to access alignment tools
            </p>
          </div>
        )}

        <Separator />

        {/* Quick Actions */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Quick Actions
          </h4>
          <Button
            variant="outline"
            size="sm"
            onClick={onResetPositions}
            disabled={selectedElements.length === 0}
            className="w-full flex items-center gap-2 text-xs"
          >
            <RotateCcw className="w-3 h-3" />
            Reset Positions
          </Button>
        </div>

        {/* Helper Text */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
          <p className="text-xs text-blue-700 dark:text-blue-300">
            <strong>Tips:</strong> Drag elements to see snap guides. Hold Shift to disable snapping temporarily.
          </p>
        </div>
      </CardContent>
    </Card>
  );
} 