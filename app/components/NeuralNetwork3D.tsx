"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Line } from "@react-three/drei"
import { useMemo, useRef } from "react"
import * as THREE from "three"

/* ----------------------------------------------------------------- *
 *  Neural network topology                                           *
 *  4 layers: input (3) → hidden1 (6) → hidden2 (6) → output (4)      *
 * ----------------------------------------------------------------- */
const LAYER_SIZES = [3, 6, 6, 4]
const LAYER_GAP = 2.4
const NODE_GAP = 0.95

// Per-layer color (gradient teal → blue → violet, like deepening embeddings)
const LAYER_COLORS = ["#5eead4", "#2dd4bf", "#60a5fa", "#a78bfa"]
const LAYER_EMISSIVE = ["#5eead4", "#2dd4bf", "#60a5fa", "#a78bfa"]

type NodePos = {
  layer: number
  index: number
  position: [number, number, number]
}

function buildLayers(): NodePos[][] {
  return LAYER_SIZES.map((count, layer) => {
    const x = (layer - (LAYER_SIZES.length - 1) / 2) * LAYER_GAP
    return Array.from({ length: count }, (_, idx) => {
      const y = (idx - (count - 1) / 2) * NODE_GAP
      return { layer, index: idx, position: [x, y, 0] as [number, number, number] }
    })
  })
}

function buildEdges(layers: NodePos[][]) {
  const edges: { from: NodePos; to: NodePos }[] = []
  for (let i = 0; i < layers.length - 1; i++) {
    for (const a of layers[i]) {
      for (const b of layers[i + 1]) {
        edges.push({ from: a, to: b })
      }
    }
  }
  return edges
}

/* ----------------------------------------------------------------- */

function NeuralScene() {
  const groupRef = useRef<THREE.Group>(null)
  const layers = useMemo(() => buildLayers(), [])
  const edges = useMemo(() => buildEdges(layers), [layers])
  const flatNodes = useMemo(() => layers.flat(), [layers])

  // Per-node phase offset for subtle pulsing
  const phases = useMemo(
    () => flatNodes.map(() => Math.random() * Math.PI * 2),
    [flatNodes],
  )

  const nodeRefs = useRef<Array<THREE.Mesh | null>>([])

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.18
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.12
    }
    // Pulse nodes subtly
    const t = state.clock.elapsedTime
    nodeRefs.current.forEach((mesh, i) => {
      if (!mesh) return
      const s = 1 + Math.sin(t * 1.6 + phases[i]) * 0.08
      mesh.scale.setScalar(s)
    })
  })

  return (
    <group ref={groupRef}>
      {/* Edges */}
      {edges.map((e, i) => (
        <Line
          key={`edge-${i}`}
          points={[e.from.position, e.to.position]}
          color={LAYER_COLORS[e.from.layer]}
          lineWidth={1}
          transparent
          opacity={0.18}
          dashed={false}
        />
      ))}

      {/* Nodes */}
      {flatNodes.map((node, i) => (
        <mesh
          key={`node-${i}`}
          ref={(el) => {
            nodeRefs.current[i] = el
          }}
          position={node.position}
        >
          <sphereGeometry args={[0.13, 20, 20]} />
          <meshStandardMaterial
            color={LAYER_COLORS[node.layer]}
            emissive={LAYER_EMISSIVE[node.layer]}
            emissiveIntensity={2.4}
            toneMapped={false}
            roughness={0.4}
            metalness={0.1}
          />
        </mesh>
      ))}
    </group>
  )
}

/* ----------------------------------------------------------------- *
 *  Public component                                                  *
 * ----------------------------------------------------------------- */
export default function NeuralNetwork3D() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.35} />
        <pointLight position={[6, 4, 6]} intensity={0.6} color="#a78bfa" />
        <pointLight position={[-6, -4, 4]} intensity={0.4} color="#2dd4bf" />
        <NeuralScene />
      </Canvas>
    </div>
  )
}
