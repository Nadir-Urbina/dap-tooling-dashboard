import Link from 'next/link';
import { Monitor, Smartphone, Tablet, Layout } from 'lucide-react'

interface Tool {
  name: string;
  description: string;
  url: string;
  icon?: {
    asset: {
      url: string;
    };
  };
  category: string;
  platforms: string[];
}

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const platformIcons = {
    desktop: <Monitor className="w-5 h-5 text-gray-500" />,
    mobile: <Smartphone className="w-5 h-5 text-gray-500" />,
    tablet: <Tablet className="w-5 h-5 text-gray-500" />
  };

  return (
    <Link
      href={tool.url}
      target="_blank"
      className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
    >
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-gray-100 rounded-md mr-4 flex items-center justify-center">
            <Layout className="w-6 h-6 text-gray-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{tool.name}</h3>
            <div className="flex gap-2 mt-1">
              {tool.platforms?.map((platform) => (
                <span key={platform} title={platform}>
                  {platformIcons[platform as keyof typeof platformIcons]}
                </span>
              ))}
            </div>
          </div>
        </div>
        <p className="text-gray-600 text-sm">{tool.description}</p>
      </div>
    </Link>
  );
} 