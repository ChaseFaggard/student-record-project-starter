export default class Student {

    constructor(public fname:string, public lname:string, public course:string, private grade:string|number) { }

    getLetterGrade = ():string => {
        if(typeof this.grade === 'string') return this.grade.toUpperCase()
        switch(Math.floor(this.grade/10)) {
            case 10:
            case 9: return 'A'
            case 8: return 'B'
            case 7: return 'C'
            case 6: return 'D'
            default: return 'F'
        }
    }

    isPassing = ():boolean => this.getLetterGrade() < 'F'

}