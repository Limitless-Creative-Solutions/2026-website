# 🔐 Admin Dashboard Guide

## ✅ Admin Panel Features

ඔබේ website එකේ දැන් **full admin dashboard** එකක් තියෙනවා!

---

## 🚀 How to Access Admin Panel

### Method 1: Direct URL
Browser එකේ type කරන්න:
```
http://localhost:3000/admin
```

### Method 2: Add to Navbar (Optional)
Navbar එකට admin link එකක් add කරන්න පුළුවන්

---

## 📊 Admin Dashboard Sections

### 1. **Dashboard** 🏠
**Main overview page:**
- 📈 Statistics cards (Users, Projects, Revenue, Page Views)
- ⚡ Quick actions (Upload Video, Edit Content, Manage Images)
- 📋 Recent activity log
- 📊 Overview metrics

**What you can see:**
- Total users count
- Active projects
- Revenue stats
- Page views
- Recent changes

---

### 2. **Video Manager** 📹
**Upload & manage instruction videos:**
- 🔗 Add video URL (YouTube, Vimeo)
- 📤 Upload video files
- 👁️ Live preview
- 💾 Save to website

**How to use:**
1. Click "Video Manager" in sidebar
2. Choose "Video URL" or "Upload File"
3. Paste YouTube link or upload file
4. Preview video
5. Click "Save Video"
6. Video appears on home page automatically!

**Supported formats:**
- YouTube: `https://www.youtube.com/watch?v=VIDEO_ID`
- Vimeo: `https://vimeo.com/VIDEO_ID`
- Direct: MP4, MOV, AVI files

---

### 3. **Content Management** 📝
**Edit website text content:**
- ✏️ Hero heading
- ✏️ Hero description
- ✏️ Company name
- ✏️ Taglines
- ✏️ Button text

**How to use:**
1. Click "Content" in sidebar
2. Edit text in input fields
3. Click "Save Changes"
4. Changes appear on website

**What you can edit:**
- Main heading on home page
- Description/tagline
- Company name
- Any text content

---

### 4. **Image Gallery** 🖼️
**Upload & manage images:**
- 📤 Upload images
- 🗂️ Organize gallery
- 🖼️ View all images
- 🗑️ Delete images

**How to use:**
1. Click "Images" in sidebar
2. Drag & drop images or click to upload
3. Supported: PNG, JPG, GIF (up to 10MB)
4. Images saved to gallery

**Use cases:**
- Portfolio images
- Service images
- Background images
- Logo variations

---

### 5. **User Management** 👥
**Manage website users:**
- 👤 View all users
- 📧 See user emails
- 🏷️ User roles (Client, Admin)
- ✅ User status (Active, Inactive)

**What you can see:**
- User name
- Email address
- Role (Client/Admin)
- Status (Active/Inactive)
- Registration date

---

### 6. **Analytics** 📊
**View website statistics:**
- 📈 Traffic data
- 👁️ Page views
- 🖱️ User behavior
- 📊 Charts & graphs

**Coming soon:**
- Real-time analytics
- Visitor tracking
- Popular pages
- Conversion rates

---

### 7. **Settings** ⚙️
**Configure website settings:**
- 🏢 Site title
- 📧 Contact email
- 📱 WhatsApp number
- 🔧 Maintenance mode
- 🎨 Theme settings

**How to use:**
1. Click "Settings" in sidebar
2. Edit settings
3. Toggle maintenance mode if needed
4. Click "Save Settings"

**Available settings:**
- Site title (browser tab)
- Contact email
- WhatsApp number
- Maintenance mode toggle

---

## 🎯 Quick Tasks

### Upload Instruction Video:
1. Go to `/admin`
2. Click "Video Manager"
3. Paste YouTube URL
4. Save
5. Done! ✅

### Change Hero Heading:
1. Go to `/admin`
2. Click "Content"
3. Edit "Hero Heading" field
4. Save
5. Done! ✅

