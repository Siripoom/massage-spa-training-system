'use client';


import '@ant-design/v5-patch-for-react-19';
import React, { useRef, useEffect, useState, useCallback } from 'react';
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
  onPositionChange: (elementName: string, newPos: { x: number; y: number }) => void;
  stageRef: React.RefObject<Konva.Stage | null>;
}

const CertificateCanvas: React.FC<CertificateCanvasProps> = ({ certificateData, stageRef }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [stageWidth, setStageWidth] = useState(DESIGN_WIDTH);
  const [stageHeight, setStageHeight] = useState(DESIGN_HEIGHT);
  const [scale, setScale] = useState(1);
  const [logoKonvaImage, setLogoKonvaImage] = useState<HTMLImageElement | null>(null);

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
    const timeoutId = setTimeout(checkSize, 0);
    return () => {
      window.removeEventListener('resize', checkSize);
      clearTimeout(timeoutId);
    };
  }, [checkSize]);

  useEffect(() => {
    if (certificateData.logoUrl) {
      const img = new window.Image();
      img.src = certificateData.logoUrl;
      img.crossOrigin = 'Anonymous';
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

  // Function to render text with common properties (no dragging)
  const renderTextElement = (
    text: string,
    x: number,
    y: number,
    fontSize: number,
    align: Konva.Text['attrs']['align'] = 'center',
    width?: number // Optional width for alignment
  ) => (
    <Text
      text={text}
      x={x * scale}
      y={y * scale}
      fontSize={fontSize * scale}
      fontFamily={certificateData.fontFamily}
      fill={certificateData.textColor}
      align={align}
      width={width ? width * scale : undefined}
    />
  );

  return (
    <div ref={containerRef} style={{
      width: '100%',
      aspectRatio: `${DESIGN_WIDTH} / ${DESIGN_HEIGHT}`,
      position: 'relative',
    }}>
      <Stage
        width={stageWidth}
        height={stageHeight}
        ref={stageRef}
      >
        <Layer>
          {/* Background and Borders */}
          <Rect
            x={0}
            y={0}
            width={DESIGN_WIDTH}
            height={DESIGN_HEIGHT}
            fill={certificateData.backgroundColor}
            stroke={certificateData.mainBorderColor}
            strokeWidth={certificateData.mainBorderWidth}
            cornerRadius={certificateData.mainBorderRadius}
            dash={certificateData.mainBorderStyle === 'dashed' ? [certificateData.mainBorderDashLength, certificateData.mainBorderDashGap] : undefined}
          />
          <Rect
            x={20 * scale}
            y={20 * scale}
            width={DESIGN_WIDTH * scale - 40 * scale}
            height={DESIGN_HEIGHT * scale - 40 * scale}
            stroke={certificateData.innerBorder1Color}
            strokeWidth={certificateData.innerBorder1Width}
            cornerRadius={6 * scale}
            dash={[certificateData.innerBorder1DashLength, certificateData.innerBorder1DashGap]}
          />
          <Rect
            x={25 * scale}
            y={25 * scale}
            width={DESIGN_WIDTH * scale - 50 * scale}
            height={DESIGN_HEIGHT * scale - 50 * scale}
            stroke={certificateData.innerBorder2Color}
            strokeWidth={certificateData.innerBorder2Width}
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
            />
          )}

          {/* Title */}
          {renderTextElement(
            certificateData.titleText,
            0, // Set x to 0 for center alignment
            certificateData.titlePosY,
            certificateData.fontSize + 10,
            'center',
            DESIGN_WIDTH // Ensure width is DESIGN_WIDTH for center alignment
          )}

          {/* "มอบให้แก่" - Fixed text, centered */}
          {renderTextElement(
            "มอบให้แก่",
            0, // Set x to 0 for center alignment
            DESIGN_HEIGHT * 0.30,
            certificateData.fontSize,
            'center',
            DESIGN_WIDTH // Ensure width is DESIGN_WIDTH for center alignment
          )}

          {/* Student Name */}
          {renderTextElement(
            certificateData.studentNamePlaceholder,
            0, // Set x to 0 for center alignment
            certificateData.studentNamePosY,
            certificateData.fontSize + 6,
            'center',
            DESIGN_WIDTH // Ensure width is DESIGN_WIDTH for center alignment
          )}

          {/* "เพื่อแสดงว่าได้สำเร็จหลักสูตร" - Fixed text, centered */}
          {renderTextElement(
            "เพื่อแสดงว่าได้สำเร็จหลักสูตร",
            0, // Set x to 0 for center alignment
            DESIGN_HEIGHT * 0.55,
            certificateData.fontSize,
            'center',
            DESIGN_WIDTH // Ensure width is DESIGN_WIDTH for center alignment
          )}

          {/* Course Name */}
          {renderTextElement(
            certificateData.courseNamePlaceholder,
            0, // Set x to 0 for center alignment
            certificateData.courseNamePosY,
            certificateData.fontSize + 6,
            'center',
            DESIGN_WIDTH // Ensure width is DESIGN_WIDTH for center alignment
          )}

          {/* "ณ วันที่" - Text, left-aligned relative to its X */}
          {renderTextElement(
            "ณ วันที่",
            certificateData.issueDateTextPosX,
            certificateData.issueDateTextPosY,
            certificateData.fontSize - 8,
            'left'
          )}

          {/* Issue Date Value - Text, left-aligned relative to its X */}
          {renderTextElement(
            certificateData.issueDatePlaceholder || dayjs().format('DD MMMM YYYY'), // Use placeholder or current date
            certificateData.issueDateValuePosX,
            certificateData.issueDateValuePosY,
            certificateData.fontSize - 8,
            'left'
          )}

          {/* Signature Lines - Text block, right-aligned relative to its X */}
          {renderTextElement(
            `(_________________________)\n\n${certificateData.signatureText}\n${certificateData.signatureLine2}`,
            certificateData.signatureBlockPosX,
            certificateData.signatureBlockPosY,
            certificateData.fontSize - 12,
            'right',
            200 // Fixed width for signature block
          )}
        </Layer>
      </Stage>
    </div>
  );
};

export default CertificateCanvas;
