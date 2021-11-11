const tableData = document.getElementById("table-data");
const editButton = document.getElementById("sort-btn");
const deleteButton = document.getElementById("delete-btn");
const searchBar = document.getElementById("searchBar");

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

function renderData(data) {
  let output = "";
  (data || dataset).forEach((person) => {
    output += `
<tbody>
<tr>
<td>${person.name}</td>
<td>${person.username}</td>
<td>${person.address.city}</td>
<td>${person.website}</td>
<td>${person.company.name}</td>
<td><button onclick="deleteData(this)" class="btn-delete" data-id="${person.id}">DELETE</button></td>
</tr>
</tbody>`;
  });
  tableData.innerHTML = output;
}

searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();

  const filteredCharacters = dataset.filter((item) => {
    return item.name.toLowerCase().includes(searchString);
  });
  console.log(filteredCharacters);
  renderData(filteredCharacters);
});

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
      renderData();
    });
}
