export interface Todo {
  id: string
  title: string
  dueDate: Date
  description: string
  createdAt: Date
  tags?: string[]
}
