import type { Author, StartupDetails } from '@/types'

export const fixtureAuthor: Author = {
  _id: 'author-hemanth',
  githubId: 'fixture-github',
  name: 'Hemanth Reddy',
  username: 'nckhemanth0',
  image: 'https://github.com/nckhemanth0.png',
  bio: 'Backend, cloud, and AI engineering learner building portfolio-grade systems.',
}

export const fixtureStartups: StartupDetails[] = [
  {
    _id: 'startup-skillforge',
    _createdAt: '2026-06-10T00:00:00.000Z',
    title: 'SkillForge',
    slug: { current: 'skillforge' },
    description: 'AI learning paths that turn career goals into weekly projects and checkpoints.',
    category: 'Education',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop',
    views: 42,
    author: fixtureAuthor,
    pitch: 'SkillForge helps learners convert an outcome into a sequenced project plan, feedback loops, and measurable milestones.',
  },
  {
    _id: 'startup-clinipulse',
    _createdAt: '2026-06-08T00:00:00.000Z',
    title: 'CliniPulse',
    slug: { current: 'clinipulse' },
    description: 'A healthcare operations copilot for summarizing patient workflow bottlenecks.',
    category: 'Healthcare',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop',
    views: 31,
    author: fixtureAuthor,
    pitch: 'CliniPulse gives clinical teams an operational dashboard with AI-generated summaries of bottlenecks and follow-up risk.',
  },
]

