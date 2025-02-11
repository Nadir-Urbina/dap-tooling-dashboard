'use client';

import { useEffect, useState } from 'react';
import ToolCard from './ToolCard';
import { client } from '@/lib/sanity';
import { useAuth } from '@/components/providers/AuthProvider';

interface Tool {
  _id: string;
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

interface ToolGridProps {
  tools: Tool[];
}

export default function ToolGrid({ tools }: ToolGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tools.map((tool) => (
        <ToolCard key={tool._id} tool={tool} />
      ))}
    </div>
  );
} 