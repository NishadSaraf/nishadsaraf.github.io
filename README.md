<div align="center">
  <img alt="Logo" src="https://raw.githubusercontent.com/NishadSaraf/nishadsaraf.github.io/main/src/images/logo.png" width="100" />
</div>

<h1 align="center">nishadsaraf.com</h1>

<p align="center">
  Personal portfolio website built with <a href="https://www.gatsbyjs.org/" target="_blank">Gatsby</a> and hosted on <a href="https://pages.github.com/" target="_blank">GitHub Pages</a>.
</p>

<p align="center">
  <a href="https://nishadsaraf.com" target="_blank">
    <img src="https://img.shields.io/badge/Live-nishadsaraf.com-F5A623?style=for-the-badge" alt="Live Site" />
  </a>
</p>

![Site Preview](https://github.com/NishadSaraf/nishadsaraf.github.io/blob/main/static/og.png)

## ⚡ Tech Stack

- **Framework:** [Gatsby v5](https://www.gatsbyjs.org/)
- **Styling:** [Styled Components](https://styled-components.com/)
- **Content:** Markdown + GraphQL
- **Animations:** [Anime.js](https://animejs.com/) + [ScrollReveal](https://scrollrevealjs.org/)
- **Deployment:** GitHub Pages
- **CI/CD:** Husky + lint-staged

## 🛠 Installation & Setup

1. **Clone the repository**

   ```sh
   git clone https://github.com/NishadSaraf/nishadsaraf.github.io.git
   cd nishadsaraf.github.io
   ```

2. **Install dependencies**

   ```sh
   yarn install
   ```

3. **Start the development server**

   ```sh
   npm start
   ```

   The site will be available at `http://localhost:8080`

## 🚀 Building & Deployment

**Generate a production build:**

```sh
npm run build
```

**Preview the production build locally:**

```sh
npm run serve
```

**Deploy to GitHub Pages:**

```sh
npm run deploy
```

## 📁 Project Structure

```
├── content/
│   ├── featured/      # Featured projects
│   ├── jobs/          # Work experience entries
│   ├── posts/         # Blog posts
│   └── projects/      # Other projects
├── src/
│   ├── components/    # React components
│   ├── fonts/         # Custom fonts
│   ├── images/        # Static images
│   ├── pages/         # Page components
│   └── styles/        # Global styles & variables
├── static/            # Static assets
└── gatsby-config.js   # Gatsby configuration
```

## 🎨 Color Palette

| Color       | Hex                                                                |
| ----------- | ------------------------------------------------------------------ |
| Background  | ![#121215](https://via.placeholder.com/10/121215?text=+) `#121215` |
| Dark BG     | ![#0D0D0D](https://via.placeholder.com/10/0D0D0D?text=+) `#0D0D0D` |
| Primary     | ![#F5A623](https://via.placeholder.com/10/F5A623?text=+) `#F5A623` |
| Secondary   | ![#6B8FA3](https://via.placeholder.com/10/6B8FA3?text=+) `#6B8FA3` |
| Light Slate | ![#C5C5C5](https://via.placeholder.com/10/C5C5C5?text=+) `#C5C5C5` |
| White       | ![#FAFAF8](https://via.placeholder.com/10/FAFAF8?text=+) `#FAFAF8` |

## 📝 Adding Content

### Featured Projects

Create a new folder in `content/featured/` with an `index.md` file:

```md
---
date: '2024-01-01'
title: 'Project Title'
cover: './image.png'
github: 'https://github.com/...'
external: 'https://...'
tech:
  - Technology 1
  - Technology 2
---

Project description goes here.
```

### Work Experience

Add new entries in `content/jobs/` following the existing format.

## 📄 License

This project is licensed under the MIT License.

---

<p align="center">
  Design inspired by <a href="https://github.com/bchiang7/v4" target="_blank">Brittany Chiang's portfolio</a>.
</p>
