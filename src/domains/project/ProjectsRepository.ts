export interface ProjectsRepository {
  createProject(): void
  updateProjectName(): void
  updateProjectSubDomain(): void
  deleteProject(): void
}