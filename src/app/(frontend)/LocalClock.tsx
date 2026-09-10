'use client'

import { useEffect, useState } from 'react'

export default function LocalClock() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const update = () => {
      const now = new Date()

      const date = `${now.getMonth() + 1}.${now.getDate()}.${String(now.getFullYear()).slice(-2)}`

      const clock = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }).format(now)

      setTime(`${date} ${clock}`)
    }

    update()
    const interval = setInterval(update, 1000)

    return () => clearInterval(interval)
  }, [])

  return <span>{time}</span>
}
