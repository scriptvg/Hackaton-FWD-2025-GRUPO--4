import React from 'react'
import QuienesSomos from '@components/molecules/QuienesSomos'
import AboutSection from '@components/layouts/AboutSection'
import TeamMembers from '@components/atoms/TeamMembers'
import Valores from '@components/atoms/Valores'
import MissionCTA from '@components/atoms/MissionCTA'
import { links, textos } from '@components/data/misionData'

function InfoInstitucional() {
  return (
    <>
      <div className='flex flex-col items-center justify-center mt-23'>
      <QuienesSomos title={"Información Institucional"} description={"Conoce nuestra historia, misión, visión y valores."} img={"https://res.cloudinary.com/dmgz3csfp/image/upload/v1755832067/486175245_29175038435443319_583041807967260808_n_zznnej.jpg"} alt={"Información Institucional"} />
      <AboutSection />
      <TeamMembers />
      <Valores />
      <MissionCTA links={links} textos={textos} />
      </div>
    </>
  )
}

export default InfoInstitucional