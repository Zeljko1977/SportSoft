import dbSql from '../database/db.js'
import axios from 'axios'
import queryPromise from '../database/promise.js'

function ExcelDateToJSDate(date) {
  return new Date(Math.round((date - 25569) * 86400 * 1000))
}

const getData = async (req, res) => {
  console.log(req.body)
  const dataFromKatapult = req.body
  dbSql.getConnection((err, connection) => {
    if (err) throw err
    console.log('connected as id ' + connection.threadId)
    dataFromKatapult.forEach((item) => {
      // console.log(ExcelDateToJSDate(item['Date']).toISOString().slice(0, 10))
      if (item['Player Name']) {
        const query = `INSERT INTO games (datum, name, totalDistance, minutesPlayed, highRunningDistance, sprintDistance, accelerations, deccelerations, metersPerMinute, highMetabolicPowerEfforts) 
      VALUES ('${ExcelDateToJSDate(item['Date'])
        .toISOString()
        .slice(0, 10)}', '${item['Player Name']}', ${item[
          'Total Distance'
        ].replace(',', '.')}, ${item['Minutes Played']},${item[
          'High Running Distance'
        ].replace(',', '.')},${item['Sprint Distance'].replace(',', '.')}, ${
          item['Accelerations']
        }, ${item['Decelerations']}, ${item['Metres per minute'].replace(
          ',',
          '.'
        )}, ${item['High Metabolic Power Efforts']})`
        connection.query(query, (err, rows) => {
          //  connection.release()

          if (!err) {
            console.log(rows)
          } else {
            console.log(err)
          }
        })
      }
    })
  })
}

