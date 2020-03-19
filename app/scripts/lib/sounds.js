export const SOUNDS = [
  { id: 'd1', name: 'Digtal 01', file: 'sounds/digital-01.wav' },
  { id: 'd2', name: 'Digtal 02', file: 'sounds/digital-02.wav' },
  { id: 'd3', name: 'Digtal 03', file: 'sounds/digital-03.wav' },
  { id: 'r1', name: 'Real Ring 01', file: 'sounds/real-01.wav' },
  { id: 'r2', name: 'Real Ring 02', file: 'sounds/real-02.wav' },
  { id: 'r3', name: 'Real Ring 03', file: 'sounds/real-03.wav' },
]

export const playSound = (id, duration = 5000) => {
  const sound = SOUNDS.find(s => s.id === id )
  if (!sound) return
  
  const audio = new Audio(chrome.runtime.getURL(sound.file))
  audio.loop = true
  audio.play()
  setTimeout(() => audio.pause(), duration)
}
