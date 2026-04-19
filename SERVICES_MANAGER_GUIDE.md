# 🛠️ Services Manager Guide

## ✅ What's New?

ඔබට දැන් **Admin Panel එකෙන්** service cards manage කරන්න පුළුවන්!

---

## 🎯 Features

### Service Card එකක තියෙන දේවල්:

1. **Service Title** - Service එකේ නම (e.g., "Software Engineering")
2. **Label/Badge** - Top label (e.g., "Enterprise Scale")
3. **Icon** - Card එකේ icon
4. **Color Theme** - Card එකේ gradient color
5. **Description** - Service එකේ විස්තරය
6. **Demo Link** - "View Demo" button link
7. **Order Link** - "Order Now" button link

---

## 🚀 How to Use

### 1. Access Services Manager:

```
http://localhost:3000/admin
```

Click **"Services Manager"** in sidebar

---

### 2. Edit Service Card:

1. Click **"Edit"** button on any service card
2. Edit fields:
   - Service Title
   - Label/Badge
   - Icon (dropdown)
   - Color Theme (dropdown)
   - Description
   - **Demo Link** (Button 1)
   - **Order Link** (Button 2)
3. Click **"Save All Changes"**
4. **Refresh home page** to see changes!

---

### 3. Add Links to Buttons:

#### Demo Link (View Demo Button):
```
https://demo.yoursite.com
https://yoursite.com/demo
https://example.com/preview
```

#### Order Link (Order Now Button):
```
https://order.yoursite.com
https://wa.me/94771234567?text=I want to order
https://forms.google.com/your-form
mailto:hello@yoursite.com
```

**Examples:**

**WhatsApp Order Link:**
```
https://wa.me/94771234567?text=I%20want%20to%20order%20Software%20Engineering%20service
```

**Google Form:**
```
https://forms.google.com/d/e/YOUR_FORM_ID/viewform
```

**Email:**
```
mailto:hello@limitless.lk?subject=Order%20Software%20Engineering
```

---

### 4. Add New Service:

1. Click **"Add Service"** button (top right)
2. New service card appears at bottom
3. Click **"Edit"** to customize
4. Fill all fields
5. Add demo & order links
6. Click **"Save All Changes"**

---

### 5. Delete Service:

1. Click **"Edit"** on service card
2. Scroll down
3. Click **"Delete Service"** (red button)
4. Confirm deletion
5. Click **"Save All Changes"**

---

## 📝 Step-by-Step Example

### Example: Add Demo & Order Links to "Software Engineering"

1. **Go to Admin:**
   ```
   http://localhost:3000/admin
   ```

2. **Click "Services Manager"** in sidebar

3. **Find "Software Engineering" card**

4. **Click "Edit"**

5. **Add Demo Link:**
   ```
   https://demo.yourcompany.com/software
   ```

6. **Add Order Link (WhatsApp):**
   ```
   https://wa.me/94771234567?text=I%20want%20to%20order%20Software%20Engineering
   ```

7. **Click "Save All Changes"**

8. **Go to home page:**
   ```
   http://localhost:3000
   ```

9. **Scroll to Services section**

10. **Click "View Demo"** - Opens demo site in new tab ✅

11. **Click "Order Now"** - Opens WhatsApp chat ✅

---

## 🎨 Customization Options

### Available Icons:
- Terminal
- Code
- Smartphone
- Rocket
- Database
- Wand2
- Globe
- Zap
- Star
- Heart

### Available Colors:
- Blue
- Purple
- Cyan
- Red
- Green
- Yellow
- Pink
- Orange

---

## 💡 Link Ideas

### Demo Links:
- Live demo website
- Video demo (YouTube)
- Interactive prototype
- Case study page
- Portfolio example

### Order Links:
- WhatsApp chat
- Contact form
- Google Form
- Email (mailto:)
- Booking page
- Payment page
- Calendly booking

---

## 🔗 WhatsApp Link Generator

### Format:
```
https://wa.me/[PHONE_NUMBER]?text=[MESSAGE]
```

### Example:
```
https://wa.me/94771234567?text=Hi!%20I%20want%20to%20order%20Web%20Development%20service
```

**Replace:**
- `94771234567` - Your WhatsApp number (with country code, no +)
- `Hi!%20I%20want%20to%20order` - Your message (spaces = %20)

