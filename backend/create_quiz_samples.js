const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createSampleQuizzes() {
  try {
    console.log('Creating sample quizzes...');

    const courses = await prisma.course.findMany({ take: 3 });
    const batches = await prisma.batch.findMany({ take: 2 });

    if (courses.length === 0) {
      console.log('❌ No courses found. Please seed courses first.');
      await prisma.$disconnect();
      return;
    }

    const quiz1 = await prisma.quiz.create({
      data: {
        courseId: courses[0].id,
        batchId: batches[0]?.id,
        title: 'แบบทดสอบท้ายบท: เทคนิคการนวดไทยพื้นฐาน',
        description: 'ทดสอบความเข้าใจเกี่ยวกับเทคนิคการนวดไทยพื้นฐาน',
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        duration: 60,
        totalPoints: 100,
        passingScore: 60,
        isPublished: true,
        questions: {
          create: [
            {
              questionText: 'การนวดแผนไทยมีประวัติความเป็นมากี่ปี?',
              questionType: 'MULTIPLE_CHOICE',
              options: JSON.stringify(['500 ปี', '1,000 ปี', '2,500 ปี', '5,000 ปี']),
              correctAnswer: '2,500 ปี',
              points: 5,
              order: 1,
            },
            {
              questionText: 'จุดประสงค์หลักของการนวดแผนไทยคืออะไร?',
              questionType: 'MULTIPLE_CHOICE',
              options: JSON.stringify(['เพื่อความสวยงาม', 'เพื่อการผ่อนคลายและรักษา', 'เพื่อการแข่งขัน', 'เพื่อความบันเทิง']),
              correctAnswer: 'เพื่อการผ่อนคลายและรักษา',
              points: 5,
              order: 2,
            }
          ]
        }
      },
      include: { questions: true, course: true, batch: true }
    });

    const quiz2 = await prisma.quiz.create({
      data: {
        courseId: courses[1]?.id || courses[0].id,
        batchId: batches[1]?.id,
        title: 'ทดสอบกลางภาค: การนวดสปาและอโรมาเธอราปี',
        description: 'แบบทดสอบกลางภาคเรียน ครอบคลุมเนื้อหาบทที่ 1-5',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        duration: 90,
        totalPoints: 100,
        passingScore: 70,
        isPublished: true,
        questions: {
          create: [
            {
              questionText: 'น้ำมันหอมระเหยที่ใช้ในอโรมาเธอราปีมาจากไหน?',
              questionType: 'MULTIPLE_CHOICE',
              options: JSON.stringify(['สังเคราะห์เคมี', 'พืชธรรมชาติ', 'สารสกัดจากสัตว์', 'แร่ธาตุ']),
              correctAnswer: 'พืชธรรมชาติ',
              points: 5,
              order: 1,
            }
          ]
        }
      },
      include: { questions: true, course: true, batch: true }
    });

    const quiz3 = await prisma.quiz.create({
      data: {
        courseId: courses[2]?.id || courses[0].id,
        title: 'ทดสอบปลายภาค: การนวดเท้าและการนวดประคบสมุนไพร',
        description: 'แบบทดสอบปลายภาค ครอบคลุมเนื้อหาทั้งหมด',
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        duration: 120,
        totalPoints: 150,
        passingScore: 80,
        isPublished: true,
        questions: {
          create: [
            {
              questionText: 'จุดสะท้อนบนเท้ามีความสัมพันธ์กับอวัยวะใดของร่างกาย?',
              questionType: 'MULTIPLE_CHOICE',
              options: JSON.stringify(['เฉพาะขา', 'อวัยวะทุกส่วนของร่างกาย', 'เฉพาะหัวใจ', 'เฉพาะสมอง']),
              correctAnswer: 'อวัยวะทุกส่วนของร่างกาย',
              points: 5,
              order: 1,
            }
          ]
        }
      },
      include: { questions: true, course: true, batch: true }
    });

    console.log('✅ Created 3 sample quizzes:');
    console.log(`   - ${quiz1.title} (${quiz1.questions.length} questions)`);
    console.log(`   - ${quiz2.title} (${quiz2.questions.length} questions)`);
    console.log(`   - ${quiz3.title} (${quiz3.questions.length} questions)`);
    
  } catch (error) {
    console.error('❌ Error creating sample quizzes:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

createSampleQuizzes();
