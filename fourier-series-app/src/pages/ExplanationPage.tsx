import React, {useState} from 'react'
import {Box, Typography, Link, Slider} from '@mui/material';
import { useNavigate } from 'react-router-dom'
import useInterval  from '../hooks/useInterval';
import { Stage, Layer, Circle, Line} from 'react-konva'

export default function ExplanationPage() {
  const navigate = useNavigate()
  const [time, setTime] = useState(0)
  const [freq, setFreq] = useState(1)
  const [cosWave, setCosWave] = useState<number[]>([])
  const [sinWave, setSinWave] = useState<number[]>([])
  const [flatCos, setFlatCos] = useState<number[]>([])
  const [flatSin, setFlatSin] = useState<number[]>([])


  useInterval(() => {
    setTime(time + 0.01)
    let copyCos = [...cosWave]
    copyCos.unshift(100 * Math.cos(2 * Math.PI * freq * time))
    if(copyCos.length > 500){
      copyCos.splice(500)
    }
    setCosWave(copyCos)
    let copySin = [...sinWave]
    copySin.unshift(100 * Math.sin(2 * Math.PI * freq * time))
    if(copySin.length > 500){
      copySin.splice(500)
    }
    let flat:number[] =  []
    copyCos.forEach((value, index) => {
      flat.push(index * 4)
      flat.push(250 + value)
    })
    setFlatCos(flat)
    flat =  []
    copySin.forEach((value, index) => {
      flat.push(index * 4)
      flat.push(250 + value)
    })
    setFlatSin(flat)
    setSinWave(copySin)
  }, 10)

  return (
    <Box sx={{position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'auto',
    p: 0,
    m: 0,}}>
      <Box sx={{display: 'flex', flexDirection: 'column', gap: 2, p: 2, height: '200vh'}}>
      <Typography variant="h1">
        What is Fourier Series?
      </Typography>
      <Link onClick={() => navigate("/")}>
        Return to interactive Demo
      </Link>
      <Typography variant="h2" textAlign="left">
        Fourier series is the principle that any given wave can be described as a sum of sinusoidal waves with varying frequencies and amplitudes. 
      </Typography>
      <Typography variant="h2" textAlign="left">
        This principle has tons of applications, from describing quantum mechanical systems to processing audio waveforms and creating high quality music.
      </Typography>
      <Box sx={{display: 'flex', flexDirection: 'row', gap: 2, justifyContent: 'center'}}>
      <Stage width={500} height={500} style={{border: '10px solid #000000'}}>
        <Layer>
          <Circle x={250} y={250} radius={100} stroke="black" strokeWidth={2} fill="white" />
          <Line x={0} y={0} points={[250, 250, 250 + 100 * Math.cos(freq * 2 * Math.PI * time), 250 + 100 * Math.sin(freq * 2 * Math.PI * time)]} stroke="black" strokeWidth={2} />
        </Layer>
      </Stage>
      <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
      <Typography>
        Change the frequency of the oscillation using this slider
      </Typography>
      <Slider
        size="small"
        defaultValue={freq}
        aria-label="Small"
        onChange={(e, value) => setFreq(value as number)}
        valueLabelDisplay="auto"
        />
        </Box>
        <Box sx={{ flexDirection: 'column', display:'flex'}}>
          <Typography variant="subtitle1">
            Red=sin, Black=cos, 
          </Typography>
        <Stage width={500} height={500} style={{border: '10px solid #000000'}}>
        <Layer>
          <Line points={flatCos} stroke="black" strokeWidth={2} />
          <Line points={flatSin} stroke="red" strokeWidth={2} />
        </Layer>
      </Stage>
      </Box>
      </Box>
      <Typography variant="h2" textAlign="left">
        In the case of this demo, each circle with a rotating line represents a cosine and sine wave with the same frequency. The y-position of the end of the line is 
        a sine wave and the x-position is a cosine wave. As we add up these circles with different frequencies, we can draw any picture we want; the only thing we have to figure out is 
        the radii of each circle, corresponding to the amplitudes of the waves and the coefficients of the fourier series. The formula below shows the fourier series, and we need to find the 
        coefficients, a-sub-n and b-sub-n to draw a specific picture. 
      </Typography>
      <Box>
      <img src="/formula.png" style={{ height: '400'}}>
      </img>
      </Box>
      <Typography variant="h2" textAlign="left">
        The way that we do this is we take what is called a fourier transform of the picture we want to draw, and it will give us all of the needed coefficients 
        for our fourier series so that we can draw the picture. The formula for a discrete fourier transform is below, and since we are drawing 2-dimensional pictures, 
        we will need to use complex numbers and Euler's formula to get the coefficients. 
      </Typography>
      <Box>
      <img src="/dft-formula.png" style={{ height: '400'}}>
      </img>
      </Box>
      <Typography variant="h2" textAlign="left">
      Using this formula for all X-sub-n = (x, y) points in the path of the picture we are trying to draw
        we get a list of points, X-sub-k. By using the distance formula on the real and complex parts of X-sub-k [amplitude = sqrt(re^2 + im^2)], we get the amplitude of a circle in the fourier series. The frequency of 
        that circle will just be k, and the phase will be the angle that the complex vector makes with the horizontal. From there, for every X-sub-k, we can 
        create a circle with the desired properties, and add them together, creating our perfect picture!
      </Typography>

      <Typography>
        For more comprehensive resources on this topic, I would recommend watching the amazing videos made by 3Blue1Brown and 
        theCodingTrain, as they really explain it well!
      </Typography>
      <Box sx={{flexDirection: 'row', display: 'flex', justifyContent: 'center', gap: 4}}>
      <Link href="https://www.youtube.com/watch?v=MY4luNgGfms">
        The Coding Train Video - Drawing with Fourier Series
      </Link>
      <Link href="https://www.youtube.com/watch?v=r6sGWTCMz2k">
        3Blue1Brown Video - Fourier Series
      </Link>
      </Box>
      <Link onClick={() => navigate("/")}>
        Return to interactive demo!
      </Link>
      </Box>
    </Box>
  )
}
