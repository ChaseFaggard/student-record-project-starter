export default class Student {
    constructor(fname, lname, course, grade) {
        this.fname = fname;
        this.lname = lname;
        this.course = course;
        this.grade = grade;
        this.getLetterGrade = () => {
            if (typeof this.grade === 'string')
                return this.grade.toUpperCase();
            switch (Math.floor(this.grade / 10)) {
                case 10:
                case 9: return 'A';
                case 8: return 'B';
                case 7: return 'C';
                case 6: return 'D';
                default: return 'F';
            }
        };
        this.isPassing = () => this.getLetterGrade() < 'F';
    }
}
