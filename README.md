# 🌱 VegRoot – Frontend

VegRoot is a modern, plant-based recipe sharing platform designed to promote sustainable living and healthy eating habits.
This frontend provides a clean, responsive, and user-friendly experience for discovering vegan recipes inspired by local traditions and global cuisines.

---

## 🚀 Technologies Used

- Next.js 14 (App Router) – Server-side rendering and modern routing
- Tailwind CSS – Utility-first styling for a fast and consistent UI
- Lucide React – Clean and lightweight icon library
- Axios – HTTP client for backend API communication

### 🛠️ Installation & Setup

# 1. Clone the repository
```bash
git clone https://github.com/hasanangis/vegroot-frontend.git
 ```
# 2. Navigate into the project folder
```bash
cd vegroot-frontend
 ```
# 3. Install dependencies
```bash
npm install
 ```
# 4. Configure environment variables
# Create a .env.local file in the root directory and add:
```bash
echo NEXT_PUBLIC_API_URL=http://localhost:5000 > .env.local
 ```
# 5. Start the development server
```bash
npm run dev
 ```
# 6. Open in your browser
```bash
# http://localhost:3000
 ```
## 📁 Project Structure

app/            → App Router pages, layouts, and routing logic  
components/     → Reusable UI components (Navbar, RecipeCard, Button, etc.)  
public/         → Static assets such as logos and icons  
styles/         → Global styles and Tailwind configuration  

---

## 🔗 Backend Integration

The frontend is fully integrated with the VegRoot Backend API.

- Recipe data
- User authentication
- Images and media assets

Dynamic image usage example:  
src = NEXT_PUBLIC_API_URL + recipe.image_url

---

## 🌍 Project Vision

VegRoot aims to make plant-based eating more accessible by combining
traditional knowledge, modern technology, and global vegan cuisine
into a single, easy-to-use platform.

---

## 📄 License

This project is licensed under the MIT License.
