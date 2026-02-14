import { useEffect } from 'react'

/**
 * Attaches an IntersectionObserver that adds the `visible` class
 * to every element with the `reveal` class once it enters the viewport.
 */
export default function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.12 }
    )

    const attach = () => {
      document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    }

    attach()

    // Re-attach after React renders more DOM nodes
    const mo = new MutationObserver(attach)
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mo.disconnect()
    }
  }, [])
}
