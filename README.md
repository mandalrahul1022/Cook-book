# Cookbook

Full‑stack recipe app.

## Quick start


git clone <this‑repo>
cd cookbook

# The Sever
cd server
cp .env 
npm install
npm run dev

# client
cd ../client
npm install
npm run dev


Server starts on **:5000**, client on **:5173**. API URL is automatically `http://localhost:5000`.

### Nutrition API

Proxy route `/api/nutrition?query=<food>` is powered by **API Ninjas** and uses the key bundled inside `server/.env`. Replace it anytime.

### PWA & offline

When you build (`npm run build` in `client/`), Vite bundles a service worker that caches static assets and any recipe you have visited, so you can open the app offline and view your saved recipes and meal plans.

Happy cooking! 🍲


# Error ( ｡ •̀ ⤙ •́ ｡ )

#  App has Nutrition preview but it is not working due to api is not responding currently it worked great on terminal and was responding
# May be because ingredients doesn't match up as recipies are local. Also esence of my app was user being able to add their recipes so I ignored it