### Quick Generator:
1. Phone: `94771234567`
2. Message: `I want to order [SERVICE NAME]`
3. Result: `https://wa.me/94771234567?text=I%20want%20to%20order%20[SERVICE NAME]`

---

## 📱 Button Behavior

### "View Demo" Button:
- Opens link in **new tab**
- If link is `#`, button stays on page
- Best for: demos, previews, portfolios

### "Order Now" Button:
- Opens link in **new tab**
- If link is `#`, button stays on page
- Best for: orders, forms, WhatsApp

---

## 🎯 Real-World Examples

### Example 1: Software Engineering Service

**Demo Link:**
```
https://github.com/yourcompany/portfolio
```

**Order Link:**
```
https://wa.me/94771234567?text=I%20want%20to%20discuss%20Software%20Engineering%20project
```

---

### Example 2: Web Development Service

**Demo Link:**
```
https://yourcompany.com/web-portfolio
```

**Order Link:**
```
https://forms.google.com/d/e/YOUR_FORM_ID/viewform?entry.123=Web%20Development
```

---

### Example 3: Mobile App Service

**Demo Link:**
```
https://play.google.com/store/apps/details?id=com.yourapp
```

**Order Link:**
```
mailto:hello@yourcompany.com?subject=Mobile%20App%20Development%20Inquiry
```

---

## 🔧 Technical Details

### Data Storage:
- Services saved in **localStorage**
- Key: `servicesData`
- Format: JSON array

### Files Modified:
- ✅ `src/components/home/ServicesGrid.tsx` - Display services
- ✅ `src/components/admin/ServicesManager.tsx` - Manage services
- ✅ `src/pages/Admin.tsx` - Admin dashboard

---

## 📊 Service Card Structure

```json
{
  "icon": "Terminal",
  "title": "Software Engineering",
  "label": "Enterprise Scale",
  "color": "from-blue-500/20",
  "description": "Your service description here",
  "demoLink": "https://demo.example.com",
  "orderLink": "https://wa.me/94771234567"
}
```

---

## 🚨 Troubleshooting

### Links not working?
- ✅ Make sure URL starts with `https://` or `http://`
- ✅ Test link in new tab first
- ✅ Check for typos in URL

### Changes not showing?
- ✅ Click "Save All Changes"
- ✅ **Refresh home page** (Ctrl + R)
- ✅ Clear browser cache

### Button stays on page?
- ✅ Check if link is `#`
- ✅ Add proper URL
- ✅ Save changes

### WhatsApp not opening?
- ✅ Check phone number format (no + or spaces)
- ✅ Use country code (94 for Sri Lanka)
- ✅ Test link in browser first

---

## 💡 Pro Tips

1. **Test links** - Click "Test link" in admin panel
2. **Use WhatsApp** - Easy for customers to order
3. **Add tracking** - Use UTM parameters in links
4. **Keep descriptions short** - 1-2 sentences max
5. **Update regularly** - Keep demo links fresh

---

## 🎉 Quick Start

1. **Go to:** `http://localhost:3000/admin`
2. **Click:** "Services Manager"
3. **Click:** "Edit" on first service
4. **Add Demo Link:** Your demo URL
5. **Add Order Link:** Your WhatsApp link
6. **Click:** "Save All Changes"
7. **Refresh home page**
8. **Test buttons!** ✅

---

## 📞 Example WhatsApp Links

### Software Engineering:
```
https://wa.me/94771234567?text=Hi!%20I%20need%20Software%20Engineering%20service
```

### Web Development:
```
https://wa.me/94771234567?text=Hi!%20I%20want%20a%20website
```

### Mobile App:
```
https://wa.me/94771234567?text=Hi!%20I%20need%20a%20mobile%20app
```

### Custom Message:
```
https://wa.me/94771234567?text=Your%20custom%20message%20here
```

---

## 🎯 Summary

**What you can do:**
- ✅ Edit service titles & descriptions
- ✅ Change icons & colors
- ✅ Add demo links (View Demo button)
- ✅ Add order links (Order Now button)
- ✅ Add new services
- ✅ Delete services
- ✅ Save & apply changes

**Where:**
- Admin Panel: `http://localhost:3000/admin`
- Services Manager tab

**Result:**
- Buttons work on home page
- Links open in new tabs
- Easy for customers to order!

---

Happy Managing! 🚀
