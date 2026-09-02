// Columns are rendered in this order.
export const eventCategories = [
  "In-House Events",
  "Competitive Tournaments",
  "Cash Cups",
  "UBCEA Crossovers",
];

// date: "YYYY-MM-DD", time: "HH:MM" (24h, local time).
// streamed: whether this event is broadcast at all.
// platform / link: only meaningful when streamed is true. If link is
// omitted, the live component falls back to the UBCEA Twitch channel.
export const events = [
  {
    category: "In-House Events",
    title: "Weekly Scrim Night",
    date: "2026-09-08",
    time: "19:00",
    durationMinutes: 90,
    streamed: false,
  },
  {
    category: "In-House Events",
    title: "Biweekly Ranked 3v3",
    date: "2026-09-15",
    time: "19:00",
    durationMinutes: 90,
    streamed: false,
  },
  {
    category: "Competitive Tournaments",
    title: "Gold vs. SFU",
    date: "2026-09-20",
    time: "18:00",
    durationMinutes: 120,
    team: "Gold",
    streamed: true,
    platform: "Twitch",
    link: "https://twitch.tv/ubcrocketleague",
  },
  {
    category: "Competitive Tournaments",
    title: "Blue vs. UVic",
    date: "2026-09-27",
    time: "18:00",
    durationMinutes: 120,
    team: "Blue",
    streamed: true,
    platform: "Twitch",
  },
  {
    category: "Cash Cups",
    title: "Fall Cash Cup #1",
    date: "2026-10-04",
    time: "17:00",
    durationMinutes: 180,
    streamed: true,
    platform: "Twitch",
    link: "https://twitch.tv/ubcrocketleague",
  },
  {
    category: "UBCEA Crossovers",
    title: "UBCEA Showcase Night",
    date: "2026-11-14",
    time: "18:00",
    durationMinutes: 120,
    streamed: false,
  },
];
