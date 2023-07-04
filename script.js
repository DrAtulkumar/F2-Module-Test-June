// fetching 
const students = [
    { ID: 1, name: 'Alice', age: 21, grade: 'A', degree: 'Btech', email: 'alice@example.com' },
    { ID: 2, name: 'Bob', age: 22, grade: 'B', degree: 'MBA', email: 'bob@example.com' },
    { ID: 3, name: 'Charlie', age: 20, grade: 'C', degree:'Arts', email: 'charlie@example.com' }
  ];

  const form = document.getElementById('studentForm');
  const tableBody = document.querySelector('#studentTable tbody');
  const searchInput = document.getElementById('search');

  // Function to render the student table
  function renderStudents() {
    tableBody.innerHTML = '';

    students.forEach((student) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${student.ID}</td>
        <td>${student.name}</td>
        <td>${student.age}</td>
        <td>${student.grade}</td>
        <td>${student.degree}</td>
        <td>${student.email}</td>
        <td>
          <button class="editBtn" data-id="${student.ID}">Edit</button>
          <button class="deleteBtn" data-id="${student.ID}">Delete</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  }

  // Function to add a new student
  function addStudent(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const grade = document.getElementById('grade').value;
    const degree = document.getElementById('degree').value;
    const email = document.getElementById('email').value;

    const newStudent = {
      ID: students.length + 1,
      name,
      age,
      grade,
      degree,
      email
    };

    students.push(newStudent);
    renderStudents();
    form.reset();
  }

  // Function to edit a student
  function editStudent(event) {
    const studentId = event.target.getAttribute('data-id');
    const student = students.find((s) => s.ID === parseInt(studentId));

    document.getElementById('name').value = student.name;
    document.getElementById('age').value = student.age;
    document.getElementById('grade').value = student.grade;
    document.getElementById('degree').value = student.degree;
    document.getElementById('email').value = student.email;

    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.innerText = 'Edit Student';

    form.removeEventListener('submit', addStudent);
    form.addEventListener('submit', updateStudent.bind(null, student.ID));

    const existingSubmitBtn = form.querySelector('button[type="submit"]');
    if (existingSubmitBtn) {
      form.replaceChild(submitBtn, existingSubmitBtn);
    } else {
      form.appendChild(submitBtn);
    }
  }

  // Function to update a student
  function updateStudent(studentId, event) {
    event.preventDefault();

    const updatedStudent = {
      ID: studentId,
      name: document.getElementById('name').value,
      age: document.getElementById('age').value,
      grade: document.getElementById('grade').value,
      degree: document.getElementById('degree').value,
      email: document.getElementById('email').value
    };

    const index = students.findIndex((s) => s.ID === studentId);
    if (index !== -1) {
      students[index] = updatedStudent;
      renderStudents();
      form.reset();
    }
  }

  // Function to delete a student
  function deleteStudent(event) {
    const studentId = event.target.getAttribute('data-id');
    const index = students.findIndex((s) => s.ID === parseInt(studentId));

    if (index !== -1) {
      students.splice(index, 1);
      renderStudents();
    }
  }

  // Function to filter students by name, email, or degree
  function filterStudents(event) {
    const searchTerm = event.target.value.toLowerCase();

    const filteredStudents = students.filter((student) =>
      student.name.toLowerCase().includes(searchTerm) ||
      student.email.toLowerCase().includes(searchTerm) ||
      student.degree.toLowerCase().includes(searchTerm)
    );

    renderStudents(filteredStudents);
  }

  form.addEventListener('submit', addStudent);
  tableBody.addEventListener('click', (event) => {
    if (event.target.classList.contains('editBtn')) {
      editStudent(event);
    } else if (event.target.classList.contains('deleteBtn')) {
      deleteStudent(event);
    }
  });
  searchInput.addEventListener('input', filterStudents);

  renderStudents();