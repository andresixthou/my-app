import React from 'react'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'

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

export default async function WorkPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const payload = await getPayload({ config })

  let post

  try {
    post = await payload.findByID({
      collection: 'work',
      id,
      depth: 2,
    })
  } catch {
    notFound()
  }

  if (!post || post.destination === 'link') {
    notFound()
  }

  const cover =
    typeof post.cover === 'object' && post.cover
      ? post.cover
      : null

  return (
    <main className="sixthou-post">
      <header className="site-header">
        <a className="wordmark" href="/">
          SIXTHOU
        </a>

        <a className="post-back" href="/">
          ←
        </a>
      </header>

      <article className="post-content">
        <div className="post-meta">
          <span>{formatPostedDate(post.postedAt)}</span>
          <span>{post.type || ''}</span>
        </div>

        <h1>{post.title}</h1>

        {cover?.url && (
          <div className="post-cover">
            <img
              src={cover.url}
              alt={cover.alt || post.title}
            />
          </div>
        )}

        {post.statement && (
          <p className="post-statement">
            {post.statement}
          </p>
        )}

        {post.gallery && post.gallery.length > 0 && (
          <div className="post-gallery">
            {post.gallery.map((item, index) => {
              const image =
                typeof item.image === 'object' && item.image
                  ? item.image
                  : null

              if (!image?.url) return null

              return (
                <img
                  key={image.id || index}
                  src={image.url}
                  alt={image.alt || post.title}
                />
              )
            })}
          </div>
        )}
      </article>
    </main>
  )
}