# Book Store 

## Tổng Quan Dự Án
Book Store - Website bán sách trực tuyến được xây dựng với HTML, CSS, JavaScript và Bootstrap.

## Cấu Trúc Thư Mục

```
Book_Store/
│
├── index.html                      # Trang chủ chính
├── README.md                       # Tài liệu dự án
│
├── imgs/                           # Thư mục hình ảnh (theo từng module)
│   ├── aboutPage/
│   ├── categories/
│   ├── contactPage/
│   ├── detailProduct/
│   ├── homePage/
│   └── login/
│
├── pages/                          # Các trang con
│   ├── aboutPage/                  # Module trang Về chúng tôi
│   │   ├── aboutPage.html
│   │   ├── aboutPage.css
│   │   └── aboutPage.js
│   │
│   ├── cartPage/...                # Module giỏ hàng
│   │
│   ├── categories/...              # Module danh mục sản phẩm
│   │
│   ├── contactPage/...             # Module liên hệ
│   │
│   ├── detailProduct/...           # Module chi tiết sản phẩm
│   │
│   ├── homePage/                   # Module trang chủ
│   │   ├── homePage.css
│   │   └── homePage.js
│   │
│   ├── login/...                   # Module đăng nhập
│   │
│   └── register/...                # Module đăng ký
│
└── shared/                         # Tài nguyên dùng chung
    ├── css/                        # Stylesheets chung
    │   ├── bootstrap.min.css       # Bootstrap framework
    │   ├── style.css               # Global styles + layout
    │   ├── variables.css           # Biến CSS (màu sắc, spacing, font)
    │   └── components/
    │       ├── card.css            # Styles cho card component
    │       ├── header.css          # Styles cho header
    │       └── footer.css          # Styles cho footer
    │
    └── js/                         # JavaScript chung
        ├── bootstrap.bundle.min.js # Bootstrap JS
        ├── main.js                 # Entry point chính
        └── components/
            ├── header.js           # Component header
            ├── footer.js           # Component footer
            └── card.js             # Component card
```

## Nguyên Tắc Tổ Chức Code

### 1. **Phân Chia Theo Module**
- Mỗi trang/chức năng là một module độc lập
- Module bao gồm: HTML, CSS, JS riêng
- Tránh phụ thuộc lẫn nhau giữa các module

### 2. **Shared Resources**
- **CSS Variables** (`variables.css`): Định nghĩa màu sắc, font, spacing và những chỉ số liên quan khác 
- **Global Styles** (`style.css`): Reset CSS, utility classes

### 3. **Quy Tắc Đặt Tên**

#### Files & Folders
- **Folders**: camelCase (vd: `homePage`, `productDetail`)
- **CSS Files**: camelCase (vd: `homePage.css`, `productService.css`)
- **JS Files**: camelCase (vd: `homePage.js`, `productService.js`)
- **HTML Files**: lowercase (vd: `index.html`)

## 📚 Tài Liệu Tham Khảo

- [Bootstrap 5 Documentation](https://getbootstrap.com/docs/5.0/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [JavaScript Style Guide](https://github.com/airbnb/javascript)
- [CSS Guidelines](https://cssguidelin.es/)


## Contact

- **Repository**: [Book_Store-HTCNWeb](https://github.com/Hoangriji/Book_Store-HTCNWeb)
- **Deloy**: [FiveH Book Store](https://book-store-htcn-web.vercel.app)

---

**Last Updated**: February 6, 2026