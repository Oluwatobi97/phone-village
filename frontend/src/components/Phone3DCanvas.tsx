'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface Phone3DCanvasProps {
  darkMode?: boolean;
}

export default function Phone3DCanvas({ darkMode = false }: Phone3DCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const phoneGroupRef = useRef<THREE.Group | null>(null);
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const [activePreset, setActivePreset] = useState<'iso' | 'front' | 'back'>('iso');

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 7.5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x10b981, 2.5); // Emerald tint
    keyLight.position.set(5, 5, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 1.5);
    fillLight.position.set(-5, -2, 3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x34d399, 2.0);
    rimLight.position.set(0, 5, -5);
    scene.add(rimLight);

    // Composite 3D Smartphone Model Group
    const phoneGroup = new THREE.Group();

    // Materials
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: darkMode ? 0x064e3b : 0x0f172a, // Deep Emerald or Dark Titanium
      metalness: 0.85,
      roughness: 0.2,
    });

    const frameMaterial = new THREE.MeshStandardMaterial({
      color: 0x10b981, // Luminous Emerald frame
      metalness: 0.9,
      roughness: 0.15,
    });

    const glassScreenMaterial = new THREE.MeshStandardMaterial({
      color: 0x022c22,
      metalness: 0.1,
      roughness: 0.05,
    });

    const cameraLensMaterial = new THREE.MeshStandardMaterial({
      color: 0x000000,
      metalness: 0.95,
      roughness: 0.1,
    });

    const cameraRingMaterial = new THREE.MeshStandardMaterial({
      color: 0x34d399,
      metalness: 0.9,
      roughness: 0.2,
    });

    // 1. Phone Body Hull (Rounded Box Approximation)
    const phoneWidth = 2.2;
    const phoneHeight = 4.4;
    const phoneDepth = 0.22;

    const bodyGeo = new THREE.BoxGeometry(phoneWidth, phoneHeight, phoneDepth);
    const bodyMesh = new THREE.Mesh(bodyGeo, bodyMaterial);
    phoneGroup.add(bodyMesh);

    // 2. Outer Frame Trim
    const frameGeo = new THREE.BoxGeometry(phoneWidth + 0.04, phoneHeight + 0.04, phoneDepth - 0.02);
    const frameMesh = new THREE.Mesh(frameGeo, frameMaterial);
    phoneGroup.add(frameMesh);

    // 3. Front Glass Display Screen
    const screenGeo = new THREE.PlaneGeometry(phoneWidth - 0.1, phoneHeight - 0.1);
    const screenMesh = new THREE.Mesh(screenGeo, glassScreenMaterial);
    screenMesh.position.z = phoneDepth / 2 + 0.005;
    phoneGroup.add(screenMesh);

    // Create Canvas Texture for Phone Screen UI
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Screen background
      const gradient = ctx.createLinearGradient(0, 0, 0, 1024);
      gradient.addColorStop(0, '#022c22');
      gradient.addColorStop(0.5, '#064e3b');
      gradient.addColorStop(1, '#021b12');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 512, 1024);

      // Status Bar
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 28px sans-serif';
      ctx.fillText('09:41', 40, 60);
      ctx.fillText('5G 100%', 380, 60);

      // Logo Card on Screen
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.roundRect(40, 120, 432, 280, 32);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'black 48px sans-serif';
      ctx.fillText('PHONE VILLAGE', 70, 220);
      ctx.font = '24px sans-serif';
      ctx.fillText('Verified Marketplace · Nigeria', 70, 280);

      // Mock UI Card 1
      ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.beginPath();
      ctx.roundRect(40, 440, 432, 140, 24);
      ctx.fill();

      ctx.fillStyle = '#34d399';
      ctx.font = 'bold 32px sans-serif';
      ctx.fillText('iPhone 15 Pro Max', 70, 500);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 36px monospace';
      ctx.fillText('₦1,150,000', 70, 550);

      // Mock UI Card 2
      ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.beginPath();
      ctx.roundRect(40, 610, 432, 140, 24);
      ctx.fill();

      ctx.fillStyle = '#34d399';
      ctx.font = 'bold 32px sans-serif';
      ctx.fillText('Samsung S24 Ultra', 70, 670);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 36px monospace';
      ctx.fillText('₦1,480,000', 70, 720);

      // Screen Texture
      const screenTexture = new THREE.CanvasTexture(canvas);
      screenTexture.colorSpace = THREE.SRGBColorSpace;
      const screenTextureMaterial = new THREE.MeshBasicMaterial({ map: screenTexture });
      const screenUIMesh = new THREE.Mesh(screenGeo, screenTextureMaterial);
      screenUIMesh.position.z = phoneDepth / 2 + 0.01;
      phoneGroup.add(screenUIMesh);
    }

    // 4. Dynamic Island / Punchhole Notch
    const notchGeo = new THREE.CapsuleGeometry(0.06, 0.25, 4, 8);
    const notchMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const notchMesh = new THREE.Mesh(notchGeo, notchMat);
    notchMesh.rotation.z = Math.PI / 2;
    notchMesh.position.set(0, phoneHeight / 2 - 0.25, phoneDepth / 2 + 0.015);
    phoneGroup.add(notchMesh);

    // 5. Back Camera Bump (Rear)
    const bumpGeo = new THREE.BoxGeometry(0.9, 1.0, 0.08);
    const bumpMesh = new THREE.Mesh(bumpGeo, frameMaterial);
    bumpMesh.position.set(-0.45, phoneHeight / 2 - 0.7, -phoneDepth / 2 - 0.04);
    phoneGroup.add(bumpMesh);

    // 3 Camera Lenses on Back
    const lensPositions = [
      [-0.65, phoneHeight / 2 - 0.5],
      [-0.65, phoneHeight / 2 - 0.9],
      [-0.25, phoneHeight / 2 - 0.7],
    ];

    lensPositions.forEach(([lx, ly]) => {
      // Outer ring
      const ringGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.06, 32);
      const ringMesh = new THREE.Mesh(ringGeo, cameraRingMaterial);
      ringMesh.rotation.x = Math.PI / 2;
      ringMesh.position.set(lx, ly, -phoneDepth / 2 - 0.08);
      phoneGroup.add(ringMesh);

      // Glass lens
      const lensGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.07, 32);
      const lensMesh = new THREE.Mesh(lensGeo, cameraLensMaterial);
      lensMesh.rotation.x = Math.PI / 2;
      lensMesh.position.set(lx, ly, -phoneDepth / 2 - 0.085);
      phoneGroup.add(lensMesh);
    });

    // Initial Isometric Orientation
    phoneGroup.rotation.y = 0.4;
    phoneGroup.rotation.x = 0.2;

    scene.add(phoneGroup);
    phoneGroupRef.current = phoneGroup;

    // Pointer Interaction Handlers for 3D Drag Rotation
    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || !phoneGroupRef.current) return;

      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      phoneGroupRef.current.rotation.y += deltaX * 0.01;
      phoneGroupRef.current.rotation.x += deltaY * 0.01;

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Gentle floating animation when not dragging
      if (!isDraggingRef.current && phoneGroupRef.current) {
        const elapsedTime = clock.getElapsedTime();
        phoneGroupRef.current.position.y = Math.sin(elapsedTime * 1.5) * 0.12;
        phoneGroupRef.current.rotation.y += 0.003;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [darkMode]);

  // Preset Angle Handlers
  const setPresetAngle = (preset: 'iso' | 'front' | 'back') => {
    setActivePreset(preset);
    if (!phoneGroupRef.current) return;

    if (preset === 'iso') {
      phoneGroupRef.current.rotation.set(0.2, 0.4, 0);
    } else if (preset === 'front') {
      phoneGroupRef.current.rotation.set(0, 0, 0);
    } else if (preset === 'back') {
      phoneGroupRef.current.rotation.set(0, Math.PI, 0);
    }
  };

  return (
    <div className="relative w-full h-[380px] sm:h-[440px] flex flex-col items-center justify-between">
      {/* 3D Canvas Mount Point */}
      <div 
        ref={mountRef} 
        className="w-full h-full cursor-grab active:cursor-grabbing rounded-2xl overflow-hidden"
      />

      {/* Interactive Controls Overlay */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-emerald-950/90 border border-emerald-700/80 p-1.5 rounded-xl backdrop-blur-md shadow-xl text-xs z-10">
        <span className="text-[11px] font-bold text-emerald-400 px-2 flex items-center gap-1">
          <svg className="w-3.5 h-3.5 animate-spin text-emerald-400" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          3D Inspect
        </span>

        <button
          onClick={() => setPresetAngle('iso')}
          className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer ${
            activePreset === 'iso' ? 'bg-emerald-500 text-emerald-950' : 'text-emerald-200 hover:text-white'
          }`}
        >
          3D View
        </button>

        <button
          onClick={() => setPresetAngle('front')}
          className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer ${
            activePreset === 'front' ? 'bg-emerald-500 text-emerald-950' : 'text-emerald-200 hover:text-white'
          }`}
        >
          Front Display
        </button>

        <button
          onClick={() => setPresetAngle('back')}
          className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer ${
            activePreset === 'back' ? 'bg-emerald-500 text-emerald-950' : 'text-emerald-200 hover:text-white'
          }`}
        >
          Rear Camera
        </button>
      </div>
    </div>
  );
}
