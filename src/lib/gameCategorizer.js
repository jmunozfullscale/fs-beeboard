export function getPlaytimeCategory(durationStr) {
  if (!durationStr || typeof durationStr !== 'string') return 'unknown';
  
  const minutesMatch = durationStr.match(/(\d+)/);
  if (!minutesMatch) return 'unknown';
  
  const minutes = parseInt(minutesMatch[1], 10);
  
  if (minutes < 0) return 'invalid';
  if (minutes <= 30) return 'short';
  if (minutes <= 60) return 'medium';
  if (minutes <= 120) return 'long';
  return 'epic';
}

export function getPlayerCountCategory(playersStr) {
  if (!playersStr || typeof playersStr !== 'string') return 'unknown';
  
  const lowerStr = playersStr.toLowerCase().trim();
  if (lowerStr.includes('solo') || lowerStr === '1' || lowerStr.includes('1 player')) return 'solo';
  
  const match = playersStr.match(/(\d+)\s*-\s*(\d+)/);
  if (match) {
    const min = parseInt(match[1], 10);
    const max = parseInt(match[2], 10);
    if (min > max) return 'invalid';
    if (max >= 6) return 'party';
    if (max === 2) return 'duel';
    return 'group';
  }
  
  const exactMatch = playersStr.match(/^(\d+)$/);
  if (exactMatch) {
    const count = parseInt(exactMatch[1], 10);
    if (count >= 6) return 'party';
    if (count === 2) return 'duel';
    return 'group';
  }
  
  return 'unknown';
}
