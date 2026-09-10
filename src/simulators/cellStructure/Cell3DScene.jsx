import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { getOrganellesForCell } from "./data";

const CELL_RADIUS = 2.7;

// A single shared clipping plane cuts every mesh in the scene at once,
// producing a real cross-section (not a transparency trick). The normal
// points roughly toward the default camera position, so the flat cut
// face is what you see first, looking straight into the cell's interior.
const CLIP_NORMAL = new THREE.Vector3(0.42, 0.3, 0.86).normalize();
const CLIP_PLANE = new THREE.Plane(CLIP_NORMAL, 0);
const CLIP_PLANES = [CLIP_PLANE];

const CAMERA_POSITION = [3.6, 2.6, 7.2];

// Deterministic pseudo-random positions for "scattered" organelles
// (ribosomes, lysosomes) so they look natural but don't shift between
// renders.
function scatteredPositions(count, radius, seed) {
  const points = [];
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  for (let i = 0; i < count; i++) {
    const r = radius * (0.3 + rand() * 0.55);
    const theta = rand() * Math.PI * 2;
    const phi = Math.acos(2 * rand() - 1);
    points.push([
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.sin(phi) * Math.sin(theta),
      r * Math.cos(phi),
    ]);
  }
  return points;
}

// The solid face revealed by the cut - without this, clipping just makes
// half the cell disappear into a hollow void, which looks broken rather
// than like a cross-section.
function CutFace({ color }) {
  const quaternion = useMemo(() => {
    const q = new THREE.Quaternion();
    q.setFromUnitVectors(new THREE.Vector3(0, 0, 1), CLIP_NORMAL);
    return q;
  }, []);

  return (
    <group quaternion={quaternion} position={[0, 0, 0]}>
      {/* the solid cut surface itself */}
      <mesh position={[0, 0, -0.01]}>
        <circleGeometry args={[CELL_RADIUS + 1.4, 64]} />
        <meshStandardMaterial color="#212c31" roughness={0.85} side={THREE.DoubleSide} />
      </mesh>
      {/* a thin bright ring tracing the cut edge of the outer membrane/wall */}
      <mesh position={[0, 0, 0]}>
        <ringGeometry args={[CELL_RADIUS + 0.28, CELL_RADIUS + 0.42, 80]} />
        <meshBasicMaterial color={color} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function CellShell({ cellType }) {
  if (cellType === "plant") {
    return (
      <group>
        {/* cell wall - solid, since we're cutting into it rather than
            seeing through it */}
        <mesh>
          <boxGeometry args={[6.2, 5.6, 5.6]} />
          <meshStandardMaterial
            color="#3f6b4c"
            roughness={0.85}
            clippingPlanes={CLIP_PLANES}
          />
        </mesh>
        {/* membrane, a thin layer just inside the wall */}
        <mesh>
          <boxGeometry args={[5.9, 5.3, 5.3]} />
          <meshStandardMaterial
            color="#4f8fc4"
            roughness={0.4}
            metalness={0.05}
            clippingPlanes={CLIP_PLANES}
          />
        </mesh>
        {/* cytoplasm fill */}
        <mesh>
          <boxGeometry args={[5.7, 5.1, 5.1]} />
          <meshStandardMaterial
            color="#141c22"
            roughness={0.95}
            clippingPlanes={CLIP_PLANES}
          />
        </mesh>
      </group>
    );
  }

  return (
    <group>
      <mesh>
        <sphereGeometry args={[CELL_RADIUS + 0.32, 48, 48]} />
        <meshStandardMaterial
          color="#4f8fc4"
          roughness={0.4}
          metalness={0.05}
          clippingPlanes={CLIP_PLANES}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[CELL_RADIUS + 0.05, 48, 48]} />
        <meshStandardMaterial
          color="#141c22"
          roughness={0.95}
          clippingPlanes={CLIP_PLANES}
        />
      </mesh>
    </group>
  );
}

function Nucleus({ organelle, isSelected, onSelect }) {
  return (
    <mesh
      position={organelle.position}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(organelle.id);
      }}
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "auto")}
    >
      <sphereGeometry args={[organelle.radius || 1, 32, 32]} />
      <meshStandardMaterial
        color={organelle.color}
        emissive={isSelected ? organelle.color : "#000000"}
        emissiveIntensity={isSelected ? 0.6 : 0}
        roughness={0.45}
        clippingPlanes={CLIP_PLANES}
      />
    </mesh>
  );
}

