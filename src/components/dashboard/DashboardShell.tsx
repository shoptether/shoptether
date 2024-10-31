'use client'

import { DashboardLayout } from './DashboardLayout'

interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  return <DashboardLayout>{children}</DashboardLayout>
}