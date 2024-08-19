export const getHistory = () => {
  return new Promise((resolve, reject) => {
    const timeAgo = new Date().getTime() - 1000 * 60 * 60 * 24 * 7
    const params = {
      text: "",

      startTime: timeAgo,
    }
    chrome.history.search(params).then((results) => {
      const items = processHistory(results)
      resolve(items)
    })
  })
}

type HistoryEntry = {
  name: string
  url: string
}

const processHistory = (results) => {
  const entries: HistoryEntry = results.map((entry) => {
    return {
      name: entry.title,
      url: entry.url,
      maxResults: 500,
    }
  })
  return entries
}
