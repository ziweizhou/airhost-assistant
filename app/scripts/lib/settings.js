export const SETTINGS = {
  enabled: true,
  ringtone: 'd1',
  duration: 5
}

export const getSettings = () => {
  return new Promise((resolve) => {
    chrome.storage.local.get(settings => {
      resolve({ ...SETTINGS, ...settings })
    })
  })
}
