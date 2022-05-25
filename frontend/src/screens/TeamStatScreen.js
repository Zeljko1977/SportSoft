import React, { useState, useEffect } from 'react'
import { Card, Form, Button, Row, Col } from 'react-bootstrap'
import Pdf from 'react-to-pdf'
import {
  ComposedChart,
  Line,
  BarChart,
  Label,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ReferenceLine,
  ReferenceArea,
} from 'recharts'
import axios from 'axios'
import './ReportsScreen.css'

const ref = React.createRef()
const options = {
  orientation: 'landscape',
  unit: 'mm',
  format: [500, 300],
}

const TeamStatScreen = () => {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [param, setParam] = useState('')
  const [dataForCharts, setDataForCharts] = useState([])
  const [maxValue, setMaxValue] = useState(0)
  useEffect(() => {}, [])

  const handleStartDate = (e) => {
    console.log(e.target.value)
    setStartDate(e.target.value)
  }

  const handleEndDate = (e) => {
    console.log(e.target.value)
    setEndDate(e.target.value)
  }

  const handleChangeParam = (e) => {
    setParam(e.target.value)
  }

  const getStats = async () => {
    const dataToSend = { startDate, param, endDate }
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(`/api/data/teamstats`, dataToSend, config)
    console.log(data)

    let max = 0
    data.forEach((stat) => {
      if (Number(stat.param) > max) {
        max = Number(stat.param)
      }
      console.log(max)
    })
    setMaxValue(max)
    setDataForCharts(data)
  }

  return (
    <>
      <div>ReportsScreen</div>
      <Pdf targetRef={ref} filename='code-example.pdf' options={options}>
        {({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>}
      </Pdf>
      <div ref={ref}>
        <div className='menu'>
          <div>
            <Form.Label>Param</Form.Label>
            <Form.Control
              as='select'
              name='param'
              value={param}
              onChange={handleChangeParam}
            >
              <option>Choose...</option>
              <option value='totalDistance'>Total Distance</option>
              <option value='highRunningDistance'>High Running Distance</option>
              <option value='sprintDistance'>Sprint Distance</option>
              <option value='accelerations'>Acceleration</option>
              <option value='deccelerations'>Deceleration</option>
              <option value='metersPerMinute'>Meters per Minute</option>
              <option value='highMetabolicPowerEfforts'>
                High Metabolic Power Efforts
              </option>
            </Form.Control>
          </div>

          <div>
            <Form.Group controlId='startDate'>
              <Form.Label>Selektuj start datum</Form.Label>
              <Form.Control
                type='date'
                name='startDate'
                value={startDate}
                onChange={handleStartDate}
              ></Form.Control>
            </Form.Group>
          </div>
          <div>
            <Form.Group controlId='endDate'>
              <Form.Label>Selektuj end datum</Form.Label>
              <Form.Control
                type='date'
                name='startDate'
                value={endDate}
                onChange={handleEndDate}
              ></Form.Control>
            </Form.Group>
          </div>
          <div>
            <Button
              style={{ width: '30px' }}
              onClick={getStats}
              className='w-100 mt-5'
            >
              Get stats
            </Button>
          </div>
        </div>

        {dataForCharts.length !== 0 && (
          <ComposedChart
            width={1800}
            height={500}
            data={dataForCharts}
            barGap={2}
            margin={{
              top: 50,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            //layout='vertical'
            barCategoryGap='20%'
          >
            <CartesianGrid strokeDasharray='3 3' />

            <YAxis type='number' domain={[0, maxValue]} />
            <XAxis
              width={440}
              dataKey='datum'
              type='category'
              /*  label={{
              value: `${param} stat`,
              angle: 0,
              position: 'insideTopLeft',
            }} */
            />

            <Tooltip />

            {/* <Bar dataKey='average' fill='#ff5050' /> */}
            <Bar dataKey='param' fill='#ff66ff' />
            {/* <Line
            type='monotone'
            dataKey='param'
            stroke='#ff7300'
            strokeWidth={6}
          /> */}
          </ComposedChart>
        )}
      </div>
    </>
  )
}

export default TeamStatScreen
