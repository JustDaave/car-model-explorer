// Returns a list of years starting at this year and counting back.
// Example: getRecentYears(3) in 2026 -> [2026, 2025, 2024]
export function getRecentYears(count: number) {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: count }, (_, index) => currentYear - index);
}
