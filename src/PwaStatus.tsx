import { useEffect, useState } from 'react'
import { useRegisterSW } from 'virtual:pwa-register/react'

interface InstallPrompt extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export default function PwaStatus({ active }: { active: boolean }) {
  const [installPrompt, setInstallPrompt] = useState<InstallPrompt | null>(null)
  const [installed, setInstalled] = useState(() => window.matchMedia('(display-mode: standalone)').matches)
  const [online, setOnline] = useState(navigator.onLine)
  const [error, setError] = useState('')
  const {
    offlineReady: [offlineReady],
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisterError: () => setError('Offline setup is unavailable. You can still play while online.'),
  })

  useEffect(() => {
    const beforeInstall = (event: Event) => {
      event.preventDefault()
      setInstallPrompt(event as InstallPrompt)
    }
    const installedHandler = () => { setInstalled(true); setInstallPrompt(null) }
    const onlineHandler = () => setOnline(navigator.onLine)
    window.addEventListener('beforeinstallprompt', beforeInstall)
    window.addEventListener('appinstalled', installedHandler)
    window.addEventListener('online', onlineHandler)
    window.addEventListener('offline', onlineHandler)
    return () => {
      window.removeEventListener('beforeinstallprompt', beforeInstall)
      window.removeEventListener('appinstalled', installedHandler)
      window.removeEventListener('online', onlineHandler)
      window.removeEventListener('offline', onlineHandler)
    }
  }, [])

  async function install() {
    if (!installPrompt) return
    try {
      await installPrompt.prompt()
      await installPrompt.userChoice
    } catch {
      setError('Use your browser’s menu to install this game.')
    }
    setInstallPrompt(null)
  }

  return (
    <aside className="pwa-panel" aria-label="App availability">
      <span role="status">{!online ? '● You’re offline' : offlineReady ? '● Ready for offline play' : '● Play anywhere'}</span>
      {!active && needRefresh && (
        <button className="text-button" onClick={() => {
          void updateServiceWorker(true).catch(() => setError('Update unavailable. Please try again when online.'))
        }}>Update available · Reload</button>
      )}
      {!active && !installed && (installPrompt
        ? <button className="text-button" onClick={() => void install()}>Install game ↗</button>
        : <details><summary>Install on your device</summary><p>In supported browsers, use the menu’s “Install app” option. On iPhone or iPad, open in Safari, tap Share, then “Add to Home Screen.” Offline play is available after the first successful load.</p></details>
      )}
      {error && <p role="status">{error}</p>}
    </aside>
  )
}
