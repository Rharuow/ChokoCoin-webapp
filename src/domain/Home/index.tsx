import React, { useContext } from 'react'
import { Card } from 'react-bootstrap'

import { HomeContext } from '../../pages/home'
import ModalFormProject from './Modal'

const Content: React.FC = () => {
    const {user, projects} = useContext(HomeContext)

    return (
      <div className="h-100vh-min bg-dark">
        <ModalFormProject />
        <div className="flex-center-y-around-x flex-wrap">
          <Card className="h-100">
            <Card.Header>
              <h1 className="text-center">Bem vindo {user?.username}</h1>
            </Card.Header>
            <Card.Body>
              <h2>Projetos:</h2>
            </Card.Body>
          </Card>
        </div>
        <div className="flex-center-y-around-x flex-wrap">
          {projects &&
            projects.map((project) => (
              <Card key={project.name}>
                <Card.Header><h1>Projetos</h1></Card.Header>
                <Card.Body>
                  <p>nome: {project.name}</p>
                  <p>valor: {project.value}</p>
                </Card.Body>
                <Card.Footer><h2>Participantes</h2></Card.Footer>
                <Card.Body>
                  <li>Nome</li>
                  <li>Valor</li>
                </Card.Body>
              </Card>
            ))}
        </div>
      </div>
    )
}

export default Content
