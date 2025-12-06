# 🐳 Docker Database Setup Guide

## 📋 ภาพรวม

โปรเจคนี้ใช้ PostgreSQL ที่รันใน Docker container พร้อม pgAdmin สำหรับจัดการ database

### 🔧 Docker Services

- **PostgreSQL Database** - Port: 54322 (host) → 5432 (container)
- **pgAdmin** - Port: 5050 (Web UI)

---

## 🚀 ขั้นตอนการ Setup (เริ่มต้นครั้งแรก)

### 1. ตรวจสอบ Docker

```bash
# ตรวจสอบว่าติดตั้ง Docker แล้ว
docker --version
docker compose version

# ถ้ายังไม่มี ติดตั้งตามนี้:
# Ubuntu/Debian: sudo apt-get install docker.io docker-compose-plugin
# macOS: ติดตั้ง Docker Desktop
# Windows: ติดตั้ง Docker Desktop
```

### 2. เตรียม Environment Variables

```bash
cd backend

# ไฟล์ .env มีการตั้งค่าเรียบร้อยแล้ว
# ตรวจสอบ:
cat .env
```

### 3. เริ่มต้น Docker Database

```bash
cd backend

# เริ่ม PostgreSQL และ pgAdmin
docker compose up -d

# ตรวจสอบ containers กำลังรัน
docker compose ps
```

ควรเห็น output:
```
NAME                IMAGE                    STATUS
lms_db              postgres:latest          Up
lms_pgadmin         dpage/pgadmin4:latest    Up
```

### 4. รอ Database พร้อมใช้งาน (ประมาณ 10-15 วินาที)

```bash
# ตรวจสอบ logs
docker compose logs db

# ควรเห็นข้อความ "database system is ready to accept connections"
```

### 5. รัน Prisma Migrations

```bash
# Generate Prisma Client
npm run generate

# รัน migrations เพื่อสร้างตาราง
npm run migrate

# หรือใช้ push (สำหรับ development)
npx prisma db push
```

### 6. (Optional) Seed ข้อมูลเริ่มต้น

```bash
npm run db-seed
```

### 7. เริ่ม Backend Server

```bash
npm run dev
```

---

## 🎯 การใช้งานประจำวัน

### เริ่ม Database

```bash
cd backend
docker compose up -d
```

### หยุด Database

```bash
cd backend
docker compose down
```

### หยุดและลบข้อมูลทั้งหมด (⚠️ ระวัง!)

```bash
cd backend
docker compose down -v
```

---

## 🔍 การเข้าถึง Database

### วิธีที่ 1: pgAdmin (Web Interface)

1. เปิดเบราว์เซอร์: http://localhost:5050
2. Login:
   - **Email:** admin@admin.com
   - **Password:** admin123!

3. เพิ่ม Server Connection:
   - Right click "Servers" → "Register" → "Server"
   - **General Tab:**
     - Name: LMS Database
   - **Connection Tab:**
     - Host: db (หรือ host.docker.internal บน Mac/Windows)
     - Port: 5432
     - Maintenance database: lms_db
     - Username: lmsuser
     - Password: lmspassword

### วิธีที่ 2: Prisma Studio

```bash
cd backend
npm run studio
```

เปิดเบราว์เซอร์: http://localhost:5555

### วิธีที่ 3: psql (Command Line)

```bash
# เข้าไปใน container
docker exec -it lms_db psql -U lmsuser -d lms_db

# หรือจาก host (ถ้าติดตั้ง psql)
psql -h localhost -p 54322 -U lmsuser -d lms_db
```

Commands:
```sql
-- แสดงตารางทั้งหมด
\dt

-- แสดงโครงสร้างตาราง
\d table_name

-- Query ข้อมูล
SELECT * FROM "User" LIMIT 10;

-- ออกจาก psql
\q
```

---

## 🔧 Configuration Details

### Database Connection String

```
postgresql://lmsuser:lmspassword@localhost:54322/lms_db?schema=public
```

**แยกส่วน:**
- Protocol: `postgresql://`
- User: `lmsuser`
- Password: `lmspassword`
- Host: `localhost`
- Port: `54322` (ใช้ 54322 เพื่อไม่ให้ชนกับ PostgreSQL ที่อาจติดตั้งในเครื่อง)
- Database: `lms_db`
- Schema: `public`

### Port Mapping

- **54322:5432** - PostgreSQL (ใช้ host port 54322 เพื่อหลีกเลี่ยง conflict)
- **5050:80** - pgAdmin

---

## 🛠️ การแก้ปัญหาที่พบบ่อย

### ❌ Port already in use

**อาการ:** `Error: bind: address already in use`

**วิธีแก้:**
```bash
# ดูว่า process ไหนใช้ port
sudo lsof -i :54322
sudo lsof -i :5050

# หยุด container เก่า
docker compose down

# หรือเปลี่ยน port ใน docker-compose.yml
```

### ❌ Database connection error

**อาการ:** `Error: P1001: Can't reach database server`

**วิธีแก้:**
```bash
# 1. ตรวจสอบว่า container รันอยู่
docker compose ps

# 2. ดู logs
docker compose logs db

# 3. Restart containers
docker compose restart

# 4. ถ้ายังไม่ได้ ลบและสร้างใหม่
docker compose down
docker compose up -d
```

