(() => {
  const initializeSocialNavigation = () => {
    const links = [...document.querySelectorAll('[data-social-section]')]
    if (links.length === 0) return

    const sections = links
      .map((link) => document.getElementById(link.dataset.socialSection))
      .filter(Boolean)

    const setActiveSection = (sectionId) => {
      links.forEach((link) => {
        const isActive = link.dataset.socialSection === sectionId
        link.classList.toggle('active', isActive)
        link.setAttribute('aria-current', isActive ? 'location' : 'false')
      })
    }

    links.forEach((link) => {
      link.addEventListener('click', () => setActiveSection(link.dataset.socialSection))
    })

    const observer = new IntersectionObserver((entries) => {
      const visibleEntry = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visibleEntry) setActiveSection(visibleEntry.target.id)
    }, {
      rootMargin: '-20% 0px -60% 0px',
      threshold: [0, 0.25, 0.5]
    })

    sections.forEach((section) => observer.observe(section))
    setActiveSection(window.location.hash.slice(1) || 'friends')
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSocialNavigation)
  } else {
    initializeSocialNavigation()
  }
})()
