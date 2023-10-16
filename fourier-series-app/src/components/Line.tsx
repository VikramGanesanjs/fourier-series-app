import React, { useEffect, useState } from 'react'
import { distance } from './../utils/distance';

interface LineProps{
  sx: number,
  sy: number,
  ex: number,
  ey: number,
  width?: number,
  color?: string,
  children?: JSX.Element,
  distanceValue?: number,
}

export default function Line({sx, sy, ex, ey, width, color, children, distanceValue} : LineProps){

  const [dist, setDist] = useState(distance(sx, ex, sy, ey))
  const angleRad = Math.atan2(ey, ex)
  const angleDeg = angleRad * 180 / Math.PI
  const [noRotate, setNoRotate] = useState(false)
  

  useEffect(() => {
    if(sy === ey){
    setNoRotate(true)
    setDist(ex-sx)
    }
  }, [sx, ex, sy, ey])

  return (
  <div style={{
    height: width ?? 2,
    width: distanceValue ?? dist,
    backgroundColor: color ?? "#000000",
    position: 'absolute',
    top: sy,
    left: sx,
    transformOrigin:`0% 0%`,
    transform: !noRotate ? `rotate(${angleDeg}deg)`: undefined,
  }}>
    {children}
  </div>
  );
}
