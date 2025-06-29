var siteNameInput = document.getElementById("name");
var siteUrlInput = document.getElementById("url");
var searchInput = document.getElementById("search");
var sitesList = [];
var index = 0;

if (localStorage.getItem("sites") !== null) {
  sitesList = JSON.parse(localStorage.getItem("sites"));
  displaySites();
}

function addSite() {
  var sites = { name: siteNameInput.value, url: siteUrlInput.value };

  if (urlValidation() === true && nameValidation() === true) {
    sitesList.push(sites);
    localStorage.setItem("sites", JSON.stringify(sitesList));
  } else {
    document.getElementById("alert-box").classList.remove("d-none");
  }

  displaySites();
}

function displaySites() {
  var container = "";

  for (i = 0; i < sitesList.length; i++) {
    container += `<tr>
            <td>${i}</td>
            <td>${sitesList[i].name}</td>
            <td>
              <button onclick="${visit(i)}" class="btn visit-btn">
                <i class="fa-solid fa-eye pe-2"></i>
                Visit
              </button>
            </td>
            <td>
              <button onclick="select(${i})" class="btn btn-warning pe-2 delete-btn text-white" >
                <i class="fa-solid fa-pen-to-square"></i>
                Edit
              </button>
            </td>
            <td>
              <button onclick="deleteSite(${i})" class="btn btn-danger pe-2 delete-btn" >
                <i class="fa-solid fa-trash"></i>
                Delete
              </button>
            </td>
          </tr>`;
  }

  document.getElementById("tbody").innerHTML = container;
}

function searchItem() {
  var container = "";

  for (i = 0; i < sitesList.length; i++) {
    if (
      sitesList[i].name.toLowerCase().includes(searchInput.value.toLowerCase())
    ) {
      container += `<tr>
              <td>${i}</td>
              <td>${sitesList[i].name}</td>
              <td>
                <button onclick="${visit(i)}" class="btn visit-btn">
                  <i class="fa-solid fa-eye pe-2"></i>
                  Visit
                </button>
              </td>
              <td>
                <button onclick="select(${i})" class="btn btn-warning pe-2 delete-btn text-white" >
                  <i class="fa-solid fa-pen-to-square"></i>
                  Edit
                </button>
              </td>
              <td>
                <button onclick="deleteSite(${i})" class="btn btn-danger pe-2 delete-btn" >
                  <i class="fa-solid fa-trash"></i>
                  Delete
                </button>
              </td>
            </tr>`;
    }
  }
  document.getElementById("tbody").innerHTML = container;

  console.log(searchInput.value);
}

function select(i) {
  index = i;

  siteNameInput.value = sitesList[i].name;
  siteUrlInput.value = sitesList[i].url;
  document.getElementById("update-btn").classList.remove("d-none");
  document.getElementById("submit-btn").classList.add("d-none");
}

function updateSite() {
  if (urlValidation() === true && nameValidation() === true) {
    sitesList[index].name = siteNameInput.value;
    sitesList[index].url = siteUrlInput.value;
    localStorage.setItem("sites", JSON.stringify(sitesList));
  } else {
    document.getElementById("alert-box").classList.remove("d-none");
  }

  document.getElementById("submit-btn").classList.remove("d-none");
  document.getElementById("update-btn").classList.add("d-none");

  displaySites();
}

function deleteSite(i) {
  sitesList.splice(i, 1);
  localStorage.setItem("sites", JSON.stringify(sitesList));
  displaySites();
}

function visit(i) {
  var x = sitesList[i].url;
  if (x.includes("https://") || x.includes("http://")) {
    return `location.href='${x}'`;
  } else {
    return `location.href='https://${x}'`;
  }
}

function nameValidation() {
  var nameReg = /^[a-z0-9_]{3,15}$/;
  var text = siteNameInput.value;

  if (nameReg.test(text)) {
    document.getElementById("name").classList.add("is-valid");
    document.getElementById("name").classList.remove("is-invalid");
    return true;
  } else {
    document.getElementById("name").classList.add("is-invalid");
    document.getElementById("name").classList.remove("is-valid");
    return false;
  }
}

function urlValidation() {
  var URLReg =
    /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/;
  var urlTest = siteUrlInput.value;

  if (URLReg.test(urlTest)) {
    document.getElementById("url").classList.add("is-valid");
    document.getElementById("url").classList.remove("is-invalid");
    return true;
  } else {
    document.getElementById("url").classList.add("is-invalid");
    document.getElementById("url").classList.remove("is-valid");
    return false;
  }
}

function closeAlert() {
  document.getElementById("alert-box").classList.add("d-none");
}
