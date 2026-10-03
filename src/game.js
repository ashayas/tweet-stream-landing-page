export function resolveShot(aim, goalie) {
  if (Math.abs(aim) > 0.88) return 'wide';
  return Math.abs(aim - goalie) < 0.29 ? 'saved' : 'goal';
}
export function clampAim(value) { return Math.max(-1.5, Math.min(1.5, Number(value) || 0)); }
