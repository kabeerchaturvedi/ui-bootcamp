const tableData = document.getElementById("table-data");
const editButton = document.getElementById("sort-btn");
const deleteButton = document.getElementById("delete-btn");

let dataset;

window.onload = function WindowLoad() {
  loadData();
};

function loadData() {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((data) => {
      dataset = data;
      renderData();
    });
}

function renderData() {
  let output = "";
  dataset.forEach((person) => {
    output += `
<tbody>
<tr>
<td>${person.name}</td>
<td>${person.username}</td>
<td>${person.address.city}</td>
<td>${person.website}</td>
<td>${person.company.name}</td>
<td><button onclick="deleteData(this)" data-id="${person.id}">DELETE</button></td>
</tr>
</tbody>`;
  });
  tableData.innerHTML = output;
}

editButton.addEventListener("click", sortedData);

function sortedData(a, b) {
  dataset.sort((a, b) => a.name.localeCompare(b.name));
  renderData();
}

function deleteData(obj) {
  let id = obj.getAttribute("data-id");
  console.log(typeof id);
  fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      dataset = dataset.filter((person) => Number(id) !== person.id);
      console.log(dataset);
      renderData();
    });
}
// deleteButton.addEventListener("click", (e) => {
//   console.log(e.target.value);
// });
