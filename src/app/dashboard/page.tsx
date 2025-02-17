'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/components/providers/AuthProvider'
import { client } from '@/lib/sanity'
import ToolCard from '@/components/tools/ToolCard'
import DashboardLayout from '@/components/layout/DashboardLayout'

interface Tool {
  _id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  platforms: string[];
}

interface UserRole {
  _id: string;
  key: string;
  name: string;
}

export default function DashboardPage() {
  const { user } = useAuth()
  const [tools, setTools] = useState<Tool[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredTools, setFilteredTools] = useState<Tool[]>([])

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
      `, { userRoles: userData.roles.map((role: UserRole) => role._id) })

      setTools(userTools)
    }

    fetchTools()
  }, [user])

  useEffect(() => {
    const filtered = tools.filter(tool => 
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredTools(filtered)
  }, [searchTerm, tools])

  return (
    <DashboardLayout>
      <div className="px-4 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            Welcome, {user?.email}
          </h1>
          <p className="text-gray-600 mb-6">
            These are your tools based on your assigned role
          </p>
          
          <input
            type="text"
            placeholder="Search tools..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-300 
                     focus:outline-none focus:ring-2 focus:ring-yellow-400 
                     focus:border-transparent shadow-sm"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <ToolCard key={tool._id} tool={tool} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
} 