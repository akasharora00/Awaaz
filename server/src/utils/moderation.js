const blockedPatterns = [
  /\b(hate|idiot|stupid|worthless|loser|moron|pathetic)\b/i,
  /\b(kill yourself|go die|nobody needs you)\b/i,
  /\b(abuse|bully|harass|shame)\b/i,
  /\b(trash|disgusting|useless)\b/i
];

export const isSupportiveComment = (content) => {
  return !blockedPatterns.some((pattern) => pattern.test(content));
};
