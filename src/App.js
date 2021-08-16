import React, {useState} from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ])

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
        setNewFilter(event.target.value)
    }

    const personsToShow = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()) )

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
            <div>
                Filter shown with <input onChange={handleFilterChange} value={newFilter}/>
            </div>
            <h2>Add new number</h2>
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
                {personsToShow.map((person, i) =>
                    <div key={i}>{person.name} {person.number}</div>
                )}
            </ul>
        </div>
    )
}

export default App