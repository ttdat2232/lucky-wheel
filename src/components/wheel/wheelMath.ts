export function getSegmentAngle(total: number) {
  return 360 / total;
}

export function normalizeAngle(angle: number) {
  return ((angle % 360) + 360) % 360;
}

export function getWinnerIndex(
  rotation: number,
  total: number,
  pointerOffset = 90, // mũi tên bên phải
) {
  const segmentAngle = getSegmentAngle(total);
  const pointerAngle = normalizeAngle(
    360 - normalizeAngle(rotation) + pointerOffset,
  );

  return Math.floor(pointerAngle / segmentAngle);
}

export function getFontSize(total: number) {
  if (total > 30) return 1.6;
  if (total > 20) return 2.2;
  if (total > 10) return 3.2;
  return 4.2;
}
