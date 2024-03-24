const menuBar = document.querySelector(".menu-bar")
menuBar.addEventListener("click",function(){
    menuBar.classList.toggle("active")
    document.querySelector(".menu-items").classList.toggle("active")
})
const toP = document.querySelector(".top")
window.addEventListener("scroll",function() {
    const x = this.pageYOffset;
    if (x>50) {toP.classList.add("active")}
    else{toP.classList.remove("active")}
})

const search = document.querySelector('.input-group input'),
    table_rows = document.querySelectorAll('tbody tr'),
    table_headings = document.querySelectorAll('thead th');

// 1. Searching for specific data of HTML table
search.addEventListener('input', searchTable);

function searchTable() {
    table_rows.forEach((row, i) => {
        let table_data = row.textContent.toLowerCase(),
            search_data = search.value.toLowerCase();

        if (table_data.indexOf(search_data) < 0) {
            row.style.display = 'none';
        } else {
            row.style.display = '';
        }
    });

    document.querySelectorAll('tbody tr:not([style="display: none;"])').forEach((visible_row, i) => {
        visible_row.style.backgroundColor = (i % 2 == 0) ? 'transparent' : '#0000000b';
    });
}
// 2. Sorting | Ordering data of HTML table
table_headings.forEach((head, i) => {
    let sort_asc = true;
    head.onclick = () => {
        table_headings.forEach(head => head.classList.remove('active'));
        head.classList.add('active');

        document.querySelectorAll('td').forEach(td => td.classList.remove('active'));
        table_rows.forEach(row => {
            row.querySelectorAll('td')[i].classList.add('active');
        })

        head.classList.toggle('asc', sort_asc);
        sort_asc = head.classList.contains('asc') ? false : true;

        sortTable(i, sort_asc);
    }
})
function sortTable(column, sort_asc) {
    [...table_rows].sort((a, b) => {
        let first_row = a.querySelectorAll('td')[column].textContent,
            second_row = b.querySelectorAll('td')[column].textContent;
        // Kiểm tra nếu cả hai giá trị đều là số
        if (!isNaN(first_row) && !isNaN(second_row)) {
            return sort_asc ? parseFloat(first_row) - parseFloat(second_row) : parseFloat(second_row) - parseFloat(first_row);
        } else { // Nếu ít nhất một trong hai giá trị không phải là số
            // Sắp xếp theo thứ tự chữ cái
            return sort_asc ? first_row.localeCompare(second_row) : second_row.localeCompare(first_row);
        }
    })
        .map(sorted_row => document.querySelector('tbody').appendChild(sorted_row));
}
// Create
document.querySelector(".btn-create").addEventListener("click", function() { 
    document.querySelector(".wrapper2").style.display= "flex";
})
document.querySelector(".close").addEventListener("click", function() {
    document.querySelector(".wrapper2").style.display = "none";
});
// Edit
var editButtons = document.querySelectorAll(".btn-edit");
editButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        var id = parseInt(this.getAttribute("data-id"));
        document.getElementById("edit" + id).style.display = "flex";
        document.getElementById("close" + id).addEventListener("click", function() { 
            document.getElementById("edit" + id).style.display = "none";
        })
    });
});
// DateNow
function postDateNow() {
    var createDateNow = new Date();
    var date = createDateNow.getDate();
    var month = createDateNow.getMonth() + 1;
    var year = createDateNow.getFullYear();
    var hours = createDateNow.getHours();
    var minutes = createDateNow.getMinutes();
    var seconds = createDateNow.getSeconds();
    var dateNow = year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds;
    document.getElementById("dateNow").value = dateNow;
}
document.getElementById('btn-create').addEventListener('click', postDateNow);