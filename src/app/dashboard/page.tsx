'use client'

import { Suspense } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ToolGrid from '@/components/tools/ToolGrid';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { useEffect, useState } from 'react'
import { useAuth } from '@/components/providers/AuthProvider'
import { client } from '@/lib/sanity'
import ToolCard from '@/components/tools/ToolCard'

interface Tool {
  _id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  platforms: string[];
}

export default function DashboardPage() {
  const { user } = useAuth()
  const [tools, setTools] = useState<Tool[]>([])

  useEffect(() => {
    async function fetchTools() {
      if (!user) return

      const userData = await client.fetch(`
        *[_type == "user" && firebaseId == $userId][0]{
          roles[]->{
            _id,
            key,
            name
          }
        }
      `, { userId: user.uid })

      if (!userData) return

      const userTools = await client.fetch(`
        *[_type == "tool" && count(requiredRoles[references($userRoles)]) > 0]{
          _id,
          name,
          description,
          url,
          "category": requiredRoles[0]->.name,
          platforms
        }
      `, { userRoles: userData.roles.map((role: any) => role._id) })

      setTools(userTools)
    }

    fetchTools()
  }, [user])

  return (
    <DashboardLayout>
      <div className="px-4 py-6">
        <h1 className="text-3xl font-semibold text-gray-900 mb-6">
          Your Tools
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <ToolCard key={tool._id} tool={tool} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
} 