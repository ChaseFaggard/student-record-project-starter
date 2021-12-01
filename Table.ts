import Student from './Student.js'

export default class Table {

    private letterToggle:boolean = true
    private courseToggle:boolean = true
    private passingToggle:boolean = true
    private fNameToggle:boolean = true
    private lNameToggle:boolean = true

    constructor(public tableElement:HTMLElement|null, public students:Student[]) { }

    addStudent = (student:Student):void => { this.students.push(student) }

    removeStudent = (index:number):void => { this.students.splice(index, 1) }
    
    sortByLetter = ():void => {
        this.students.sort((a, b) => a.getLetterGrade() > b.getLetterGrade() ? (this.letterToggle ? 1 : -1) : (this.letterToggle ? -1 : 1))
        this.letterToggle = !this.letterToggle // Toggle
    }

    sortByCourse = ():void => {
        this.students.sort((a, b) => a.course > b.course ? (this.courseToggle ? 1 : -1) : (this.courseToggle ? -1 : 1))
        this.courseToggle = !this.courseToggle // Toggle
    }

    sortByPassing = ():void => {
        this.students.sort((a, b) => a.isPassing() < b.isPassing() ? (this.passingToggle ? 1 : -1) : (this.passingToggle ? -1 : 1))
        this.passingToggle = !this.passingToggle // Toggle
    }

    sortByFName = (): void => {
        this.students.sort((a, b) => a.fname > b.fname? (this.fNameToggle ? 1 : -1) : (this.fNameToggle ? -1 : 1))
        this.fNameToggle = !this.fNameToggle // Toggle
    }
    
    sortByLName = (): void => {
        this.students.sort((a, b) => a.lname > b.lname? (this.lNameToggle ? 1 : -1) : (this.lNameToggle ? -1 : 1))
        this.lNameToggle = !this.lNameToggle // Toggle
    }
    render = ():void => {
        let data_html:string = ''
        this.students.forEach((student, i) => {
            data_html += 
            `<tr>
                <td>${student.fname}</td>
                <td>${student.lname}</td>
                <td>${student.course}</td>
                <td class="text-center">${student.getLetterGrade()}</td>
                <td class="text-center">${(student.isPassing() ? '<i id="pass" class="fas fa-check-circle"></i>' : '<i id="fail" class="fas fa-times-circle"></i>')}</td>
                <td class="delete"><i id="${i}" class="del far fa-minus-square"></i></td>
            </tr>`
        })
        this.tableElement!.innerHTML = `
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
        </table>`
        this.registerListeners()
    }

    registerListeners = ():void => {

        document.querySelector('#fname-sort')?.addEventListener('click',() => {
            this.sortByFName()
            this.render()
        })

        document.querySelector('#lname-sort')?.addEventListener('click',() => {
            this.sortByLName()
            this.render()
        })

        document.querySelector('#grade-sort')?.addEventListener('click',() => {
            this.sortByLetter()
            this.render()
        })
        
        document.querySelector('#course-sort')?.addEventListener('click',() => {
            this.sortByCourse()
            this.render()
        })

        document.querySelector('#passing-sort')?.addEventListener('click',() => {
            this.sortByPassing()
            this.render()
        })

        document.querySelector('#add')?.addEventListener('click',() => {
            const fname:string = (<HTMLInputElement> document.querySelector('#fname'))!.value
            const lname:string = (<HTMLInputElement> document.querySelector('#lname'))!.value
            const course:string = (<HTMLInputElement> document.querySelector('#course'))!.value
            const gradeUI = (<HTMLInputElement> document.querySelector('#grade'))
            const grade:string = gradeUI.value
            if(!fname || !lname || !course || !grade) return
            if(/^\d+$/.test(grade)) { // Number
                if(+grade < 100 && +grade >= 0) this.addStudent(new Student(fname, lname, course, +grade))
                else {
                    gradeUI.parentElement!.style.border = '2px solid red'
                    return 
                }
            }
            else { // Not a number
                switch(grade.toUpperCase()) {
                    case 'A':
                    case 'B':
                    case 'C':
                    case 'D':
                    case 'F':
                        this.addStudent(new Student(fname, lname, course, grade))
                        break;
                    default: 
                        gradeUI.parentElement!.style.border = '2px solid red'
                        return 
                }
            }
            this.render()
        })

        const delBttns = document.querySelectorAll('.del')
        delBttns.forEach((btn, i) => {
            btn?.addEventListener('click', e => {
                console.log(`#${i+1} was deleted`)
                this.removeStudent(i)
                this.render()
            })
        })
       
    }

    // Logs all students
    print = ():void => this.students.forEach(student => console.log(student))

}