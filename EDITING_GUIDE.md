# 📝 Website Editing Guide - කොහෙන් මොනවද Edit කරන්නේ?

## 🏠 HOME PAGE - `src/pages/Home.tsx`

Home page එකේ sections:

### 1. **Hero Section** (Top Banner)
📁 File: `src/components/home/Hero.tsx`
- Main heading
- Tagline
- CTA buttons
- Background animations

### 2. **Service Strip** (Scrolling Services)
📁 File: `src/components/home/ServiceStrip.tsx`
- Service names එක එක
- Scrolling animation

### 3. **Featured On** (Logos/Badges)
📁 File: `src/components/home/FeaturedOn.tsx`
- Company logos
- Trust badges
- Media mentions

### 4. **Services Grid** (Main Services)
📁 File: `src/components/home/ServicesGrid.tsx`
- Service cards
- Icons
- Descriptions
- Pricing

### 5. **Instruction Video** (Video Section)
📁 File: `src/components/home/InstructionVideo.tsx`
- Video player
- Steps guide
- Video URL (Admin panel: `/admin/video`)

### 6. **Portfolio Showcase**
📁 File: `src/components/home/PortfolioShowcase.tsx`
- Project cards
- Images
- Descriptions
- Links

### 7. **AI Tools Section**
📁 File: `src/components/home/AIToolsSection.tsx`
- AI features
- Tool descriptions
- Benefits

### 8. **Template Preview**
📁 File: `src/components/home/TemplatePreview.tsx`
- Template cards
- Preview images
- Prices

### 9. **Live Stats** (Numbers/Metrics)
📁 File: `src/components/home/LiveStats.tsx`
- Client count
- Projects completed
- Success rate
- Animated counters

### 10. **Pricing Section**
📁 File: `src/components/home/PricingSection.tsx`
- Pricing plans
- Features list
- Prices
- CTA buttons

### 11. **Contact Section**
📁 File: `src/components/home/ContactSection.tsx`
- Contact form
- Email
- Phone
- Social links

---

## 🎨 LAYOUT (Header/Footer/Navigation)

### **Navbar** (Top Menu)
📁 File: `src/components/layout/Navbar.tsx`
- Logo
- Menu links
- Login button
- Mobile menu

### **Footer**
📁 File: `src/components/layout/Footer.tsx`
- Company info
- Links
- Social media
- Copyright

### **Floating Actions** (Side Buttons)
📁 File: `src/components/layout/FloatingActions.tsx`
- WhatsApp button
- Chat button
- Scroll to top

---

## 📄 OTHER PAGES

### **Services Page**
📁 File: `src/pages/Services.tsx`
- All services detailed
- Service descriptions
- Pricing details

### **Marketplace Page**
📁 File: `src/pages/Marketplace.tsx`
- Products/Templates
- Marketplace items
- Buy buttons

### **Portfolio Page**
📁 File: `src/pages/Portfolio.tsx`
- All projects
- Case studies
- Project details

### **Portal Page** (Client Dashboard)
📁 File: `src/pages/Portal.tsx`
- Client dashboard
- Projects status
- Messages
- Invoices

### **Video Manager** (Admin)
📁 File: `src/pages/VideoManager.tsx`
- Upload videos
- Manage instruction video

---

## 🎯 QUICK EDIT LOCATIONS

### ✏️ Company Name වෙනස් කරන්න:
```
📁 src/components/layout/Navbar.tsx (Line ~40)
📁 src/components/layout/Footer.tsx
📁 index.html (Title tag)
```

### ✏️ Main Heading වෙනස් කරන්න:
```
📁 src/components/home/Hero.tsx
```

### ✏️ Services වෙනස් කරන්න:
```
📁 src/components/home/ServicesGrid.tsx
📁 src/components/home/ServiceStrip.tsx
```

