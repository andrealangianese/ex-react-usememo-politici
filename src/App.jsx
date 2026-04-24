import { useState, useEffect } from "react"

function App() {
  const [politici, setPolitici] = useState([])
  useEffect(() => {
    fetch('http://localhost:3333/politicians')
      .then(res => res.json())
      .then(data => setPolitici(data))
      .catch(err => console.error(err))
  }, [])

  console.log(politici)

  return (
    <span>
      {politici.map(politico => (
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