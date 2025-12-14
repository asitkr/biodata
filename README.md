# BioFlux 3D Portfolio

BioFlux 3D is a high-performance personal biodata portfolio web application. It combines modern React architecture with immersive **Three.js** 3D visualizations and **GSAP** animations to create a unique digital presence.

## 🚀 Features

### 1. **Hero Section**
- A dynamic landing area with a split layout.
- Features a fade-in text animation and a 3D-styled profile image container on the right.
- Gradient text effects and interactive call-to-action buttons.

### 2. **About Section**
- Professional summary area.
- Includes a responsive grid layout for personal details (Location, Company, Email, Website).
- Visualized tech stack tags.

### 3. **Basic Details (3D Animated)**
- **Visuals**: Features a custom **Three.js Torus Knot** animation where a wireframe knot and a solid knot rotate in unison within a rounded 3D container.
- **Content**: Displays core biographical data (DOB, Nationality, Education) in a clean, card-based layout.
- **Theme Integration**: The 3D background adjusts its glow and ambiance based on the selected theme (Dark/Light).

### 4. **3D Gallery**
- **Interaction**: A fully interactive circular gallery using Three.js.
- **Animation**: Images float and rotate in a 3D space. Users can drag horizontally to rotate the carousel.
- **Full Screen**: Clicking an image triggers a GSAP zoom animation and opens the image in a full-screen overlay with a red close button.

### 5. **Contact Us (3D Animated)**
- **Visuals**: A unique split design featuring two interlocking 3D knots that rotate in opposite directions ("bot are knot each other").
- **Form**: A fully styled contact form with validation and floating input focus states.

### 6. **Theming (Dark/Light Mode)**
- By default, the app loads in **Dark Mode** for a sleek, modern look.
- Includes a toggle in the navbar to switch to a "Lumen" style **Light Mode**.
- Persists user preference via `localStorage` so the selected theme remains active on page refresh.

## 🛠 Technologies

- **Frontend Framework**: React 19
- **Styling**: Tailwind CSS (with dark mode configuration)
- **3D Graphics**: Three.js (@0.160.0+)
- **Animation**: GSAP (GreenSock Animation Platform)
- **Icons**: Lucide React

## 📂 Project Structure

```bash
├── components/
│   ├── About.tsx        # Personal summary
│   ├── BasicDetails.tsx # 3D Knot animation & bio data
│   ├── Contact.tsx      # Contact form & Interlocking knots 3D
│   ├── Gallery3D.tsx    # Interactive Three.js gallery
│   ├── Hero.tsx         # Landing section
│   └── Navbar.tsx       # Navigation & Theme Toggle
├── App.tsx              # Main layout & Theme logic
├── index.html           # HTML entry point & Tailwind config
└── types.ts             # TypeScript definitions
```

## 🎨 Customization

### Colors & Fonts
The application uses a customized Tailwind configuration injected via `index.html`.
- **Primary Color**: Yellow (`#FACC15`)
- **Font**: Inter (Google Fonts)

### Modifying 3D Elements
- **Gallery**: Edit the `images` array in `components/Gallery3D.tsx` to change the portfolio images.
- **Knots**: Adjust geometry parameters in `BasicDetails.tsx` or `Contact.tsx` to change the shape or rotation speed of the 3D elements.

## 📄 License

This project is available for personal and commercial use under the MIT License.
