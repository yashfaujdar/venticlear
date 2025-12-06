# Quick Start Guide - Venticlear Website

## 🚀 Immediate Steps

### 1. View Your Website
- **Option A**: Double-click `index.html` to open in your browser
- **Option B**: Use the browser preview that's currently running at http://localhost:8000

### 2. Add Your Product Images (Important!)
The website currently uses placeholder images. To add your real product images:

1. Go to the `images` folder
2. Add these images with exact filenames:
   - `about-image.jpg` (manufacturing/facility photo)
   - `pre-filters.jpg`
   - `fine-filters.jpg`
   - `mini-pleat.jpg`
   - `hepa-filters.jpg`
   - `bag-filters.jpg`
   - `filter-modules.jpg`
   - `bibo-systems.jpg`

**Image Requirements**:
- Format: JPG or PNG
- Size: 800x600px for products, 1200x800px for about image
- Quality: High resolution but compressed (under 500KB each)

### 3. Update the Brochure (If Needed)
- Replace `venticlear brochure.pdf` with your latest brochure
- Keep the same filename or update the links in `index.html`

## 📝 Quick Customizations

### Change Colors
Edit `styles.css` (lines 10-20):
```css
--primary-color: #059669;  /* Venticlear primary green */
--secondary-color: #047857;
```

### Update Contact Information
Edit `index.html` - search for:
- Phone: 7011881821
- Email: aashishdubey@venticlear.com
- Address: 451, Block A, Sector 47...

### Modify Product Descriptions
Edit `index.html` - find the Products Section (around line 130)

## 🌐 Publishing Your Website

### Option 1: GitHub Pages (Free)
1. Create a GitHub account at github.com
2. Create a new repository named "venticlear-website"
3. Upload all files
4. Go to Settings → Pages
5. Select main branch
6. Your site will be live at: `https://yourusername.github.io/venticlear-website/`

### Option 2: Netlify (Free)
1. Go to netlify.com
2. Sign up for free
3. Drag and drop the entire `venticlear` folder
4. Your site will be live instantly with a free subdomain
5. You can connect your own domain later

### Option 3: Your Own Domain
1. Purchase hosting from any provider (Hostinger, Bluehost, GoDaddy, etc.)
2. Upload all files via FTP or cPanel File Manager
3. Ensure `index.html` is in the public_html or www folder
4. Access via your domain

## ✅ Pre-Launch Checklist

- [ ] Added all product images
- [ ] Updated brochure PDF (if needed)
- [ ] Tested website on desktop
- [ ] Tested website on mobile phone
- [ ] Verified all links work
- [ ] Checked contact form opens email client
- [ ] Verified download button works
- [ ] Updated any placeholder text
- [ ] Checked all contact information is correct

## 🆘 Common Issues

### Images Not Showing
- Check filenames match exactly (case-sensitive)
- Ensure images are in the `images` folder
- Try refreshing the browser (Ctrl+F5)

### Website Looks Broken
- Make sure all files are in the same folder
- Check that `styles.css` and `script.js` are present
- Try opening in a different browser

### Contact Form Not Working
- The form opens your default email client
- Make sure you have an email app installed (Outlook, Mail, etc.)
- Alternative: Use a form service like Formspree or Google Forms

## 📱 Testing on Mobile

1. **On your phone**: 
   - If using local server: Find your computer's IP address
   - Connect phone to same WiFi
   - Open browser and go to: `http://YOUR_IP:8000`

2. **After publishing**:
   - Simply visit your live URL on any device

## 🎨 Design Tips

- Keep images consistent in style and quality
- Use professional product photography
- Ensure text is readable on all devices
- Test in multiple browsers (Chrome, Firefox, Safari, Edge)

## 📞 Need Help?

Contact: aashishdubey@venticlear.com

## 🔄 Making Updates

1. Edit the HTML/CSS/JS files
2. Save changes
3. Refresh browser to see updates
4. Re-upload to hosting if already published

---

**Your website is ready to go! Just add your images and publish.** 🚀
