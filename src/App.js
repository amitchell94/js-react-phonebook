import React, {useState} from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas',
        number: '123456789'}
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const addName = (event) => {
        event.preventDefault()

        if (persons.some((person) => person.name === newName)) {
            alert(`${newName} is already added to the phonebook`)
            return
        }

        const personObject = { name: newName, number: newNumber }
        setPersons(persons.concat(personObject))
        setNewName('')
        setNewNumber('')
    }


    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addName}>
                <div>
                    name: <input onChange={handleNameChange} value={newName}/>
                </div>
                <div>
                    number: <input onChange={handleNumberChange} value={newNumber}/></div>
                <div>
                    <button type="submit" >add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <ul>
                {persons.map((person, i) =>
                    <div key={i}>{person.name} {person.number}</div>
                )}
            </ul>
        </div>
    )
}

export default App