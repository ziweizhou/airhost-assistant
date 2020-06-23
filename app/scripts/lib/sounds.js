export const SOUNDS = [
  { id: 'd1', name: 'Digital Ring 01', file: 'sounds/digital-01.wav' },
  { id: 'd2', name: 'Digital Ring 02', file: 'sounds/digital-02.wav' },
  { id: 'd3', name: 'Digital Ring 03', file: 'sounds/digital-03.wav' },
  { id: 'r1', name: 'Real Ring 01', file: 'sounds/real-01.wav' },
  { id: 'r2', name: 'Real Ring 02', file: 'sounds/real-02.wav' },
  { id: 'r3', name: 'Real Ring 03', file: 'sounds/real-03.wav' },
]

export const playSound = (id, duration = 5000) => {
  if (window.audio) return

  const sound = SOUNDS.find(s => s.id === id )
  if (!sound) return

  window.audio = new Audio(chrome.runtime.getURL(sound.file))
  window.audio.loop = true
  window.audio.play()
  setTimeout(() => stopSound(), duration)
}

export const stopSound = () => {
  if (window.audio) {
    window.audio.pause()
    window.audio = null
  }
}
