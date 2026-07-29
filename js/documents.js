(() => {
  const initializeDocumentShowcases = () => {
    document.querySelectorAll('[data-document-showcase]').forEach((showcase) => {
      if (showcase.dataset.initialized === 'true') return
      showcase.dataset.initialized = 'true'

      const filters = showcase.querySelectorAll('[data-document-filter]')
      const cards = showcase.querySelectorAll('[data-document-category]')

      const applyFilter = (selectedFilter) => {
        filters.forEach((button) => {
          const isActive = button.dataset.documentFilter === selectedFilter
          button.classList.toggle('active', isActive)
          button.setAttribute('aria-pressed', isActive ? 'true' : 'false')
        })

        cards.forEach((card) => {
          const categories = card.dataset.documentCategory.split(/\s+/)
          const isVisible = selectedFilter === 'all' || categories.includes(selectedFilter)
          card.classList.toggle('is-hidden', !isVisible)
        })
      }

      filters.forEach((button) => {
        button.addEventListener('click', () => applyFilter(button.dataset.documentFilter))
      })

      applyFilter('all')
    })
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeDocumentShowcases)
  } else {
    initializeDocumentShowcases()
  }
})()
