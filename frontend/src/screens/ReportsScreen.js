import React, { useState, useEffect } from 'react'
import { Card, Form, Button, Row, Col } from 'react-bootstrap'
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

const ReportsScreen = () => {
  const [players, setPlayers] = useState([])
  const [startDate, setStartDate] = useState('')
  const [param, setParam] = useState('')
  const [percentage, setPercentage] = useState('')
  const [dataForCharts, setDataForCharts] = useState([])
  const [maxValue, setMaxValue] = useState(0)
  useEffect(() => {
    axios.get('/api/data/players').then((res) => {
      setPlayers(res.data)
    })
  }, [])

  const handleStartDate = (e) => {
    console.log(e.target.value)
    setStartDate(e.target.value)
  }

  const handleChangeParam = (e) => {
    setParam(e.target.value)
  }

  const handlePercentage = (e) => {
    setPercentage(e.target.value)
  }

  const getStats = async () => {
    const dataToSend = { players, startDate, param, percentage }
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const config1 = {
      headers: {
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0NjFiMTExMS02ZjdhLTRkYmItOWQyOS0yMzAzOWZlMjI4OGUiLCJqdGkiOiIxMDM0OWU3NGZkNGYyMzQyMDRlY2Y0N2QzZmUzNmQ5NzhmYzk4ZWI3YjcyMWRhNDE4ZTRmZTQwMDU2ZDU5NWY5YjNmYWVmNTAxYzUyMmQxMiIsImlhdCI6MTY1MDYxNDk0MCwibmJmIjoxNjUwNjE0OTQwLCJleHAiOjQ4MDQyMTg1NDAsInN1YiI6IjJlOWJkNDhlLWNhNTktNDgwZi04NDYyLWQ1ZDMyMWM2OGEwNyIsInNjb3BlcyI6WyJhY3Rpdml0aWVzLXVwZGF0ZSIsImFubm90YXRpb25zLXVwZGF0ZSIsImF0aGxldGVzLXVwZGF0ZSIsImNvbm5lY3QiLCJzZW5zb3ItcmVhZC1vbmx5IiwidGFncy11cGRhdGUiXX0.RyG3Vs8TED8XeehxELL84vDrx1XvEAlBjXk-bjnd__mcIkuJvt3XqAa9HooATP6Ab0trZ0K8x_Tak57XjiMHwTMKVpW6h7uxGlF0BW_vf_gAHQAJWaYovdKqPjF0o5Ljt_hbaUEd_X-2Jc3K3i-oNAyYe5Akm3U9N4Y1CujmcE1qZCd3pMccOCMHLB6Pe8pRi_3GAplV3p2OICbgoaPJguP-wYjgOxy6NAxg6gISLOlBB_GY0LHmj7CClvdzwVrqP7cYAyZdYq9uFw-M5DU4KyHIGpYvoECHni7MTBoGzy3PRkU5PQ0d125KQk27KicuS6Xwod5Uww9JEJ_ffGDj4RWk5hngR7OiApJiGq4T6DvyJr6GlYPjFNdAJkKhMpDozEnOexEWB1GiYE3nfYYw_RTagw9FUWM5KW-b67pEUQZBti6bGpKvIsT5eQSnD0NWC-Gog6RQWttDjNX_O8ahSAugb6Yknd0EWnZQKj-6EAUDT6PAzh1pQnuXVlFj7UYSLdBY2S2apRpKTtyGz2Vk2supM9OxDO5HI9BOt4WoYbJxMKNgvGX-Eg3jNAzxzPwOOvi1GXxwv7GrqY0ZI58xLFwdMskF2abOGxyCIzrnNmClrRjIb24B8zdTyMFB0LHdyf5LfT-lJwxq2Zrc3e6QE6PxRx6myi6tQ8sO8GvTY8I`,
      },
    }
    const pack = {
      filters: [
        {
          name: 'activity_id',
          comparison: '=',
          values: [
            'c7b08c0a-d6a6-487a-9967-3e4451e9bd75',
            'b52e1c1d-7033-438e-a9a3-26f9d8ed986b',
          ],
        },
      ],
      parameters: ['total_player_load', 'total_duration', 'total_distance'],
      group_by: ['activity', 'athlete'],
    }
    const { data } = await axios.post(`/api/data/stats`, dataToSend, config)
    console.log(data)
    const { data: data1 } = await axios.post(
      `https://connect-eu.catapultsports.com/api/v6/stats`,
      pack,
      config1
    )
    console.log(data1)
    const { data: data2 } = await axios.get(
      `https://connect-eu.catapultsports.com/api/v6/activities?startTime=1640995200&endTime=1651363199`,

      config1
    )
    console.log(data2)
    const { data: data3 } = await axios.get(
      `https://connect-eu.catapultsports.com/api/v6/parameters`,

      config1
    )
    console.log(data3)
    let max = 0
    data.forEach((stat) => {
      if (Number(stat.average) > max) {
        max = Number(stat.average)
      }
      if (Number(stat.best) > max) {
        max = Number(stat.best)
      }
      if (stat.current > max) {
        max = stat.current
      }
      console.log(max)
    })
    setMaxValue(max)
    setDataForCharts(data)
  }

  return (
    <>
      <div>ReportsScreen</div>
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
          <Form.Label>MD</Form.Label>
          <Form.Control as='select' name='md'>
            <option>Choose MD...</option>
            <option value='MD-4'>MD-4</option>
            <option value='MD-3'>MD-3</option>
            <option value='MD-2'>MD-2</option>
            <option value='MD-1'>MD-1</option>
          </Form.Control>
        </div>
        <div>
          <Form.Label>Percentage</Form.Label>
          <Form.Control
            as='input'
            name='md'
            value={percentage}
            placeholder='enter percentage'
            onChange={handlePercentage}
          ></Form.Control>
        </div>
        <div>
          <Form.Group controlId='startDate'>
            <Form.Label>Selektuj datum</Form.Label>
            <Form.Control
              type='date'
              name='startDate'
              value={startDate}
              onChange={handleStartDate}
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
          width={1200}
          height={players.length * 80}
          data={dataForCharts}
          barGap={2}
          margin={{
            top: 50,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          layout='vertical'
          barCategoryGap='20%'
        >
          <CartesianGrid strokeDasharray='3 3' />

          <XAxis type='number' domain={[0, maxValue]} />
          <YAxis
            width={440}
            dataKey='name'
            type='category'
            label={{
              value: `${param} stat`,
              angle: 0,
              position: 'insideTopLeft',
            }}
          />

          <Tooltip />

          <Bar dataKey='best' fill='#8884d8' />
          {/* <Bar dataKey='average' fill='#ff5050' /> */}
          <Bar dataKey='current' fill='#ff66ff' />
          <Line
            type='monotone'
            dataKey='average'
            stroke='#ff7300'
            strokeWidth={6}
          />
        </ComposedChart>
      )}
    </>
  )
}

export default ReportsScreen