### ✏️ Prices වෙනස් කරන්න:
```
📁 src/components/home/PricingSection.tsx
📁 src/components/home/ServicesGrid.tsx
```

### ✏️ Contact Info වෙනස් කරන්න:
```
📁 src/components/home/ContactSection.tsx
📁 src/components/layout/Footer.tsx
📁 src/components/layout/FloatingActions.tsx (WhatsApp number)
```

### ✏️ Colors වෙනස් කරන්න:
```
📁 src/index.css (CSS variables)
📁 tailwind.config.js (if exists)
```

### ✏️ Logo වෙනස් කරන්න:
```
📁 public/logo-white.svg (Replace file)
📁 public/favicon.svg (Replace file)
```

### ✏️ Stats/Numbers වෙනස් කරන්න:
```
📁 src/components/home/LiveStats.tsx
```

---

## 🔍 HOW TO FIND SPECIFIC TEXT

### Method 1: Search in VS Code
1. Press `Ctrl + Shift + F` (Windows) or `Cmd + Shift + F` (Mac)
2. Type the text you want to find
3. Results will show which file has that text

### Method 2: Search in File
1. Open any file
2. Press `Ctrl + F` (Windows) or `Cmd + F` (Mac)
3. Type the text to find in that file

---

## 📱 RESPONSIVE DESIGN

Most components use Tailwind CSS classes:
- `md:` = Medium screens (tablets)
- `lg:` = Large screens (desktops)
- `sm:` = Small screens (mobile)

Example:
```tsx
className="text-2xl md:text-4xl lg:text-6xl"
// Mobile: 2xl, Tablet: 4xl, Desktop: 6xl
```

---

## 🎨 STYLING

### Colors:
- `bg-primary` = Main blue color
- `text-primary` = Blue text
- `bg-black` = Black background
- `text-white` = White text
- `text-white/60` = 60% opacity white

### Spacing:
- `p-4` = Padding 1rem
- `m-4` = Margin 1rem
- `gap-4` = Gap between items
- `px-6` = Padding left/right
- `py-4` = Padding top/bottom

### Rounded Corners:
- `rounded-lg` = Large rounded
- `rounded-full` = Fully rounded (circle)
- `rounded-2xl` = Extra large rounded

---

## 💡 TIPS

1. **Always save file after editing** (`Ctrl + S`)
2. **Dev server auto-reloads** - changes appear instantly
3. **Check browser console** for errors (F12)
4. **Use VS Code extensions**:
   - ES7+ React snippets
   - Tailwind CSS IntelliSense
   - Auto Rename Tag

---

## 🚨 COMMON MISTAKES

❌ **Don't edit:**
- `node_modules/` folder
- `dist/` folder (build output)
- `.git/` folder

✅ **Do edit:**
- `src/` folder (all your code)
- `public/` folder (images, logos)
- `index.html` (page title, meta tags)

---

## 📞 NEED HELP?

1. **Text not changing?**
   - Make sure you saved the file
   - Check if dev server is running
   - Refresh browser (Ctrl + R)

2. **Page broken?**
   - Check browser console (F12)
   - Look for red error messages
   - Undo last change (Ctrl + Z)

3. **Can't find text?**
   - Use global search (Ctrl + Shift + F)
   - Search for partial text
   - Check all home components

---

## 🎯 QUICK REFERENCE

| What to Edit | File Location |
|-------------|---------------|
| Hero/Banner | `src/components/home/Hero.tsx` |
| Services | `src/components/home/ServicesGrid.tsx` |
| Pricing | `src/components/home/PricingSection.tsx` |
| Contact | `src/components/home/ContactSection.tsx` |
| Navbar | `src/components/layout/Navbar.tsx` |
| Footer | `src/components/layout/Footer.tsx` |
| Logo | `public/logo-white.svg` |
| Favicon | `public/favicon.svg` |
| Page Title | `index.html` |
| Video | `/admin/video` (in browser) |

---

Happy Editing! 🎉
