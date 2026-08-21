# 📸 Instagram Web Layout

A responsive Instagram-inspired social media web application built using **HTML, CSS, and Vanilla JavaScript**.

The project focuses on creating a modern social media interface with interactive posts, stories, responsive layouts, dark mode, post creation, search functionality, and browser-based data persistence.

---

## 🚀 Live Demo

🔗 **Live Demo:** Add your Vercel URL here

---

## 📌 Features

### 🎨 UI & Design
- Modern Instagram-inspired interface
- Responsive design for desktop, tablet, and mobile
- Sidebar navigation
- Mobile top navigation
- Mobile bottom navigation
- Story section with story rings
- Story highlights
- Responsive post grid
- Smooth hover and transition effects

### 🌙 Dark / Light Mode
- Toggle between light and dark themes
- Theme preference is saved in `localStorage`
- Theme persists even after refreshing the page

### 📝 Create Posts
Users can create their own posts by providing:

- Image
- Author name
- Location
- Caption

Created posts are dynamically added to the feed.

### ❤️ Like / Unlike
- Like posts
- Unlike posts
- Like count updates dynamically
- Like state is stored for user-created posts

### 👥 Follow / Unfollow
- Follow creators
- Unfollow creators
- Button changes between `Follow` and `Following`
- Follow state is persisted for user-created posts

### 🔍 Search & Filter
Search posts by:

- Author name
- Location
- Caption

Posts are filtered dynamically as the user types.

### 💾 Local Storage
The application uses browser `localStorage` to persist:

- Theme preference
- User-created posts
- Post images
- Captions
- Author information
- Locations
- Like state
- Like count
- Follow state

Created posts remain available after refreshing the page.

---

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- CSS Grid
- Flexbox
- CSS Variables
- Responsive Design
- LocalStorage API
- FileReader API
- Phosphor Icons
- Google Fonts
- Vercel

---

## 📂 Project Structure

```text
instagram-web-layout/
│
├── index.html
│
├── assets/
│   ├── css/
│   │   └── index.css
│   │
│   └── js/
│       └── index.js
│
└── README.md
```

---

## ❤️ Made with love

By [SAM](https://github.com/samhita2003)
