/* ─────────────────────────────────────────────────────────────────
   projects.js  –  centralised project data
   featured: true  →  shown on home page (max 3)
   featured: false →  only in "All Projects" page
───────────────────────────────────────────────────────────────── */

export const projects = [
  /* ── FEATURED ──────────────────────────────────────────────── */
  {
    id: 1,
    title: 'AlgoViz',
    subtitle: 'CPU Scheduler & DSA Visualizer',
    description:
      'Interactive MERN platform simulating all major CPU scheduling algorithms (FCFS, SJF, RR, Priority) with step-by-step DSA visualizations, OAuth login, real-time animation controls, and complexity analysis.',
    image: '/assets/algo.png',
    tech: ['React', 'Node.js', 'MongoDB', 'D3.js', 'JWT', 'OAuth', 'Tailwind'],
    github: 'https://github.com/Anuj-kumar-53/CPU-Scheduler',
    live: 'https://cpu-scheduler-taupe.vercel.app/',
    featured: true,
    color: '#6366f1',
    category: 'Full Stack',
    year: 2024,
    stats: [{ label: 'Algorithms', value: '8' }, { label: 'Visualizations', value: '12' }],
  },
  {
    id: 2,
    title: 'eFarmer',
    subtitle: 'AgriTech Platform',
    description:
      'Scalable platform helping farmers discover government schemes and get AI-powered crop recommendations based on soil type, season, and region. Integrates Gemini AI for NL queries and real-time weather.',
    image: '/assets/efarmer.png',
    tech: ['React', 'Node.js', 'MongoDB', 'Express', 'Gemini AI', 'Weather API'],
    github: 'https://github.com/Anuj-kumar-53/Efarma',
    live: 'https://efarming-dun.vercel.app/',
    featured: true,
    color: '#22c55e',
    category: 'AI / Full Stack',
    year: 2024,
    stats: [{ label: 'Schemes', value: '200+' }, { label: 'Languages', value: '5' }],
  },
  {
    id: 3,
    title: 'Checkmate',
    subtitle: 'Real-time Chess Platform',
    description:
      'Multiplayer chess with live rooms, spectator mode, full move validation, game history replay, and an ELO matchmaking engine — all powered by WebSockets and a Node.js backend.',
    image: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=700&h=420&fit=crop',
    tech: ['React', 'Socket.io', 'Node.js', 'Express', 'MongoDB'],
    github: 'https://github.com/Anuj-kumar-53/CheckMate',
    live: 'https://wpdaddy.com/wp-content/uploads/2017/04/Best-Coming-Soon-and-404-Error-Page-Templates-for-Your-Unique-Websites.jpg',
    featured: true,
    color: '#f59e0b',
    category: 'Real-time / Full Stack',
    year: 2024,
    stats: [{ label: 'Players', value: '1k+' }, { label: 'Latency', value: '<50ms' }],
  },

  /* ── ALL PROJECTS (not on home) ─────────────────────────────── */
  {
    id: 4,
    title: 'ToDo App',
    subtitle: 'Task Management Application',
    description:
      'A responsive ToDo application that allows users to add, delete, update, and mark tasks as completed. Includes date selection, task categorization, and real-time UI updates using JavaScript. Designed with a clean interface to help users manage daily activities efficiently.',
    image: 'https://img.freepik.com/premium-vector/cheerful-boy-marks-tasks-customizable-todo-list-with-pencil-emphasizing-productivity-fun-list-customizable-cartoon-illustration_538213-141392.jpg',
    tech: ['HTML', 'Tailwind CSS', 'JavaScript', 'PHP'],
    github: 'https://github.com/Anuj-kumar-53/TODOLIST',
    live: 'https://wpdaddy.com/wp-content/uploads/2017/04/Best-Coming-Soon-and-404-Error-Page-Templates-for-Your-Unique-Websites.jpg',
    featured: false,
    color: '#22c55e',
    category: 'Web App',
    year: 2024,
    stats: [
      { label: 'Tasks Managed', value: '1k+' },
      { label: 'Features', value: '10+' }
    ],
  },
  {
    id: 5,
    title: 'Virtual Memory Simulator',
    subtitle: 'Operating System Simulation Tool',
    description:
      'A Python-based Virtual Memory Simulator that demonstrates page replacement algorithms such as FIFO, LRU, and Optimal. The simulator helps visualize how memory pages are loaded, replaced, and managed in an operating system, making it useful for understanding core OS concepts.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=700&h=420&fit=crop',
    tech: ['Python', 'Data Structures', 'Operating System Concepts'],
    github: 'https://github.com/Anuj-kumar-53/virtual-memory-simulator',
    live: 'https://wpdaddy.com/wp-content/uploads/2017/04/Best-Coming-Soon-and-404-Error-Page-Templates-for-Your-Unique-Websites.jpg',
    featured: false,
    color: '#6366f1',
    category: 'Simulation / OS',
    year: 2024,
    stats: [
      { label: 'Algorithms', value: '3+' },
      { label: 'Concepts', value: 'Paging' }
    ],
  },
  {
    id: 6,
    title: 'Pet Adoption & Animal Healthcare Website',
    subtitle: 'Pet Care and Adoption Platform',
    description:
      'A responsive web application for pet adoption and animal healthcare management. Users can explore pets available for adoption, view pet details, and access healthcare information for animals. The website provides an organized interface for managing pet records, adoption requests, and care guidelines.',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=700&h=420&fit=crop',
    tech: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
    github: 'https://github.com/Anuj-kumar-53/pet_adoption-website',
    live: 'https://wpdaddy.com/wp-content/uploads/2017/04/Best-Coming-Soon-and-404-Error-Page-Templates-for-Your-Unique-Websites.jpg',
    featured: false,
    color: '#f59e0b',
    category: 'Web Application',
    year: 2024,
    stats: [
      { label: 'Pets Listed', value: '50+' },
      { label: 'Modules', value: 'Adoption + Care' }
    ],
  },
  {
    id: 7,
    title: 'Trinetra AI Chatbot',
    subtitle: 'AI Mental Health Assistant',
    description:
      'An AI-powered chatbot designed for mental health support that analyzes user input text and images to provide self-care tips, medicine suggestions, and precaution guidelines. Includes sentiment analysis, mood tracking, and real-time responses using API integration.',
    image: 'https://images.unsplash.com/photo-1677442135136-760c813028c0?w=700&h=420&fit=crop',
    tech: ['JavaScript', 'Node.js', 'Express', 'MongoDB', 'API', 'HTML', 'Tailwind CSS'],
    github: 'https://github.com/Anuj-kumar-53/ai-chat-bot/tree/main/Trinetra',
    live: 'https://wpdaddy.com/wp-content/uploads/2017/04/Best-Coming-Soon-and-404-Error-Page-Templates-for-Your-Unique-Websites.jpg',
    featured: false,
    color: '#06b6d4',
    category: 'AI / Web App',
    year: 2024,
    stats: [
      { label: 'Features', value: 'Chat + Image + Mood' },
      { label: 'Type', value: 'AI Bot' }
    ],
  },
  {
    id: 8,
    title: 'Blogging Application',
    subtitle: 'Node.js Content Management System',
    description:
      'A full-stack blogging application built using Node.js and Express that allows users to create, edit, and delete blog posts. Includes user authentication, dynamic routing, and server-side rendering. Designed to demonstrate backend development, RESTful routing, and database integration.',
    image: 'https://user-images.githubusercontent.com/105907169/209240082-4c5793e1-e72f-4778-bb9f-194bbdc4d3a1.jpg',
    tech: ['Node.js', 'Express', 'MongoDB', 'JavaScript', 'HTML', 'CSS'],
    github: 'https://github.com/Anuj-kumar-53/Node.js/tree/main/Bloging_application',
    live: 'https://wpdaddy.com/wp-content/uploads/2017/04/Best-Coming-Soon-and-404-Error-Page-Templates-for-Your-Unique-Websites.jpg',
    featured: false,
    color: '#0ea5e9',
    category: 'Backend / Full Stack',
    year: 2024,
    stats: [
      { label: 'Posts', value: '100+' },
      { label: 'Routes', value: 'REST API' }
    ],
  },
  {
    id: 9,
    title: 'URL Shortener',
    subtitle: 'Node.js Link Shortening Website',
    description:
      'A web application built using Node.js and Express that converts long URLs into short and shareable links. The system generates unique short IDs, stores URL mappings, and redirects users to the original link when the short URL is accessed. Demonstrates backend routing, database handling, and RESTful API concepts.',
    image: 'https://s3-figma-hubfile-images-production.figma.com/hub/file/carousel/img/73f25fdd9225a6ce673c47900bdfa36af275169e',
    tech: ['Node.js', 'Express', 'MongoDB', 'JavaScript', 'HTML', 'CSS'],
    github: 'https://github.com/Anuj-kumar-53/Node.js/tree/main/Url_Shortner',
    live: 'https://wpdaddy.com/wp-content/uploads/2017/04/Best-Coming-Soon-and-404-Error-Page-Templates-for-Your-Unique-Websites.jpg',
    featured: false,
    color: '#10b981',
    category: 'Backend / Web App',
    year: 2024,
    stats: [
      { label: 'Links', value: '100+' },
      { label: 'Feature', value: 'Redirect' }
    ],
  },
]

export const skills = {
  Languages: [
    { name: 'C++', level: 90 },
    { name: 'JavaScript', level: 88 },
    { name: 'Java', level: 75 },
    { name: 'Python', level: 72 },
    { name: 'PHP', level: 60 },
  ],
  Frameworks: [
    { name: 'React', level: 90 },
    { name: 'Node.js', level: 85 },
    { name: 'Express', level: 83 },
    { name: 'Tailwind', level: 90 },
  ],
  Tools: [
    { name: 'MongoDB', level: 82 },
    { name: 'MySQL', level: 78 },
    { name: 'Git', level: 88 },
    { name: 'GitHub', level: 88 },
    { name: 'Postman', level: 80 },
    { name: 'Figma', level: 65 },
  ],
  'Core CS': [
    { name: 'DBMS', level: 85 },
    { name: 'OS', level: 80 },
    { name: 'Computer Networks', level: 78 },
    { name: 'OOP', level: 90 },
    { name: 'DSA', level: 88 },
  ],
}