function PulsingBlob({ organelle, position, isSelected, onSelect, scale = [1, 1, 1], geometry }) {
  const ref = useRef();
  const phase = useRef(Math.random() * Math.PI * 2);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const pulse = 1 + Math.sin(t * 1.4 + phase.current) * 0.04;
    ref.current.scale.set(scale[0] * pulse, scale[1] * pulse, scale[2] * pulse);
  });

  return (
    <mesh
      ref={ref}
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(organelle.id);
      }}
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "auto")}
    >
      {geometry}
      <meshStandardMaterial
        color={organelle.color}
        emissive={isSelected ? organelle.color : "#000000"}
        emissiveIntensity={isSelected ? 0.6 : 0}
        roughness={0.5}
        clippingPlanes={CLIP_PLANES}
      />
    </mesh>
  );
}

function ScatteredGroup({ organelle, isSelected, onSelect }) {
  const positions = useMemo(
    () => scatteredPositions(organelle.count, CELL_RADIUS, organelle.id.charCodeAt(0) * 17 + organelle.count),
    [organelle.id, organelle.count]
  );

  return (
    <group>
      {positions.map((pos, i) => (
        <mesh
          key={i}
          position={pos}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(organelle.id);
          }}
          onPointerOver={() => (document.body.style.cursor = "pointer")}
          onPointerOut={() => (document.body.style.cursor = "auto")}
        >
          <sphereGeometry args={[organelle.id === "lysosome" ? 0.13 : 0.05, 10, 10]} />
          <meshStandardMaterial
            color={organelle.color}
            emissive={isSelected ? organelle.color : "#000000"}
            emissiveIntensity={isSelected ? 0.7 : 0}
            clippingPlanes={CLIP_PLANES}
          />
        </mesh>
      ))}
    </group>
  );
}

function GolgiStack({ organelle, isSelected, onSelect }) {
  const discs = 5;
  return (
    <group position={organelle.position} rotation={[0.3, 0.4, 0]}>
      {Array.from({ length: discs }).map((_, i) => (
        <mesh
          key={i}
          position={[i * 0.09, -i * 0.03, 0]}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(organelle.id);
          }}
          onPointerOver={() => (document.body.style.cursor = "pointer")}
          onPointerOut={() => (document.body.style.cursor = "auto")}
        >
          <cylinderGeometry args={[0.32 - i * 0.02, 0.32 - i * 0.02, 0.05, 20]} />
          <meshStandardMaterial
            color={organelle.color}
            emissive={isSelected ? organelle.color : "#000000"}
            emissiveIntensity={isSelected ? 0.6 : 0}
            clippingPlanes={CLIP_PLANES}
          />
        </mesh>
      ))}
    </group>
  );
}

function ERNetwork({ organelle, isSelected, onSelect }) {
  return (
    <mesh
      position={organelle.position}
      rotation={[0.4, 0.6, 0.2]}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(organelle.id);
      }}
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "auto")}
    >
      <torusKnotGeometry args={[0.45, 0.08, 64, 8, 2, 3]} />
      <meshStandardMaterial
        color={organelle.color}
        emissive={isSelected ? organelle.color : "#000000"}
        emissiveIntensity={isSelected ? 0.6 : 0}
        roughness={0.5}
        clippingPlanes={CLIP_PLANES}
      />
    </mesh>
  );
}

