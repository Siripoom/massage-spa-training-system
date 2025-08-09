'use client';


import '@ant-design/v5-patch-for-react-19';
import React, { useEffect, useState, useCallback } from 'react';
import { Stage, Layer, Text, Rect, Image as KonvaImage } from 'react-konva';
import Konva from 'konva';
import dayjs from 'dayjs';

// Base dimensions for the certificate design (A4 landscape ratio)
const DESIGN_WIDTH = 720;
const DESIGN_HEIGHT = 508.5;

interface CertificateData {
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
  fontSize: number; // Base font size
  titleText: string;
  studentNamePlaceholder: string; // Placeholder for student name
  courseNamePlaceholder: string; // Placeholder for course name
  issueDatePlaceholder: string; // Placeholder for issue date
  signatureText: string;
  signatureLine2: string; // Additional signature line
  logoUrl?: string;

  titlePosX: number;
  titlePosY: number;
  studentNamePosX: number;
  studentNamePosY: number;
  courseNamePosX: number;
  courseNamePosY: number;
  issueDateTextPosX: number;
  issueDateTextPosY: number;
  issueDateValuePosX: number;
  issueDateValuePosY: number;
  signatureBlockPosX: number;
  signatureBlockPosY: number;

  mainBorderWidth: number;
  mainBorderColor: string;
  mainBorderRadius: number;
  mainBorderStyle: 'solid' | 'dashed';
  mainBorderDashLength: number;
  mainBorderDashGap: number;
  innerBorder1Width: number;
  innerBorder1Color: string;
  innerBorder1DashLength: number;
  innerBorder1DashGap: number;
  innerBorder2Width: number;
  innerBorder2Color: string;
}

interface CertificateCanvasProps {
  certificateData: CertificateData;
  // onPositionChange will be a no-op function for preview,
  // and an actual function for editing. This helps conditionally enable dragging.
  onPositionChange: (elementName: string, newPos: { x: number; y: number }) => void;
  stageRef: React.RefObject<Konva.Stage | null>;
  scale?: number; // Optional scale prop, defaults to 1
}

