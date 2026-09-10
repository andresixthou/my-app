import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import LocalClock from './LocalClock'
import './styles.css'

export const dynamic = 'force-dynamic'

function formatPostedDate(value: string) {
  const date = new Date(value)

  return new Intl.DateTimeFormat('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: '2-digit',
  })
    .format(date)
    .replace(/\//g, '.')
}

export default async function HomePage() {
  const payload = await getPayload({ config })

  const { docs: posts } = await payload.find({
    collection: 'work',
    sort: '-postedAt',
    limit: 100,
    depth: 2,
  })

  return (
    <main className="sixthou-home">
      <header className="site-header">
        <a className="wordmark" href="/">
          SIXTHOU
        </a>

        <div className="local-time">
          <LocalClock />
        </div>

        <nav className="site-nav">
          <a href="#work">WORK</a>
          <a href="#about">ABOUT</a>
        </nav>
      </header>

      <section className="intro">
        <div className="intro-meta">
          <span>01 — 26</span>
          <span>ARTIST / CREATIVE</span>
        </div>

        <p>
          Music, film, photography
          <br />
          and other things.
        </p>
      </section>

      <section id="work" className="work-section">
        <div className="section-heading">
          <span>WORK</span>
          <span>↓</span>
        </div>

        <div className="archive-list">
          {posts.length === 0 ? (
            <div className="archive-empty">
              <span>—</span>
              <span>No posts yet.</span>
            </div>
          ) : (
            posts.map((post) => {
              const href =
                post.destination === 'link'
                  ? post.externalUrl || '#'
                  : `/work/${post.id}`

              const isExternal = post.destination === 'link'

              return (
                <a
                  key={post.id}
                  className="archive-row"
                  href={href}
                  {...(isExternal
                    ? {
                        target: '_blank',
                        rel: 'noopener noreferrer',
                      }
                    : {})}
                >
                  <span className="archive-date">
                    {formatPostedDate(post.postedAt)}
                  </span>

                  <span className="archive-title">
                    {post.title}
                  </span>

                  <span className="archive-type">
                    {post.type || ''}
                  </span>
                </a>
              )
            })
          )}
        </div>
      </section>

      <section id="about" className="about-section">
        <div className="section-heading">
          <span>ABOUT</span>
          <span>02</span>
        </div>

        <p>
          An independent artist and creative working across
          music, film, photography and visual culture.
        </p>
      </section>

      <footer>
        <span>SIXTHOU</span>
        <span>© 2026</span>
      </footer>
    </main>
  )
}