function CameraRig({ target }) {
  const currentTarget = useRef(new THREE.Vector3(0, 0, 0));
  const desiredTarget = useRef(new THREE.Vector3(0, 0, 0));
  const controlsRef = useRef();

  useMemo(() => {
    if (target) {
      desiredTarget.current.set(target[0], target[1], target[2]);
    } else {
      desiredTarget.current.set(0, 0, 0);
    }
  }, [target]);

  useFrame(() => {
    currentTarget.current.lerp(desiredTarget.current, 0.08);
    if (controlsRef.current) {
      controlsRef.current.target.copy(currentTarget.current);
      controlsRef.current.update();
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      minDistance={3.5}
      maxDistance={14}
      makeDefault
    />
  );
}

function Scene({ cellType, level, selectedId, onSelect }) {
  const organelles = getOrganellesForCell(cellType, level);
  const selected = organelles.find((o) => o.id === selectedId);
  const focusTarget = selected ? selected.position || selected.positions?.[0] || null : null;
  const rimColor = cellType === "plant" ? "#3f6b4c" : "#4f8fc4";

  return (
    <>
      {/* Soft, slightly warm laboratory-style lighting rather than a flat
          single light - a key light, a cooler fill from the opposite
          side, and gentle ambient so nothing goes pitch black. */}
      <ambientLight intensity={0.45} />
      <directionalLight position={[5, 7, 6]} intensity={1.35} color="#fff8ec" />
      <directionalLight position={[-6, -2, -4]} intensity={0.35} color="#8fd6e8" />
      <pointLight position={[0, 1, 3]} intensity={0.4} color="#ffffff" />

      <CellShell cellType={cellType} />
      <CutFace color={rimColor} />

      {organelles.map((o) => {
        const isSelected = o.id === selectedId;

        if (o.id === "membrane" || o.id === "wall") return null; // rendered by CellShell

        if (o.id === "nucleus") {
          return <Nucleus key={o.id} organelle={o} isSelected={isSelected} onSelect={onSelect} />;
        }

        if (o.id === "nucleolus") {
          return (
            <PulsingBlob
              key={o.id}
              organelle={o}
              position={o.position}
              isSelected={isSelected}
              onSelect={onSelect}
              geometry={<sphereGeometry args={[o.radius || 0.3, 16, 16]} />}
            />
          );
        }

        if (o.isScattered) {
          return <ScatteredGroup key={o.id} organelle={o} isSelected={isSelected} onSelect={onSelect} />;
        }

        if (o.id === "golgi") {
          return <GolgiStack key={o.id} organelle={o} isSelected={isSelected} onSelect={onSelect} />;
        }

        if (o.id === "roughER" || o.id === "smoothER") {
          return <ERNetwork key={o.id} organelle={o} isSelected={isSelected} onSelect={onSelect} />;
        }

        if (o.id === "mitochondria") {
          return o.positions.map((pos, i) => (
            <PulsingBlob
              key={`${o.id}-${i}`}
              organelle={o}
              position={pos}
              isSelected={isSelected}
              onSelect={onSelect}
              scale={[1, 1, 1]}
              geometry={<capsuleGeometry args={[0.16, 0.42, 6, 12]} />}
            />
          ));
        }

        if (o.id === "chloroplast") {
          return o.positions.map((pos, i) => (
            <PulsingBlob
              key={`${o.id}-${i}`}
              organelle={o}
              position={pos}
              isSelected={isSelected}
              onSelect={onSelect}
              scale={[1, 0.55, 0.75]}
              geometry={<sphereGeometry args={[0.34, 16, 16]} />}
            />
          ));
        }

        if (o.id === "vacuole") {
          return (
            <PulsingBlob
              key={o.id}
              organelle={o}
              position={o.position}
              isSelected={isSelected}
              onSelect={onSelect}
              scale={[1, 0.9, 0.9]}
              geometry={<sphereGeometry args={[o.radius || 1.2, 24, 24]} />}
            />
          );
        }

        if (o.id === "centriole") {
          return (
            <group key={o.id} position={o.position}>
              <mesh
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(o.id);
                }}
              >
                <cylinderGeometry args={[0.05, 0.05, 0.3, 10]} />
                <meshStandardMaterial
                  color={o.color}
                  emissive={isSelected ? o.color : "#000000"}
                  emissiveIntensity={isSelected ? 0.6 : 0}
                  clippingPlanes={CLIP_PLANES}
                />
              </mesh>
              <mesh
                rotation={[0, Math.PI / 2, 0]}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(o.id);
                }}
              >
                <cylinderGeometry args={[0.05, 0.05, 0.3, 10]} />
                <meshStandardMaterial
                  color={o.color}
                  emissive={isSelected ? o.color : "#000000"}
                  emissiveIntensity={isSelected ? 0.6 : 0}
                  clippingPlanes={CLIP_PLANES}
                />
              </mesh>
            </group>
          );
        }

        return null;
      })}

      <CameraRig target={focusTarget} />
    </>
  );
}

export default function Cell3DScene({ cellType, level, selectedId, onSelect }) {
  return (
    <Canvas
      camera={{ position: CAMERA_POSITION, fov: 45 }}
      onPointerMissed={() => onSelect(null)}
      dpr={[1, 1.75]}
      gl={{ antialias: true, localClippingEnabled: true }}
    >
      <color attach="background" args={["#0b1013"]} />
      <Scene cellType={cellType} level={level} selectedId={selectedId} onSelect={onSelect} />
    </Canvas>
  );
}
