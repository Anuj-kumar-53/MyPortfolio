# 🚀 Anuj Kumar – Developer Portfolio

A modern, animated developer portfolio built with React (Vite), Tailwind CSS, and Framer Motion. Features glassmorphism UI, dark/light mode, smooth animations, and EmailJS contact form integration.

---

## ✨ Features

- **Glassmorphism Design** – Frosted glass cards with blur effects
- **Dark / Light Mode** – Animated toggle with system preference detection
- **Framer Motion Animations** – Scroll-triggered reveals, hover effects, staggered cards
- **Custom Cursor** – Glow cursor with smooth follower (desktop only)
- **Scroll Progress Bar** – Linear gradient bar at the top
- **Typing Animation** – Role-cycling typewriter in Hero
- **EmailJS Contact Form** – Send messages directly to your inbox
- **Fully Responsive** – Mobile-first, works on all devices
- **Animated Background Blobs** – Floating color gradients

---

## 🛠️ Installation

### Prerequisites
- Node.js v18+
- npm or yarn

### Steps

```bash
# 1. Clone or download the project
cd portfolio

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Build for production
npm run build
```

Visit `http://localhost:5173` to see the portfolio.

---

## 📁 Adding Your Resume

1. Create the folder `public/assets/` if it doesn't exist
2. Add your PDF file: `public/assets/resume.pdf`
3. The "Download Resume" button in the Skills section will automatically link to it

```
portfolio/
└── public/
    └── assets/
        └── resume.pdf   ← Your resume goes here
```

---

## 🖼️ Adding Profile Photo

Replace the placeholder image URL in `src/components/Hero.jsx`:

```jsx
// Find this line:
src="https://images.unsplash.com/photo-1507003211169-..."

// Replace with your image:
src="/assets/profile.jpg"
```

Then add your photo to `public/assets/profile.jpg`.

---

## 📋 Changing Project Data

Edit `src/data/projects.js` to update projects and skills:

```js
export const projects = [
  {
    id: 1,
    title: 'Your Project Name',
    subtitle: 'Tagline',
    description: 'Project description...',
    image: '/assets/project1.png',   // or an external URL
    tech: ['React', 'Node.js'],
    github: 'https://github.com/yourrepo',
    live: 'https://yoursite.com',
    color: '#6366f1',                // Accent color for the card
  },
  // Add more projects...
]

export const skills = {
  Languages: [
    { name: 'JavaScript', level: 90 },  // level = 0-100
    // ...
  ],
  // Add/modify categories...
}
```

---

## 📧 Configuring EmailJS

1. Create a free account at [emailjs.com](https://www.emailjs.com)
2. Create an **Email Service** (Gmail, Outlook, etc.)
3. Create an **Email Template** with these variables:
   - `{{from_name}}` – Sender's name
   - `{{from_email}}` – Sender's email
   - `{{message}}` – Message body
   - `{{to_name}}` – Your name (Anuj Kumar)
4. Copy your credentials and update `src/components/Contact.jsx`:

```js
await emailjs.send(
  'YOUR_SERVICE_ID',    // ← Your service ID
  'YOUR_TEMPLATE_ID',   // ← Your template ID
  { ... },
  'YOUR_PUBLIC_KEY'     // ← Your public key
)
```

---

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to change the color palette:
```js
colors: {
  primary: { ... },  // Indigo shades
  accent: {
    purple: '#a855f7',
    blue: '#3b82f6',
    cyan: '#06b6d4',
  },
}
```

### Personal Info
Update the following files:
- `index.html` – Page title and meta tags
- `src/components/Hero.jsx` – Name, bio, social links
- `src/components/Contact.jsx` – Email address, social links
- `src/components/Footer.jsx` – Name, social links
- `src/components/Education.jsx` – Education entries
- `src/data/projects.js` – Projects and skills

---

## 🚀 Deployment

### Vercel (recommended)
```bash
npm run build
# Upload the `dist/` folder to Vercel, or connect your GitHub repo
```

### GitHub Pages
```bash
npm run build
# Deploy the `dist/` folder using `gh-pages` package
```

---

## 📦 Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 + Vite | Frontend framework & build tool |
| Tailwind CSS | Utility-first styling |
| Framer Motion | Animations & transitions |
| EmailJS | Contact form email delivery |
| Lucide React | Icons |

---

## 📝 License

MIT – Feel free to use this template for your own portfolio!

---

Made with ❤️ by Anuj Kumar
