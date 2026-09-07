export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  category: string;
  author: string;
  date: string; // ISO date
  readTime: string;
  accent: "green" | "clay" | "sand" | "moss";
}

// Replace this with a fetch to your Express/MongoDB API, e.g.:
// export async function getAllBlogs(): Promise<BlogPost[]> {
//   const res = await fetch(`${process.env.API_URL}/api/blogs`, { next: { revalidate: 60 } });
//   return res.json();
// }
export const blogPosts: BlogPost[] = [
  {
    slug: "mornings-in-the-forest",
    title: "What a Morning at Forrest Vibes Actually Looks Like",
    excerpt:
      "Bird calls instead of alarms, mist over the lawn, and coffee on the deck — a walk-through of a typical morning at the villa.",
    content: [
      "There's no alarm clock at Forrest Vibes — the birds start well before you'd set one anyway. By the time the mist starts lifting off the lawn, most guests are already out on the deck with a cup of coffee, watching the trees around the property slowly come into focus.",
      "Breakfast is kept simple and seasonal: whatever's fresh from the local market that morning, served on the terrace if the weather holds. Most people linger here longer than they planned to.",
      "If you're an early riser, the short trail behind the property is worth the twenty minutes before breakfast — it loops through the pine cover and back down to the garden gate.",
    ],
    category: "Guest Life",
    author: "Forrest Vibes Team",
    date: "2026-08-02",
    readTime: "4 min read",
    accent: "green",
  },
  {
    slug: "dehradun-weekend-itinerary",
    title: "A Relaxed 3-Day Weekend Itinerary in Dehradun",
    excerpt:
      "No rushed sightseeing — just a slow, doable plan for a long weekend based out of the valley.",
    content: [
      "Dehradun rewards a slower pace. This itinerary skips the rushed checklist approach and instead spreads three days across a handful of things actually worth doing.",
      "Day one is for arriving and doing nothing — settle in, walk the property, get your bearings. Day two heads out toward Robber's Cave in the morning and Sahastradhara by afternoon. Day three is kept open for whichever of the two you want to revisit.",
      "If you're driving up from Delhi, budget extra time on the return — weekend traffic out of the hills builds up fast after 4pm.",
    ],
    category: "Travel Guide",
    author: "Aman Rawat",
    date: "2026-07-18",
    readTime: "6 min read",
    accent: "clay",
  },
  {
    slug: "villa-vs-hotel",
    title: "Villa Stay vs Hotel: What Actually Changes for a Family Trip",
    excerpt:
      "The practical differences that matter when you're traveling with kids or extended family — not just the marketing pitch.",
    content: [
      "The usual pitch for villa stays is 'more space, more privacy' — true, but it undersells what actually changes day to day when you're traveling with family.",
      "The biggest shift is control over timing. Nobody's waiting on a shared breakfast slot or a checkout deadline that doesn't match nap schedules. Meals, common areas, and the garden are yours for the stay.",
      "It's not the right fit for everyone — if you want daily housekeeping without asking and a packed activity desk, a hotel still does that better. But for a family that wants to set its own pace, a villa usually wins.",
    ],
    category: "Travel Guide",
    author: "Forrest Vibes Team",
    date: "2026-07-05",
    readTime: "5 min read",
    accent: "sand",
  },
  {
    slug: "seasonal-garden-notes",
    title: "Notes From the Garden: What's Blooming This Month",
    excerpt:
      "A running log of what's flowering around the property through the seasons, for guests who ask about the flower beds.",
    content: [
      "Guests ask about the flower beds often enough that we started keeping notes. Right now the beds along the front path are mostly marigold and cosmos, with the roses further back just starting a second bloom.",
      "By late autumn the color shifts toward chrysanthemums, and the lawn itself gets that deep green that only shows up after the monsoon.",
      "If you're visiting specifically to see something in bloom, message us ahead of time and we'll tell you what's likely to be out.",
    ],
    category: "Around the Villa",
    author: "Priya Semwal",
    date: "2026-06-22",
    readTime: "3 min read",
    accent: "moss",
  },
  {
    slug: "local-food-near-forrest-vibes",
    title: "Where to Eat Near Forrest Vibes (That Isn't a Tourist Trap)",
    excerpt:
      "A short, honest list of places nearby that locals actually go to — not the ones with the biggest signboards.",
    content: [
      "Most 'best places to eat' lists near hill towns point you to the same three restaurants with the biggest signboards. This isn't that list.",
      "For breakfast, the small dhaba a ten-minute drive down the main road does parathas better than anywhere else we've tried nearby. For dinner, ask our caretaker for the current recommendation — it changes depending on who's cooking that week.",
      "If you'd rather not leave the property at all, we can arrange a home-style thali cooked on-site with a day's notice.",
    ],
    category: "Food",
    author: "Aman Rawat",
    date: "2026-06-10",
    readTime: "4 min read",
    accent: "clay",
  },
  {
    slug: "packing-for-the-hills",
    title: "What to Actually Pack for a Hill Stay (By Season)",
    excerpt:
      "A season-by-season packing list based on what guests usually forget, not a generic travel-blog checklist.",
    content: [
      "Every general packing list tells you to bring layers. Here's what's actually specific to a stay here, broken down by season.",
      "Monsoon (July–September): a proper rain shell over an umbrella, and shoes you don't mind getting muddy on the garden paths. Winter (November–February): mornings and nights get cold enough for a proper jacket, even if afternoons are pleasant.",
      "Whatever the season, bring a torch — the walk from the parking area to the main house is well-lit, but the garden paths beyond it aren't.",
    ],
    category: "Travel Guide",
    author: "Forrest Vibes Team",
    date: "2026-05-28",
    readTime: "5 min read",
    accent: "sand",
  },
  {
    slug: "birdwatching-around-the-property",
    title: "A Beginner's Guide to Birdwatching Around the Property",
    excerpt:
      "You don't need binoculars or experience — just twenty quiet minutes on the deck in the early morning.",
    content: [
      "You don't need any equipment to start noticing birds here — just twenty quiet minutes on the deck between 6 and 7am, before the property wakes up.",
      "The tree line at the back of the garden is the most reliable spot. Regulars include barbets, bulbuls, and the occasional Himalayan woodpecker if you're patient.",
      "If you do want binoculars, the front desk keeps a couple of pairs guests are welcome to borrow.",
    ],
    category: "Around the Villa",
    author: "Priya Semwal",
    date: "2026-05-14",
    readTime: "4 min read",
    accent: "moss",
  },
  {
    slug: "planning-a-work-retreat",
    title: "Planning a Small Team Work Retreat Here — A Practical Guide",
    excerpt:
      "What to think through before booking a villa for a team offsite: numbers, connectivity, and a realistic schedule.",
    content: [
      "A handful of teams have used the property for small offsites, and a few things come up in almost every planning call.",
      "First, be realistic about group size — the space works comfortably for teams up to about twelve before it starts to feel tight for a shared work session. Second, check connectivity needs ahead of time; the wifi handles video calls fine, but confirm your specific setup with us first.",
      "For the schedule itself, resist the urge to pack every hour. The teams that get the most out of an offsite here leave real gaps for unstructured time.",
    ],
    category: "Work & Retreats",
    author: "Forrest Vibes Team",
    date: "2026-04-30",
    readTime: "6 min read",
    accent: "green",
  },
  {
    slug: "monsoon-at-the-villa",
    title: "The Villa During Monsoon: What Changes",
    excerpt:
      "Monsoon season shifts the whole rhythm of a stay here — here's what to expect if you're booking July through September.",
    content: [
      "Monsoon isn't the busiest season here, but it might be the most requested by returning guests once they've experienced it once.",
      "The garden turns a deeper green almost overnight, and the sound of rain on the roof at night is, for a lot of guests, the actual highlight of the stay. Day trips need more flexibility — plans can shift with the weather.",
      "Pack accordingly and build slack into your schedule, and monsoon can end up being the best time to visit rather than the risky one.",
    ],
    category: "Travel Guide",
    author: "Aman Rawat",
    date: "2026-04-12",
    readTime: "4 min read",
    accent: "clay",
  },
  {
    slug: "photography-spots-on-property",
    title: "Five Spots on the Property Worth Photographing",
    excerpt:
      "From the front lawn at golden hour to the tree-lined path at the back — where guests take their best photos.",
    content: [
      "Guests end up posting from a handful of the same spots, for good reason. The front lawn at golden hour, with the villa's white facade catching the last light, is the obvious one.",
      "Less obvious: the tree-lined path at the back of the property in early morning fog, and the upstairs balcony looking out over the garden right after the flower beds are watered.",
      "If you're shooting for real, ask about access to the rooftop — it's not always open, but the view is worth requesting.",
    ],
    category: "Around the Villa",
    author: "Priya Semwal",
    date: "2026-03-25",
    readTime: "3 min read",
    accent: "sand",
  },
  {
    slug: "getting-here-from-delhi",
    title: "Getting Here From Delhi: Road, Rail, or Flight?",
    excerpt:
      "A straightforward comparison of the three ways to reach us from Delhi, with real time and cost expectations.",
    content: [
      "Most guests coming from Delhi ask the same question first — should you drive, take the train, or fly? Each has a clear best case.",
      "Driving gives you the most flexibility and takes about six hours outside of weekend traffic. The train to Dehradun is comfortable and avoids traffic entirely, landing you a short cab ride from the property. Flying only makes sense if your schedule is tight — the time saved gets mostly eaten up by airport transfers on both ends.",
      "We're happy to arrange a pickup from the station or airport if you let us know your arrival time in advance.",
    ],
    category: "Travel Guide",
    author: "Forrest Vibes Team",
    date: "2026-03-08",
    readTime: "5 min read",
    accent: "moss",
  },
  {
    slug: "a-quiet-anniversary-stay",
    title: "Planning a Quiet Anniversary Stay: A Guest Story",
    excerpt:
      "One couple's account of a low-key anniversary weekend, and the small touches that made it work.",
    content: [
      "A guest wrote in after their stay to share how they'd planned a low-key anniversary weekend, and asked if we'd share it for others planning something similar.",
      "Their approach was simple: no packed itinerary, one dinner arranged in advance on the lawn, and the rest of the time left open. The small addition that made the most difference, by their account, was asking the caretaker to set up the garden lights for one evening.",
      "If you're planning something similar, reach out ahead of time — most of these small touches just need a day's notice.",
    ],
    category: "Guest Life",
    author: "Forrest Vibes Team",
    date: "2026-02-20",
    readTime: "4 min read",
    accent: "green",
  },
];

export function getAllBlogs(): BlogPost[] {
  return blogPosts;
}

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getOtherBlogs(slug: string, limit = 3): BlogPost[] {
  return blogPosts.filter((post) => post.slug !== slug).slice(0, limit);
}