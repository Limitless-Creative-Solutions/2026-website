# ⚡ Quick Start - Edit කරන්න පටන් ගන්න

## 🎯 Most Common Edits

### 1️⃣ Main Heading වෙනස් කරන්න

**File:** `src/components/home/Hero.tsx`

**Find this (around line 23-27):**
```tsx
<motion.h1>
  CREATIVE <br /> 
  <span className="outline-text">SOLUTIONS.</span> <br />
  NO LIMITS.
</motion.h1>
```

**Change to your text:**
```tsx
<motion.h1>
  YOUR TEXT <br /> 
  <span className="outline-text">HERE.</span> <br />
  GOES HERE.
</motion.h1>
```

---

### 2️⃣ Tagline/Description වෙනස් කරන්න

**File:** `src/components/home/Hero.tsx`

**Find this (around line 30-37):**
```tsx
<motion.p>
  Sri Lanka's most advanced digital ecosystem for brands that scale. 
  We combine high-end creative agency services with AI-powered SaaS automation.
</motion.p>
```

**Change to your text:**
```tsx
<motion.p>
  Your company description goes here. 
  Explain what you do and why you're awesome!
</motion.p>
```

---

### 3️⃣ Button Text වෙනස් කරන්න

**File:** `src/components/home/Hero.tsx`

**Find this (around line 47):**
```tsx
<button>
  Book Strategy Call
</button>
```

**Change to:**
```tsx
<button>
  Get Started Now
</button>
```

---

### 4️⃣ Company Name වෙනස් කරන්න

**File:** `src/components/layout/Navbar.tsx`

**Find this (around line 40):**
```tsx
<div className="font-display font-black text-xl tracking-tighter">
  LIMITLESS<span className="text-primary">.</span>LCC
</div>
```

**Change to:**
```tsx
<div className="font-display font-black text-xl tracking-tighter">
  YOUR COMPANY<span className="text-primary">.</span>NAME
</div>
```

---

### 5️⃣ WhatsApp Number වෙනස් කරන්න

**File:** `src/components/layout/FloatingActions.tsx`

**Find this:**
```tsx
href="https://wa.me/94771234567"
```

**Change to your number:**
```tsx
href="https://wa.me/94771234567"  // Replace with your number
```

---

### 6️⃣ Contact Email වෙනස් කරන්න

**File:** `src/components/home/ContactSection.tsx`

**Search for:** `email` or `@`

**Change to your email**

---

### 7️⃣ Services වෙනස් කරන්න

**File:** `src/components/home/ServicesGrid.tsx`

**Find the services array:**
```tsx
const services = [
  {
    title: "Web Development",
    description: "Custom websites...",
    price: "$2,999"
  },
  // More services...
]
```

**Edit:**
- `title` - Service name
- `description` - Service description
- `price` - Service price

---

### 8️⃣ Pricing Plans වෙනස් කරන්න

**File:** `src/components/home/PricingSection.tsx`

**Find the plans array:**
```tsx
const plans = [
  {
    name: "Starter",
    price: "$999",
    features: ["Feature 1", "Feature 2"]
  },
  // More plans...
]
```

**Edit:**
- `name` - Plan name
- `price` - Plan price
- `features` - List of features

---

### 9️⃣ Stats/Numbers වෙනස් කරන්න

**File:** `src/components/home/LiveStats.tsx`

**Find the stats:**
```tsx
const stats = [
  { value: 500, label: "Happy Clients" },
  { value: 1200, label: "Projects Done" },
  // More stats...
]
```

**Change numbers and labels**

---

### 🔟 Page Title වෙනස් කරන්න (Browser Tab)

**File:** `index.html`

**Find this (line 6):**
```html
<title>Limitless Creative Solutions | Sri Lanka's Leading Agency & SaaS</title>
```

**Change to:**
```html
<title>Your Company Name | Your Tagline</title>
```

---

## 🎨 Colors වෙනස් කරන්න

**File:** `src/index.css`

**Find CSS variables:**
```css
:root {
  --primary: #3B82F6;  /* Main blue color */
  --primary-dark: #2563EB;
}
```

**Change color codes:**
- Use hex codes: `#FF0000` (red)
- Or RGB: `rgb(255, 0, 0)`
- Or color names: `blue`, `red`, `green`

**Popular colors:**
- Blue: `#3B82F6`
- Purple: `#8B5CF6`
- Green: `#10B981`
- Red: `#EF4444`
- Orange: `#F59E0B`
- Pink: `#EC4899`

---

## 📝 HOW TO EDIT - Step by Step

### Step 1: Open VS Code
- Open your project folder in VS Code

### Step 2: Find the File
- Use file explorer (left sidebar)
- Or press `Ctrl + P` and type file name

### Step 3: Find the Text
- Press `Ctrl + F` to search in file
- Type the text you want to change

### Step 4: Edit
- Change the text
- Keep the quotes and brackets

### Step 5: Save
- Press `Ctrl + S` to save

### Step 6: Check Browser
- Browser auto-reloads
- See your changes!

---

## 🔍 Can't Find Something?

### Global Search:
1. Press `Ctrl + Shift + F`
2. Type the text you're looking for
3. VS Code shows all files with that text
4. Click on result to open file

---

## ⚠️ IMPORTANT RULES

### ✅ DO:
- Edit text inside quotes: `"Your text here"`
- Save after editing: `Ctrl + S`
- Keep the structure (brackets, commas)
- Test in browser after changes

### ❌ DON'T:
- Delete brackets: `{ }` `[ ]` `( )`
- Delete commas between items
- Edit `node_modules/` folder
- Delete `className=` or other props

---

## 🎯 EXAMPLE: Change Hero Heading

### Before:
```tsx
<h1>
  CREATIVE <br /> 
  <span>SOLUTIONS.</span> <br />
  NO LIMITS.
</h1>
```

### After:
```tsx
<h1>
  WEB DESIGN <br /> 
  <span>EXPERTS.</span> <br />
  IN SRI LANKA.
</h1>
```

**What changed:**
- "CREATIVE" → "WEB DESIGN"
- "SOLUTIONS" → "EXPERTS"
- "NO LIMITS" → "IN SRI LANKA"

**What stayed same:**
- `<h1>` tags
- `<br />` line breaks
- `<span>` tags
- Structure

---

## 💡 PRO TIPS

1. **Make small changes** - Test each change before making more
2. **Use Ctrl + Z** - Undo if something breaks
3. **Keep backups** - Copy original text before changing
4. **Check console** - Press F12 in browser to see errors
5. **Read error messages** - They tell you what's wrong

---

## 📞 COMMON ISSUES

### Text not changing?
- ✅ Did you save? (`Ctrl + S`)
- ✅ Is dev server running? (`npm run dev`)
- ✅ Did you refresh browser? (`Ctrl + R`)

### Page broken?
- ✅ Check browser console (F12)
- ✅ Look for red errors
- ✅ Undo last change (`Ctrl + Z`)
- ✅ Make sure brackets match

### Can't find text?
- ✅ Use global search (`Ctrl + Shift + F`)
- ✅ Search for partial text
- ✅ Check multiple files

---

## 🚀 READY TO EDIT!

**Most edited files:**
1. `src/components/home/Hero.tsx` - Main heading
2. `src/components/home/ServicesGrid.tsx` - Services
3. `src/components/home/PricingSection.tsx` - Prices
4. `src/components/home/ContactSection.tsx` - Contact
5. `src/components/layout/Navbar.tsx` - Menu
6. `src/components/layout/Footer.tsx` - Footer

**Start with Hero.tsx** - එක easiest එක!

Good luck! 🎉
