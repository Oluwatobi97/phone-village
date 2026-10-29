'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function Phone3DCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [modelColor, setModelColor] = useState<'titanium' | 'gold' | 'emerald' | 'black'>('emerald');
  const [isRotating, setIsRotating] = useState(true);

  // References for animation
  const phoneGroupRef = useRef<THREE.Group | null>(null);
  const bodyMaterialRef = useRef<THREE.MeshPhysicalMaterial | null>(null);

  const colors = {
    titanium: 0xd4d2cd,
    gold: 0xf5e6c8,
    emerald: 0x059669,
    black: 0x18181b,
  };

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 2.5);
    mainLight.position.set(5, 5, 5);
    scene.add(mainLight);

    const rimLight = new THREE.DirectionalLight(0x10b981, 3.0);
    rimLight.position.set(-5, -5, -2);
    scene.add(rimLight);

    const softLight = new THREE.DirectionalLight(0xffffff, 1.0);
    softLight.position.set(-5, 5, 3);
    scene.add(softLight);

    // Phone Group
    const phoneGroup = new THREE.Group();
    phoneGroupRef.current = phoneGroup;
    scene.add(phoneGroup);

    // Chassis geometry & materials
    const bodyGeometry = new THREE.BoxGeometry(2.3, 4.7, 0.28);
    const bodyMaterial = new THREE.MeshPhysicalMaterial({
      color: colors[modelColor],
      metalness: 0.85,
      roughness: 0.2,
      clearcoat: 0.5,
      clearcoatRoughness: 0.1,
    });
    bodyMaterialRef.current = bodyMaterial;

    const phoneBody = new THREE.Mesh(bodyGeometry, bodyMaterial);
    phoneGroup.add(phoneBody);

    // Display Glass Screen
    const screenGeometry = new THREE.PlaneGeometry(2.15, 4.5);
    const screenMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x051b14,
      roughness: 0.1,
      metalness: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
    });
    const phoneScreen = new THREE.Mesh(screenGeometry, screenMaterial);
    phoneScreen.position.z = 0.145;
    phoneGroup.add(phoneScreen);

    // Dynamic Island / Speaker Notch
    const islandGeometry = new THREE.BoxGeometry(0.5, 0.12, 0.02);
    const islandMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const dynamicIsland = new THREE.Mesh(islandGeometry, islandMaterial);
    dynamicIsland.position.set(0, 2.05, 0.15);
    phoneGroup.add(dynamicIsland);

    // Camera Bump Island (Back)
    const bumpGeometry = new THREE.BoxGeometry(1.0, 1.0, 0.08);
    const bumpMaterial = new THREE.MeshPhysicalMaterial({
      color: colors[modelColor],
      metalness: 0.8,
      roughness: 0.3,
    });
    const cameraBump = new THREE.Mesh(bumpGeometry, bumpMaterial);
    cameraBump.position.set(-0.55, 1.6, -0.16);
    phoneGroup.add(cameraBump);

    // Triple Camera Lenses
    const lensGeometry = new THREE.CylinderGeometry(0.18, 0.18, 0.06, 32);
    const lensMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x111111,
      metalness: 0.9,
      roughness: 0.1,
      clearcoat: 1.0,
    });
    const rimGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.04, 32);
    const rimMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4d4d8,
      metalness: 0.9,
      roughness: 0.2,
    });

    const lensPositions = [
      [-0.75, 1.8],
      [-0.75, 1.35],
      [-0.35, 1.58],
    ];

    lensPositions.forEach(([x, y]) => {
      const lensRim = new THREE.Mesh(rimGeometry, rimMaterial);
      lensRim.rotation.x = Math.PI / 2;
      lensRim.position.set(x, y, -0.21);
      phoneGroup.add(lensRim);

      const lens = new THREE.Mesh(lensGeometry, lensMaterial);
      lens.rotation.x = Math.PI / 2;
      lens.position.set(x, y, -0.22);
      phoneGroup.add(lens);
    });

    // Initial slight angle
    phoneGroup.rotation.y = 0.5;
    phoneGroup.rotation.x = 0.2;

    // Interaction handling (Mouse & Touch)
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;

    const onPointerDown = (clientX: number, clientY: number) => {
      isDragging = true;
      prevX = clientX;
      prevY = clientY;
    };

    const onPointerMove = (clientX: number, clientY: number) => {
      if (!isDragging || !phoneGroup) return;
      const deltaX = clientX - prevX;
      const deltaY = clientY - prevY;

      phoneGroup.rotation.y += deltaX * 0.01;
      phoneGroup.rotation.x += deltaY * 0.01;

      prevX = clientX;
      prevY = clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const handleMouseDown = (e: MouseEvent) => onPointerDown(e.clientX, e.clientY);
    const handleMouseMove = (e: MouseEvent) => onPointerMove(e.clientX, e.clientY);
    const handleMouseUp = () => onPointerUp();

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        onPointerDown(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const handleTouchEnd = () => onPointerUp();

    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (isRotating && !isDragging && phoneGroup) {
        phoneGroup.rotation.y += 0.008;
      }
      renderer.render(scene, camera);
    };
    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      renderer.dispose();
      bodyGeometry.dispose();
      screenGeometry.dispose();
      islandGeometry.dispose();
      bumpGeometry.dispose();
    };
  }, [modelColor, isRotating]);

  // Color change update
  const changeColor = (color: 'titanium' | 'gold' | 'emerald' | 'black') => {
    setModelColor(color);
    if (bodyMaterialRef.current) {
      bodyMaterialRef.current.color.setHex(colors[color]);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      {/* 3D Canvas Container */}
      <div
        ref={containerRef}
        className="w-full h-[280px] sm:h-[360px] lg:h-[420px] cursor-grab active:cursor-grabbing touch-pan-y"
      />

      {/* Floating 3D Controls */}
      <div className="absolute bottom-2 inset-x-0 flex items-center justify-between px-4 sm:px-6 pointer-events-none">
        {/* Color Palette Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-black/60 backdrop-blur-md border border-emerald-900/60 pointer-events-auto">
          <button
            onClick={() => changeColor('emerald')}
            title="Lagos Emerald Green"
            className={`w-6 h-6 rounded-full bg-emerald-600 transition-transform ${
              modelColor === 'emerald' ? 'scale-125 ring-2 ring-white' : 'opacity-80'
            }`}
          />
          <button
            onClick={() => changeColor('titanium')}
            title="Natural Titanium"
            className={`w-6 h-6 rounded-full bg-[#d4d2cd] transition-transform ${
              modelColor === 'titanium' ? 'scale-125 ring-2 ring-emerald-400' : 'opacity-80'
            }`}
          />
          <button
            onClick={() => changeColor('gold')}
            title="Desert Gold"
            className={`w-6 h-6 rounded-full bg-[#f5e6c8] transition-transform ${
              modelColor === 'gold' ? 'scale-125 ring-2 ring-emerald-400' : 'opacity-80'
            }`}
          />
          <button
            onClick={() => changeColor('black')}
            title="Obsidian Black"
            className={`w-6 h-6 rounded-full bg-[#18181b] transition-transform ${
              modelColor === 'black' ? 'scale-125 ring-2 ring-emerald-400' : 'opacity-80'
            }`}
          />
        </div>

        {/* Rotation Toggle */}
        <button
          onClick={() => setIsRotating(!isRotating)}
          className="pointer-events-auto text-[11px] font-bold px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-emerald-900/60 text-emerald-300 hover:text-white"
        >
          {isRotating ? '⏸ Pause' : '▶ Spin 360°'}
        </button>
      </div>

      <p className="text-[10px] text-emerald-400/80 mt-1 pointer-events-none">
        👆 Drag to rotate 360° · Select finish
      </p>
    </div>
  );
}
