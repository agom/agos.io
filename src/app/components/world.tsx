'use client'

import * as THREE from 'three'
import React, { useRef, useState } from 'react'
import { Canvas, ThreeElements, useFrame } from '@react-three/fiber'
import { CameraControls } from '@react-three/drei';


function Sphere(props: ThreeElements['mesh']) {
    const meshRef = useRef<THREE.Mesh>(null!)

    useFrame((state) => (meshRef.current.rotation.y += 0.001));
    return (<mesh
        {...props}
        ref={meshRef}>
        <sphereGeometry args={[2, 32]} />
        <meshStandardMaterial color={"royalblue"} transparent={true} opacity={1} wireframe={true} />
    </mesh>)
}

function Box(props: ThreeElements['mesh']) {
    const meshRef = useRef<THREE.Mesh>(null!)
    const [hovered, hover] = useState(false);
    const [clicked, click] = useState(false);

    useFrame((state) => (meshRef.current.rotation.x += 0.001));
    return (<mesh
        {...props}
        ref={meshRef}
        scale={clicked ? 1.5 : 1}
        onClick={(event) => click(!clicked)}
        onPointerOver={(event) => hover(true)}
        onPointerOut={(event) => hover(false)}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
    )
}


export default function World() {
    const cameraControlRef = useRef<CameraControls | null>(null);

    return (
        <Canvas>
            <CameraControls ref={cameraControlRef} />
            <ambientLight intensity={1} />
            <directionalLight />
            <pointLight position={[1, 1, 1]} />
            <Sphere />
            <Box position={[-2.25, 0, 0]} />
            <Box position={[2.25, 0, 0]} />
        </Canvas>
    )
}
