# VoiceSOS Deployment Guide

## Production Build
The application has been built for production. The build files are in the `dist/` folder.

## Local Preview
Run `npm run preview` to preview the production build locally (typically on port 4173).

## Deployment Options

### 1. Vercel (Recommended - Easiest)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Or deploy with production flag
vercel --prod
```
Or simply:
- Go to https://vercel.com
- Connect your GitHub repository
- Import project
- Deploy automatically on every push

### 2. Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```
Or:
- Go to https://netlify.com
- Drag and drop the `dist` folder
- Or connect your repository for continuous deployment

### 3. GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json scripts:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```
3. Run: `npm run deploy`

### 4. Firebase Hosting
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize
firebase init hosting

# Deploy
firebase deploy --only hosting
```

### 5. Traditional Web Server (Apache/Nginx)
- Upload the contents of the `dist` folder to your web server's public directory
- Configure your server to serve `index.html` for all routes (SPA routing)
- Example Nginx config:
  ```nginx
  location / {
    try_files $uri $uri/ /index.html;
  }
  ```

### 6. Docker (Optional)
Create a `Dockerfile`:
```dockerfile
FROM nginx:alpine
COPY dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## Environment Variables
If you need environment variables for API endpoints:
- Vercel: Add in Project Settings → Environment Variables
- Netlify: Site Settings → Build & Deploy → Environment
- Others: Configure based on platform documentation

## Current Build
- **Build Directory**: `dist/`
- **Entry Point**: `dist/index.html`
- **Static Assets**: `dist/assets/`

## Notes
- The app is a Single Page Application (SPA), ensure your hosting platform is configured for SPA routing
- All assets are optimized and minified in the production build
