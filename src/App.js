import React, {useEffect, useState} from 'react'
import personService from "./services/persons";

const Notification = ({notificationObj}) => {
    if (notificationObj.text === "") {
        return null
    }

    let style = "errorMessage"
    if (notificationObj.type === "success") {
        style = "successMessage"
    }

    return (
        <div className={style}>
            {notificationObj.text}
        </div>
    )

}

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

const Persons = ({personsToShow, handleDelete}) => {

    return (
        <ul>
            {personsToShow.map((person, i) =>
                <div key={i}>{person.name} {person.number}
                    <button onClick={() => handleDelete(person.id)}>delete</button>
                </div>
            )}
        </ul>
    )
}

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')
    const [newNotification, setNotification] = useState({text: "", type: null})

    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }, [])

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
            if (window.confirm(`${newName} is already added to the phonebook. Replace the old number with this new one?`)) {
                const personObject = {name: newName, number: newNumber}
                personService
                    .update(persons.find(p => p.name === newName).id, personObject)
                    .then(returnedPerson => {
                        setPersons(persons.map(p => p.name !== newName ? p : returnedPerson))
                        setNewName('')
                        setNewNumber('')

                        setNotification({text: `The number for ${newName} has successfully been updated`, type: "success"})
                        setTimeout(() => {setNotification({text: "", type: null})}, 5000)
                        return
                    }).catch(error => {

                    setNotification({text: `The contact ${newName} has already been removed from the server`, type: "error"})
                    setTimeout(() => {setNotification({text: "", type: null})}, 5000)
                })

            } else {
                return
            }
        }

        const personObject = {name: newName, number: newNumber}
        personService
            .create(personObject)
            .then(returnedPerson => {
                setPersons(persons.concat(returnedPerson))
                setNewName('')
                setNewNumber('')

                setNotification({text: `The number for ${newName} has successfully been added`, type: "success"})
                setTimeout(() => {setNotification({text: "", type: null})}, 5000)
            })
    }

    const deleteName = id => {
        if (window.confirm(`Delete ${persons.find(person => person.id === id).name}?`)) {
            personService
                .remove(id)
                .then(returnedData => {
                    setPersons(persons.filter(person => person.id !== id))
                })
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification notificationObj={newNotification} />
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
            <Persons personsToShow={personsToShow} handleDelete={deleteName}/>
        </div>
    )
}

export default App