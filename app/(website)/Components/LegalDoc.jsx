import React from 'react'
import Reveal from './Reveal'

// Renders a legal/policy document from structured data with reading aids:
// a constrained measure, a sticky anchored table of contents, and per-section
// scroll-reveal. `groups` = [{ id, heading?, intro?, sections: [{ id, title,
// body: [{ p } | { ul: [...] }] }] }].
const Node = ({ node }) => {
    if (node.ul) {
        return (
            <ul className="my-4 list-disc space-y-2 pl-5 text-neutral-600 dark:text-neutral-400">
                {node.ul.map((it, i) => (
                    <li key={i} className="leading-relaxed">{it}</li>
                ))}
            </ul>
        )
    }
    return <p className="mb-4 leading-relaxed text-neutral-600 dark:text-neutral-400">{node.p}</p>
}

const LegalDoc = ({ groups }) => {
    const toc = groups.flatMap((g) => [
        ...(g.heading ? [{ id: g.id, title: g.heading, top: true }] : []),
        ...g.sections.map((s) => ({ id: s.id, title: s.title, top: false })),
    ])

    return (
        <section className="bg-transparent py-16 md:py-24">
            <div className="cmpad">
                <div className="grid gap-12 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16">
                    {/* Table of contents */}
                    <aside className="hidden lg:block">
                        <div className="sticky top-28">
                            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400">
                                On this page
                            </h3>
                            <nav className="border-l border-neutral-200 dark:border-neutral-800">
                                {toc.map((t) => (
                                    <a
                                        key={t.id}
                                        href={`#${t.id}`}
                                        className={`-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-sm transition-colors hover:border-neutral-900 hover:text-neutral-900 dark:hover:border-white dark:hover:text-white ${t.top ? 'font-semibold text-neutral-700 dark:text-neutral-300' : 'text-neutral-500 dark:text-neutral-400'}`}
                                    >
                                        {t.title}
                                    </a>
                                ))}
                            </nav>
                        </div>
                    </aside>

                    {/* Content */}
                    <div className="max-w-2xl">
                        {groups.map((group, gi) => (
                            <div key={group.id} className={gi > 0 ? 'mt-16' : ''}>
                                {group.heading ? (
                                    <h2 id={group.id} className="scroll-mt-28 text-2xl font-bold tracking-tight text-neutral-900 dark:text-white md:text-3xl">
                                        {group.heading}
                                    </h2>
                                ) : null}
                                {group.intro ? (
                                    <p className="mt-4 leading-relaxed text-neutral-600 dark:text-neutral-400">
                                        {group.intro}
                                    </p>
                                ) : null}
                                <div className="mt-8 space-y-10">
                                    {group.sections.map((sec) => (
                                        <Reveal as="section" key={sec.id} amount={0.05}>
                                            <h3 id={sec.id} className="scroll-mt-28 text-lg font-bold tracking-tight text-neutral-900 dark:text-white">
                                                {sec.title}
                                            </h3>
                                            <div className="mt-3">
                                                {sec.body.map((node, i) => <Node key={i} node={node} />)}
                                            </div>
                                        </Reveal>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LegalDoc
