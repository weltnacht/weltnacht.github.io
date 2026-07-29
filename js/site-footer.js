(() => {
  const runtime = document.getElementById('site-runtime')
  if (!runtime) return

  const startAt = new Date(runtime.dataset.siteStart).getTime()
  if (!Number.isFinite(startAt)) return

  const pad = (value) => String(value).padStart(2, '0')

  const updateRuntime = () => {
    const elapsed = Math.max(0, Date.now() - startAt)
    const totalSeconds = Math.floor(elapsed / 1000)
    const days = Math.floor(totalSeconds / 86400)
    const hours = Math.floor((totalSeconds % 86400) / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    runtime.textContent = `本站已运行 ${days} 天 ${pad(hours)} 小时 ${pad(minutes)} 分 ${pad(seconds)} 秒`
  }

  updateRuntime()
  window.setInterval(updateRuntime, 1000)
})()
