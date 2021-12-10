import React, { useContext } from 'react'
import { Button, Card } from 'react-bootstrap'

import { HomeContext } from '../../pages/home'
import ModalFormProject from './Modal'

const Content: React.FC = () => {
    const {user, projects, modalIsOpen, setIsOpen} = useContext(HomeContext)

    return (
      <div className="h-100vh-min bg-dark">
        <ModalFormProject />
        <div className="flex-center-x-y flex-wrap flex-column h-100vh">
          <Card>
            <Card.Header>
              <h1 className="text-center">Bem vindo {user?.username}</h1>
            </Card.Header>
            <Card.Body>
              <h2>Projetos:</h2>
              {projects &&
                projects.map((project) => (
                  <Card key={project.name}>
                    <Card.Body>
                      <p>nome: {project.name}</p>
                      <p>valor: {project.value}</p>
                      {
                        project && project?.partners && project?.partners.length > 0 && project.partners.map((partner, index) => (
                          <div key={index}>
                            <p>Participantes</p>
                              <li>Nome: {partner.username}</li>
                              <li>Valor: {partner.value}</li>
                          </div>
                        ))
                      }
                    </Card.Body>
                  </Card>
                ))
              }
            </Card.Body>
          </Card>
          
          <Button onClick={() => setIsOpen(!modalIsOpen)} className="mt-5 rounded-circle">+</Button>
        </div>
      </div>
    )
}

export default Content
