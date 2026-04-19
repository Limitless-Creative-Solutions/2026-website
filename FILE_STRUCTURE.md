# 📂 File Structure - කොහෙද මොනවද තියෙන්නේ?

```
limitless-creative-solutions/
│
├── 📁 public/                          # Images, logos, static files
│   ├── logo.svg                        # Full logo
│   ├── logo-white.svg                  # White logo (navbar)
│   └── favicon.svg                     # Browser tab icon
│
├── 📁 src/                             # Main source code
│   │
│   ├── 📁 components/                  # Reusable components
│   │   │
│   │   ├── 📁 home/                    # Home page sections
│   │   │   ├── Hero.tsx                # 🎯 Top banner/hero section
│   │   │   ├── ServiceStrip.tsx        # 📜 Scrolling services
│   │   │   ├── FeaturedOn.tsx          # 🏆 Logos/badges
│   │   │   ├── ServicesGrid.tsx        # 🎨 Main services grid
│   │   │   ├── InstructionVideo.tsx    # 📹 Video section
│   │   │   ├── PortfolioShowcase.tsx   # 💼 Portfolio projects
│   │   │   ├── AIToolsSection.tsx      # 🤖 AI features
│   │   │   ├── TemplatePreview.tsx     # 📄 Templates
│   │   │   ├── LiveStats.tsx           # 📊 Numbers/stats
│   │   │   ├── PricingSection.tsx      # 💰 Pricing plans
│   │   │   └── ContactSection.tsx      # 📧 Contact form
│   │   │
│   │   ├── 📁 layout/                  # Layout components
│   │   │   ├── Navbar.tsx              # 🔝 Top navigation
│   │   │   ├── Footer.tsx              # 🔽 Bottom footer
│   │   │   ├── FloatingActions.tsx     # 💬 WhatsApp/Chat buttons
│   │   │   └── Preloader.tsx           # ⏳ Loading screen
│   │   │
│   │   └── 📁 admin/                   # Admin components
│   │       └── VideoManager.tsx        # 🎬 Video upload panel
│   │
│   ├── 📁 pages/                       # Main pages
│   │   ├── Home.tsx                    # 🏠 Home page (main)
│   │   ├── Services.tsx                # 🛠️ Services page
│   │   ├── Marketplace.tsx             # 🛒 Marketplace page
│   │   ├── Portfolio.tsx               # 💼 Portfolio page
│   │   ├── Portal.tsx                  # 👤 Client dashboard
│   │   └── VideoManager.tsx            # 🎥 Admin video page
│   │
│   ├── 📁 lib/                         # Utilities/helpers
│   │   ├── firebase.ts                 # 🔥 Firebase config
│   │   ├── AuthContext.tsx             # 🔐 Authentication
│   │   └── utils.ts                    # 🔧 Helper functions
│   │
│   ├── 📁 services/                    # API services
│   │   └── gemini.ts                   # 🤖 AI service
│   │
│   ├── App.tsx                         # 🎯 Main app component
│   ├── main.tsx                        # 🚀 App entry point
│   └── index.css                       # 🎨 Global styles
│
├── index.html                          # 📄 HTML template
├── package.json                        # 📦 Dependencies
├── .env.local                          # 🔑 Environment variables
├── vite.config.ts                      # ⚙️ Vite config
├── tsconfig.json                       # ⚙️ TypeScript config
│
└── 📚 Documentation
    ├── README.md                       # Project readme
    ├── EDITING_GUIDE.md                # Editing guide
    ├── LOGO_AND_VIDEO_SETUP.md         # Logo/video setup
    └── FILE_STRUCTURE.md               # This file
```

---

## 🎯 WHAT TO EDIT WHERE?

### 🏠 HOME PAGE CONTENT

**Top to Bottom Order:**

1. **Hero Section** (First thing visitors see)
   ```
   📁 src/components/home/Hero.tsx
   ```
   - Main heading: "We Create. We Grow. We Scale Brands."
   - Subheading/tagline
   - CTA buttons
   - Background effects

2. **Service Strip** (Scrolling text)
   ```
   📁 src/components/home/ServiceStrip.tsx
   ```
   - Service names that scroll
   - Add/remove services

3. **Featured On** (Trust badges)
   ```
   📁 src/components/home/FeaturedOn.tsx
   ```
   - Company logos
   - Media mentions
   - Awards

4. **Services Grid** (Main services)
   ```
   📁 src/components/home/ServicesGrid.tsx
   ```
   - Service cards
   - Icons
   - Descriptions
   - Prices

5. **Instruction Video** (How it works)
   ```
   📁 src/components/home/InstructionVideo.tsx
   ```
   - Video player
   - Steps guide
   - Upload video: Go to `/admin/video` in browser

6. **Portfolio Showcase** (Projects)
   ```
   📁 src/components/home/PortfolioShowcase.tsx
   ```
   - Project cards
   - Images
   - Descriptions

7. **AI Tools Section** (AI features)
   ```
   📁 src/components/home/AIToolsSection.tsx
   ```
   - AI capabilities
   - Features list