### Upload Images:
1. Go to `/admin`
2. Click "Images"
3. Drag & drop images
4. Done! ✅

### View Users:
1. Go to `/admin`
2. Click "Users"
3. See all registered users
4. Done! ✅

---

## 🎨 Admin Panel Features

### ✨ Modern Design:
- Dark theme
- Smooth animations
- Responsive layout
- Clean interface

### 🚀 Easy to Use:
- Sidebar navigation
- Clear sections
- Quick actions
- Save buttons

### 📱 Mobile Friendly:
- Works on tablets
- Works on phones
- Responsive design

### 🔒 Secure:
- Admin only access
- Protected routes
- User authentication

---

## 🔐 Security (Coming Soon)

**Planned features:**
- 🔑 Admin login required
- 👤 User roles & permissions
- 🔒 Password protection
- 📝 Activity logging

**Current status:**
- Admin panel is accessible to anyone with URL
- Add authentication for production use

---

## 📁 Admin Files Location

```
src/
├── pages/
│   ├── Admin.tsx              # Main admin dashboard
│   └── VideoManager.tsx       # Video manager page
└── components/
    └── admin/
        └── VideoManager.tsx   # Video upload component
```

---

## 🎯 Customization

### Add New Admin Section:
1. Open `src/pages/Admin.tsx`
2. Add new tab to `tabs` array:
```tsx
{ id: "newSection", label: "New Section", icon: YourIcon }
```
3. Create new component function
4. Add to render section

### Change Admin Colors:
Edit `src/pages/Admin.tsx` - change Tailwind classes

### Add More Fields:
Edit respective tab components (ContentTab, SettingsTab, etc.)

---

## 💡 Tips

1. **Save often** - Click save after each change
2. **Preview changes** - Check website after saving
3. **Use dashboard** - Quick overview of everything
4. **Check analytics** - Monitor website performance
5. **Backup content** - Keep copies of important text

---

## 🚨 Troubleshooting

### Can't access admin panel?
- ✅ Make sure URL is correct: `/admin`
- ✅ Check if dev server is running
- ✅ Clear browser cache

### Changes not saving?
- ✅ Click "Save" button
- ✅ Check browser console for errors
- ✅ Refresh page

### Video not showing?
- ✅ Check video URL is correct
- ✅ Make sure video is public/embeddable
- ✅ Try different video URL

---

## 🎉 Admin Panel URLs

| Page | URL |
|------|-----|
| Main Dashboard | `/admin` |
| Video Manager | `/admin` → Click "Video Manager" |
| Content Editor | `/admin` → Click "Content" |
| Image Gallery | `/admin` → Click "Images" |
| User Management | `/admin` → Click "Users" |
| Analytics | `/admin` → Click "Analytics" |
| Settings | `/admin` → Click "Settings" |

---

## 📞 Need Help?

**Common tasks:**
- Upload video → Video Manager tab
- Edit text → Content tab
- Upload images → Images tab
- Change settings → Settings tab
- View stats → Dashboard tab

---

## 🚀 Next Steps

1. **Access admin panel:** `http://localhost:3000/admin`
2. **Upload instruction video:** Video Manager tab
3. **Edit content:** Content tab
4. **Customize settings:** Settings tab
5. **Monitor stats:** Dashboard tab

---

## 🔒 Production Deployment

**Before going live:**
1. ✅ Add authentication (login required)
2. ✅ Set up user roles
3. ✅ Enable HTTPS
4. ✅ Add activity logging
5. ✅ Backup database
6. ✅ Test all features

---

## 📚 Related Guides

- `EDITING_GUIDE.md` - How to edit code files
- `FILE_STRUCTURE.md` - Project structure
- `LOGO_AND_VIDEO_SETUP.md` - Logo & video setup
- `QUICK_START_EDITING.md` - Quick editing guide

---

Enjoy your Admin Dashboard! 🎉
