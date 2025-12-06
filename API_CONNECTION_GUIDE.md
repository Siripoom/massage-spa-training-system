# 🚀 คู่มือการเชื่อมต่อ Frontend กับ Backend

## 📌 สรุปสั้นๆ

- **Backend API:** http://localhost:5000/api
- **Frontend App:** http://localhost:3000

---

## ⚙️ ขั้นตอนการติดตั้งและรัน

### 1️⃣ ติดตั้ง Backend

```bash
cd backend

# ติดตั้ง dependencies
npm install

# คัดลอกไฟล์ .env
cp .env.example .env

# แก้ไข DATABASE_URL ใน .env ให้ถูกต้อง

# รัน Prisma migrations
npm run migrate

# (ถ้าต้องการ) Seed ข้อมูลเริ่มต้น
npm run db-seed

# รัน Backend
npm run dev
```

Backend จะรันที่: **http://localhost:5000**

---

### 2️⃣ ติดตั้ง Frontend

```bash
cd frontend

# ติดตั้ง dependencies
npm install

# ตรวจสอบไฟล์ .env.local ว่ามีการตั้งค่าถูกต้อง
# NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api

# รัน Frontend
npm run dev
```

Frontend จะรันที่: **http://localhost:3000**

---

## 🔍 ตรวจสอบการเชื่อมต่อ

### ทดสอบ Backend Health Check

```bash
curl http://localhost:5000/health
```

ควรได้ response:
```json
{
  "status": "ok",
  "timestamp": "2025-11-22T..."
}
```

### ทดสอบ API Endpoint

```bash
# ทดสอบ Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

---

## 📂 โครงสร้าง API Endpoints

### Backend Routes (http://localhost:5000/api)

- **/auth** - Authentication (login, register, profile)
- **/users** - User management
- **/organizations** - Organization management
- **/courses** - Course management
- **/batches** - Batch management
- **/enrollments** - Enrollment management
- **/payments** - Payment management
- **/payment-plans** - Payment plan management
- **/schedules** - Schedule management
- **/attendance** - Attendance tracking
- **/banks** - Bank account management
- **/certificates** - Certificate management
- **/certificate-templates** - Certificate template management
- **/certificate-elements** - Certificate element management
- **/theme-settings** - Theme customization
- **/student-applications** - Student application management

---

## 🔐 Authentication Flow

### 1. Login
```typescript
// Frontend: src/services/auth.service.ts
const response = await authService.login({
  email: 'user@example.com',
  password: 'password123'
});

// Response จะมี access token
// จะถูกเก็บใน localStorage โดยอัตโนมัติ
```

### 2. Protected API Calls
```typescript
// Axios interceptor จะใส่ Authorization header อัตโนมัติ
// Authorization: Bearer <token>

// Example: Get user profile
const profile = await authService.getProfile();
```

### 3. Token Storage
- **Access Token:** `localStorage.getItem('access_token')`
- **Refresh Token:** `localStorage.getItem('refresh_token')`

---

## 🛠️ การแก้ปัญหาที่พบบ่อย

### ❌ CORS Error
**อาการ:** Frontend ไม่สามารถเรียก API ได้ (CORS blocked)

**วิธีแก้:**
1. ตรวจสอบว่า Backend มี CORS middleware
2. เช็คไฟล์ `backend/src/app.js`:
```javascript
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
```

### ❌ Connection Refused
**อาการ:** `ERR_CONNECTION_REFUSED`

**วิธีแก้:**
1. ตรวจสอบว่า Backend รันอยู่: `curl http://localhost:5000/health`
2. เช็ค PORT ใน `backend/.env` ว่าถูกต้อง
3. เช็ค `NEXT_PUBLIC_API_BASE_URL` ใน `frontend/.env.local`

### ❌ 401 Unauthorized
**อาการ:** API ส่ง 401 Error

**วิธีแก้:**
1. ตรวจสอบว่า login สำเร็จและมี token
2. เช็ค localStorage: `localStorage.getItem('access_token')`
3. ถ้า token หมดอายุ ให้ login ใหม่

### ❌ Database Error
**อาการ:** Backend ไม่สามารถเชื่อมต่อ Database

**วิธีแก้:**
1. ตรวจสอบ `DATABASE_URL` ใน `backend/.env`
2. รัน: `cd backend && npm run migrate`
3. เช็คว่า PostgreSQL รันอยู่

---

## 📝 Development Workflow

### Backend Development
```bash
cd backend
npm run dev        # รัน server with nodemon (auto-reload)
npm run studio     # เปิด Prisma Studio (Database GUI)
npm run migrate    # รัน migrations เมื่อแก้ schema
```

### Frontend Development
```bash
cd frontend
npm run dev        # รัน Next.js dev server
npm run build      # Build for production
npm run start      # รัน production build
```

---

## 🔗 ตัวอย่างการเรียกใช้ API

### ใช้ Service Layer (แนะนำ)
```typescript
import { userService } from '@/services';

// Get all users
const users = await userService.getUsers();

// Get user by ID
const user = await userService.getUserById(1);

// Create user
const newUser = await userService.createUser({
  email: 'new@example.com',
  password: 'password123',
  firstName: 'John',
  lastName: 'Doe',
  role: 'STUDENT'
});
```

### ใช้ Hooks (แนะนำสำหรับ React Components)
```typescript
import { useUsers } from '@/hooks';

function UserList() {
  const { data: users, isLoading, error } = useUsers();
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.firstName} {user.lastName}</li>
      ))}
    </ul>
  );
}
```

---

## 📦 Environment Variables

### Backend (.env)
```env
PORT=5000
DATABASE_URL="postgresql://..."
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
NEXT_PUBLIC_API_TIMEOUT=30000
```

---

## 🚀 Production Deployment

### Backend
1. ตั้งค่า environment variables บน production server
2. รัน migrations: `npm run migrate`
3. Build: `npm run start`

### Frontend
1. ตั้งค่า `NEXT_PUBLIC_API_BASE_URL` ให้เป็น production API URL
2. Build: `npm run build`
3. Start: `npm run start`

---

## 📞 Support

หากพบปัญหาในการเชื่อมต่อ:
1. ตรวจสอบ console logs ทั้ง Backend และ Frontend
2. ใช้ Browser DevTools > Network tab เพื่อดู API requests
3. ตรวจสอบ Backend logs สำหรับ error messages

---

**สร้างโดย:** GitHub Copilot  
**อัพเดทล่าสุด:** 22 พฤศจิกายน 2025
