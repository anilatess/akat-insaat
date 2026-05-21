export type Project = {
  id: number
  slug: string
  title: string
  category: string
  location: string
  year: string
  image: string
  description: string
  status: 'Tamamlandı' | 'Devam Ediyor'
  sort_order?: number
}

export type Service = {
  id: number
  slug: string
  icon: string
  title: string
  short: string
  description: string
  features: string[]
  sort_order?: number
}

export type Admin = {
  id: number
  username: string
}

export type Message = {
  id: number
  name: string
  phone: string
  email: string
  service: string
  message: string
  is_read: number
  created_at: string
}

export type MessageInput = {
  name: string
  phone: string
  email?: string
  service?: string
  message: string
}

// Payloads for create/update (no server-managed fields)
export type ProjectInput = Omit<Project, 'id' | 'sort_order' | 'slug'> & {
  slug?: string
}
export type ServiceInput = Omit<Service, 'id' | 'sort_order' | 'slug'> & {
  slug?: string
}