const syncData = async (req, res) => {
  const config1 = {
    headers: {
      Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0NjFiMTExMS02ZjdhLTRkYmItOWQyOS0yMzAzOWZlMjI4OGUiLCJqdGkiOiIxMDM0OWU3NGZkNGYyMzQyMDRlY2Y0N2QzZmUzNmQ5NzhmYzk4ZWI3YjcyMWRhNDE4ZTRmZTQwMDU2ZDU5NWY5YjNmYWVmNTAxYzUyMmQxMiIsImlhdCI6MTY1MDYxNDk0MCwibmJmIjoxNjUwNjE0OTQwLCJleHAiOjQ4MDQyMTg1NDAsInN1YiI6IjJlOWJkNDhlLWNhNTktNDgwZi04NDYyLWQ1ZDMyMWM2OGEwNyIsInNjb3BlcyI6WyJhY3Rpdml0aWVzLXVwZGF0ZSIsImFubm90YXRpb25zLXVwZGF0ZSIsImF0aGxldGVzLXVwZGF0ZSIsImNvbm5lY3QiLCJzZW5zb3ItcmVhZC1vbmx5IiwidGFncy11cGRhdGUiXX0.RyG3Vs8TED8XeehxELL84vDrx1XvEAlBjXk-bjnd__mcIkuJvt3XqAa9HooATP6Ab0trZ0K8x_Tak57XjiMHwTMKVpW6h7uxGlF0BW_vf_gAHQAJWaYovdKqPjF0o5Ljt_hbaUEd_X-2Jc3K3i-oNAyYe5Akm3U9N4Y1CujmcE1qZCd3pMccOCMHLB6Pe8pRi_3GAplV3p2OICbgoaPJguP-wYjgOxy6NAxg6gISLOlBB_GY0LHmj7CClvdzwVrqP7cYAyZdYq9uFw-M5DU4KyHIGpYvoECHni7MTBoGzy3PRkU5PQ0d125KQk27KicuS6Xwod5Uww9JEJ_ffGDj4RWk5hngR7OiApJiGq4T6DvyJr6GlYPjFNdAJkKhMpDozEnOexEWB1GiYE3nfYYw_RTagw9FUWM5KW-b67pEUQZBti6bGpKvIsT5eQSnD0NWC-Gog6RQWttDjNX_O8ahSAugb6Yknd0EWnZQKj-6EAUDT6PAzh1pQnuXVlFj7UYSLdBY2S2apRpKTtyGz2Vk2supM9OxDO5HI9BOt4WoYbJxMKNgvGX-Eg3jNAzxzPwOOvi1GXxwv7GrqY0ZI58xLFwdMskF2abOGxyCIzrnNmClrRjIb24B8zdTyMFB0LHdyf5LfT-lJwxq2Zrc3e6QE6PxRx6myi6tQ8sO8GvTY8I`,
    },
  }
  const { data: activities } = await axios.get(
    `https://connect-eu.catapultsports.com/api/v6/activities?startTime=954547200&endTime=${Date.now()}`,

    config1
  )

  // console.log(activities)
  const activitiesIds = activities.map((activity) => activity.id)
  // console.log(activitiesIds)
  const pack = {
    filters: [
      {
        name: 'activity_id',
        comparison: '=',
        values: activitiesIds,
      },
    ],
    parameters: [
      'total_player_load',
      'total_duration',
      'total_distance',
      'high_metabolic_power_efforts',
      'gen2_acceleration_band7plus_average_effort_count',
      'gen2_acceleration_band2plus_average_effort_count',
      'velocity_band6_average_distance_session',
      'average_player_load_session',
      'meterage_per_minute',
      'max_heart_rate',
      'velocity_band4_average_distance_session',
    ],
    group_by: ['activity', 'athlete'],
  }
  const { data: statistics } = await axios.post(
    `https://connect-eu.catapultsports.com/api/v6/stats`,
    pack,
    config1
  )
  console.log(statistics.length)

  /* statistics.forEach((item) => {
    var s = new Date(item.start_time).toLocaleDateString('en-US')
    console.log(s)
    //  console.log(item.start_time)
  }) */

  dbSql.getConnection((err, connection) => {
    if (err) throw err
    console.log('connected as id ' + connection.threadId)
    statistics.forEach((item) => {
      //console.log()
      // console.log(ExcelDateToJSDate(item['Date']).toISOString().slice(0, 10))

      const query = `INSERT INTO stat (datum, name, totalDistance, highMetabolicPowerEfforts, accelerations, deccelerations, sprintDistance, trainingLoad, metersPerMinute, sessionDuration, heartRate, activity_id, activity_name, tag, highRunningDistance) 
        VALUES (FROM_UNIXTIME(${item.start_time}), '${item.athlete_name}',${
        item.total_distance
      }, 
        ${item.high_metabolic_power_efforts}, 
        ${item.gen2_acceleration_band7plus_average_effort_count}, 
        ${item.gen2_acceleration_band2plus_average_effort_count}, 
        ${item.velocity_band6_average_distance_session},
        ${item.average_player_load_session},
        ${item.meterage_per_minute},
        ${Math.round(item.total_duration / 60)},
        ${item.max_heart_rate},
        '${item.activity_id}',
        '${item.activity_name}',
        '${activities.find((el) => el.id == item.activity_id)?.tags[0]}',
        ${item.velocity_band4_average_distance_session}
        )`
      connection.query(query, (err, rows) => {
        //  connection.release()

        if (!err) {
          //  console.log(rows)
        } else {
          console.log(err)
        }
      })
    })
  })
}

const setLoadData = async (req, res) => {
  console.log(req.body)
  const dataFromKatapult = req.body
  dbSql.getConnection((err, connection) => {
    if (err) throw err
    console.log('connected as id ' + connection.threadId)
    dataFromKatapult.forEach((item) => {
      // console.log(ExcelDateToJSDate(item['Date']).toISOString().slice(0, 10))
      if (item['Player Name']) {
        const query = `INSERT INTO katapult.load (datum, name, rpe, trainingLoad, totalDistance, sessionDuration, highRunningDistance, sprintDistance, accelerations, deccelerations, metersPerMinute, highMetabolicPowerEfforts) 
        VALUES ('${ExcelDateToJSDate(item['Date'])
          .toISOString()
          .slice(0, 10)}', '${item['Player Name']}', ${item['RPE']}, ${
          item['Load (AU)']
        },
           ${item['Total Distance']}, ${item['Session Duration']}, ${
          item['High Speed Running']
        },
        ${item['Sprint Distance']}, ${item['Accelerations']}, ${
          item['Decelerations']
        }, 
        ${item['Metres per minute']}, ${item['High Metabolic Power Efforts']})`

        connection.query(query, (err, rows) => {
          //  connection.release()

          if (!err) {
            console.log(rows)
          } else {
            console.log(err)
          }
        })
      }
    })
  })
}

const getPlayers = async (req, res) => {
  console.log(req.body)
  const dataFromKatapult = req.body
  dbSql.getConnection((err, connection) => {
    if (err) throw err
    console.log('connected as id ' + connection.threadId)
    const query = `SELECT DISTINCT name FROM games`

    connection.query(query, (err, rows) => {
      //  connection.release()

      if (!err) {
        console.log(rows)
        console.log('upao')
        res.send(rows)
      } else {
        console.log(err)
      }
    })
  })
}

const getStats = async (req, res) => {
  //  console.log(req.body)
  const { players, startDate, param, percentage } = req.body
  const percent = percentage ? percentage / 100 : 1
  console.log('percentage: ', percentage, 'percent: ', percent)
  try {
    // here are results of database queries
    let results = []
    players.forEach(async (player, index) => {
      /*       let query1 = `SELECT MAX(${param}) AS best, AVG(${param}) AS average FROM games WHERE name = '${player.name}'`
      let query2 = `SELECT SUM(${param}) as param FROM katapult.load WHERE name = '${player.name}' AND datum = '${startDate}'` */
      let query1 = `SELECT MAX(${param}) AS best, AVG(${param}) AS average FROM stat WHERE name = '${player.name}' AND tag = 'Game'`
      let query2 = `SELECT SUM(${param}) as param FROM stat WHERE name = '${player.name}' AND datum = '${startDate}' AND tag <> 'Game'`
      const playerStat = await queryPromise(query1)
      const trainingStat = await queryPromise(query2)
      //  console.log(query2)
      //     console.log(player.name)
      //     console.log('playerStat ', playerStat)
      //  console.log('trainingStat ', trainingStat)
      const singleStat = {
        name: player.name,
        best: (playerStat[0].best * percent).toFixed(2),
        average: (playerStat[0].average * percent).toFixed(2),
        current: trainingStat[0].param,
      }
      results.push(singleStat)
      if (players.length === index + 1) {
        //       console.log(results)
        res.send(results)
      }
    })
  } catch (error) {}
}

const getPlayerStats = async (req, res) => {
  console.log(req.body)
  const { player, startDate, param, endDate } = req.body
  dbSql.getConnection((err, connection) => {
    if (err) throw err
    console.log('connected as id ' + connection.threadId)
    const query = `SELECT ${param} as param, DATE_FORMAT(datum, '%d.%m.%Y') as datum, UNIX_TIMESTAMP(datum) AS date FROM stat WHERE name = '${player}' AND (datum BETWEEN '${startDate}' AND '${endDate}') ORDER BY date ASC`

    connection.query(query, (err, rows) => {
      //  connection.release()

      if (!err) {
        console.log(rows)
        console.log('upao')
        res.send(rows)
      } else {
        console.log(err)
      }
    })
  })
}

const getTeamStats = async (req, res) => {
  console.log(req.body)
  const { startDate, param, endDate } = req.body
  dbSql.getConnection((err, connection) => {
    if (err) throw err
    console.log('connected as id ' + connection.threadId)
    const query = `SELECT sum(${param}) as param, DATE_FORMAT(datum, '%d.%m.%Y') as datum, UNIX_TIMESTAMP(datum) AS date FROM stat WHERE (datum BETWEEN '${startDate}' AND '${endDate}') GROUP BY date ORDER BY date ASC`

    connection.query(query, (err, rows) => {
      //  connection.release()

      if (!err) {
        console.log(rows)
        console.log('upao')
        res.send(rows)
      } else {
        console.log(err)
      }
    })
  })
}

const getTwoPlayersStats = async (req, res) => {
  console.log(req.body)
  const { player1, player2, startDate, param, endDate } = req.body
  /*  dbSql.getConnection((err, connection) => {
    if (err) throw err
    console.log('connected as id ' + connection.threadId)
    const query = `SELECT ${param} as param, DATE_FORMAT(datum, '%d.%m.%Y') as datum, UNIX_TIMESTAMP(datum) AS date FROM stat WHERE name = '${player}' AND (datum BETWEEN '${startDate}' AND '${endDate}') ORDER BY date ASC`

    connection.query(query, (err, rows) => {
      //  connection.release()

      if (!err) {
        console.log(rows)
        console.log('upao')
        res.send(rows)
      } else {
        console.log(err)
      }
    })
  }) */
  const query1 = `SELECT SUM(${param}) as param, DATE_FORMAT(datum, '%d.%m.%Y') as datum, UNIX_TIMESTAMP(datum) AS date FROM stat WHERE name = '${player1}' AND (datum BETWEEN '${startDate}' AND '${endDate}') GROUP BY date`
  const query2 = `SELECT SUM(${param}) as param, DATE_FORMAT(datum, '%d.%m.%Y') as datum, UNIX_TIMESTAMP(datum) AS date FROM stat WHERE name = '${player2}' AND (datum BETWEEN '${startDate}' AND '${endDate}') GROUP BY date`
  const query3 = `SELECT DISTINCT DATE_FORMAT(datum, '%d.%m.%Y') as datum, UNIX_TIMESTAMP(datum) AS date FROM stat WHERE (name = '${player1}' OR name = '${player2}') AND (datum BETWEEN '${startDate}' AND '${endDate}') ORDER BY date ASC`

  console.log(query1)
  try {
    const playerStat1 = await queryPromise(query1)
    console.log(playerStat1)
    const playerStat2 = await queryPromise(query2)

    const dateArray = await queryPromise(query3)
    //  console.log(playerStat2)
    const resultArray = dateArray.map((item) => {
      const player1Stat = playerStat1.find((el) => el.date == item.date)
      const player2Stat = playerStat2.find((el) => el.date == item.date)
      const x = {
        player1: player1Stat?.param,
        datum: item.datum,
        player2: player2Stat?.param,
      }
      return x
    })
    console.log(resultArray)
    res.send(resultArray)
  } catch (error) {
    console.log(error)
  }
}

export {
  getData,
  setLoadData,
  getPlayers,
  getStats,
  syncData,
  getPlayerStats,
  getTwoPlayersStats,
  getTeamStats,
}
