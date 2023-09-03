'use client'

import * as THREE from 'three'
import React, { useRef, useState, useEffect } from 'react'
import { Canvas, ThreeElements, useFrame, useThree } from '@react-three/fiber'
import { Bounds, useBounds, OrbitControls, RoundedBox } from '@react-three/drei';

function SelectToZoom({ children }: ThreeElements['mesh']) {
    const bounds = useBounds()
    return (
        <group
            onClick={(e) => (e.stopPropagation(), e.delta <= 2 && bounds.refresh(e.object).fit())}
            onPointerMissed={(e) => e.button === 0 && bounds.refresh().fit()}>
            {children}
        </group>
    )
}

function Sphere(props: ThreeElements['mesh']) {
    const meshRef = useRef<THREE.Mesh>(null!)

    return (<mesh
        {...props}
        ref={meshRef}>
        <sphereGeometry args={[1, 32]} />
        <meshStandardMaterial color={"royalblue"} transparent={true} opacity={1} wireframe={true} />
    </mesh>)
}

function Box(props: ThreeElements['mesh']) {
    const meshRef = useRef<THREE.Mesh>(null!)
    const [hovered, hover] = useState(false);
    const [clicked, click] = useState(false);

    return (<RoundedBox
        {...props}
        ref={meshRef}
        //scale={clicked ? 1.5 : 1}
        onClick={(event) => click(!clicked)}
        onPointerOver={(event) => hover(true)}
        onPointerOut={(event) => hover(false)}
        args={[0.25, 0.25, 0.25]}>
        <meshStandardMaterial color={hovered ? 'hotpink' : 'yellow'} />
    </RoundedBox>
    )
}


export default function World() {
    const position = 1.125;
    return (
        <Canvas>
            <OrbitControls makeDefault />
            <ambientLight intensity={1} />
            <directionalLight />
            <pointLight position={[1, 1, 1]} />
            <Sphere />
            <Bounds fit clip observe margin={1.5}>
                <SelectToZoom>
                    <Box position={[0, 0, -position]} />
                    <Box position={[0, 0, position]} />
                    <Box position={[0, -position, 0]} />
                    <Box position={[0, position, 0]} />
                    <Box position={[-position, 0, 0]} />
                    <Box position={[position, 0, 0]} />
                </SelectToZoom>
            </Bounds>
        </Canvas>
    )
}
