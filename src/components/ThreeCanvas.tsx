import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ThreeCanvasProps {
  interactive?: boolean;
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check if WebGL is supported
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
        return;
      }
    } catch {
      setHasWebGL(false);
      return;
    }

    let renderer: THREE.WebGLRenderer | null = null;
    let animationFrameId: number;
    let cageGeometry: THREE.IcosahedronGeometry;
    let tubeGeometry: THREE.TubeGeometry;
    let cageWireframeGeo: THREE.WireframeGeometry;
    let tubeWireframeGeo: THREE.WireframeGeometry;
    let cageMaterial: THREE.LineBasicMaterial;
    let cagePointsMat: THREE.PointsMaterial;
    let tubeLineMat: THREE.LineBasicMaterial;
    let tubeSolidMat: THREE.MeshBasicMaterial;

    try {
      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;

      // Scene
      const scene = new THREE.Scene();

      // Camera
      const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
      camera.position.set(0, 0, 8.2);

      // Renderer
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      // Group for master rotations
      const masterGroup = new THREE.Group();
      scene.add(masterGroup);

      // 1. OUTER CAGE: Faceted Polyhedron / Icosahedron Wireframe (Orange/Red #FF3E14)
      cageGeometry = new THREE.IcosahedronGeometry(3.25, 1);
      cageWireframeGeo = new THREE.WireframeGeometry(cageGeometry);
      cageMaterial = new THREE.LineBasicMaterial({
        color: 0xFF3E14, // Vibrant Orange-Red
        linewidth: 1.5,
        transparent: true,
        opacity: 0.95
      });
      const cageLine = new THREE.LineSegments(cageWireframeGeo, cageMaterial);
      masterGroup.add(cageLine);

      // Subtle small orange vertex dots
      cagePointsMat = new THREE.PointsMaterial({
        color: 0xFF3E14,
        size: 0.05,
        transparent: true,
        opacity: 0.9
      });
      const cagePoints = new THREE.Points(cageGeometry, cagePointsMat);
      masterGroup.add(cagePoints);

      // 2. INNER CURVED WHITE WIREFRAME RIBBON / KNOT LOOP
      const curvePoints = [
        new THREE.Vector3(-1.15, 1.4, 0.2),
        new THREE.Vector3(-0.4, 2.3, -0.3),
        new THREE.Vector3(0.55, 1.8, 0.1),
        new THREE.Vector3(0.25, 0.4, 0.45),
        new THREE.Vector3(0.9, -0.3, 0.15),
        new THREE.Vector3(0.75, -1.4, -0.25),
        new THREE.Vector3(-0.05, -1.85, 0.1),
        new THREE.Vector3(-0.55, -0.9, 0.45),
        new THREE.Vector3(-0.25, 0.05, -0.2),
        new THREE.Vector3(-1.05, 0.5, 0.25)
      ];

      const spline = new THREE.CatmullRomCurve3(curvePoints, true, 'centripetal');
      tubeGeometry = new THREE.TubeGeometry(spline, 200, 0.26, 16, true);
      tubeWireframeGeo = new THREE.WireframeGeometry(tubeGeometry);

      tubeLineMat = new THREE.LineBasicMaterial({
        color: 0xFFFFFF, // Pure Bright White
        linewidth: 1,
        transparent: true,
        opacity: 0.9
      });
      const tubeWireframe = new THREE.LineSegments(tubeWireframeGeo, tubeLineMat);
      masterGroup.add(tubeWireframe);

      tubeSolidMat = new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0.85
      });
      const tubeSolidMesh = new THREE.Mesh(tubeGeometry, tubeSolidMat);
      masterGroup.add(tubeSolidMesh);

      // Pointer Interaction State
      let mouseX = 0;
      let mouseY = 0;
      let targetX = 0;
      let targetY = 0;
      let isDragging = false;
      let previousPointerPosition = { x: 0, y: 0 };
      let dragDeltaX = 0;
      let dragDeltaY = 0;

      const handleMouseMove = (event: MouseEvent) => {
        if (!container) return;
        const rect = container.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / (container.clientWidth || 1)) * 2 - 1;
        const y = -(((event.clientY - rect.top) / (container.clientHeight || 1)) * 2 - 1);
        targetX = x * 0.4;
        targetY = y * 0.4;
      };

      const handlePointerDown = (event: PointerEvent) => {
        isDragging = true;
        previousPointerPosition = { x: event.clientX, y: event.clientY };
      };

      const handlePointerMove = (event: PointerEvent) => {
        if (isDragging) {
          const deltaX = event.clientX - previousPointerPosition.x;
          const deltaY = event.clientY - previousPointerPosition.y;
          dragDeltaX += deltaX * 0.005;
          dragDeltaY += deltaY * 0.005;
          previousPointerPosition = { x: event.clientX, y: event.clientY };
        }
      };

      const handlePointerUp = () => {
        isDragging = false;
      };

      window.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('pointerdown', handlePointerDown);
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);

      // Resize Observer
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { width: newWidth, height: newHeight } = entry.contentRect;
          if (newWidth > 0 && newHeight > 0 && renderer) {
            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(newWidth, newHeight);
          }
        }
      });
      resizeObserver.observe(container);

      // Animation Loop
      const clock = new THREE.Clock();

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        // Smooth interpolation
        mouseX += (targetX - mouseX) * 0.04;
        mouseY += (targetY - mouseY) * 0.04;

        // Base auto rotation + gentle drag & mouse tracking
        masterGroup.rotation.y = elapsedTime * 0.2 + mouseX + dragDeltaX;
        masterGroup.rotation.x = Math.sin(elapsedTime * 0.15) * 0.15 - mouseY + dragDeltaY;
        masterGroup.rotation.z = Math.cos(elapsedTime * 0.1) * 0.08;

        if (renderer) {
          renderer.render(scene, camera);
        }
      };

      animate();

      return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('pointerdown', handlePointerDown);
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerup', handlePointerUp);
        resizeObserver.disconnect();
        if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
        renderer?.dispose();
        cageGeometry?.dispose();
        tubeGeometry?.dispose();
        cageWireframeGeo?.dispose();
        tubeWireframeGeo?.dispose();
        cageMaterial?.dispose();
        cagePointsMat?.dispose();
        tubeLineMat?.dispose();
        tubeSolidMat?.dispose();
      };
    } catch {
      setHasWebGL(false);
    }
  }, []);

  if (!hasWebGL) {
    return (
      <div className="w-full h-full flex items-center justify-center p-8">
        <div className="w-64 h-64 border border-[#FF3E14]/40 rounded-full animate-spin flex items-center justify-center [animation-duration:18s]">
          <div className="w-44 h-44 border border-white/30 rounded-full animate-ping [animation-duration:4s]"></div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-full cursor-grab active:cursor-grabbing select-none"
    />
  );
};
