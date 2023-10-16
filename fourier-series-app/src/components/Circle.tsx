import React from 'react'

interface CircleProps {
  x: number,
  y: number,
  radius: number,
  color: string,
  filled?: boolean,
  fillColor?: string,
  children?: JSX.Element
  borderWidth?: number,
}

export default function Circle({x, y, radius, color, filled, fillColor, children, borderWidth}: CircleProps){
  return (
    <div style={{
      position: 'absolute',
      top: y - radius,
      left: x - radius,
      width: 2 * radius,
      height: 2 * radius,
      borderRadius: "50%",
      borderColor: color,
      backgroundColor: filled ? fillColor : undefined,
      borderWidth: borderWidth ?? "thick",
      borderStyle: "solid",
    }}>
      {children}
    </div>
  )
}
