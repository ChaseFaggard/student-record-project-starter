import Student from './Student.js';
import Table from './Table.js';
// Dummy data
const andrew = new Student('Andrew', 'Jackson', 'History', 65);
const george = new Student('George', 'Washington', 'Computer Science', 52);
const john = new Student('John', 'Adams', 'Biology', 98);
const james = new Student('James', 'Madison', 'History', 83);
const martin = new Student('Martin', 'Van Buren', 'Physics', 91);
const william = new Student('William', 'Harrison', 'Biology', 73);
const zachary = new Student('Zachary', 'Taylor', 'English', 52);
const table = new Table(document.querySelector('#table'), new Array(andrew, george, john, james, martin, william, zachary));
table.render();
