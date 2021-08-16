import React, {useState} from 'react'

const Filter = (props) => {

    return (
        <div>
            Filter shown with <input onChange={props.onChange} value={props.newFilter}/>
        </div>
    )
}

const PersonForm = (props) => {

    return (
        <form onSubmit={props.onSubmit}>
            <div>
                name: <input onChange={props.handleNameChange} value={props.newName}/>
            </div>
            <div>
                number: <input onChange={props.handleNumberChange} value={props.newNumber}/></div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

const Persons = ({personsToShow}) => {

    return (
        <ul>
            {personsToShow.map((person, i) =>
                <div key={i}>{person.name} {person.number}</div>
            )}
        </ul>
    )
}

const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas', number: '040-123456'},
        {name: 'Ada Lovelace', number: '39-44-5323523'},
        {name: 'Dan Abramov', number: '12-43-234345'},
        {name: 'Mary Poppendieck', number: '39-23-6423122'}
    ])

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleFilterChange = (event) => {
        setNewFilter(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const personsToShow = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

    const addName = (event) => {
        event.preventDefault()

        if (persons.some((person) => person.name === newName)) {
            alert(`${newName} is already added to the phonebook`)
            return
        }

        const personObject = {name: newName, number: newNumber}
        setPersons(persons.concat(personObject))
        setNewName('')
        setNewNumber('')
    }


    return (
        <div>
            <h2>Phonebook</h2>
            <Filter onChange={handleFilterChange} newFilter={newFilter}/>
            <h2>Add new number</h2>
            <PersonForm
                onSubmit={addName}
                handleNameChange={handleNameChange}
                handleNumberChange={handleNumberChange}
                newName={newName}
                newNumber={newNumber}
            />
            <h2>Numbers</h2>
            <Persons personsToShow={personsToShow} />
        </div>
    )
}

export default App