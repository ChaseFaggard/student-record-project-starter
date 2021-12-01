import Student from './Student.js'
import Table from './Table.js'

// Dummy data
const andrew:Student = new Student('Andrew', 'Jackson', 'History', 65)
const george:Student = new Student('George', 'Washington', 'Computer Science', 52)
const john:Student = new Student('John', 'Adams', 'Biology', 98)
const james:Student = new Student('James', 'Madison', 'History', 83)
const martin:Student = new Student('Martin', 'Van Buren', 'Physics', 91)
const william:Student = new Student('William', 'Harrison', 'Biology', 73)
const zachary:Student = new Student('Zachary', 'Taylor', 'English', 52)

const table:Table = new Table(document.querySelector('#table'),new Array(andrew, george, john, james, martin, william, zachary))

table.render()