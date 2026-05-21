import type {
  Admin,
  Message,
  MessageInput,
  Project,
  ProjectInput,
  Service,
  ServiceInput,
} from '../types'

const TOKEN_KEY = 'akat_admin_token'

// Same-origin (/api) by default. Set VITE_API_URL at build time to point the
// frontend at a backend hosted elsewhere (e.g. a Render/VPS API URL).
const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')

export const tokenStore = {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: (t: string) => localStorage.setItem(TOKEN_KEY, t),
  clear: () => localStorage.removeItem(TOKEN_KEY),
}

class ApiError extends Error {
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = tokenStore.get()
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  }
  if (options.body && !(options.body instanceof FormData))
    headers['Content-Type'] = 'application/json'
  if (token) headers['Authorization'] = `Bearer ${token}`

  const res = await fetch(`${API_BASE}/api${path}`, { ...options, headers })

  if (res.status === 204) return undefined as T

  let data: unknown = null
  const text = await res.text()
  if (text) {
    try {
      data = JSON.parse(text)
    } catch {
      data = text
    }
  }

  if (!res.ok) {
    const msg =
      (data && typeof data === 'object' && 'error' in data
        ? (data as { error: string }).error
        : null) || `İstek başarısız (${res.status})`
    if (res.status === 401) {
      tokenStore.clear()
      // Notify the app that the session expired — but not for the login
      // attempt itself (a 401 there just means wrong credentials).
      if (path !== '/auth/login') {
        window.dispatchEvent(new Event('auth:expired'))
      }
    }
    throw new ApiError(msg, res.status)
  }

  return data as T
}

export const api = {
  // Auth
  login: (username: string, password: string) =>
    request<{ token: string; user: Admin }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }),
  me: () => request<{ user: Admin }>('/auth/me'),
  changePassword: (currentPassword: string, newPassword: string) =>
    request<{ ok: true }>('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({ currentPassword, newPassword }),
    }),

  // Projects
  listProjects: () => request<Project[]>('/projects'),
  createProject: (data: ProjectInput) =>
    request<Project>('/projects', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  updateProject: (id: number, data: ProjectInput) =>
    request<Project>(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  deleteProject: (id: number) =>
    request<{ ok: true }>(`/projects/${id}`, { method: 'DELETE' }),

  // Services
  listServices: () => request<Service[]>('/services'),
  createService: (data: ServiceInput) =>
    request<Service>('/services', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  updateService: (id: number, data: ServiceInput) =>
    request<Service>(`/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  deleteService: (id: number) =>
    request<{ ok: true }>(`/services/${id}`, { method: 'DELETE' }),

  // Upload
  uploadImage: async (file: File) => {
    const fd = new FormData()
    fd.append('image', file)
    return request<{ url: string }>('/upload', { method: 'POST', body: fd })
  },

  // Messages
  sendMessage: (data: MessageInput) =>
    request<{ ok: true }>('/messages', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  listMessages: () => request<Message[]>('/messages'),
  unreadCount: () => request<{ count: number }>('/messages/unread-count'),
  markMessageRead: (id: number, is_read: boolean) =>
    request<{ ok: true }>(`/messages/${id}/read`, {
      method: 'PATCH',
      body: JSON.stringify({ is_read }),
    }),
  deleteMessage: (id: number) =>
    request<{ ok: true }>(`/messages/${id}`, { method: 'DELETE' }),
}

export { ApiError }
