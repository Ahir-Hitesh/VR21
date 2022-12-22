const KEY = "card-data";
const CARD_ID = "data-card-identification";
const addForm = document.querySelector("#createModal form");

// delete button selection
const deleteBtn = document.querySelector("#deleteModal .btn-danger");
const deleteModal = document.querySelector("#deleteModal");
const updateModal = document.querySelector("#createModal");

//EventListeners 
addForm.addEventListener("submit", handleAddSubmit);
window.addEventListener("load", displayAllCards);
deleteBtn.addEventListener("click", deleteCard);
deleteModal.addEventListener("show.bs.modal", setModalAttribute);
updateModal.addEventListener("show.bs.modal", setModalAttribute);

//Functions
function handleAddSubmit(event) {  
  event.preventDefault();

  //input check
  const title = addForm.elements.title.value;
  const description = addForm.elements.description.value;
  const imageUrl = addForm.elements.imageUrl.value;
  const cardInfo = { title, description, imageUrl };
  const idToUpdate = Number(
    event.target.closest("#createModal").dataset.cardSelective
  );  
  if (!idToUpdate) {    
    cardInfo.id = Date.now();
    createCard(cardInfo);

    //localStorage
    addCardToDb(cardInfo);
  } else {
    cardInfo.id = idToUpdate;
    updateCard(cardInfo);
  } 
  addForm.reset();  
  const closeBtn = document.querySelector("[data-bs-dismiss='modal']");
  closeBtn.click();
}

function populateData(cardInfo) {  
  let data = loadCardFromDb();  
  const cardData = data.find((card) => card.id === Number(cardInfo));  
  addForm.elements.imageUrl.value = cardData.imageUrl;
  addForm.elements.title.value = cardData.title;
  addForm.elements.description.value = cardData.description;  
}
function updateCard(newInfo) {
  let data = loadCardFromDb();  
  const cardFromDb = data.find((card) => card.id === newInfo.id);
  const itemToUpdate = document.querySelector(
    `#cardContainer [data-card-identification="${newInfo.id}"]`
  );
  itemToUpdate.querySelector(".card-title").textContent = newInfo.title;
  itemToUpdate.querySelector(".card-text").textContent = newInfo.description;
  itemToUpdate
    .querySelector(".card-img-top")
    .setAttribute("src", newInfo.imageUrl);
  itemToUpdate
    .querySelector(".card-img-top")
    .setAttribute("alt", newInfo.imageUrl);

  cardFromDb.title = newInfo.title;
  cardFromDb.description = newInfo.description;
  cardFromDb.imageUrl = newInfo.imageUrl;
  saveCardToDb(data);
}
function setModalAttribute(event) {
  const addBtn = document.getElementById("add-btn");
  if (event.relatedTarget === addBtn) {
    addForm.reset();
    event.target.dataset.cardSelective = "";
    console.log(addBtn);    
  } else if (event.relatedTarget.classList.contains("btn-warning")) {    
    let cardTriggerModal = event.relatedTarget
      .closest(".col-lg-3")
      .getAttribute(CARD_ID);
    event.target.dataset.cardSelective = cardTriggerModal;
    populateData(cardTriggerModal);
  } else {
    let cardTriggerModal = event.relatedTarget
      .closest(".col-lg-3")
      .getAttribute(CARD_ID);
    console.log(cardTriggerModal);
    event.target.dataset.cardSelective = cardTriggerModal;
  }
}
//delete card from page
function deleteCard(event) {  
  const idToDelete = Number(
    event.target.closest("#deleteModal").dataset.cardSelective
  );
  let itemToDelete = document.querySelector(
    `#cardContainer [data-card-identification="${idToDelete}"]`
  );
  let data = loadCardFromDb(); 
  data = data.filter((cardInfo) => cardInfo.id !== idToDelete);
  saveCardToDb(data);
  itemToDelete.remove();}

function createCard(cardInfo) {
  const cardCol = document.createElement("div");
  cardCol.classList.add(
    "col-lg-3",
    "col-md-4",
    "col-sm-6",
    "d-flex",
    "justify-content-center"
  );
  cardCol.innerHTML = `
    <div class="card">
            <img class="card-img-top" />
             <div class="card-body d-flex flex-column justify-content-between ">
                <h5 class="card-title"></h5>
                <p class="card-text"></p>
                <div>                  
                  <button type="button" class="btn btn-warning" data-bs-toggle="modal"
                    data-bs-target="#createModal">Save</button>                 
                  <button type="button" class="btn btn-danger" data-bs-toggle="modal"
                    data-bs-target="#deleteModal">Delete</button>
                </div>
            </div>
    </div>`;
  
  cardCol.querySelector(".card-title").textContent = cardInfo.title;
  cardCol.querySelector(".card-text").textContent = cardInfo.description;
  cardCol.querySelector(".card-img-top").setAttribute("src", cardInfo.imageUrl);
  cardCol.querySelector(".card-img-top").setAttribute("alt", cardInfo.title);  
  const cardContainer = document.querySelector("#cardContainer");
  cardContainer.append(cardCol);  
  cardCol.setAttribute(CARD_ID, cardInfo.id);
}

function addCardToDb(cardInfo) {
  let data = loadCardFromDb();
  data.push(cardInfo);  
  saveCardToDb(data);
}
function displayAllCards() {
  let data = loadCardFromDb();  
  data.forEach((cardInfo) => createCard(cardInfo));
}

function loadCardFromDb() {
  let data = JSON.parse(localStorage.getItem(KEY));
  if (!data) {
    data = [];
  }
  return data;
}
function saveCardToDb(data) {  
  localStorage.setItem(KEY, JSON.stringify(data));
}
