import { useEditorStore } from '@/lib/store/editorStore';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export default function ThemePanel() {
  const { config, updateConfig } = useEditorStore();

  if (!config) return null;

  const handleColorChange = (color: string, key: string) => {
    updateConfig({
      theme: {
        ...config.theme,
        colors: {
          ...config.theme.colors,
          [key]: color
        }
      }
    });
  };

  const handleFontChange = (value: string, key: string) => {
    updateConfig({
      theme: {
        ...config.theme,
        typography: {
          ...config.theme.typography,
          [key]: value
        }
      }
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Colors */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Colors</h3>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(config.theme.colors).map(([key, value]) => (
            <div key={key} className="space-y-2">
              <Label className="capitalize">{key}</Label>
              <div className="flex gap-2">
                <div 
                  className={cn(
                    "w-10 h-10 rounded-lg border border-gray-800/50",
                    key === 'background' && "bg-white"
                  )}
                  style={{ backgroundColor: value }}
                />
                <Input
                  type="text"
                  value={value}
                  onChange={(e) => handleColorChange(e.target.value, key)}
                  className="flex-1"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Typography */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Typography</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Heading Font</Label>
            <Input
              type="text"
              value={config.theme.typography.headingFont}
              onChange={(e) => handleFontChange(e.target.value, 'headingFont')}
            />
          </div>
          <div className="space-y-2">
            <Label>Body Font</Label>
            <Input
              type="text"
              value={config.theme.typography.bodyFont}
              onChange={(e) => handleFontChange(e.target.value, 'bodyFont')}
            />
          </div>
          <div className="space-y-2">
            <Label>Base Size</Label>
            <Input
              type="text"
              value={config.theme.typography.baseSize}
              onChange={(e) => handleFontChange(e.target.value, 'baseSize')}
            />
          </div>
          <div className="space-y-2">
            <Label>Scale Ratio</Label>
            <Input
              type="number"
              value={config.theme.typography.scaleRatio}
              onChange={(e) => handleFontChange(e.target.value, 'scaleRatio')}
              step={0.05}
              min={1}
              max={2}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 