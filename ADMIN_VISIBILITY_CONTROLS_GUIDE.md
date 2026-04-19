# Admin Visibility Controls - සම්පූර්ණ මාර්ගෝපදේශය

## ✅ සියල්ල හදා අවසන්!

Admin page එකෙන් දැන් මේ සියල්ල control කරන්න පුළුවන්:

### 1. **Hero Section Buttons** (Book Strategy Call & Explore Marketplace)
- Admin → Content Manager → Hero Section
- "Show Hero Buttons" toggle එක ON/OFF කරන්න
- Save කළාම buttons hide/show වෙනවා

### 2. **Pricing Card Buttons** ("Get Started" buttons)
- Admin → Content Manager → Pricing Card Buttons
- "Show Buttons" toggle එක ON/OFF කරන්න
- Save කළාම pricing cards වල buttons hide/show වෙනවා

### 3. **AI Tools Section** (Engineered Frameworks)
- Admin → Content Manager → AI Tools Section
- "Show on Homepage" toggle එක ON/OFF කරන්න
- Save කළාම AI Tools section hide/show වෙනවා

### 4. **Portfolio Projects**
- Admin → Portfolio Manager
- "Add Project" button එකෙන් projects add කරන්න
- Edit button එකෙන් projects edit කරන්න
- Delete button එකෙන් projects delete කරන්න
- Save කළාම home page එකේ portfolio section එකේ පෙන්නවා

---

## 📋 ADMIN PAGE TABS

Admin page එකේ මේ tabs තියෙනවා:

1. **Content Manager** - Hero, About, Mission, AI Tools, Pricing Buttons, Background Video, Maintenance Mode
2. **Services** - Service cards with demo/order links
3. **Pricing** - Pricing plans
4. **Portfolio** - Project showcase
5. **Contact Info** - Email, phone, WhatsApp, social links
6. **Messages** - Contact form submissions
7. **Video** - Instruction video URL

---

## 🎯 HOW TO USE

### Hero Buttons Hide/Show කරන්න:
1. `/admin` යන්න
2. "Content Manager" tab එක click කරන්න
3. "Hero Section" එකේ "Show Hero Buttons" toggle එක ON/OFF කරන්න
4. "Save All Content" click කරන්න
5. Home page එකට යන්න - buttons hide/show වෙලා තියෙනවා

### Pricing Buttons Hide/Show කරන්න:
1. `/admin` යන්න
2. "Content Manager" tab එක click කරන්න
3. "Pricing Card Buttons" එකේ "Show Buttons" toggle එක ON/OFF කරන්න
4. "Save All Content" click කරන්න
5. Home page එකට යන්න - pricing cards වල buttons hide/show වෙලා තියෙනවා

### AI Tools Section Hide/Show කරන්න:
1. `/admin` යන්න
2. "Content Manager" tab එක click කරන්න
3. "AI Tools Section" එකේ "Show on Homepage" toggle එක ON/OFF කරන්න
4. "Save All Content" click කරන්න
5. Home page එකට යන්න - AI Tools section hide/show වෙලා තියෙනවා

### Portfolio Projects Add/Edit/Delete කරන්න:
1. `/admin` යන්න
2. "Portfolio" tab එක click කරන්න
3. **Add කරන්න**: "Add Project" button එක click කරන්න
4. **Edit කරන්න**: Project card එකේ "Edit" button එක click කරන්න
5. **Delete කරන්න**: Edit mode එකේ "Delete Project" button එක click කරන්න
6. "Save All Changes" click කරන්න
7. Home page එකට යන්න - portfolio section එකේ projects පෙන්නවා

---

## 📝 PORTFOLIO PROJECT FIELDS

Project එකක් add/edit කරද්දී මේ fields fill කරන්න:

- **Project Title**: Project එකේ නම
- **Category**: Project එකේ category (e.g., "Web Development", "Mobile App")
- **Description**: Project එකේ විස්තරය
- **Image URL**: Project එකේ image එකේ URL (e.g., `https://example.com/image.jpg`)
- **Project Link**: Project එකේ live link එක (optional)
- **Tags**: Project එකේ technologies/tags (e.g., "React", "Node.js")

---

## 🔄 LIVE UPDATES