const CertificateCanvas: React.FC<CertificateCanvasProps> = ({ certificateData, onPositionChange, stageRef, scale = 1 }) => {
  const [logoKonvaImage, setLogoKonvaImage] = useState<HTMLImageElement | null>(null);

  // Determine if dragging should be enabled (only if onPositionChange is not the no-op function)
  const isDraggable = useCallback(() => {
    // Check if onPositionChange is a function and not the exact no-op reference
    // This is a common pattern to enable/disable features based on prop existence/value
    return typeof onPositionChange === 'function' && onPositionChange.toString() !== (() => {}).toString();
  }, [onPositionChange]);


  useEffect(() => {
    if (certificateData.logoUrl) {
      const img = new window.Image();
      img.src = certificateData.logoUrl;
      img.crossOrigin = 'Anonymous'; // Important for CORS if image is external
      img.onload = () => {
        setLogoKonvaImage(img);
      };
      img.onerror = () => {
        console.error("Failed to load logo image for Konva:", certificateData.logoUrl);
        setLogoKonvaImage(null);
      };
    } else {
      setLogoKonvaImage(null);
    }
  }, [certificateData.logoUrl]);

  // Function to handle drag end for elements
  const handleDragEnd = (e: Konva.KonvaEventObject<DragEvent>, elementName: string) => {
    const node = e.target;
    // Pass unscaled new positions back to the parent
    const newPosX = node.x() / scale;
    const newPosY = node.y() / scale;
    onPositionChange(elementName, { x: newPosX, y: newPosY });
  };

  return (
    <div style={{
      width: `${DESIGN_WIDTH * scale}px`,
      height: `${DESIGN_HEIGHT * scale}px`,
      position: 'relative',
    }}>
      <Stage
        width={DESIGN_WIDTH * scale}
        height={DESIGN_HEIGHT * scale}
        ref={stageRef}
      >
        <Layer>
          {/* Background and Borders */}
          <Rect
            x={0}
            y={0}
            width={DESIGN_WIDTH * scale}
            height={DESIGN_HEIGHT * scale}
            fill={certificateData.backgroundColor}
            stroke={certificateData.mainBorderColor}
            strokeWidth={certificateData.mainBorderWidth * scale}
            cornerRadius={certificateData.mainBorderRadius * scale}
            dash={certificateData.mainBorderStyle === 'dashed' ? [certificateData.mainBorderDashLength * scale, certificateData.mainBorderDashGap * scale] : undefined}
          />
          <Rect
            x={20 * scale}
            y={20 * scale}
            width={DESIGN_WIDTH * scale - 40 * scale}
            height={DESIGN_HEIGHT * scale - 40 * scale}
            stroke={certificateData.innerBorder1Color}
            strokeWidth={certificateData.innerBorder1Width * scale}
            cornerRadius={6 * scale}
            dash={[certificateData.innerBorder1DashLength * scale, certificateData.innerBorder1DashGap * scale]}
          />
          <Rect
            x={25 * scale}
            y={25 * scale}
            width={DESIGN_WIDTH * scale - 50 * scale}
            height={DESIGN_HEIGHT * scale - 50 * scale}
            stroke={certificateData.innerBorder2Color}
            strokeWidth={certificateData.innerBorder2Width * scale}
            cornerRadius={5 * scale}
          />

          {/* School Logo */}
          {logoKonvaImage && (
            <KonvaImage
              image={logoKonvaImage}
              x={20 * scale}
              y={20 * scale}
              width={100 * scale}
              height={100 * scale}
              draggable={isDraggable()} // Enable dragging conditionally
              onDragEnd={(e) => handleDragEnd(e, 'logo')}
            />
          )}

          {/* Title */}
          <Text
            text={certificateData.titleText}
            x={0} // Centered: x=0, width=DESIGN_WIDTH, align="center"
            y={certificateData.titlePosY * scale}
            fontSize={(certificateData.fontSize + 10) * scale}
            fontFamily={certificateData.fontFamily}
            fill={certificateData.textColor}
            align="center"
            width={DESIGN_WIDTH * scale} // Use scaled width for centering
            draggable={isDraggable()}
            onDragEnd={(e) => handleDragEnd(e, 'title')}
          />

          {/* "มอบให้แก่" - Fixed text, centered */}
          <Text
            text="มอบให้แก่"
            x={0} // Centered
            y={DESIGN_HEIGHT * 0.30 * scale}
            fontSize={certificateData.fontSize * scale}
            fontFamily={certificateData.fontFamily}
            fill={certificateData.textColor}
            align="center"
            width={DESIGN_WIDTH * scale}
          />

          {/* Student Name */}
          <Text
            text={certificateData.studentNamePlaceholder}
            x={0} // Centered
            y={certificateData.studentNamePosY * scale}
            fontSize={(certificateData.fontSize + 6) * scale}
            fontFamily={certificateData.fontFamily}
            fill={certificateData.textColor}
            align="center"
            width={DESIGN_WIDTH * scale}
            draggable={isDraggable()}
            onDragEnd={(e) => handleDragEnd(e, 'studentName')}
          />

          {/* "เพื่อแสดงว่าได้สำเร็จหลักสูตร" - Fixed text, centered */}
          <Text
            text="เพื่อแสดงว่าได้สำเร็จหลักสูตร"
            x={0} // Centered
            y={DESIGN_HEIGHT * 0.55 * scale}
            fontSize={certificateData.fontSize * scale}
            fontFamily={certificateData.fontFamily}
            fill={certificateData.textColor}
            align="center"
            width={DESIGN_WIDTH * scale}
          />

          {/* Course Name */}
          <Text
            text={certificateData.courseNamePlaceholder}
            x={0} // Centered
            y={certificateData.courseNamePosY * scale}
            fontSize={(certificateData.fontSize + 6) * scale}
            fontFamily={certificateData.fontFamily}
            fill={certificateData.textColor}
            align="center"
            width={DESIGN_WIDTH * scale}
            draggable={isDraggable()}
            onDragEnd={(e) => handleDragEnd(e, 'courseName')}
          />

          {/* "ณ วันที่" - Text, left-aligned relative to its X */}
          <Text
            text="ณ วันที่"
            x={certificateData.issueDateTextPosX * scale}
            y={certificateData.issueDateTextPosY * scale}
            fontSize={(certificateData.fontSize - 8) * scale}
            fontFamily={certificateData.fontFamily}
            fill={certificateData.textColor}
            align='left'
            draggable={isDraggable()}
            onDragEnd={(e) => handleDragEnd(e, 'issueDateText')}
          />

          {/* Issue Date Value - Text, left-aligned relative to its X */}
          <Text
            text={certificateData.issueDatePlaceholder || dayjs().format('DD MMMM YYYY')}
            x={certificateData.issueDateValuePosX * scale}
            y={certificateData.issueDateValuePosY * scale}
            fontSize={(certificateData.fontSize - 8) * scale}
            fontFamily={certificateData.fontFamily}
            fill={certificateData.textColor}
            align='left'
            draggable={isDraggable()}
            onDragEnd={(e) => handleDragEnd(e, 'issueDateValue')}
          />

          {/* Signature Lines - Text block, right-aligned relative to its X */}
          <Text
            text={`(_________________________)\n\n${certificateData.signatureText}\n${certificateData.signatureLine2}`}
            x={certificateData.signatureBlockPosX * scale}
            y={certificateData.signatureBlockPosY * scale}
            fontSize={(certificateData.fontSize - 12) * scale}
            fontFamily={certificateData.fontFamily}
            fill={certificateData.textColor}
            align='right'
            width={200 * scale} // Fixed width for signature block, scaled
            draggable={isDraggable()}
            onDragEnd={(e) => handleDragEnd(e, 'signatureBlock')}
          />
        </Layer>
      </Stage>
    </div>
  );
};

export default CertificateCanvas;
