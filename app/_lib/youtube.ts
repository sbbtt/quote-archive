// app/_lib/youtube.ts
export function extractYouTubeId(url: string): string | null {
  try {
    // 1) shorts 링크
    if (url.includes('youtube.com/shorts/')) {
      return url.split('youtube.com/shorts/')[1].split('?')[0];
    }

    // 2) youtu.be 단축 링크
    if (url.includes('youtu.be/')) {
      return url.split('youtu.be/')[1].split('?')[0];
    }

    // 3) 일반 watch 링크
    if (url.includes('watch?v=')) {
      return url.split('watch?v=')[1].split('&')[0];
    }

    // 4) 이미 embed 형식
    if (url.includes('/embed/')) {
      return url.split('/embed/')[1].split('?')[0];
    }

    return null;
  } catch {
    return null;
  }
}

export function getYouTubeThumbnail(url: string): string | null {
  const id = extractYouTubeId(url);
  if (!id) return null;
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}
