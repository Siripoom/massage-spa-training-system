// src/app/admin/certificate/CertificateCanvas.tsx
// Component สำหรับแสดงผลและออกแบบใบประกาศด้วย Konva.js
'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
// import { Stage, Layer, Text, Image as KonvaImage, Rect } from 'react-konva';
import { Stage, Layer, Text, Rect } from 'react-konva';
import Konva from 'konva';
// import useImage from 'use-image'; 
import dayjs from 'dayjs';

// Base dimensions for the certificate design (A4 landscape ratio)
const DESIGN_WIDTH = 720; 
const DESIGN_HEIGHT = 508.5; 

interface CertificateData {
  title: string;
  studentName: string;
  courseName: string;
  issueDate: dayjs.Dayjs | null;
  schoolLogoUrl: string;
  fontFamily: string;
  fontSize: number;
  textColor: string;
  bgColor: string;
  signatureLine1: string;
  signatureLine2: string;
  // Positions for Konva shapes (all in pixels, representing the TOP-LEFT of the element's bounding box)
  titlePos: { x: number; y: number };
  studentNamePos: { x: number; y: number };
  courseNamePos: { x: number; y: number };

  // *** เพิ่ม Properties สำหรับการปรับแต่งกรอบ ***
  mainBorderWidth: number;
  mainBorderColor: string;
  mainBorderRadius: number;
  mainBorderStyle: 'solid' | 'dashed'; // เพิ่มสไตล์เส้นกรอบหลัก
  mainBorderDashLength: number; // ความยาวเส้นประกรอบหลัก
  mainBorderDashGap: number; // ระยะห่างเส้นประกรอบหลัก
  innerBorder1Width: number;
  innerBorder1Color: string;
  innerBorder1DashLength: number;
  innerBorder1DashGap: number;
  innerBorder2Width: number;
  innerBorder2Color: string;
}

interface CertificateCanvasProps {
  certificateData: CertificateData;
  onPositionChange: (elementName: string, newPos: { x: number; y: number }) => void;
  stageRef: React.RefObject<Konva.Stage | null>; // Pass ref to Stage for export
}