8. **Template Preview** (Templates)
   ```
   📁 src/components/home/TemplatePreview.tsx
   ```
   - Template cards
   - Prices
   - Preview images

9. **Live Stats** (Numbers)
   ```
   📁 src/components/home/LiveStats.tsx
   ```
   - Client count
   - Projects completed
   - Success rate

10. **Pricing Section** (Plans)
    ```
    📁 src/components/home/PricingSection.tsx
    ```
    - Pricing tiers
    - Features
    - Prices

11. **Contact Section** (Contact form)
    ```
    📁 src/components/home/ContactSection.tsx
    ```
    - Contact form
    - Email/phone
    - Social links

---

## 🎨 LAYOUT COMPONENTS

### Navbar (Top Menu)
```
📁 src/components/layout/Navbar.tsx
```
Edit:
- Logo
- Menu items (Services, Marketplace, Portfolio, Portal)
- Login button
- Mobile menu

### Footer (Bottom)
```
📁 src/components/layout/Footer.tsx
```
Edit:
- Company info
- Links
- Social media icons
- Copyright text

### Floating Actions (Side buttons)
```
📁 src/components/layout/FloatingActions.tsx
```
Edit:
- WhatsApp number
- Chat button
- Scroll to top button

---

## 📄 FULL PAGES

### Home Page
```
📁 src/pages/Home.tsx
```
- Combines all home components
- Change order of sections here

### Services Page
```
📁 src/pages/Services.tsx
```
- Detailed services
- Service descriptions

### Marketplace Page
```
📁 src/pages/Marketplace.tsx
```
- Products/templates for sale
- Buy buttons

### Portfolio Page
```
📁 src/pages/Portfolio.tsx
```
- All projects
- Case studies

### Portal Page (Client Dashboard)
```
📁 src/pages/Portal.tsx
```
- Client login area
- Projects status
- Messages

---

## 🎨 STYLING

### Global Styles
```
📁 src/index.css
```
- CSS variables
- Global colors
- Fonts
- Animations

### Tailwind Classes (in components)
- `bg-primary` = Blue color
- `text-white` = White text
- `p-4` = Padding
- `rounded-lg` = Rounded corners

---

## 🔧 CONFIGURATION

### Environment Variables
```
📁 .env.local
```
- API keys
- Firebase config
- Gemini API key

### Package Dependencies
```
📁 package.json
```
- Installed packages
- Scripts (dev, build)

### TypeScript Config
```
📁 tsconfig.json
```
- TypeScript settings

### Vite Config
```
📁 vite.config.ts
```
- Build settings
- Dev server config

---

## 🖼️ STATIC FILES

### Public Folder
```
📁 public/
```
- Images
- Logos
- Favicon
- Any static files

To add images:
1. Put image in `public/` folder
2. Use in code: `<img src="/image-name.jpg" />`

---

## 🔍 HOW TO FIND FILES

### In VS Code:

1. **Quick Open File**
   - Press `Ctrl + P` (Windows) or `Cmd + P` (Mac)
   - Type file name
   - Press Enter

2. **Search in Files**
   - Press `Ctrl + Shift + F` (Windows) or `Cmd + Shift + F` (Mac)
   - Type text to find
   - See all files with that text

3. **File Explorer**
   - Left sidebar
   - Click folders to expand
   - Click file to open

---

## 💡 EDITING TIPS

### To Edit Text:
1. Find the file from list above
2. Open file in VS Code
3. Find the text (Ctrl + F)
4. Edit the text
5. Save (Ctrl + S)
6. Check browser (auto-reloads)

### To Add Images:
1. Put image in `public/` folder
2. In component: `<img src="/your-image.jpg" alt="Description" />`

### To Change Colors:
1. Open `src/index.css`
2. Find CSS variables
3. Change color codes
4. Save and check

### To Reorder Sections:
1. Open `src/pages/Home.tsx`
2. Move component lines up/down
3. Save

Example:
```tsx
// Before
<Hero />
<ServicesGrid />
<InstructionVideo />

// After (video moved up)
<Hero />
<InstructionVideo />
<ServicesGrid />
```

---

## 🚨 DON'T EDIT THESE

❌ **Never edit:**
- `node_modules/` - Installed packages
- `dist/` - Build output
- `.git/` - Git history
- `package-lock.json` - Auto-generated

✅ **Safe to edit:**
- Everything in `src/`
- Files in `public/`
- `index.html`
- `.env.local`

---

## 📞 QUICK REFERENCE

| I want to change... | Edit this file... |
|---------------------|-------------------|
| Main heading | `src/components/home/Hero.tsx` |
| Services | `src/components/home/ServicesGrid.tsx` |
| Prices | `src/components/home/PricingSection.tsx` |
| Contact info | `src/components/home/ContactSection.tsx` |
| Menu items | `src/components/layout/Navbar.tsx` |
| Footer | `src/components/layout/Footer.tsx` |
| Logo | `public/logo-white.svg` |
| Colors | `src/index.css` |
| Page title | `index.html` |
| WhatsApp number | `src/components/layout/FloatingActions.tsx` |

---

Happy Coding! 🚀
