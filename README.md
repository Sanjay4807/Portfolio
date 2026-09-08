Codebase Organisation:
Portfolio/
├── public/                 # Static files that don't need processing (e.g., favicon, robots.txt)
├── src/                    # All your source code goes here
│   ├── assets/             # Media files (images, fonts, SVGs, etc.)
│   │   └── images/
│   ├── components/         # Reusable UI pieces (e.g., Navbar, Footer, Button, ProjectCard)
│   ├── hooks/              # Custom logic/functions (if you use React/Vue)
│   ├── pages/              # The actual pages (e.g., Home, About, Contact, Projects)
│   ├── styles/             # Global CSS, SCSS, or Tailwind configurations
│   └── utils/              # Helper functions, constants, or API call logic
├── .gitignore              # Files to ignore in Git version control
└── README.md               # Documentation about how to run and manage your project