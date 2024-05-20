import { Environment, OrbitControls, Sky } from "@react-three/drei";

export const Experience = () => {
  return (
    <>
      <OrbitControls />

      <mesh>
        <boxGeometry />
        <meshNormalMaterial />
      </mesh>
      <mesh position={[1, 2, 3]}>
        <boxGeometry />
        <meshNormalMaterial />
      </mesh>
    </>
  );
};
