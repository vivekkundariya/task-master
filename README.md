# Task Master - Today's Top Priorities 🎯

A modern, responsive task management application built with React, TypeScript, and Tailwind CSS. Organize your tasks using the Eisenhower Matrix methodology to prioritize what matters most.

## ✨ Features

- **Eisenhower Matrix Layout**: Four quadrants for different priority levels
- **Drag & Drop**: Move tasks between quadrants seamlessly
- **Progress Tracking**: Visual progress indicators for each quadrant
- **Dark/Light Theme**: Toggle between themes
- **Responsive Design**: Works perfectly on desktop and mobile
- **Local Storage**: Your tasks persist between sessions
- **CSV Export**: Download your tasks for backup
- **Editable User Name**: Personalize your experience

## 🚀 Live Demo

[View the live application here](https://vivekkundariya.github.io/task-master/)

## 🛠️ Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **GitHub Pages** for deployment

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vivekkundariya/task-master.git
   cd task-master
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🌐 Deployment to GitHub Pages

### Automatic Deployment (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click **Settings** tab
   - Scroll down to **Pages** section
   - Under **Source**, select **GitHub Actions**

3. **The GitHub Action will automatically deploy your site**
   - Every push to the `main` branch triggers a deployment
   - Your site will be available at `https://vivekkundariya.github.io/task-master/`

### Manual Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to GitHub Pages**
   ```bash
   npm run deploy
   ```

## 📁 Project Structure

```
task-master/
├── src/
│   ├── components/          # React components
│   │   ├── App.tsx         # Main application component
│   │   ├── Header.tsx      # Header with user info and controls
│   │   ├── QuadrantDisplay.tsx # Individual quadrant component
│   │   ├── EditableTaskItem.tsx # Task item with edit functionality
│   │   └── CircularProgress.tsx # Progress indicator component
│   ├── hooks/              # Custom React hooks
│   │   ├── useTasks.ts     # Task management logic
│   │   └── useLocalStorage.ts # Local storage hook
│   ├── constants/          # Application constants
│   │   └── quadrants.tsx   # Quadrant definitions and colors
│   ├── types/              # TypeScript type definitions
│   │   └── index.ts        # Task and other types
│   ├── utils/              # Utility functions
│   │   └── index.ts        # Helper functions
│   ├── main.tsx           # Application entry point
│   ├── index.css          # Global styles
│   └── App.tsx            # Main app component
├── .github/workflows/     # GitHub Actions workflows
│   └── deploy.yml         # Deployment workflow
├── public/               # Static assets
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── vite.config.ts       # Vite configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── tsconfig.json        # TypeScript configuration
```

## 🎨 Customization

### Changing Colors
Edit `src/constants/quadrants.tsx` to customize quadrant colors and styling.

### Adding Features
The modular structure makes it easy to add new features:
- Add new components in `src/components/`
- Create custom hooks in `src/hooks/`
- Define new types in `src/types/`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide React](https://lucide.dev/)
- Deployed with [GitHub Pages](https://pages.github.com/)  