### ❌ Prisma migration error

**อาการ:** `Error: P3009: Failed to migrate`

**วิธีแก้:**
```bash
# 1. Reset database (⚠️ ข้อมูลจะหาย)
npx prisma migrate reset

# 2. หรือ push schema แทน
npx prisma db push

# 3. หรือลบ migrations และสร้างใหม่
rm -rf prisma/migrations
npx prisma migrate dev --name init
```

### ❌ Permission denied

**อาการ:** `permission denied while trying to connect to the Docker daemon`

**วิธีแก้:**
```bash
# เพิ่ม user เข้า docker group
sudo usermod -aG docker $USER

# Logout และ login ใหม่
# หรือใช้ newgrp
newgrp docker
```

### ❌ Container exits immediately

**วิธีแก้:**
```bash
# ดู logs ว่าเกิดอะไร
docker compose logs db

# ลบ volume และสร้างใหม่
docker compose down -v
docker compose up -d
```

---

## 📊 Database Schema Overview

โปรเจคนี้มี tables หลัก:

- **User** - ผู้ใช้ (นักเรียน, อาจารย์, admin)
- **Address** - ที่อยู่ผู้ใช้
- **Organization** - องค์กร/สาขา
- **Course** - หลักสูตร
- **Batch** - รุ่น/ชุดเรียน
- **Enrollment** - การลงทะเบียนเรียน
- **Schedules** - ตารางเรียน
- **Attendance** - บันทึกเข้าเรียน
- **Payment** - การชำระเงิน
- **PaymentPlan** - แผนการชำระ
- **Certificate** - ใบประกาศนียบัตร
- **CertificateTemplate** - แม่แบบใบประกาศนียบัตร
- **CertificateElement** - องค์ประกอบใบประกาศนียบัตร
- **Bank** - บัญชีธนาคาร
- **ThemeSettings** - การตั้งค่าธีม
- **StudentApplication** - ใบสมัครนักเรียน

---

## 🔄 Backup และ Restore

### Backup Database

```bash
# Backup ทั้ง database
docker exec lms_db pg_dump -U lmsuser lms_db > backup_$(date +%Y%m%d_%H%M%S).sql

# Backup เฉพาะ schema (โครงสร้าง)
docker exec lms_db pg_dump -U lmsuser -s lms_db > schema_backup.sql

# Backup เฉพาะ data
docker exec lms_db pg_dump -U lmsuser -a lms_db > data_backup.sql
```

### Restore Database

```bash
# Restore จากไฟล์ backup
docker exec -i lms_db psql -U lmsuser -d lms_db < backup.sql

# หรือ restore ผ่าน cat
cat backup.sql | docker exec -i lms_db psql -U lmsuser -d lms_db
```

---

## 🔐 Security Notes

### สำหรับ Production:

1. **เปลี่ยน Passwords:**
   - POSTGRES_PASSWORD
   - PGADMIN_DEFAULT_PASSWORD
   - JWT_SECRET

2. **ไม่ expose ports โดยตรง:**
   ```yaml
   # docker-compose.yml (production)
   ports:
     - "127.0.0.1:54322:5432"  # bind to localhost only
   ```

3. **ใช้ secrets management:**
   - Docker secrets
   - Environment variable injection
   - Vault

4. **Backup regularly:**
   - ตั้ง cron job สำหรับ backup
   - เก็บ backup ไว้หลายที่

---

## 📝 Useful Commands

```bash
# Docker
docker compose ps                 # ดูสถานะ containers
docker compose logs -f db         # ดู logs แบบ real-time
docker compose exec db bash       # เข้าไปใน container
docker compose restart db         # restart database
docker compose down -v            # ลบทั้งหมดรวม volumes

# Prisma
npm run generate                  # Generate Prisma Client
npm run migrate                   # รัน migrations
npm run studio                    # เปิด Prisma Studio
npx prisma db push               # Push schema โดยตรง (dev only)
npx prisma db pull               # Pull schema จาก database
npx prisma migrate reset         # Reset database
npx prisma format                # Format schema.prisma

# Database
docker exec lms_db psql -U lmsuser -d lms_db -c "SELECT version();"
docker exec lms_db psql -U lmsuser -d lms_db -c "\l"  # list databases
docker exec lms_db psql -U lmsuser -d lms_db -c "\dt" # list tables
```

---

## ✅ Checklist การ Setup ครั้งแรก

- [ ] ติดตั้ง Docker และ Docker Compose
- [ ] คัดลอก `.env.example` เป็น `.env`
- [ ] ตรวจสอบค่า environment variables
- [ ] รัน `docker compose up -d`
- [ ] รอ database พร้อม (10-15 วินาที)
- [ ] รัน `npm install`
- [ ] รัน `npm run generate`
- [ ] รัน `npm run migrate` หรือ `npx prisma db push`
- [ ] (Optional) รัน `npm run db-seed`
- [ ] ทดสอบเชื่อมต่อ pgAdmin
- [ ] ทดสอบเชื่อมต่อ Prisma Studio
- [ ] รัน `npm run dev`
- [ ] ทดสอบ API endpoint

---

**Happy Coding! 🚀**
