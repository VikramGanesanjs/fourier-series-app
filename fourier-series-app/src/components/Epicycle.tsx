import React, { useState } from 'react'
import useInterval from '../hooks/useInterval'
import useWindowDimensions from '../hooks/useWindowDimensions'
import { Box } from '@mui/material'
import { Stage, Layer, Circle, Line, Shape } from 'react-konva'


interface EpicycleProps {
  x: number,
  y: number,
  width: number,
  height: number, 
  fourier: {amp: number, freq: number, phase: number}[]
  fps: number
  dt: number
  pause: boolean
  draw: boolean
}

export default function Epicycle({x, y, fourier, fps, dt, pause, width, height, draw} : EpicycleProps) {

  const [time, setTime] = useState(0)
  const [ygraph, setYGraph]= useState<number[]>([])
  const [xgraph, setXGraph] = useState<number[]>([])
  const [formattedGraph, setFormattedGraph] = useState<number[]>([])


  const totalPos = () => {
    let sum = [x, y]
    fourier.map((fourierObj, idx) => {
      sum[0] += fourierObj.amp * Math.cos(fourierObj.freq * time + fourierObj.phase)
      sum[1] += fourierObj.amp * Math.sin(fourierObj.freq * time + fourierObj.phase)
    })
    return sum; 
  }

  useInterval(() => {
    if(!pause) {
    setTime(time + dt)
    if(time > 2 * Math.PI){
      setTime(0)
      setYGraph([])
      setXGraph([])
      setFormattedGraph([])
    }
    else{
      let yval = totalPos()[1]
    let xval = totalPos()[0]
    let newYGraph= [...ygraph]
    let newXGraph = [...xgraph]
    newXGraph.unshift(xval)
    newYGraph.unshift(yval)
    setXGraph(newXGraph)
    setYGraph(newYGraph)
    let formattedGraph2 = []
    xgraph.forEach((x, idx) => {
      formattedGraph2.push(x)
      formattedGraph2.push(ygraph[idx])
    })
    setFormattedGraph(formattedGraph2)
    }
    
    }
  }, 1000/fps)
  
  let sum = [x, y]
  if(draw){
    return (
   
      <Layer>
      {fourier.map((fourierObj, idx) => {
        const [prevX, prevY] = [sum[0], sum[1]]
        sum[0] += fourierObj.amp * Math.cos(fourierObj.freq * time + fourierObj.phase)
        sum[1] += fourierObj.amp * Math.sin(fourierObj.freq * time + fourierObj.phase)
        return (
          <>
          <Circle radius={fourierObj.amp} x={prevX} y={prevY} stroke="black" strokeWidth={1} fill="white"/>
          <Line points={[prevX, prevY, sum[0], sum[1]]} stroke="black" strokeWidth={1} fill="black" />
          </>
        )
      })}
        <Line
              points={formattedGraph}
              fill="#ffffff"
              stroke="red"
              strokeWidth={4}
            />
      </Layer>
    )
  }
  return <></>
  
}
