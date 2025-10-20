# 💬 Messenger

یک پیام‌رسان تحت وب ساخته‌شده با **React**، **Laravel**، **Bootstrap** و **Tailwind CSS**  
هدف این پروژه، شبیه‌سازی امکانات اصلی تلگرام در محیط وب است.  
این پروژه همچنان در حال توسعه است 🚧

---

## ⚙️ تکنولوژی‌های استفاده‌شده

- **Frontend:** React, Tailwind CSS, Bootstrap  
- **Backend:** Laravel (PHP Framework)  
- **Database:** MySQL + PostgreSQL  
- **API:** RESTful  
- **Authentication:** JWT / Laravel Sanctum  
- **Email Service:** Mailtrap (برای بازیابی رمز عبور و تست ایمیل‌ها)

> 💡 در این پروژه از هر دو پایگاه‌داده **MySQL** و **PostgreSQL** استفاده شده است:  
> - **MySQL** برای داده‌های ساختاریافته و عمومی (مانند کاربران و تنظیمات)  
> - **PostgreSQL** برای داده‌های پویا و حجیم با پشتیبانی از نوع داده‌ی `JSONB` جهت عملکرد بهتر در پردازش پیام‌ها و متادیتاها  

---

## 🚀 نصب و اجرا

### پیش‌نیازها

قبل از شروع، اطمینان حاصل کنید که ابزارهای زیر نصب هستند:

- Node.js (نسخه ۱۸ یا بالاتر)
- PHP (نسخه ۸ یا بالاتر)
- Composer
- MySQL و PostgreSQL (آخرین نسخه)
- Git
- حساب Mailtrap برای تست ارسال ایمیل‌ها

---

### مراحل اجرا

#### 1. کلون کردن مخزن
```bash
git clone https://github.com/dvlprpy/messenger.git
cd messenger
```

#### 2. نصب وابستگی‌های بک‌اند (Laravel)
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

> ⚙️ در فایل `.env` می‌توانید تنظیمات پایگاه‌داده و سرویس ایمیل را انجام دهید:

```env
# انتخاب نوع دیتابیس
DB_CONNECTION=mysql
# یا
DB_CONNECTION=pgsql

# تنظیمات Mailtrap برای ارسال ایمیل
MAIL_MAILER=smtp
MAIL_HOST=sandbox.smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=your_mailtrap_username
MAIL_PASSWORD=your_mailtrap_password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="noreply@messenger.local"
MAIL_FROM_NAME="Messenger"
```

#### 3. نصب وابستگی‌های فرانت‌اند (React)
```bash
cd ../frontend
npm install
npm start
```

سپس پروژه در مرورگر در مسیر زیر در دسترس خواهد بود:
```
http://localhost:3000
```

---

## 🌟 ویژگی‌ها (در حال توسعه)

- چت دوطرفه (Private Messaging)  
- ارسال عکس، ویدیو و فایل  
- گروه‌ها و کانال‌ها  
- وضعیت آنلاین بودن کاربران  
- سیستم اعلان‌ها (Notifications)  
- فراموشی رمز عبور با استفاده از Mailtrap  
- ساختار ترکیبی دیتابیس با MySQL + PostgreSQL  
- ذخیره‌ی پیام‌ها و داده‌های پویا در PostgreSQL با نوع داده‌ی `JSONB`  

---

## 🗺️ نقشه راه (Roadmap)

- [ ] افزودن تماس صوتی و تصویری  
- [ ] پشتیبانی از پیام‌های زمان‌بندی‌شده  
- [ ] حالت تاریک (Dark Mode)  
- [ ] نسخه‌ی موبایل واکنش‌گرا  
- [ ] رمزگذاری سرتاسری (End-to-End Encryption)  

---

## 🤝 مشارکت‌کنندگان

مشارکت در این پروژه باعث افتخار است!  
برای مشارکت:

1. پروژه را Fork کنید  
2. یک Branch جدید بسازید (`feature/new-feature`)  
3. تغییرات خود را اعمال و Commit کنید  
4. Pull Request ارسال کنید ✅

---

## 📫 ارتباط با من

GitHub: [@dvlprpy](https://github.com/dvlprpy)

---

## 📄 مجوز

این پروژه فعلاً **متن‌باز (Open Source)** است، اما ممکن است پس از اتمام توسعه به‌صورت خصوصی منتشر شود.

---

⭐ اگر این پروژه برایتان مفید بود، فراموش نکنید آن را در GitHub **Star** کنید!
