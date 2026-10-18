import {
  ArrowRight,
  FilePlus2,
  FolderKanban,
  Layers3,
  Sparkles,
  Type,
} from 'lucide-react';
import Link from 'next/link';

const shortcuts = [
  {
    title: 'Create a project',
    description: 'Set up your page generation and add keyword groups.',
    href: '/projects/new',
    icon: FilePlus2,
    iconClass: 'bg-blue-50 text-blue-600',
    action: 'Start a project',
  },
  {
    title: 'Explore projects',
    description: 'Review your projects and manage their generation.',
    href: '/projects',
    icon: FolderKanban,
    iconClass: 'bg-violet-50 text-violet-600',
    action: 'View projects',
  },
  {
    title: 'Generate variations',
    description: 'Create fresh copy with the Spintax generator.',
    href: '/spintax',
    icon: Type,
    iconClass: 'bg-emerald-50 text-emerald-600',
    action: 'Open Spintax',
  },
];

const workflow = [
  {
    number: '01',
    title: 'Add your keywords',
    description: 'Group the topics you want to turn into pages.',
  },
  {
    number: '02',
    title: 'Choose how to generate',
    description: 'Configure your project and select a generation method.',
  },
  {
    number: '03',
    title: 'Generate and export',
    description: 'Create your pages, then export the results as a CSV.',
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
        <header className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-sm font-medium text-blue-700">
            <Layers3 className="h-4 w-4" />
            <span>Workspace overview</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Welcome to Page Generator
          </h1>
          <p className="mt-2 max-w-2xl text-base leading-7 text-slate-600">
            Everything you need to create, manage, and export dynamic content pages.
          </p>
        </header>

        <section className="relative isolate overflow-hidden rounded-2xl bg-gradient-to-br from-slate-950 via-blue-950 to-blue-800 px-6 py-8 shadow-lg shadow-blue-950/10 sm:px-10 sm:py-10">
          <div className="absolute -right-16 -top-28 -z-10 h-80 w-80 rounded-full bg-blue-400/20 blur-3xl" />
          <div className="absolute bottom-0 right-0 -z-10 h-40 w-1/2 bg-gradient-to-l from-cyan-300/10 to-transparent" />
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-sm font-medium text-blue-100">
              <Sparkles className="h-4 w-4" />
              From keywords to pages
            </div>
            <h2 className="max-w-xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Build pages at scale, with less busywork.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-blue-100/85">
              Organize keyword groups, generate dynamic content, and export your
              finished pages from one simple workspace.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/projects/new"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-blue-950 shadow-sm transition hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <FilePlus2 className="h-4 w-4" />
                Create a project
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center rounded-lg border border-white/25 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Browse projects
              </Link>
            </div>
          </div>
          <div className="pointer-events-none absolute bottom-8 right-10 hidden h-44 w-52 rotate-3 rounded-2xl border border-white/20 bg-white/10 p-4 shadow-2xl backdrop-blur-sm lg:block">
            <div className="flex items-center gap-2 border-b border-white/15 pb-3">
              <div className="h-2 w-2 rounded-full bg-cyan-300" />
              <div className="h-2 w-16 rounded-full bg-white/50" />
            </div>
            <div className="mt-4 space-y-3">
              <div className="h-2 w-4/5 rounded-full bg-white/60" />
              <div className="h-2 w-full rounded-full bg-white/25" />
              <div className="h-2 w-3/5 rounded-full bg-white/25" />
              <div className="mt-4 flex gap-2">
                <div className="h-8 flex-1 rounded-lg bg-cyan-300/80" />
                <div className="h-8 w-8 rounded-lg border border-white/25" />
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-slate-900">
                Pick up where you need
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Jump straight into a tool or manage your content.
              </p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {shortcuts.map(({ title, description, href, icon: Icon, iconClass, action }) => (
              <Link
                key={title}
                href={href}
                className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                <div className="flex items-start justify-between">
                  <span className={`inline-flex rounded-lg p-2.5 ${iconClass}`}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <ArrowRight className="h-5 w-5 text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-600" />
                </div>
                <h3 className="mt-5 font-semibold text-slate-900">{title}</h3>
                <p className="mt-1.5 min-h-10 text-sm leading-5 text-slate-500">
                  {description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-700">
                  {action}
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="mb-2 inline-flex items-center gap-2 text-sm font-medium text-blue-700">
                <Layers3 className="h-4 w-4" />
                A simple workflow
              </div>
              <h2 className="text-xl font-semibold tracking-tight text-slate-900">
                From idea to export in three steps
              </h2>
            </div>
            <Link
              href="/projects/new"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 transition hover:text-blue-800"
            >
              Get started
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-7 grid gap-6 md:grid-cols-3 md:gap-8">
            {workflow.map(({ number, title, description }) => (
              <div key={number} className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-blue-700">
                  {number}
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
                  <p className="mt-1 text-sm leading-5 text-slate-500">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
