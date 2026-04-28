import React, { useState, useEffect, useMemo } from "react"

function CardPolitici({ image, name, biography, position }) {
  console.log('card');

  return (
    <>
      <img src={image} alt={name} />
      <h1>{name}</h1>
      <p>{position}</p>
      <p>{biography}</p>
    </>)
}

const MemoCard = React.memo(CardPolitici)

function App() {
  const [politici, setPolitici] = useState([])

  const [ricerca, setRicerca] = useState('')
  useEffect(() => {
    fetch('http://localhost:3333/politicians')
      .then(res => res.json())
      .then(data => setPolitici(data))
      .catch(err => console.error(err))
  }, [])


  // filtro per ricerca sia di nome che di bio

  const filtroPolitici = useMemo(() => {
    return politici.filter(politico => {
      const filtroNome = politico.name.toLowerCase().includes(ricerca.toLowerCase())
      const filtrobBio = politico.biography.toLowerCase().includes(ricerca.toLowerCase())

      return filtroNome || filtrobBio
    })
  }, [politici, ricerca])

  return (
    <span>
      <input
        type="text"
        placeholder="cerca per nome..."
        value={ricerca}
        onChange={e => setRicerca(e.target.value)}
      />
      {filtroPolitici.map(politico => (
        <div>
          <MemoCard key={politico.id} {...politico} />
        </div>
      ))}
    </span>
  )
}

export default App