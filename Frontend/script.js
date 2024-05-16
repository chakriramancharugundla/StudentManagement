document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'http://localhost:8080/students';
    const studentForm = document.getElementById('studentForm');
    const studentTableBody = document.getElementById('studentTableBody');
    let updateMode = false;
    let updateId = null;

    // Fetch and display students
    const fetchStudents = async () => {
        const response = await fetch(apiUrl);
        const students = await response.json();
        studentTableBody.innerHTML = '';
        students.forEach(student => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.id}</td>
                <td>${student.name}</td>
            
                <td>${student.course}</td>
                <td>
                    <button onclick="editStudent(${student.id})"><i class="fa fa-edit" style="font-size:24px"></i></button>
                    <button onclick="deleteStudent(${student.id})"><i class="fa fa-trash" aria-hidden="true" style="font-size:24px"></i></button>
                </td>
            `;
            studentTableBody.appendChild(row);
        });
    };

    // Add or update student
    studentForm.addEventListener('submit', async (e) => {

        e.preventDefault();
        const response = await fetch(apiUrl);
        const students = await response.json();
        const id=students.length+1;
        const name = document.getElementById('name').value;
        // const age = document.getElementById('age').value;
        const course = document.getElementById('course').value;

        if (updateMode) {
            await fetch(`${apiUrl}/${updateId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: updateId, name, course })
            });
            updateMode = false;
            updateId = null;
        } else {
            await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({id,name,course })
            });
        }

        studentForm.reset();
        fetchStudents();
    });

    // Edit student
    window.editStudent = async (id) => {
        const response = await fetch(`${apiUrl}/${id}`);
        const student = await response.json();
        document.getElementById('name').value = student.name;
        // document.getElementById('age').value = student.age;
        document.getElementById('course').value = student.course;
        updateMode = true;
        updateId = id;
    };

    // Delete student
    window.deleteStudent = async (id) => {
        await fetch(`${apiUrl}/${id}`, {
            method: 'DELETE'
        });
        fetchStudents();
    };

    // Initial fetch
    fetchStudents();
});
