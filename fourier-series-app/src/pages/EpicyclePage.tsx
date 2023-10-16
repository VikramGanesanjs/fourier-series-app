import React, { useState, useRef } from 'react'
import useWindowDimensions from '../hooks/useWindowDimensions'
import { Button, Box, Slider, Typography, FormControl, InputLabel, Select, MenuItem, Link} from '@mui/material'
import Epicycle from '../components/Epicycle'
import { dft } from '../utils/distance'
import { skullPath } from '../utils/skull'
import { squarePath } from '../utils/square'
import { Stage, Line, Layer } from 'react-konva'
import { useNavigate } from 'react-router-dom'

interface DFT {
  freq: number,
  amp: number,
  phase: number,
  x: any, 
  y: any,
}

export default function EpicyclePage() {

  const navigate = useNavigate()
  const { width, height } = useWindowDimensions()
  const [pause, setPause] = useState(true)
  const [points, setPoints] = useState<number[][]>([]);
  const [drawEpicycle, setDrawEpicycle] = useState(false)
  const isDrawing = useRef(false);
  const [fourier, setFourier] = useState<DFT[]>([]);
  const [flattenedPoints, setFlattenedPoints] = useState<number[]>([])
  const [fps, setFPS] = useState(60)
  const [mode, setMode] = useState("Draw")

  const handleMouseDown = (e) => {
    if(drawEpicycle){
      return
    }
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    let copy = [...points]
    copy.push([pos.x, pos.y])
    setPoints(copy);
  };

  const preProcessPoints = (points, epicycleWidth, epicycleHeight, removeStep) =>  {
    const points2 = points.map((point, idx) => {
      let x = point[0] - epicycleWidth/2;
      let y = point[1] - epicycleHeight/2;
      return [x,y]
    })
    points2.forEach((point, idx) => {
      if(idx % removeStep === 0){
        points2.splice(idx, 1)
      }
    })
    return points2
  }

  const handleMouseMove = (e) => {
    if(drawEpicycle){
      return
    }
    if (!isDrawing.current) {
      return;
    }
    const pos = e.target.getStage().getPointerPosition();
    let copy = [...points]
    copy.push([pos.x, pos.y])
    setPoints(copy);
    console.log(pos)
    let flattenedPoints2 = [];
    [...points].forEach((point) => {
      flattenedPoints2.push(point[0]);
      flattenedPoints2.push(point[1]);
    });
    setFlattenedPoints(flattenedPoints2)
  };

  const handleMouseUp = () => {
    if(drawEpicycle){
      return
    }
    isDrawing.current = false;
    let flattenedPoints2 = [];
    [...points].forEach((point) => {
      flattenedPoints2.push(point[0]);
      flattenedPoints2.push(point[1]);
    });
    setFlattenedPoints(flattenedPoints2)
    console.log(dft(preProcessPoints(points, SKULL_EPICYCLE_WIDTH, SKULL_EPICYCLE_HEIGHT, 2)))
    setFourier(dft(preProcessPoints(points, SKULL_EPICYCLE_WIDTH, SKULL_EPICYCLE_HEIGHT, 2)));
    setDrawEpicycle(true);
  };

  const SKULL_EPICYCLE_WIDTH = 500
  const SKULL_EPICYCLE_HEIGHT = 500

  function grabSkull(reduction, padding){
    let skullPathString = skullPath;
    let skullPath2 = skullPathString.split("\n");
    let skull = [];
    for(let i = 0; i < skullPath2.length; i++){
      let coords = skullPath2[i].split(",");
      skull.push([parseFloat(coords[0])/reduction + padding, (parseFloat(coords[1]))/reduction + padding])
    }
    skull.splice(1135)
    console.log(skull)
    return skull;
  }
  function grabSquare(reduction, padding){
    let squarePathString = squarePath;
    let squarePath2 = squarePathString.split("\n");
    let square = [];
    for(let i = 0; i < squarePath2.length; i++){
      let coords = squarePath2[i].split(",");
      square.push([parseFloat(coords[0])/reduction + padding, (parseFloat(coords[1]))/reduction + padding])
    }
    square.splice(1135)
    console.log(square)
    return square;
  }

  function handleModeChange(e){
    setMode(e.target.value)
    if(e.target.value == "Skull"){
      
      setFourier(dft(preProcessPoints(grabSkull(2, 0), SKULL_EPICYCLE_WIDTH, SKULL_EPICYCLE_HEIGHT, 2)))
      setDrawEpicycle(true)
    }
    if(e.target.value == "Square"){
      setFourier(dft(preProcessPoints(grabSquare(2, 0), SKULL_EPICYCLE_WIDTH, SKULL_EPICYCLE_HEIGHT, 2)))
      setDrawEpicycle(true)
    }
  }
  
  
  
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', gap: 2, width: '100%', height: '100%', alignItems: 'center',p: 0,}}>
      <Typography variant="h1" fontSize={50}>
        Fourier Series Interactive Demo
      </Typography>
      <Typography variant="subtitle1">
        First select a mode. If you select the drawing mode, draw a picture in the box below and then click play. Otherwise, press play and watch the animation!
      </Typography>
      <Link onClick={() => navigate("/about")}>
        <Typography variant="subtitle2">
          For an explanation of why this works, visit this page
        </Typography>
      </Link>
      <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Mode</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={mode}
    label="Mode"
    onChange={handleModeChange}
  >
    <MenuItem value={"Draw"}>Draw</MenuItem>
    <MenuItem value={"Skull"}>Skull</MenuItem>
    <MenuItem value={"Square"}>Square</MenuItem>
  </Select>
</FormControl>
      <Typography variant="h2" fontSize={50}>
          {!drawEpicycle && mode == "Draw" ? `Draw a picture using your mouse!` : `Watch the animation!`}
      </Typography>
      <Typography>
        Change Frames Per Second (Speed of animation)
      </Typography>
      <Slider
        size="small"
        defaultValue={fps}
        aria-label="Small"
        onChange={(e, value) => setFPS(value)}
        valueLabelDisplay="auto"
        />
      <Box sx={{flexDirection: 'row'}} >
      <Button onClick={()=> setPause(!pause)} disabled={!drawEpicycle && mode == "Draw"}>
        {`${pause ? "Play" : "Pause"}`}
      </Button>
      <Button onClick={() => location.reload()} disabled={!drawEpicycle && mode == "Draw"}>
        Reset
      </Button>
      </Box>
      <Box sx={{border: '5px solid #000000', width: SKULL_EPICYCLE_WIDTH, height: SKULL_EPICYCLE_HEIGHT}}>

   <Stage width={SKULL_EPICYCLE_WIDTH} height={SKULL_EPICYCLE_HEIGHT} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseMove={handleMouseMove}>
      
        <Layer>
        <Line points={flattenedPoints}
        fill="#000000"
        stroke="black"
        strokeWidth={4}/>
        </Layer>
      <Epicycle draw={drawEpicycle} width={SKULL_EPICYCLE_WIDTH} height={SKULL_EPICYCLE_HEIGHT} x={SKULL_EPICYCLE_WIDTH/2} y={SKULL_EPICYCLE_HEIGHT/2} 
      fourier={fourier} fps={fps} dt={2 * Math.PI / fourier.length} pause={pause}/>  
      
   </Stage>
   </Box>
      </Box>
    
  )
}
