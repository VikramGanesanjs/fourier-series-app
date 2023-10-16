import React, { useEffect, useState } from 'react'
import useInterval from '../hooks/useInterval';
import { distance } from '../utils/distance';
import Circle from './Circle';
import Line from './Line';

interface RotatingRadiusProps {
  x: number,
  y: number,
  freq: number,
  amp: number,
  phase: number, 
  time: number,
  children?: JSX.Element
}

export default function RotatingRadius({x, y, freq, amp, time, phase, children} : RotatingRadiusProps) {


  return (
    <>
    <Circle x={x} y={y} radius={amp} color="#000000">
      <>
      <Line sx={amp} sy={amp} ex={amp * Math.cos(freq * time + phase)} ey={amp * Math.sin(freq * time + phase)} color="#000000" distanceValue={amp}/>
      {children}
      </>
    </Circle>
    </>
  )
}
