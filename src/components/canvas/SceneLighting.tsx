export function SceneLighting() {
  return (
    <>
      {/* Sun point light - primary illumination */}
      <pointLight
        position={[0, 0, 0]}
        intensity={8}
        color="#FFF5E0"
        distance={300}
        decay={1.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-far={300}
      />
      {/* Soft ambient for dark side visibility */}
      <ambientLight intensity={0.08} color="#0A1628" />
      {/* Subtle hemisphere for deep space feel */}
      <hemisphereLight
        args={['#0D1B2A', '#000000', 0.15]}
      />
      {/* Secondary fill light from opposite direction */}
      <directionalLight
        position={[-100, 50, -100]}
        intensity={0.05}
        color="#1A3A5C"
      />
    </>
  )
}
