# 🛒 QuickMart – Full-Stack E-Commerce Platform  

![React](https://img.shields.io/badge/React-18.2.0-blue)   ![.NET Core](https://img.shields.io/badge/.NET%2520Core-7.0-purple)  
![SQL Server](https://img.shields.io/badge/SQL%2520Server-2022-red)  ![License: MIT](https://img.shields.io/badge/License-MIT-green)  

QuickMart is a modern **full-stack e-commerce web application** built with **React (Frontend)** and **.NET Core (Backend)**, powered by **SQL Server** for data management.  
It offers a smooth, intuitive shopping experience with features ranging from responsive design and authentication to product browsing, reviews, maps, and secure checkout.  

---

## ✨ Key Features  

### 🌐 Frontend (React + Material-UI)  
- 📱 Responsive Design – Mobile-first layout using Material-UI  
- 🔑 User Authentication – Login/Register with JWT tokens  
- 🌍 Google OAuth Integration – Social login support  
- 🛍️ Product Catalog – Grid and carousel views with placeholders  
- 🔎 Advanced Search – Real-time search with autocomplete  
- 🗂️ Category Navigation – Browse by categories with "See All" feature  
- 🛒 Shopping Cart – Add/remove items with auto-refresh  
- 📄 Product Details – Detailed view with reviews and specifications  
- 🗺️ Interactive Map – Address selection via Leaflet.js  
- 📍 Address Management – Add/edit delivery addresses using map integration  
- 🔔 Toast Notifications – Instant user feedback with toast messages  
- ⏳ Loading States – Skeleton loaders and comprehensive error handling  
- 🖼️ Image Optimization – Lazy loading and placeholders for missing images  
- 👤 User Profile – Upload profile pictures and manage account settings  
- 💳 Payment Integration – Secure checkout flow  

### ⚙️ Backend (.NET Core)  
- 🔗 RESTful API – Clean architecture with separation of concerns  
- 🗃️ Entity Framework Core – ORM with code-first migrations  
- 🔒 JWT Authentication – Secure token-based authentication system  
- 🌍 Google OAuth – Server-side social authentication implementation  
- 📦 Product Management – Complete CRUD operations for products  
- 🗂️ Category Management – Full category management endpoints  
- 🛒 Cart Management – Persistent shopping cart with real-time synchronization  
- 👤 User Management – Profile & address management endpoints  
- 📤 File Upload – Secure profile picture upload handling  
- ⚡ Performance – Caching strategies and query optimization  
- 🛑 Error Handling – Global exception middleware  
- ✅ Validation – Robust data validation with FluentValidation  

---

## 🛠️ Tech Stack  

| Layer        | Technology                                |  
|--------------|-------------------------------------------|  
| **Frontend** | React, Material-UI, Leaflet.js, Axios      |  
| **Backend**  | ASP.NET Core, Entity Framework Core, JWT   |  
| **Database** | SQL Server with EF Core Migrations         |  
| **Auth**     | JWT, Google OAuth 2.0                     |  
| **Maps**     | Leaflet.js, Nominatim API                  |  
| **Dev**      | FluentValidation, Swagger/OpenAPI          |  

---

## 🚀 Quick Start  

### ✅ Prerequisites  
- Node.js (v16 or higher)  
- .NET 7.0 SDK  
- SQL Server (2019 or higher)  
- Git  

### 🔽 Installation  

#### Clone the repository  
```bash
git clone https://github.com/KrishMeghapara/QuickMart.git
cd QuickMart
```

#### Backend Setup  
```bash
cd backend

# Restore packages
dotnet restore

# Update database with migrations
dotnet ef database update

# Run the application
dotnet run
```

#### Frontend Setup  
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

#### Access the Application  
- **Frontend:** http://localhost:3000  
- **Backend API:** http://localhost:5000  
- **API Docs (Swagger):** http://localhost:5000/swagger  

---

### ⚙️ Environment Variables  
Create a `.env` file in the **backend** directory:  

```env
ConnectionStrings__DefaultConnection=Your_SQL_Server_Connection_String
Jwt__Key=Your_JWT_Secret_Key
Jwt__Issuer=Your_JWT_Issuer
Google__ClientId=Your_Google_OAuth_Client_ID
Google__ClientSecret=Your_Google_OAuth_Client_Secret
```

---

## 📁 Project Structure  

```text
QuickMart/
├── backend/
│   ├── Controllers/     # API endpoints
│   ├── Models/          # Data models
│   ├── Services/        # Business logic
│   ├── Migrations/      # Database migrations
│   └── Program.cs       # Application entry point
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── services/    # API services
│   │   └── hooks/       # Custom React hooks
│   └── public/          # Static assets
└── README.md
```

---

## 🗺️ Map & Location Features  

QuickMart integrates comprehensive mapping capabilities:  
- 🗺️ Interactive Map – OpenStreetMap powered by Leaflet.js  
- 🖱️ Click to Select – Intuitive location selection by clicking on the map  
- ↩️ Reverse Geocoding – Convert coordinates to human-readable addresses  
- 📍 Current Location – GPS-based location detection  
- 🪧 Address Popup – Display selected address details  
- ⚡ Real-Time Lookup – Query locations via the Nominatim API  

---

## 🤝 Contributing  

We welcome contributions! Please:  
1. Fork the project  
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)  
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)  
4. Push to the branch (`git push origin feature/AmazingFeature`)  
5. Open a Pull Request  

---

## 👨‍💻 Author  

**Krish Meghapara**  
- 🔗 [LinkedIn](https://www.linkedin.com/in/krish-meghapara-49571b2a7/)  
- 💻 [GitHub](https://github.com/KrishMeghapara)  
- 📧 krishmeghapara2@gmail.com  

---

## 📜 License  
This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.  

---

## 🙏 Acknowledgments  
- [Material-UI](https://mui.com/) for the component library  
- [Leaflet.js](https://leafletjs.com/) for mapping  
- [.NET](https://dotnet.microsoft.com/) team for the backend framework  
- [React](https://react.dev/) team for the frontend library  

⭐ If you like this project, don’t forget to **star the repo**!  