const CertificateCanvas: React.FC<CertificateCanvasProps> = ({ certificateData, onPositionChange, stageRef }) => {
  // const [logoImage] = useImage(certificateData.schoolLogoUrl); 
  const containerRef = useRef<HTMLDivElement>(null);
  const [stageWidth, setStageWidth] = useState(DESIGN_WIDTH);
  const [stageHeight, setStageHeight] = useState(DESIGN_HEIGHT);
  const [scale, setScale] = useState(1);

  // Function to calculate stage size based on container
  const checkSize = useCallback(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const newScale = containerWidth / DESIGN_WIDTH;
      setStageWidth(containerWidth);
      setStageHeight(DESIGN_HEIGHT * newScale);
      setScale(newScale);
    }
  }, []);

  useEffect(() => {
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, [checkSize]);

  // Handler for all draggable elements (text) drag end
  const handleDragEnd = (e: Konva.KonvaEventObject<DragEvent>, elementName: string) => {
    // Konva's x, y for Text are top-left. We store top-left in certificateData.
    // For draggable text, we want to store the center X and top Y.
    const newX = (e.target.x() + e.target.width() / 2) / scale; 
    const newY = e.target.y() / scale; 
    onPositionChange(elementName, { x: newX, y: newY });
  };

  return (
    <div ref={containerRef} style={{ 
      width: '100%', 
      aspectRatio: `${DESIGN_WIDTH} / ${DESIGN_HEIGHT}`, 
      position: 'relative', 
      overflow: 'hidden',
    }}>
      <Stage
        width={stageWidth}
        height={stageHeight}
        ref={stageRef} // Pass the ref from parent
      >
        <Layer>
          {/* Outer Border Rectangle (for formal Thai style) */}
          <Rect
            x={0}
            y={0}
            width={DESIGN_WIDTH}
            height={DESIGN_HEIGHT}
            fill={certificateData.bgColor}
            stroke={certificateData.mainBorderColor}
            strokeWidth={certificateData.mainBorderWidth}
            cornerRadius={certificateData.mainBorderRadius}
            // lineCap={certificateData.mainBorderLineCap} // ลบออก
            // lineJoin={certificateData.mainBorderLineJoin} // ลบออก
            // Apply dash property based on mainBorderStyle
            dash={certificateData.mainBorderStyle === 'dashed' ? [certificateData.mainBorderDashLength, certificateData.mainBorderDashGap] : undefined}
          />
          {/* Inner Decorative Border (simulating a more formal look) */}
          <Rect
            x={20} 
            y={20}
            width={DESIGN_WIDTH - 40}
            height={DESIGN_HEIGHT - 40}
            stroke={certificateData.innerBorder1Color} 
            strokeWidth={certificateData.innerBorder1Width} 
            cornerRadius={6}
            dash={[certificateData.innerBorder1DashLength, certificateData.innerBorder1DashGap]} 
          />
          <Rect
            x={25} 
            y={25}
            width={DESIGN_WIDTH - 50}
            height={DESIGN_HEIGHT - 50}
            stroke={certificateData.innerBorder2Color} 
            strokeWidth={certificateData.innerBorder2Width} 
            cornerRadius={5}
          />

          {/* School Logo (ถูกคอมเมนต์ออกชั่วคราวตามคำขอ) */}
          {/* {logoImage && (
            <KonvaImage
              image={logoImage}
              x={certificateData.logoPos.x} 
              y={certificateData.logoPos.y} 
              width={100}
              height={100}
              draggable
              onDragEnd={(e) => handleDragEnd(e, 'logo')}
              crossOrigin="anonymous" 
            />
          )} */}

          {/* Title */}
          <Text
            text={certificateData.title}
            x={certificateData.titlePos.x} 
            y={certificateData.titlePos.y} 
            fontSize={certificateData.fontSize + 10}
            fontFamily={certificateData.fontFamily}
            fill={certificateData.textColor}
            align="center"
            width={DESIGN_WIDTH} 
            draggable
            onDragEnd={(e) => handleDragEnd(e, 'title')}
            offsetX={DESIGN_WIDTH / 2} 
          />

          {/* "มอบให้แก่" */}
          <Text
            text="มอบให้แก่"
            x={DESIGN_WIDTH / 2}
            y={DESIGN_HEIGHT * 0.30} 
            fontSize={certificateData.fontSize}
            fontFamily={certificateData.fontFamily}
            fill={certificateData.textColor}
            align="center"
            width={DESIGN_WIDTH}
            offsetX={DESIGN_WIDTH / 2}
          />

          {/* Student Name */}
          <Text
            text={certificateData.studentName}
            x={certificateData.studentNamePos.x} 
            y={certificateData.studentNamePos.y}
            fontSize={certificateData.fontSize + 6}
            fontFamily={certificateData.fontFamily}
            fill={certificateData.textColor}
            align="center"
            width={DESIGN_WIDTH}
            draggable
            onDragEnd={(e) => handleDragEnd(e, 'studentName')}
            offsetX={DESIGN_WIDTH / 2} 
          />

          {/* "เพื่อแสดงว่าได้สำเร็จหลักสูตร" */}
          <Text
            text="เพื่อแสดงว่าได้สำเร็จหลักสูตร"
            x={DESIGN_WIDTH / 2}
            y={DESIGN_HEIGHT * 0.55} 
            fontSize={certificateData.fontSize}
            fontFamily={certificateData.fontFamily}
            fill={certificateData.textColor}
            align="center"
            width={DESIGN_WIDTH}
            offsetX={DESIGN_WIDTH / 2}
          />

          {/* Course Name */}
          <Text
            text={certificateData.courseName}
            x={certificateData.courseNamePos.x} 
            y={certificateData.courseNamePos.y}
            fontSize={certificateData.fontSize + 6}
            fontFamily={certificateData.fontFamily}
            fill={certificateData.textColor}
            align="center"
            width={DESIGN_WIDTH}
            draggable
            onDragEnd={(e) => handleDragEnd(e, 'courseName')}
            offsetX={DESIGN_WIDTH / 2} 
          />

          {/* Issue Date */}
          <Text
            text={`ณ วันที่ ${certificateData.issueDate ? certificateData.issueDate.format('DD MMMM YYYY') : 'วันที่ออก'}`}
            x={DESIGN_WIDTH / 2}
            y={DESIGN_HEIGHT * 0.70} 
            fontSize={certificateData.fontSize - 4}
            fontFamily={certificateData.fontFamily}
            fill={certificateData.textColor}
            align="center"
            width={DESIGN_WIDTH}
            offsetX={DESIGN_WIDTH / 2}
          />

          {/* Signature Lines */}
          <Text
            text={`(_________________________)\n${certificateData.signatureLine1}\n${certificateData.signatureLine2}`}
            x={DESIGN_WIDTH - 250} 
            y={DESIGN_HEIGHT - 100} 
            fontSize={certificateData.fontSize - 4}
            fontFamily={certificateData.fontFamily}
            fill={certificateData.textColor}
            align="right" 
            width={200} 
          />
        </Layer>
      </Stage>
    </div>
  );
};

export default CertificateCanvas;
