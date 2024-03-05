import { useRouter } from 'vue-router'

export function useNavigation() {
  const router = useRouter()

  const goHome = () => {
    router.push({ name: 'home' })
  }

  const goProjects = () => {
    router.push({ name: 'projects' })
  }

  const goTasks = () => {
    router.push({ name: 'tasks' })
  }

  return { goHome, goProjects, goTasks }
}
