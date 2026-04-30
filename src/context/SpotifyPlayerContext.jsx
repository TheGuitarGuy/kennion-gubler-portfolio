import { createContext, useContext, useEffect, useRef, useState } from 'react'

export const SC_PLAYLIST_URL = 'https://soundcloud.com/user-854286199/sets/portfolio-making-music'

const MusicPlayerContext = createContext({
  playing: false,
  playerReady: false,
  trackInfo: { title: '', artist: 'Loading...' },
  toggle: () => { },
  nextTrack: () => { },
  prevTrack: () => { },
})

export function SpotifyPlayerProvider({ children }) {
  const [playing, setPlaying] = useState(false)
  const [playerReady, setPlayerReady] = useState(false)
  const [trackInfo, setTrackInfo] = useState({ title: '', artist: 'Waiting to play...' })
  const widgetRef = useRef(null)
  const soundsRef = useRef([]) // cached playlist tracks for shuffle + prev/next
  const hasStartedRef = useRef(false) // true after first play — resume instead of reshuffle
  const currentIndexRef = useRef(-1)

  const normalizeIndex = (index, total) => {
    if (!Number.isFinite(total) || total <= 0) return 0
    return ((index % total) + total) % total
  }

  const playAtIndex = (index) => {
    const w = widgetRef.current
    const sounds = soundsRef.current
    if (!w || sounds.length === 0) return

    const nextIndex = normalizeIndex(index, sounds.length)
    currentIndexRef.current = nextIndex
    hasStartedRef.current = true
    w.skip(nextIndex)
    setTimeout(() => w.play(), 220)
  }

  const playRandomTrack = () => {
    const sounds = soundsRef.current
    if (sounds.length === 0) {
      widgetRef.current?.play()
      hasStartedRef.current = true
      return
    }

    const idx = Math.floor(Math.random() * sounds.length)
    playAtIndex(idx)
  }

  const stepTrack = direction => {
    if (!widgetRef.current || !playerReady) return

    const sounds = soundsRef.current
    if (sounds.length === 0) {
      widgetRef.current.play()
      hasStartedRef.current = true
      return
    }

    if (!hasStartedRef.current) {
      playAtIndex(direction > 0 ? 0 : sounds.length - 1)
      return
    }

    widgetRef.current.getCurrentSoundIndex(idx => {
      const fallback = Number.isInteger(currentIndexRef.current) && currentIndexRef.current >= 0
        ? currentIndexRef.current
        : 0
      const current = Number.isInteger(idx) && idx >= 0 ? idx : fallback
      currentIndexRef.current = current
      playAtIndex(current + direction)
    })
  }

  const nextTrack = () => stepTrack(1)
  const prevTrack = () => stepTrack(-1)

  useEffect(() => {
    let iframe = document.getElementById('sc-bg-player')
    if (!iframe) {
      iframe = document.createElement('iframe')
      iframe.id = 'sc-bg-player'
      iframe.allow = 'autoplay'
      iframe.src = `https://w.soundcloud.com/player/?url=${encodeURIComponent(SC_PLAYLIST_URL)}&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&buying=false&sharing=false`
      iframe.style.cssText = 'position:fixed;top:-9999px;left:-9999px;width:300px;height:166px;border:none;pointer-events:none'
      document.body.appendChild(iframe)
    }

    const bind = () => {
      if (widgetRef.current) return
      const w = window.SC.Widget(iframe)
      widgetRef.current = w

      w.bind(window.SC.Widget.Events.READY, () => {
        setPlayerReady(true)
        w.getSounds(list => { soundsRef.current = list || [] })
        w.getCurrentSoundIndex(idx => {
          if (Number.isInteger(idx) && idx >= 0) currentIndexRef.current = idx
        })
      })

      w.bind(window.SC.Widget.Events.PLAY, () => {
        setPlaying(true)
        w.getCurrentSound(s => {
          if (s) setTrackInfo({ title: s.title || '', artist: s.user?.username || '' })
        })
        w.getCurrentSoundIndex(idx => {
          if (Number.isInteger(idx) && idx >= 0) currentIndexRef.current = idx
        })
      })

      w.bind(window.SC.Widget.Events.PAUSE, () => setPlaying(false))

      w.bind(window.SC.Widget.Events.FINISH, () => {
        setPlaying(false)
        setTimeout(() => nextTrack(), 300)
      })
    }

    if (window.SC?.Widget) {
      bind()
    } else if (!document.querySelector('script[src*="w.soundcloud.com/player/api"]')) {
      const s = document.createElement('script')
      s.src = 'https://w.soundcloud.com/player/api.js'
      s.async = true
      s.onload = bind
      document.body.appendChild(s)
    } else {
      const iv = setInterval(() => { if (window.SC?.Widget) { clearInterval(iv); bind() } }, 100)
      return () => clearInterval(iv)
    }
  }, [])

  const toggle = () => {
    if (!widgetRef.current || !playerReady) return
    if (playing) {
      widgetRef.current.pause()
    } else if (!hasStartedRef.current) {
      playRandomTrack()
    } else {
      widgetRef.current.play()
    }
  }

  return (
    <MusicPlayerContext.Provider value={{ playing, playerReady, trackInfo, toggle, nextTrack, prevTrack }}>
      {children}
    </MusicPlayerContext.Provider>
  )
}

export function useSpotifyPlayer() {
  return useContext(MusicPlayerContext)
}
