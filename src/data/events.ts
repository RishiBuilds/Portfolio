import type { EventDetail } from "@/types";

export const events: EventDetail[] = [
  {
    slug: "monad-blitz-mumbai-v3-the-agent-economy",
    title: "Monad Blitz Mumbai V3 - The Agent Economy",
    role: "attendee",
    rating: 5,
    location: "Mumbai, India",
    venue: "IRL Build Sprint venue, Mumbai",
    date: "Jun 20, 2026",
    participants: 120,
    type: "Workshop",
    duration: "12 hours",
    organization: "Monad",
    tags: ["Monad", "AI Agents", "Blockchain", "On-Chain Identity", "Governance", "IRL Sprint"],
    description: "Participated in Monad Blitz Mumbai V3 - The Agent Economy, a high-intensity, one-day IRL build sprint where builders created autonomous AI agents, governance systems, and supportive web3 infrastructure on the Monad network. We built AgentDAO, a framework showcasing agent-native governance where agents register, propose marketing campaigns, evaluate decisions, and disburse treasury funds autonomously on-chain.",
    agenda: [
      {
        time: "09:00 AM",
        title: "Registration & Networking",
        description: "Checked in, collected swags, and formed teams with other developers."
      },
      {
        time: "10:00 AM",
        title: "Keynote & Theme Reveal",
        description: "Kickoff keynote introducing the Monad ecosystem, agentic tooling, and resource guidelines."
      },
      {
        time: "10:30 AM",
        title: "Hacking Begins",
        description: "Official start of the one-day sprint. Brainstormed design specs and set up contracts and agent loops."
      },
      {
        time: "02:00 PM",
        title: "Mentoring & Mid-way Check-in",
        description: "Interacted with Monad core mentors to debug RPC nodes, gas issues, and refine agent architectures."
      },
      {
        time: "06:00 PM",
        title: "Feature Freeze & Polish",
        description: "Wrapped up front-end and on-chain integrations, completed autonomous loop testing, and prepared project video demo."
      },
      {
        time: "07:30 PM",
        title: "Demos & Peer Judging",
        description: "Presented AgentDAO live to other builders. Peer-voting session for the top projects."
      },
      {
        time: "09:00 PM",
        title: "Dinner & Award Ceremony",
        description: "Closing dinner, networking, and announcement of the winning teams."
      }
    ],
    images: [
      {
        url: "/events/monad-blitz-mumbai.png",
        caption: "Monad Blitz Mumbai V3 - Custom Cyberpunk Theme Banner"
      }
    ],
    url: "https://github.com/RishiBuilds/AgentDao"
  },
  {
    slug: "microsoft-build-localhost-mumbai-atlas-2026",
    title: "Build //localhost:Mumbai (ATLAS)",
    role: "attendee",
    rating: 5,
    location: "Mumbai, India",
    venue: "ATLAS SkillTech University, Equinox Business Park, Kurla West",
    date: "Jun 13, 2026",
    participants: 100,
    type: "Meetup",
    duration: "5 hours",
    organization: "Mumbai Techy",
    tags: ["Microsoft Build", "Azure AI", "GitHub Copilot", "Community"],
    description: "Participated in the Microsoft Build //localhost:Mumbai event hosted by Mumbai Techy at ATLAS SkillTech University. The event brought the Microsoft Build experience to local developers, focusing on AI-powered innovation, Azure AI, and GitHub Copilot.",
    agenda: [
      {
        time: "10:00 AM",
        title: "Registration & Networking",
        description: "Welcome and check-in with the developer community."
      },
      {
        time: "10:45 AM",
        title: "Welcome Note & Microsoft Build Highlights",
        description: "Opening note and key announcements from Microsoft Build 2026."
      },
      {
        time: "11:00 AM",
        title: "Technical Session: Build AI-Powered Applications",
        description: "Deep dive into building AI applications with Azure AI & GitHub Copilot, followed by workflow demos and best practices."
      },
      {
        time: "12:30 PM",
        title: "Networking Break",
        description: "Quick break to connect with speakers and peers."
      },
      {
        time: "12:45 PM",
        title: "Q&A & Community Interaction",
        description: "Open discussion addressing developer questions, community roadmap, and networking."
      },
      {
        time: "1:30 PM",
        title: "Lunch & Closing Note",
        description: "Closing remarks followed by lunch and community networking."
      }
    ],
    images: [
      {
        url: "/events/ms-build-mumbai-banner.jpg",
        caption: "Microsoft Build //localhost Mumbai community event banner"
      },
      {
        url: "/events/ms-build-mumbai-group.jpg",
        caption: "Mumbai Techy developer community group photo"
      },
      {
        url: "/events/ms-build-mumbai-keynote.jpg",
        caption: "Keynote session presenting Microsoft Build 2026 highlights"
      },
      {
        url: "/events/ms-build-mumbai-cosine-similarity.jpg",
        caption: "Technical session on Cosine Similarity and AI-powered development"
      },
      {
        url: "/events/ms-build-mumbai-speaker.jpg",
        caption: "Speaker presenting at the Microsoft Build //localhost Mumbai event"
      },
      {
        url: "/events/ms-build-mumbai-audience.jpg",
        caption: "Developers and attendees working during the hands-on lab session"
      },
      {
        url: "/events/ms-build-mumbai-stickers.jpg",
        caption: "GitHub Copilot and Microsoft Developer stickers at the event"
      }
    ]
  },
  {
    slug: "microsoft-build-localhost-mumbai-2026",
    title: "Build //localhost:Mumbai",
    role: "attendee",
    rating: 5,
    location: "Mumbai, India",
    venue: "Microsoft Corporation India, 4th Floor, Windsor, Santacruz East",
    date: "Jun 6, 2026",
    participants: 150,
    type: "Workshop",
    duration: "6 hours",
    organization: "Global AI Community & Microsoft",
    tags: ["Microsoft Build", "AI Foundry", "Enterprise Search", "Agentic RAG", "Hands-on Lab"],
    description: "An official redelivery of Microsoft Build 2026 by the Global AI Community. Key announcements and insights on AI, cloud, data, and developer innovations with Microsoft speakers from Mumbai. Included hands-on lab sessions on Microsoft Foundry models to build AI apps.",
    agenda: [
      {
        time: "10:00 AM",
        title: "Registration & Check-in",
        description: "Welcome and check-in at the Microsoft Windsor reception desk."
      },
      {
        time: "10:30 AM",
        title: "Welcome Note & Community Updates",
        description: "Global AI Community introductions and local community roadmap."
      },
      {
        time: "10:45 AM",
        title: "Foundry IQ: Fuel Agents with Enterprise Knowledge",
        description: "Session 1: Deep dive into agentic retrieval systems, enterprise knowledge bases, and retrieval-augmented generation."
      },
      {
        time: "11:30 AM",
        title: "From Observability to ROI for AI Agents",
        description: "Session 2: Agent framework performance monitoring, latency analysis, metrics, and tracking business value."
      },
      {
        time: "12:15 PM",
        title: "Short Networking Break",
        description: "Quick coffee break and informal chat with fellow developers."
      },
      {
        time: "12:20 PM",
        title: "Foundry Integration with Open Source Tools",
        description: "Session 3: Connecting Microsoft Foundry with popular open-source AI frameworks, libraries, and external agents."
      },
      {
        time: "1:05 PM",
        title: "Lunch & Networking",
        description: "Buffet lunch with speakers, developers, and local builders in the Microsoft cafeteria."
      },
      {
        time: "2:00 PM",
        title: "Hands-on Lab: Build AI Apps with AI Foundry",
        description: "2-hour interactive workshop: Practical exercises deploying, configuring, and testing models in Microsoft Foundry."
      }
    ],
    images: [
      {
        url: "/events/microsoft-build-poster.png",
        caption: "Microsoft Build //localhost:Mumbai Event Poster"
      },
      {
        url: "/events/microsoft-build-lobby.jpg",
        caption: "Microsoft India Windsor Office Reception"
      },
      {
        url: "/events/microsoft-build-speaker-2.jpg",
        caption: "Presenter sharing key announcements from Microsoft Build 2026"
      },
      {
        url: "/events/microsoft-build-speaker-1.jpg",
        caption: "Technical session on AI Foundry and Agentic Retrieval"
      },
      {
        url: "/events/microsoft-build-audience.jpg",
        caption: "Mumbai developer community attending the Build Localhost sessions"
      }
    ],
    url: "https://luma.com/kokyhzfn?tk=gJyhQF"
  },
  {
    slug: "mumbai-ai-openclaw-meetup-1",
    title: "Mumbai AI x OpenClaw Meetup #1",
    role: "attendee",
    rating: 5,
    location: "Mumbai, India",
    venue: "Lumos Cowork, Vasudev Chamber, 5th Floor, Andheri East",
    date: "Apr 18, 2026",
    participants: 100,
    type: "Meetup",
    duration: "3 hours",
    organization: "Yogesh Singh & Nishant Desai",
    tags: ["OpenClaw", "AI Agents", "Vibe Coding", "Open Source", "Lumos"],
    description: "The first-ever Mumbai AI x OpenClaw meetup - a hands-on, curiosity-first gathering to explore the open-source AI agent taking the world by storm. Demos, walkthroughs, setup tutorials, and deep discussions on how personal AI agents change software building.",
    agenda: [
      {
        time: "2:15 PM",
        title: "Doors Open & Networking",
        description: "Welcome, icebreakers, and initial networking with builders on your left and right."
      },
      {
        time: "3:00 PM",
        title: "Most Affordable OpenClaw Setup",
        description: "Hands-on setup on a VPS as low as $4/month and real-world integration tips by Akshay Bhopani."
      },
      {
        time: "3:25 PM",
        title: "Observability to Autonomous Streams",
        description: "Deep dive into real-time monitoring and turning research findings into briefings by Ashish Choithani."
      },
      {
        time: "3:50 PM",
        title: "Special Presentation: Agentic Infrastructure",
        description: "Yash Sanghvi (Co-founder @ XO) on why agentic infrastructure is the critical layer powering accessible agents like OpenClaw."
      },
      {
        time: "4:20 PM",
        title: "Food & Beverages Break",
        description: "Networking break over snacks and refreshments."
      },
      {
        time: "4:40 PM",
        title: "Artha: Financial Signal Processing Layer",
        description: "Rakesh Kumawat on turning unstructured signals (WhatsApp, SMS, alerts) into structured accounting and tracking workflows."
      },
      {
        time: "5:00 PM",
        title: "Panel: Building in the Agentic Era",
        description: "Discussion with Brijesh Bolar, Manan Jain, and Manav Ahuja on production agents, startup moats, and vibe coding."
      },
      {
        time: "5:35 PM",
        title: "OpenClaw & AI Quiz",
        description: "Test your knowledge on open source agents and grab cool prizes."
      },
      {
        time: "5:45 PM",
        title: "Closing Notes, Swags & Photos",
        description: "Concluding remarks, distribution of lobster stickers/swags, and group photoshoot."
      }
    ],
    images: [
      {
        url: "/events/openclaw-group-1.jpg",
        caption: "Claw Community Meetup Group Photo"
      },
      {
        url: "/events/openclaw-group-2.jpg",
        caption: "Organizers and speakers showing the OpenClaw lobster plushie"
      },
      {
        url: "/events/openclaw-presentation.jpg",
        caption: "Yash Sanghvi (Co-founder @ XO) presenting Agentic AI Infrastructure"
      },
      {
        url: "/events/openclaw-plushie.jpg",
        caption: "Close-up of Molty, the OpenClaw mascot lobster"
      },
      {
        url: "/events/openclaw-audience.jpg",
        caption: "Builders and developers attending the OpenClaw meetup at Lumos Cowork"
      }
    ],
    url: "https://luma.com/c01ky1ae?tk=n0UGqg"
  },
  {
    slug: "openai-codex-meetup-mumbai-2026",
    title: "OpenAI Codex Community Meetup - Mumbai",
    role: "attendee",
    rating: 5,
    location: "Mumbai, India",
    venue: "Cactus Communications, Satellite Gazebo, Andheri East",
    date: "Mar 28, 2026",
    participants: 120,
    type: "Meetup",
    duration: "4 hours",
    organization: "SudoMeet & OpenAI Codex",
    tags: ["AI Agents", "Codex", "System Design", "LLMs", "Generative AI"],
    description: "Mumbai’s builder scene is shifting gears. After an explosive start in Bangalore (1,500+ registrations), we brought the Codex Community momentum to Mumbai. A deep dive into the next evolution of software development, moving past the chat interface and into the architecture.",
    agenda: [
      {
        time: "2:05 PM",
        title: "Opening Remarks",
        description: "Welcome address and setting context for the meetup by OpenAI Codex Ambassadors and SudoMeet organizers."
      },
      {
        time: "2:15 PM",
        title: "Generative AI in SDLC",
        description: "Deep dive talk by Ronak Shah (Director of Engineering, Cactus Labs) and Fenil Ramoliya (Software Engineer, Cactus Labs)."
      },
      {
        time: "2:40 PM",
        title: "Codex Updates",
        description: "Key updates and technical roadmap by Arjun Gupta (Solution Architect at OpenAI)."
      },
      {
        time: "3:00 PM",
        title: "Project Showcase - Part 1",
        description: "Local builders and developers demoing their latest AI integrations, coding agents, and agentic workflows."
      },
      {
        time: "3:45 PM",
        title: "Break and Networking",
        description: "Interacting with fellow builders, speakers, and OpenAI Codex Ambassadors over snacks."
      },
      {
        time: "4:15 PM",
        title: "Project Showcase - Part 2",
        description: "Continuing live demos and system design showcases of advanced AI agent platforms."
      },
      {
        time: "5:00 PM",
        title: "Closing Note and Networking",
        description: "Wrap-up notes, community updates, and final networking session."
      }
    ],
    images: [
      {
        url: "/events/codex-group.jpg",
        caption: "Codex Community Meetup Group Photo"
      },
      {
        url: "/events/codex-presentation-1.jpg",
        caption: "Presentation: Codex in the Loop"
      },
      {
        url: "/events/codex-presentation-2.jpg",
        caption: "Presentation: Agentic AI Infrastructure"
      }
    ],
    url: "https://luma.com/exg4kejt?tk=DjB9BP"
  },
  {
    slug: "campfire-mumbai-hack-club-game-jam-2026",
    title: "Campfire Mumbai Game Jam",
    role: "attendee",
    rating: 4,
    location: "Mumbai, India",
    venue: "Our Desk First Floor, Vishwanand Dham, 5th Road, Khar West, Mumbai, Maharashtra 400052",
    date: "Feb 28 - Mar 1, 2026",
    participants: 50,
    type: "Workshop",
    duration: "24 hours",
    organization: "Hack Club & Campfire Mumbai",
    tags: ["Game Jam", "Godot", "Hack Club", "GDScript", "Campfire", "Game Dev"],
    description: "Campfire Mumbai was an exciting 24-hour game jam organized by high schoolers from Hack Club. We built a custom game from scratch using the Godot engine, attended workshops, enjoyed free food/swags, and competed for prizes. Our team of 3 was proud to be crowned 2nd Runner Up, taking home the iconic Hack Club shark plushie!",
    agenda: [
      {
        time: "10:00 AM",
        title: "Registration & Icebreakers",
        description: "Welcome, badge pickup, grabbing the sick Hack Club Campfire t-shirts, and team formation."
      },
      {
        time: "11:30 AM",
        title: "Workshop: Intro to Godot",
        description: "A hands-on workshop led by Aryan Pathak introducing Godot engine components: Scenes, Nodes, and GDScript."
      },
      {
        time: "1:00 PM",
        title: "Lunch & Networking",
        description: "Free lunch and networking with artists, developers, and game designers."
      },
      {
        time: "2:00 PM",
        title: "Game Jam Commences",
        description: "Theme announcement and the official launch of the 24-hour development clock."
      },
      {
        time: "9:00 PM",
        title: "Dinner & Midnight Hack",
        description: "Late-night coding, debugging sessions, playtesting, and design iterations."
      },
      {
        time: "10:00 AM (Day 2)",
        title: "Submissions & Demos",
        description: "Uploading the final game builds and presenting the demo to all participants and judges."
      },
      {
        time: "11:30 AM (Day 2)",
        title: "Closing & Awards Ceremony",
        description: "Concluding remarks, voting, and announcing winners. Our team placed as 2nd Runner Up!"
      }
    ],
    images: [
      {
        url: "/events/campfire-group.jpg",
        caption: "Our team collaborating during the jam"
      },
      {
        url: "/events/campfire-poster.jpg",
        caption: "Campfire Mumbai Game Jam 2026 Banner"
      },
      {
        url: "/events/campfire-plushie.jpg",
        caption: "The Blahaj shark plushie we won as the 2nd Runner Up team!"
      },
      {
        url: "/events/campfire-workspace.jpg",
        caption: "The active workshop and hacking space at Our Desk"
      },
      {
        url: "/events/campfire-tshirt.jpg",
        caption: "The sick Hack Club Campfire t-shirt we got for participating"
      },
      {
        url: "/events/campfire-workshop.jpg",
        caption: "Godot workshop session presented by Aryan Pathak"
      }
    ]
  }
];