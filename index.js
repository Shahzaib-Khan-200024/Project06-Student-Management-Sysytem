#! /usr/bin/env node
import inquirer from 'inquirer';
class Student {
    id;
    name;
    coursesEnrolled;
    feesAmount;
    constructor(id, name, coursesEnrolled, feesAmount) {
        this.id = id;
        this.name = name;
        this.coursesEnrolled = coursesEnrolled;
        this.feesAmount = feesAmount;
    }
}
let baseId = 10000;
let students = [];
const main = async () => {
    let continueEnrollment = true;
    while (continueEnrollment) {
        const action = await inquirer.prompt({
            type: 'list',
            name: 'ans',
            message: 'What would you like to do?',
            choices: ['Enroll a Student', 'Show student status', 'Exit']
        });
        if (action.ans === "Enroll a Student") {
            const studentName = await inquirer.prompt({
                type: 'input',
                name: 'ans',
                message: 'Please Enter your name: '
            });
            const trimmedStudentName = (studentName.ans).trim().toLowerCase();
            const studentNameCheck = students.map(obj => obj.name);
            if (!studentNameCheck.includes(trimmedStudentName)) {
                if (trimmedStudentName !== "") {
                    baseId++;
                    const studentId = "STID" + baseId;
                    console.log("\n\tYour account has been created");
                    console.log(`Welcome, ${trimmedStudentName}!`);
                    const course = await inquirer.prompt({
                        type: 'list',
                        name: 'ans',
                        message: 'Please select a course',
                        choices: ['IT', 'English', 'Cooking']
                    });
                    let courseFees = 0;
                    switch (course.ans) {
                        case 'IT':
                            courseFees = 5000;
                            break;
                        case 'English':
                            courseFees = 500;
                            break;
                        case 'Cooking':
                            courseFees = 200;
                            break;
                    }
                    const courseConfirm = await inquirer.prompt({
                        type: 'confirm',
                        name: 'ans',
                        message: 'Do you want to enroll in this course'
                    });
                    if (courseConfirm.ans) {
                        const student = new Student(studentId, trimmedStudentName, [course.ans], courseFees);
                        students.push(student);
                        console.log("You have enrolled in this course");
                    }
                }
                else {
                    console.log("Invalid Name");
                }
            }
            else {
                console.log("This name already exists");
            }
        }
        else if (action.ans === "Show student status") {
            if (students.length !== 0) {
                const studentNamesCheck = students.map(e => e.name);
                const selectedStudent = await inquirer.prompt({
                    type: 'list',
                    name: 'ans',
                    message: 'Select student name',
                    choices: studentNamesCheck
                });
                const foundStudent = students.find(student => student.name === selectedStudent.ans);
                console.log("Student information");
                console.log(foundStudent);
                console.log("\n");
            }
            else {
                console.log("Record is empty");
            }
        }
        else if (action.ans === "Exit") {
            continueEnrollment = false;
        }
    }
};
main();
