export function extractYouTubeVideoId(url: string): string | null {
  const regex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/(?:watch\?v=|embed\/|v\/|.+\/)?([^\s&?]+)/
  const match = url.match(regex)

  if (match && match[1]) {
    return match[1]
  } else {
    const shortUrlRegex = /(?:https?:\/\/)?youtu\.be\/([^\s&?]+)/
    const shortMatch = url.match(shortUrlRegex)
    return shortMatch ? shortMatch[1] : null
  }
}
