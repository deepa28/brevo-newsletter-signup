# Brevo Newsletter Signup

A modern, responsive Node.js/Express application for newsletter signup, integrated with the Brevo API.

## Features
- Semantic HTML5, accessible, and mobile-friendly UI
- Brevo API integration for email list signup
- Modern error and thank you pages
- Environment variable support for API keys

## Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [npm](https://www.npmjs.com/)
- [Surge](https://surge.sh/) (for static deployment)

## Setup

1. **Clone the repository**
   ```sh
   git clone <your-repo-url>
   cd brevo-newsletter-signup
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Configure environment variables**
   - Create a `.env` file in the root directory:
     ```env
     BREVO_API_KEY=your_actual_brevo_api_key_here
     BREVO_LIST_ID=your_actual_brevo_list_id_here
     ```

4. **Run the application locally**
   ```sh
   npm start
   ```
   Visit [http://localhost:8000](http://localhost:8000) in your browser.

## Deploying to Surge

Surge is for static sites. To deploy the static frontend (HTML, CSS, JS):

1. **Build/prepare the static files**
   - Copy the contents of the `public` folder to a new folder called `dist`:
     ```sh
     cp -r public dist
     ```
   - (Optional) Edit `dist/index.html` and `dist/thankyou.html` to remove form actions or backend dependencies, or use a static form handler service.

2. **Install Surge globally (if not already installed)**
   ```sh
   npm install -g surge
   ```

3. **Deploy**
   ```sh
   surge dist your-custom-brevo-newsletter.surge.sh
   ```
   - Replace `your-custom-brevo-newsletter.surge.sh` with your desired Surge subdomain.

> **Note:** The backend (Express API integration) will not work on Surge, as Surge only hosts static files. For full functionality, deploy the Node.js app to a platform like Render, Vercel, or Heroku, and use Surge for the static frontend if needed.

## Deploying the Node.js Backend to Render

Render is a cloud platform that supports Node.js apps with a free tier for web services.

### 1. Push your code to GitHub
- Make sure your project is in a GitHub repository (public or private).

### 2. Create a new Web Service on Render
- Go to [https://dashboard.render.com/](https://dashboard.render.com/)
- Click **New +** > **Web Service**
- Connect your GitHub account and select your repository
- For **Environment**, choose `Node`.
- For **Build Command**, use:
  ```sh
  npm install
  ```
- For **Start Command**, use:
  ```sh
  npm start
  ```
- Set the **Environment Variables**:
  - `BREVO_API_KEY` (your Brevo API key)
  - `BREVO_LIST_ID` (your Brevo list ID)
- Click **Create Web Service**

### 3. Wait for deployment
- Render will build and deploy your app. When done, you'll get a public URL like `https://your-app-name.onrender.com`.

### 4. Update your frontend form action
- In your static `index.html` (for Surge or any static host), change the form action to point to your Render backend:
  ```html
  <form action="https://your-app-name.onrender.com/subscribe" method="POST" ...>
  ```
- Replace `your-app-name.onrender.com` with your actual Render URL.

### 5. Redeploy your static site (if needed)
- If you use Surge, update your static files and redeploy:
  ```sh
  cp -r public dist
  # Edit dist/index.html as above
  surge dist your-custom-brevo-newsletter.surge.sh
  ```

---

Now, your frontend (on Surge or elsewhere) will POST to your live Node.js backend on Render, and the full newsletter signup flow will work!

## License
MIT