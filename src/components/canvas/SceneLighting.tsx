export function SceneLighting() {
  return (
    <>
      {/* Sun point light - primary illumination, boosted intensity + range */}
      <pointLight
        position={[0, 0, 0]}
        intensity={25}
        color="#FFF5E0"
        distance={500}
        decay={1.0}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-far={500}
      />
      {/* Secondary fill from opposite side so dark hemispheres aren't pitch black */}
      <pointLight
        position={[0, 0, 0]}
        intensity={4}
        color="#FFF5E0"
        distance={500}
        decay={1.0}
      />
      {/* Ambient — raised so planets are readable against the starfield */}
      <ambientLight intensity={0.35} color="#1A2A4A" />
      {/* Hemisphere for subtle deep-space toning */}
      <hemisphereLight args={['#1A2A4A', '#000000', 0.4]} />
    </>
  )
}
