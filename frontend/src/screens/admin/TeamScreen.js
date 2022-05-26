import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getAllUsers } from '../../actions/userActions'
import { Table, Nav } from 'react-bootstrap'

const TeamScreen = () => {
  let params = useParams()
  console.log(params.klubId)
  const dispatch = useDispatch()
  const allUsers = useSelector((state) => state.allUsers)
  const { users } = allUsers
  useEffect(() => {
    dispatch(getAllUsers('trener', params.klubId))
  }, [])
  return (
    <>
      <div>TeamScreen</div>
      <div>Lista igraca</div>
      <Table size='sm' striped bordered hover>
        <thead>
          <tr key={0}>
            <th>Ime i Prezime</th>
            <th>mail</th>
            <th>uloga</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users?.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.uloga}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  )
}

export default TeamScreen
