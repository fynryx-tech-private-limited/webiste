import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { getProjectById, projects } from '../data/projects'
import { PageHero } from '../components/ui/PageHero'
import { ProjectCard } from '../components/ui/ProjectCard'

export function ProjectDetailsPage() {
  const { projectId } = useParams<{ projectId: string }>()
  const project = projectId ? getProjectById(projectId) : undefined

  if (!project) {
    return (
      <div className="py-20 text-center px-4">
        <h2 className="text-2xl font-bold text-primary-900">Project not found</h2>
        <p className="mt-2 text-slate-600">This project may have been moved or does not exist.</p>
        <Link
          to="/projects"
          className="mt-6 inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Link>
      </div>
    )
  }

  const related = projects.filter((p) => p.id !== project.id).slice(0, 2)

  return (
    <>
      <PageHero title={project.title} subtitle={`${project.category}${project.year ? ` · ${project.year}` : ''}`} />

      <section className="py-12 md:py-20 bg-primary-50/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            to="/projects"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary-600 hover:text-primary-700"
          >
            <ArrowLeft className="h-4 w-4" />
            All Projects
          </Link>

          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden rounded-2xl bg-white shadow-md border border-primary-100"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full aspect-[4/3] object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <p className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-teal-500">
                {project.category}
              </p>
              <h2 className="mt-2 text-3xl font-bold text-primary-900">{project.title}</h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-600">{project.summary}</p>

              <div className="mt-6 flex flex-wrap gap-4 text-sm text-slate-500">
                {project.client && (
                  <div>
                    <span className="block text-[0.6rem] font-bold uppercase tracking-widest text-primary-400">
                      Client
                    </span>
                    {project.client}
                  </div>
                )}
                {project.year && (
                  <div>
                    <span className="block text-[0.6rem] font-bold uppercase tracking-widest text-primary-400">
                      Year
                    </span>
                    {project.year}
                  </div>
                )}
              </div>

              {/* <div className="mt-8">
                <Button to="/contact" size="lg">
                  Start a Similar Project
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </div> */}
            </motion.div>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.15 }}
              className="lg:col-span-2 rounded-2xl border border-primary-100 bg-white p-8 md:p-10 shadow-sm"
            >
              <h3 className="text-xl font-bold text-primary-900">About the Project</h3>
              <div className="mt-4 space-y-4 text-slate-600 leading-relaxed">
                {project.description.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                ))}
              </div>

              <h3 className="mt-10 text-xl font-bold text-primary-900">Key Features</h3>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {project.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-slate-600"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-sm bg-teal-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* <motion.aside
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.2 }}
              className="rounded-2xl border border-primary-100 bg-white p-8 shadow-sm h-fit"
            >
              <h3 className="text-lg font-bold text-primary-900">Technologies</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md bg-primary-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-8 border-t border-primary-100 pt-6">
                <p className="text-sm text-slate-600">
                  Want something like this for your business?
                </p>
                <Button to="/contact" variant="secondary" className="mt-4 w-full">
                  Get a Free Quote
                </Button>
              </div>
            </motion.aside> */}
          </div>

          {related.length > 0 && (
            <div className="mt-16">
              <h3 className="text-2xl font-bold text-primary-900 mb-8">More Projects</h3>
              <div className="grid gap-6 sm:grid-cols-2 max-w-4xl">
                {related.map((item, index) => (
                  <ProjectCard key={item.id} project={item} index={index} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
