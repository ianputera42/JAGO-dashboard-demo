function startApp() {
    document.querySelector('header').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    showSection('kuis');
}

function showSection(id) {
    document.querySelectorAll('.content-section').forEach(sec => sec.style.display = 'none');
    document.getElementById(id).style.display = 'block';
}

const quizData = [
    {q: 'Apa kepanjangan dari HTML?', a: 'HyperText Markup Language', o: ['Hyper Transfer Machine Language', 'HyperText Markup Language', 'Home Tool Markup Language']},
    {q: 'Apa fungsi CSS?', a: 'Mengatur tampilan halaman web', o: ['Mengatur struktur', 'Mengatur tampilan halaman web', 'Mengelola database']}
];

function renderQuiz() {
    let html = '';
    quizData.forEach((item, index) => {
        html += `<p>${index+1}. ${item.q}</p>`;
        item.o.forEach(opt => {
            html += `<label><input type='radio' name='q${index}' value='${opt}'> ${opt}</label><br>`;
        });
    });
    document.getElementById('quiz-container').innerHTML = html;
}
renderQuiz();

function submitQuiz() {
    let score = 0;
    quizData.forEach((item, index) => {
        const ans = document.querySelector(`input[name='q${index}']:checked`);
        if (ans && ans.value === item.a) score++;
    });
    document.getElementById('quiz-result').innerText = `Skor kamu: ${score}/${quizData.length}`;
    localStorage.setItem('quizScore', score);
}

document.getElementById('attendance-form').addEventListener('submit', e => {
    e.preventDefault();
    const nama = document.getElementById('nama').value;
    const tanggal = document.getElementById('tanggal').value;
    const status = document.getElementById('status').value;
    const table = document.getElementById('attendance-table');
    const row = table.insertRow();
    row.insertCell(0).innerText = nama;
    row.insertCell(1).innerText = tanggal;
    row.insertCell(2).innerText = status;
});

function downloadCSV() {
    let csv = 'Nama,Tanggal,Status\n';
    document.querySelectorAll('#attendance-table tr').forEach((row, i) => {
        if (i === 0) return;
        const cols = row.querySelectorAll('td');
        csv += Array.from(cols).map(td => td.innerText).join(',') + '\n';
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'laporan_absensi.csv';
    a.click();
}
