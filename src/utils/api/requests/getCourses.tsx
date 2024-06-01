import { api } from '@/utils/api/instance.ts'

export const getCourses = () => api.get('courses')
