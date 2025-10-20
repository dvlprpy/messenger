# 💬 Messenger

یک پیام‌رسان تحت وب ساخته‌شده با **React**، **Laravel**، **Bootstrap** و **Tailwind CSS**  
هدف این پروژه، شبیه‌سازی امکانات اصلی تلگرام در محیط وب است.  
<p align="center">🚧 این پروژه همچنان در حال توسعه است</p>
---

## ⚙️ تکنولوژی‌های استفاده‌شده

- **Frontend:** React, Tailwind CSS, Bootstrap  
- **Backend:** Laravel (PHP Framework)  
- **Database:** MySQL + PostgreSQL  
- **API:** RESTful  
- **Authentication:** JWT / Laravel Sanctum  
- **Email Service:** Mailtrap (برای بازیابی رمز عبور و تست ایمیل‌ها)  
- **Local Environment:** Apache Virtual Host (Windows & Linux)

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
- Apache (برای پشتیبانی از Virtual Hosts)
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

---

## 🌐 تنظیم Virtual Host (اختیاری ولی توصیه‌شده)

### 🔹 در ویندوز

#### 1. ویرایش فایل Virtual Hosts  
مسیر:  
```
C:/xampp/apache/conf/extra/httpd-vhosts.conf
```
افزودن پیکربندی زیر:
```apache
<VirtualHost *:80>
    ServerAdmin webmaster@localhost
    DocumentRoot "C:/xampp/htdocs/messenger/public"
    ServerName messenger.local
    <Directory "C:/xampp/htdocs/messenger/public">
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

#### 2. ویرایش فایل hosts ویندوز  
مسیر:  
```
C:/Windows/System32/drivers/etc/hosts
```
افزودن خط زیر به انتهای فایل:
```
127.0.0.1   messenger.local
```

---

### 🔹 در لینوکس

#### 1. ایجاد فایل Virtual Host جدید  
مسیر پیشنهادی:  
```
/etc/apache2/sites-available/messenger.conf
```
افزودن پیکربندی زیر:
```apache
<VirtualHost *:80>
    ServerAdmin webmaster@localhost
    DocumentRoot /var/www/html/messenger/public
    ServerName messenger.local

    <Directory /var/www/html/messenger/public>
        AllowOverride All
        Require all granted
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/messenger_error.log
    CustomLog ${APACHE_LOG_DIR}/messenger_access.log combined
</VirtualHost>
```

#### 2. فعال‌سازی Virtual Host و ماژول rewrite
```bash
sudo a2ensite messenger.conf
sudo a2enmod rewrite
sudo systemctl restart apache2
```

#### 3. ویرایش فایل hosts لینوکس
```bash
sudo nano /etc/hosts
```
افزودن خط زیر:
```
127.0.0.1   messenger.local
```

اکنون می‌توانید پروژه را از آدرس زیر باز کنید:
```
http://messenger.local
```

---

### 3. نصب وابستگی‌های فرانت‌اند (React)
```bash
cd ../frontend
npm install
npm start
```

---

## 🌟 ویژگی‌ها (در حال توسعه)

- چت دوطرفه (Private Messaging)  
- ارسال عکس، ویدیو و فایل  
- گروه‌ها و کانال‌ها  
- وضعیت آنلاین بودن کاربران  
- سیستم اعلان‌ها (Notifications)  
- فراموشی رمز عبور با استفاده از Mailtrap  
- پشتیبانی از Virtual Host برای محیط توسعه در ویندوز و لینوکس  
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
