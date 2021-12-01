import Student from './Student.js';
export default class Table {
    constructor(tableElement, students) {
        this.tableElement = tableElement;
        this.students = students;
        this.letterToggle = true;
        this.courseToggle = true;
        this.passingToggle = true;
        this.fNameToggle = true;
        this.lNameToggle = true;
        this.addStudent = (student) => { this.students.push(student); };
        this.removeStudent = (index) => { this.students.splice(index, 1); };
        this.sortByLetter = () => {
            this.students.sort((a, b) => a.getLetterGrade() > b.getLetterGrade() ? (this.letterToggle ? 1 : -1) : (this.letterToggle ? -1 : 1));
            this.letterToggle = !this.letterToggle; // Toggle
        };
        this.sortByCourse = () => {
            this.students.sort((a, b) => a.course > b.course ? (this.courseToggle ? 1 : -1) : (this.courseToggle ? -1 : 1));
            this.courseToggle = !this.courseToggle; // Toggle
        };
        this.sortByPassing = () => {
            this.students.sort((a, b) => a.isPassing() < b.isPassing() ? (this.passingToggle ? 1 : -1) : (this.passingToggle ? -1 : 1));
            this.passingToggle = !this.passingToggle; // Toggle
        };
        this.sortByFName = () => {
            this.students.sort((a, b) => a.fname > b.fname ? (this.fNameToggle ? 1 : -1) : (this.fNameToggle ? -1 : 1));
            this.fNameToggle = !this.fNameToggle; // Toggle
        };
        this.sortByLName = () => {
            this.students.sort((a, b) => a.lname > b.lname ? (this.lNameToggle ? 1 : -1) : (this.lNameToggle ? -1 : 1));
            this.lNameToggle = !this.lNameToggle; // Toggle
        };
        this.render = () => {
            let data_html = '';
            this.students.forEach((student, i) => {
                data_html +=
                    `<tr>
                <td>${student.fname}</td>
                <td>${student.lname}</td>
                <td>${student.course}</td>
                <td class="text-center">${student.getLetterGrade()}</td>
                <td class="text-center">${(student.isPassing() ? '<i id="pass" class="fas fa-check-circle"></i>' : '<i id="fail" class="fas fa-times-circle"></i>')}</td>
                <td class="delete"><i id="${i}" class="del far fa-minus-square"></i></td>
            </tr>`;
            });
            this.tableElement.innerHTML = `
        <table>
            <tr>
                <th>First Name <i id="fname-sort" class="fas fa-sort"></i></th>
                <th>Last Name <i id="lname-sort" class="fas fa-sort"></i></th>
                <th>Course <i id="course-sort" class="fas fa-sort"></i></th>
                <th>Grade <i id="grade-sort" class="fas fa-sort"></th>
                <th>Passing <i id="passing-sort" class="fas fa-sort"></i></th>
            </tr>
            ${data_html}
            <tr class="text-center submit">
                <td><input id="fname" type="text" placeholder=". . ." /></td>
                <td><input id="lname" type="text" placeholder=". . ." /></td>
                <td><input id="course" type="text" placeholder=". . ." /></td>
                <td><input id="grade" type="text" placeholder=". . ." /></td>
                <td><i id="add" class="fas fa-user-plus"></i></td>
            </tr>
        </table>`;
            this.registerListeners();
        };
        this.registerListeners = () => {
            var _a, _b, _c, _d, _e, _f;
            (_a = document.querySelector('#fname-sort')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
                this.sortByFName();
                this.render();
            });
            (_b = document.querySelector('#lname-sort')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
                this.sortByLName();
                this.render();
            });
            (_c = document.querySelector('#grade-sort')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', () => {
                this.sortByLetter();
                this.render();
            });
            (_d = document.querySelector('#course-sort')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', () => {
                this.sortByCourse();
                this.render();
            });
            (_e = document.querySelector('#passing-sort')) === null || _e === void 0 ? void 0 : _e.addEventListener('click', () => {
                this.sortByPassing();
                this.render();
            });
            (_f = document.querySelector('#add')) === null || _f === void 0 ? void 0 : _f.addEventListener('click', () => {
                const fname = document.querySelector('#fname').value;
                const lname = document.querySelector('#lname').value;
                const course = document.querySelector('#course').value;
                const gradeUI = document.querySelector('#grade');
                const grade = gradeUI.value;
                if (!fname || !lname || !course || !grade)
                    return;
                if (/^\d+$/.test(grade)) { // Number
                    if (+grade < 100 && +grade >= 0)
                        this.addStudent(new Student(fname, lname, course, +grade));
                    else {
                        gradeUI.parentElement.style.border = '2px solid red';
                        return;
                    }
                }
                else { // Not a number
                    switch (grade.toUpperCase()) {
                        case 'A':
                        case 'B':
                        case 'C':
                        case 'D':
                        case 'F':
                            this.addStudent(new Student(fname, lname, course, grade));
                            break;
                        default:
                            gradeUI.parentElement.style.border = '2px solid red';
                            return;
                    }
                }
                this.render();
            });
            const delBttns = document.querySelectorAll('.del');
            delBttns.forEach((btn, i) => {
                btn === null || btn === void 0 ? void 0 : btn.addEventListener('click', e => {
                    console.log(`#${i + 1} was deleted`);
                    this.removeStudent(i);
                    this.render();
                });
            });
        };
        // Logs all students
        this.print = () => this.students.forEach(student => console.log(student));
    }
}
