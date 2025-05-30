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
  const { activePanel, setActivePanel, isDirty, config } = useEditorStore();

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
    } catch (error) {
      console.error('Error saving site configuration:', error);
      // TODO: Add error toast notification
    }
  };

  return (
    <Tooltip.Provider delayDuration={200}>
      <nav className="py-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.label}>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <button
                    onClick={() => setActivePanel(item.panel)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                      activePanel === item.panel ? 'bg-blue-500/20 text-blue-500' : 'hover:bg-gray-800/50'
                    } ${isCollapsed ? 'justify-center' : ''}`}
                  >
                    <FontAwesomeIcon 
                      icon={item.icon as IconProp} 
                      className="w-5 h-5"
                    />
                    {!isCollapsed && (
                      <span className="text-sm font-medium flex-1 text-left">
                        {item.label}
                      </span>
                    )}
                  </button>
                </Tooltip.Trigger>
                {isCollapsed && (
                  <Tooltip.Portal>
                    <Tooltip.Content
                      className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm shadow-xl border border-gray-800/50"
                      side="right"
                      sideOffset={5}
                    >
                      <div className="flex flex-col">
                        <span className="font-medium">{item.label}</span>
                        <span className="text-gray-400 text-xs">{item.description}</span>
                      </div>
                      <Tooltip.Arrow className="fill-gray-900" />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                )}
              </Tooltip.Root>
            </li>
          ))}
        </ul>

        {/* Action Buttons */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800/50">
          <div className="flex gap-2">
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <button
                  onClick={handleSave}
                  disabled={!isDirty}
                  className={`flex-1 flex items-center justify-center gap-2 p-2 rounded-lg transition-colors ${
                    isDirty ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-800/50 cursor-not-allowed'
                  } ${isCollapsed ? 'px-3' : 'px-4'}`}
                >
                  <FontAwesomeIcon icon={faSave as IconProp} className="w-4 h-4" />
                  {!isCollapsed && <span>Save</span>}
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

            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <button
                  className={`flex items-center justify-center gap-2 p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors ${
                    isCollapsed ? 'px-3' : 'px-4'
                  }`}
                >
                  <FontAwesomeIcon icon={faGlobe as IconProp} className="w-4 h-4" />
                  {!isCollapsed && <span>Publish</span>}
                </button>
              </Tooltip.Trigger>
              {isCollapsed && (
                <Tooltip.Portal>
                  <Tooltip.Content
                    className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm shadow-xl border border-gray-800/50"
                    side="right"
                    sideOffset={5}
                  >
                    Publish Site
                    <Tooltip.Arrow className="fill-gray-900" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              )}
            </Tooltip.Root>
          </div>
        </div>
      </nav>
    </Tooltip.Provider>
  );
} 