Admin page එකෙන් save කළාම:
- ✅ Hero buttons instantly hide/show වෙනවා
- ✅ Pricing buttons instantly hide/show වෙනවා
- ✅ AI Tools section instantly hide/show වෙනවා
- ✅ Portfolio projects instantly update වෙනවා
- ✅ Page refresh කරන්න එපා - automatically update වෙනවා

---

## 💾 DATA STORAGE

සියල්ල localStorage එකේ save වෙනවා:

### `siteContent` key:
```json
{
  "heroButtonsEnabled": true,
  "pricingButtonsEnabled": true,
  "aiToolsEnabled": true,
  "aboutEnabled": false,
  "missionEnabled": false,
  "backgroundVideoEnabled": false,
  "maintenanceMode": false
}
```

### `portfolioProjects` key:
```json
[
  {
    "title": "Project Name",
    "category": "Web Development",
    "description": "Project description",
    "image": "https://example.com/image.jpg",
    "link": "https://project-url.com",
    "tags": ["React", "Node.js"]
  }
]
```

---

## 🎨 WHAT'S VISIBLE BY DEFAULT

Default settings:
- ✅ Hero buttons: **VISIBLE**
- ✅ Pricing buttons: **VISIBLE**
- ✅ AI Tools section: **VISIBLE**
- ❌ About section: **HIDDEN**
- ❌ Mission section: **HIDDEN**
- ❌ Background video: **HIDDEN**
- ❌ Maintenance mode: **OFF**

---

## 🧪 TESTING

### Test Hero Buttons:
1. Admin → Content Manager → Hero Section
2. Toggle "Show Hero Buttons" OFF
3. Save
4. Go to home page
5. Buttons should be hidden
6. Toggle ON and save
7. Buttons should appear

### Test Pricing Buttons:
1. Admin → Content Manager → Pricing Card Buttons
2. Toggle "Show Buttons" OFF
3. Save
4. Go to home page
5. Pricing card buttons should be hidden

### Test AI Tools Section:
1. Admin → Content Manager → AI Tools Section
2. Toggle "Show on Homepage" OFF
3. Save
4. Go to home page
5. AI Tools section should be hidden

### Test Portfolio:
1. Admin → Portfolio
2. Add a new project
3. Fill all fields
4. Save
5. Go to home page
6. New project should appear in portfolio section

---

## 📂 FILES MODIFIED

### Admin Components:
- `src/components/admin/ContentManager.tsx` - Added toggles for buttons and sections
- `src/components/admin/PortfolioManager.tsx` - Added portfolio update event

### Home Components:
- `src/components/home/Hero.tsx` - Added button visibility control
- `src/components/home/PricingSection.tsx` - Added button visibility control
- `src/components/home/PortfolioShowcase.tsx` - Load projects from localStorage
- `src/pages/Home.tsx` - Conditional rendering of AI Tools section

---

## 🚀 NEXT STEPS

දැන් admin page එකෙන් මේ සියල්ල control කරන්න පුළුවන්:

1. ✅ Hero buttons hide/show
2. ✅ Pricing buttons hide/show
3. ✅ AI Tools section hide/show
4. ✅ Portfolio projects add/edit/delete
5. ✅ About section hide/show (already working)
6. ✅ Mission section hide/show (already working)
7. ✅ Background video hide/show (already working)
8. ✅ Maintenance mode ON/OFF (already working)

සියල්ල හදා අවසන්! 🎉

---

## 🐛 TROUBLESHOOTING

### Changes not appearing?
- Make sure you clicked "Save All Content" or "Save All Changes"
- Check browser console (F12) for errors
- Try refreshing the page

### Portfolio not updating?
- Make sure you clicked "Save All Changes" in Portfolio Manager
- Check if projects are saved in localStorage: DevTools → Application → Local Storage → `portfolioProjects`

### Buttons still showing after hiding?
- Clear browser cache
- Check localStorage: DevTools → Application → Local Storage → `siteContent`
- Make sure `heroButtonsEnabled` or `pricingButtonsEnabled` is `false`

---

## ✨ FEATURES

- ✅ Toggle hero buttons ON/OFF
- ✅ Toggle pricing buttons ON/OFF
- ✅ Toggle AI Tools section ON/OFF
- ✅ Add/edit/delete portfolio projects
- ✅ Live updates without page refresh
- ✅ All data stored in localStorage
- ✅ Easy to use admin interface
- ✅ Mobile responsive

සියල්ල හරියටම වැඩ කරනවා! 🎉
