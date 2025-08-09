const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed process...');

  // Clear existing data
  console.log('🧹 Cleaning existing data...');
  await prisma.attendance.deleteMany();
  await prisma.studentApplication.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.batch.deleteMany();
  await prisma.certificate.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.paymentPlan.deleteMany();
  await prisma.schedules.deleteMany();
  await prisma.organization.deleteMany();
  await prisma.course.deleteMany();
  await prisma.address.deleteMany();
  await prisma.user.deleteMany();

  // Create Users (based on old system patterns)
  console.log('👥 Creating users...');
  const hashedPassword = await bcrypt.hash('password123', 12);

  // Admin Users
  const admin = await prisma.user.create({
    data: {
      firstName: 'สุพัตรา',
      lastName: 'ดีเลิศ',
      email: 'admin@relaxplus.com',
      phone: '081-111-1111',
      role: 'ADMIN',
      password: hashedPassword,
      birthDate: new Date('1980-05-15'),
      imageUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b5fd?w=400',
      address: {
        create: {
          address: '123 ถ.รัชดาภิเษก',
          city: 'กรุงเทพฯ',
          state: 'กรุงเทพฯ',
          country: 'ประเทศไทย',
          zipCode: '10400'
        }
      }
    }
  });

  // Teacher Users
  const teacher1 = await prisma.user.create({
    data: {
      firstName: 'วิชาญ',
      lastName: 'นวดไทย',
      email: 'teacher@relaxplus.com',
      phone: '082-222-2222',
      role: 'TEACHER',
      password: hashedPassword,
      birthDate: new Date('1975-08-20'),
      imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400'
    }
  });

  // Student Users (based on typical Thai names from old system)
  const students = [];
  const studentData = [
    { firstName: 'สมชาย', lastName: 'ใจดี', email: 'somchai@email.com', phone: '083-333-3301' },
    { firstName: 'สุชาดา', lastName: 'สวยงาม', email: 'suchada@email.com', phone: '083-333-3302' },
    { firstName: 'นิรันดร์', lastName: 'เก่งกาจ', email: 'niran@email.com', phone: '083-333-3303' },
    { firstName: 'วรรณา', lastName: 'มั่นใจ', email: 'wanna@email.com', phone: '083-333-3304' },
    { firstName: 'ประยุทธ์', lastName: 'หนักแน่น', email: 'prayuth@email.com', phone: '083-333-3305' },
    { firstName: 'มาลี', lastName: 'อ่อนโยน', email: 'malee@email.com', phone: '083-333-3306' },
    { firstName: 'สิริพร', lastName: 'เฉียบแหลม', email: 'siriporn@email.com', phone: '083-333-3307' },
    { firstName: 'อนุชา', lastName: 'รอบรู้', email: 'anucha@email.com', phone: '083-333-3308' },
    { firstName: 'กนกวรรณ', lastName: 'สดใส', email: 'kanowan@email.com', phone: '083-333-3309' },
    { firstName: 'เสกสรร', lastName: 'แกล้วกล้า', email: 'seksan@email.com', phone: '083-333-3310' },
    { firstName: 'ศศิธร', lastName: 'มีความสุข', email: 'sasitorn@email.com', phone: '083-333-3311' },
    { firstName: 'รัชนี', lastName: 'ใส่ใจ', email: 'rachanee@email.com', phone: '083-333-3312' },
    { firstName: 'ธนาคาร', lastName: 'มั่งคั่ง', email: 'thanakan@email.com', phone: '083-333-3313' },
    { firstName: 'พรทิพย์', lastName: 'งามสง่า', email: 'porntip@email.com', phone: '083-333-3314' },
    { firstName: 'ชัยวัฒน์', lastName: 'ยิ่งใหญ่', email: 'chaiwat@email.com', phone: '083-333-3315' }
  ];

  for (const studentInfo of studentData) {
    const student = await prisma.user.create({
      data: {
        firstName: studentInfo.firstName,
        lastName: studentInfo.lastName,
        email: studentInfo.email,
        phone: studentInfo.phone,
        role: 'STUDENT',
        password: hashedPassword,
        birthDate: new Date(1990 + Math.floor(Math.random() * 10), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
        imageUrl: `https://images.unsplash.com/photo-${1500000000 + Math.floor(Math.random() * 100000000)}?w=400`,
        address: {
          create: {
            address: `${Math.floor(Math.random() * 999) + 1} หมู่ ${Math.floor(Math.random() * 20) + 1}`,
            city: ['กรุงเทพฯ', 'นนทบุรี', 'ปทุมธานี', 'สมุทรปราการ'][Math.floor(Math.random() * 4)],
            state: 'กรุงเทพฯและปริมณฑล',
            country: 'ประเทศไทย',
            zipCode: `${10000 + Math.floor(Math.random() * 9000)}`
          }
        }
      }
    });
    students.push(student);
  }

  // Create Courses (based on old system - หลักสูตรนวดไทยเพื่อสุขภาพ 150 ชั่วโมง)
  console.log('📚 Creating courses...');
  const thaiMassageCourse = await prisma.course.create({
    data: {
      title: 'หลักสูตรนวดไทยเพื่อสุขภาพ',
      description: 'หลักสูตรการนวดแผนไทยพื้นฐาน เรียนรู้เทคนิคการนวดแผนไทยต้นตำรับ เพื่อการบำบัดและการรักษาสุขภาพ',
      imageUrl: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800',
      price: 15000.00,
      duration: 150, // 150 hours as per old system
      requirements: 'อายุ 18 ปีขึ้นไป, มีสุขภาพร่างกายแข็งแรง, จบการศึกษาขั้นต่ำ ม.3',
      status: 'ACTIVE',
      registrationStart: new Date('2024-01-01'),
      registrationEnd: new Date('2025-12-31')
    }
  });

  const aromaMassageCourse = await prisma.course.create({
    data: {
      title: 'หลักสูตรการนวดอโรม่าเทอราปี',
      description: 'เรียนรู้การนวดด้วยน้ำมันหอมระเหย เทคนิคการผสมผสานกลิ่นไอ และการบำบัดด้วยสมุนไพร',
      imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800',
      price: 18000.00,
      duration: 120,
      requirements: 'ควรมีพื้นฐานการนวดมาก่อน หรือ จบหลักสูตรนวดไทยพื้นฐาน',
      status: 'ACTIVE',
      registrationStart: new Date('2024-01-01'),
      registrationEnd: new Date('2025-12-31')
    }
  });

  const therapeuticMassageCourse = await prisma.course.create({
    data: {
      title: 'หลักสูตรนวดบำบัดและฟื้นฟู',
      description: 'หลักสูตรการนวดเพื่อการบำบัด เรียนรู้เทคนิคการรักษาและฟื้นฟูสภาพร่างกาย',
      imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800',
      price: 22000.00,
      duration: 180,
      requirements: 'จบหลักสูตรนวดไทยพื้นฐาน และมีประสบการณ์การนวดอย่างน้อย 6 เดือน',
      status: 'ACTIVE',
      registrationStart: new Date('2024-01-01'),
      registrationEnd: new Date('2025-12-31')
    }
  });

  // Create Batches (based on old system รุ่น 30, 31, 32...)
  console.log('🎓 Creating batches...');
  const batches = [];

  // Thai Massage Course Batches
  const batch30 = await prisma.batch.create({
    data: {
      courseId: thaiMassageCourse.id,
      batchNumber: 30,
      name: 'หลักสูตรนวดไทยเพื่อสุขภาพ รุ่นที่ 30',
      startDate: new Date('2024-01-15'),
      endDate: new Date('2024-04-15'),
      maxStudents: 25,
      currentStudents: 23,
      status: 'COMPLETED',
      totalHours: 150,
      description: 'รุ่นแรกของปี 2567 เรียนในช่วงเดือนมกราคม-เมษายน',
      location: 'อาคาร A ชั้น 2'
    }
  });

  const batch31 = await prisma.batch.create({
    data: {
      courseId: thaiMassageCourse.id,
      batchNumber: 31,
      name: 'หลักสูตรนวดไทยเพื่อสุขภาพ รุ่นที่ 31',
      startDate: new Date('2024-05-01'),
      endDate: new Date('2024-08-01'),
      maxStudents: 30,
      currentStudents: 28,
      status: 'COMPLETED',
      totalHours: 150,
      description: 'รุ่นที่สองของปี 2567 เรียนในช่วงเดือนพฤษภาคม-สิงหาคม',
      location: 'อาคาร A ชั้น 2'
    }
  });

  const batch32 = await prisma.batch.create({
    data: {
      courseId: thaiMassageCourse.id,
      batchNumber: 32,
      name: 'หลักสูตรนวดไทยเพื่อสุขภาพ รุ่นที่ 32',
      startDate: new Date('2024-09-01'),
      endDate: new Date('2024-12-01'),
      maxStudents: 30,
      currentStudents: 15,
      status: 'ACTIVE',
      totalHours: 150,
      description: 'รุ่นปัจจุบันที่กำลังเรียน เริ่มเดือนกันยายน',
      location: 'อาคาร A ชั้น 2'
    }
  });

  // Aroma Massage Batches
  const aromaBatch1 = await prisma.batch.create({
    data: {
      courseId: aromaMassageCourse.id,
      batchNumber: 1,
      name: 'หลักสูตรการนวดอโรม่าเทอราปี รุ่นที่ 1',
      startDate: new Date('2024-02-01'),
      endDate: new Date('2024-05-01'),
      maxStudents: 20,
      currentStudents: 18,
      status: 'COMPLETED',
      totalHours: 120,
      location: 'อาคาร B ชั้น 1'
    }
  });

  batches.push(batch30, batch31, batch32, aromaBatch1);

  // Create Enrollments for completed batches
  console.log('📝 Creating enrollments...');
  const enrollments = [];

  // Enroll students in batch 30 (completed)
  for (let i = 0; i < 12; i++) {
    const enrollment = await prisma.enrollment.create({
      data: {
        userId: students[i].id,
        courseId: thaiMassageCourse.id,
        batchId: batch30.id,
        status: 'COMPLETED'
      }
    });
    enrollments.push(enrollment);
  }

  // Enroll students in batch 31 (completed)
  for (let i = 12; i < 15; i++) {
    const enrollment = await prisma.enrollment.create({
      data: {
        userId: students[i].id,
        courseId: thaiMassageCourse.id,
        batchId: batch31.id,
        status: 'COMPLETED'
      }
    });
    enrollments.push(enrollment);
  }

  // Enroll students in batch 32 (active)
  for (let i = 3; i < 8; i++) {
    const enrollment = await prisma.enrollment.create({
      data: {
        userId: students[i].id,
        courseId: thaiMassageCourse.id,
        batchId: batch32.id,
        status: 'ACTIVE'
      }
    });
    enrollments.push(enrollment);
  }

  // Create Student Applications
  console.log('📋 Creating student applications...');
  
  // Pending applications for batch 32
  for (let i = 8; i < 12; i++) {
    await prisma.studentApplication.create({
      data: {
        userId: students[i].id,
        courseId: thaiMassageCourse.id,
        batchId: batch32.id,
        status: 'PENDING',
        personalInfo: {
          education: 'มัธยมศึกษาตอนปลาย',
          experience: 'ไม่มีประสบการณ์',
          motivation: 'ต้องการเรียนรู้การนวดไทยเพื่อประกอบอาชีพ',
          healthCondition: 'สุขภาพดี ไม่มีโรคประจำตัว'
        },
        documents: [
          '/uploads/transcripts/transcript_' + students[i].id + '.pdf',
          '/uploads/id-cards/id_' + students[i].id + '.jpg'
        ],
        notes: 'สมัครเรียนผ่านระบบออนไลน์'
      }
    });
  }

  // Create Attendance Records for active batch (batch 32)
  console.log('⏰ Creating attendance records...');
  const activeEnrollments = enrollments.filter(e => e.batchId === batch32.id);
  
  // Create attendance for the past 30 days
  const startDate = new Date('2024-09-01');
  const today = new Date();
  
  for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
    // Skip weekends for this demo
    if (d.getDay() === 0 || d.getDay() === 6) continue;
    
    for (const enrollment of activeEnrollments) {
      const attendanceStatus = Math.random() > 0.15 ? 'PRESENT' : (Math.random() > 0.5 ? 'LATE' : 'ABSENT');
      
      if (attendanceStatus === 'PRESENT' || attendanceStatus === 'LATE') {
        const timeIn = attendanceStatus === 'LATE' ? '09:15:00' : '09:00:00';
        const timeOut = '17:00:00';
        
        await prisma.attendance.create({
          data: {
            enrollmentId: enrollment.id,
            batchId: enrollment.batchId,
            userId: enrollment.userId,
            date: new Date(d),
            timeIn: new Date(`${d.toISOString().split('T')[0]}T${timeIn}`),
            timeOut: new Date(`${d.toISOString().split('T')[0]}T${timeOut}`),
            totalHours: 8.0,
            status: attendanceStatus,
            notes: attendanceStatus === 'LATE' ? 'เข้าเรียนสาย 15 นาที' : null
          }
        });
      } else {
        await prisma.attendance.create({
          data: {
            enrollmentId: enrollment.id,
            batchId: enrollment.batchId,
            userId: enrollment.userId,
            date: new Date(d),
            totalHours: 0,
            status: attendanceStatus,
            notes: 'ขาดเรียน'
          }
        });
      }
    }
  }

  console.log('✅ Seed completed successfully!');
  
  // Summary
  const userCount = await prisma.user.count();
  const courseCount = await prisma.course.count();
  const batchCount = await prisma.batch.count();
  const enrollmentCount = await prisma.enrollment.count();
  const applicationCount = await prisma.studentApplication.count();
  const attendanceCount = await prisma.attendance.count();

  console.log(`
📊 Seed Summary:
- Users: ${userCount} (1 Admin, 1 Teacher, ${userCount - 2} Students)
- Courses: ${courseCount}
- Batches: ${batchCount}
- Enrollments: ${enrollmentCount}
- Applications: ${applicationCount}
- Attendance Records: ${attendanceCount}
  `);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
