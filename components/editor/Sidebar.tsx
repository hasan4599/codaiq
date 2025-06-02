import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faPalette,
  faCode,
  faImage,
  faFont,
  faBoxes,
  faCog,
  faSave,
  faGlobe
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Tooltip from '@radix-ui/react-tooltip';
import { useEditorStore } from '@/lib/store/editorStore';
import ThemePanel from './panels/ThemePanel';
import { toast } from 'sonner';

const menuItems = [
  {
    icon: faPalette,
    label: "Theme",
    panel: "theme",
    description: "Customize site theme"
  },
  {
    icon: faCode,
    label: "Components",
    panel: "components",
    description: "Add and edit components"
  },
  {
    icon: faImage,
    label: "Media",
    panel: "media",
    description: "Manage media files"
  },
  {
    icon: faFont,
    label: "Typography",
    panel: "typography",
    description: "Manage fonts and text styles"
  },
  {
    icon: faBoxes,
    label: "Sections",
    panel: "sections",
    description: "Manage page sections"
  },
  {
    icon: faCog,
    label: "Settings",
    panel: "settings",
    description: "Site settings"
  }
];

interface EditorSidebarProps {
  isCollapsed: boolean;
}

export default function EditorSidebar({ isCollapsed }: EditorSidebarProps) {
  const { activePanel, setActivePanel, isDirty, config, setIsDirty } = useEditorStore();

  const handleSave = async () => {
    if (!config) return;

    try {
      const response = await fetch(`/api/sites/${config.id}/config`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ config }),
      });

      if (!response.ok) {
        throw new Error('Failed to save site configuration');
      }

      setIsDirty(false);
      toast.success('Changes saved successfully');
    } catch (error) {
      console.error('Error saving site configuration:', error);
      toast.error('Failed to save changes');
    }
  };

  const renderPanel = () => {
    if (isCollapsed) return null;

    switch (activePanel) {
      case 'theme':
        return <ThemePanel />;
      case 'components':
        return <div className="p-6">Components panel coming soon...</div>;
      case 'media':
        return <div className="p-6">Media panel coming soon...</div>;
      case 'typography':
        return <div className="p-6">Typography panel coming soon...</div>;
      case 'sections':
        return <div className="p-6">Sections panel coming soon...</div>;
      case 'settings':
        return <div className="p-6">Settings panel coming soon...</div>;
      default:
        return null;
    }
  };

  return (
    <Tooltip.Provider delayDuration={200}>
      <div className="flex flex-col h-full">
        {/* Tools */}
        <div className="flex-none p-2 space-y-1 border-b border-gray-800/50">
          {menuItems.map((item) => (
            <Tooltip.Root key={item.panel}>
              <Tooltip.Trigger asChild>
                <button
                  onClick={() => setActivePanel(item.panel)}
                  className={`w-full flex items-center gap-3 p-2 rounded-lg transition-colors ${
                    activePanel === item.panel
                      ? 'bg-blue-500/20 text-blue-500'
                      : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-100'
                  } ${isCollapsed ? 'justify-center' : 'px-4'}`}
                >
                  <FontAwesomeIcon icon={item.icon as IconProp} className="w-5 h-5" />
                  {!isCollapsed && <span>{item.label}</span>}
                </button>
              </Tooltip.Trigger>
              {isCollapsed && (
                <Tooltip.Portal>
                  <Tooltip.Content
                    className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm shadow-xl border border-gray-800/50"
                    side="right"
                    sideOffset={5}
                  >
                    {item.description}
                    <Tooltip.Arrow className="fill-gray-900" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              )}
            </Tooltip.Root>
          ))}
        </div>

        {/* Panel Content */}
        <div className="flex-1 overflow-y-auto">
          {renderPanel()}
        </div>

        {/* Actions */}
        <div className="flex-none p-2 border-t border-gray-800/50 space-y-2">
          {/* Save Button */}
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <button
                onClick={handleSave}
                disabled={!isDirty}
                className={`flex items-center justify-center gap-2 p-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                  isCollapsed ? 'px-3' : 'px-4 w-full'
                }`}
              >
                <FontAwesomeIcon icon={faSave as IconProp} className="w-4 h-4" />
                {!isCollapsed && <span>Save Changes</span>}
              </button>
            </Tooltip.Trigger>
            {isCollapsed && (
              <Tooltip.Portal>
                <Tooltip.Content
                  className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm shadow-xl border border-gray-800/50"
                  side="right"
                  sideOffset={5}
                >
                  Save Changes
                  <Tooltip.Arrow className="fill-gray-900" />
                </Tooltip.Content>
              </Tooltip.Portal>
            )}
          </Tooltip.Root>

          {/* View Site Button */}
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <button
                className={`flex items-center justify-center gap-2 p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors ${
                  isCollapsed ? 'px-3' : 'px-4'
                }`}
              >
                <FontAwesomeIcon icon={faGlobe as IconProp} className="w-4 h-4" />
                {!isCollapsed && <span>View Site</span>}
              </button>
            </Tooltip.Trigger>
            {isCollapsed && (
              <Tooltip.Portal>
                <Tooltip.Content
                  className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm shadow-xl border border-gray-800/50"
                  side="right"
                  sideOffset={5}
                >
                  View Site
                  <Tooltip.Arrow className="fill-gray-900" />
                </Tooltip.Content>
              </Tooltip.Portal>
            )}
          </Tooltip.Root>
        </div>
      </div>
    </Tooltip.Provider>
  );
} 