# Reanty - Fastcoding Frontend Test

Bài test Frontend cho vị trí HTML Trainee tại Fastcoding VN.

## 🌐 Demo

- **Live demo:** https://reanty-emel.netlify.app
- **Data server:** https://reanty-emel.netlify.app/assets/data/properties.json

## 🛠️ Công nghệ

- HTML5 thuần
- CSS3 thuần (Flexbox, Grid, Media Queries)
- Vanilla JavaScript (Fetch API)
- Không sử dụng framework

## 📁 Cấu trúc dự án

```
Reanty/
├── index.html                  # Trang HTML chính
├── css/
│   ├── base.css               # Variables, reset, utilities
│   ├── layout.css             # Header, footer, navigation
│   ├── components.css         # Buttons, cards, forms
│   ├── sections.css           # Hero, properties, blog sections
│   └── responsive.css         # Media queries cho responsive
├── js/
│   └── app.js                 # JavaScript chính (data loading, events)
├── assets/
│   ├── data/
│   │   └── data_db.json       # Dữ liệu tĩnh của website
│   └── images/                # Hình ảnh (logo, properties, blog)
│       ├── logo.png
│       ├── hero-villa.png
│       ├── scandinavian-apartment.png
│       └── ...
└── README.md                   # File này
```

## 🚀 Chạy local

```bash
# Cách 1: Mở trực tiếp
Mở file index.html bằng trình duyệt

# Cách 2: Dùng Live Server (VS Code)
Right-click index.html → Open with Live Server

# Cách 3: Dùng Python
python -m http.server 8000
```

## ✨ Tính năng

- ✅ Responsive trên PC, tablet, mobile
- ✅ Data tách riêng trong file JSON
- ✅ Fetch API để load dữ liệu động
- ✅ Semantic HTML5
- ✅ CSS variables cho theme
- ✅ Modular CSS architecture
- ✅ HTML fallback khi không load được JSON
- ✅ Mobile menu toggle
- ✅ Form validation

## 📱 Responsive Breakpoints

- Mobile: < 640px
- Tablet: ≥ 640px
- Desktop: ≥ 1024px

## 🎨 Sections

1. Hero Section - Banner chính với CTA
2. Commercial Real Estate - Service guides
3. Dream Living Spaces - Feature showcase
4. Today Sells Properties - Property listings
5. Services - Available services grid
6. Featured Property - Property cards
7. Property Preview Strip - Detailed preview
8. Customer Testimonials - Client reviews
9. Location Projects - Projects by city
10. Blog Posts - Latest articles
11. Contact Form - Get in touch section

## 📝 Cập nhật nội dung

Chỉnh sửa file `assets/data/properties.json` để thay đổi nội dung website mà không cần động vào HTML.

## 👤 Tác giả

**Họ tên:** Đặng Mỹ Linh  
**Email:** linhdm04@gmail.com  
**GitHub:** https://github.com/emel-04

---

**Ngày hoàn thành:** 2026-09-25  
**Thời gian thực hiện:** 2 ngày
