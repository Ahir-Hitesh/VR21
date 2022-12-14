
const arrOfObjs = [
  { name: "CNBC", link: "cnbc.com" }, 
  { name: "Facebook", link: "facebook.com" },
  { name: "Codecademy", link: "codecademy.com" },
  { name: "Edx", link: "edx.org" },
  { name: "Linkedin", link: "linkedin.com" },
  { name: "Expedia ", link: "expedia.com" },
  { name: "NASA", link: "nasa.gov" },
  { name: "Google", link: "google.com" },
  { name: "Amazon", link: "amazon.com"} ,
  { name: "Apple", link: "apple.com" }];

let input = document.querySelector('#input');

input.addEventListener('input', getItems);

function getItems(e) {
    let SearchValue = e.target.value;
    let optionsContainer = document.querySelector('#datalistOptions');

    let filterItems = arrOfObjs.filter(x => x.name.toLowerCase().includes(SearchValue.toLowerCase()));

    if (filterItems) {
        optionsContainer.innerHTML = "";
        filterItems.forEach(item => {
            let NewOption = document.createElement('option');
            NewOption.setAttribute('value', item.name);
            optionsContainer.append(NewOption);
        })
    }
}