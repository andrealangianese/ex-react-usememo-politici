import { useState, useEffect, useMemo } from "react"

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
        <div key={politico.id}>
          <img src={politico.image} alt={politico.name} />
          <h1>{politico.name}</h1>
          <p>{politico.position}</p>
          <p>{politico.biography}</p>
        </div>
      ))}
    </span>
  )
}

export default App