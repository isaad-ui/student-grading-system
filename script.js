let students = [];
let editingIndex = null;

const form = document.getElementById('studentForm');
const studentList = document.getElementById('studentList');
const submitBtn = form.querySelector('button[type="submit"]');

// University of Ghana grading points
function gradePoint(score) {
  if (score >= 80) return 4.0;
  if (score >= 75) return 3.5;
  if (score >= 70) return 3.0;
  if (score >= 65) return 2.5;
  if (score >= 60) return 2.0;
  if (score >= 55) return 1.5;
  if (score >= 50) return 1.0;
  return 0.0;
}

const courseCredits = {
  dcit104: 3,
  dcit102: 3,
  math122: 3,
  math126: 3,
  stat112: 2,
  ugrc110: 2
};

function calculateCGPA(student) {
  let totalPoints = 0;
  let totalCredits = 0;
  for (const course in courseCredits) {
    const score = student[course];
    const credit = courseCredits[course];
    const point = gradePoint(score);
    totalPoints += point * credit;
    totalCredits += credit;
  }
  return (totalPoints / totalCredits).toFixed(2);
}

function renderStudents() {
  studentList.innerHTML = '';
  students.forEach((student, index) => {
    const cgpa = calculateCGPA(student);
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${student.name}</strong> (CGPA: ${cgpa})<br/>
      DCIT 104: ${student.dcit104} |
      DCIT 102: ${student.dcit102} |
      MATH 122: ${student.math122} |
      MATH 126: ${student.math126} |
      STAT 112: ${student.stat112} |
      UGRC 110: ${student.ugrc110}
      <br/>
      <button class="edit-btn" onclick="editStudent(${index})">Edit</button>
      <button class="delete-btn" onclick="deleteStudent(${index})">Delete</button>
    `;
    studentList.appendChild(li);
  });
}

function editStudent(index) {
  const student = students[index];
  document.getElementById('studentName').value = student.name;
  document.getElementById('dcit104').value = student.dcit104;
  document.getElementById('dcit102').value = student.dcit102;
  document.getElementById('math122').value = student.math122;
  document.getElementById('math126').value = student.math126;
  document.getElementById('stat112').value = student.stat112;
  document.getElementById('ugrc110').value = student.ugrc110;
  editingIndex = index;
  submitBtn.textContent = 'Update Student';
}

function deleteStudent(index) {
  students.splice(index, 1);
  if (editingIndex === index) {
    form.reset();
    editingIndex = null;
    submitBtn.textContent = 'Add Student';
  }
  renderStudents();
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const newStudent = {
    name: document.getElementById('studentName').value.trim(),
    dcit104: Number(document.getElementById('dcit104').value),
    dcit102: Number(document.getElementById('dcit102').value),
    math122: Number(document.getElementById('math122').value),
    math126: Number(document.getElementById('math126').value),
    stat112: Number(document.getElementById('stat112').value),
    ugrc110: Number(document.getElementById('ugrc110').value),
  };

  if (editingIndex !== null) {
    students[editingIndex] = newStudent;
    editingIndex = null;
    submitBtn.textContent = 'Add Student';
  } else {
    students.push(newStudent);
  }

  form.reset();
  renderStudents();
});

renderStudents();
