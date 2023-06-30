const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

let tagList = ["NodeJs", "ReactJs"];
const ulElem = $(".tag-list");
const inputElem = $(".input-tag");
const btnDeleteAllTag = $(".btn-remove-all");

inputElem.focus();
renderTagList(tagList, ulElem, inputElem);
inputElem.addEventListener("input", inputSearchTag);
ulElem.addEventListener("click", deleteTag);
btnDeleteAllTag.addEventListener("click", deleteAllTag);

// Render tag list to UI
function renderTagList(tagList, ulElem, inputElem) {
  tagList.forEach((tag) => {
    const liTag = document.createElement("li");
    liTag.innerHTML = `${tag} <i class="delete fa-solid fa-xmark"></i>`;
    ulElem.insertBefore(liTag, inputElem);
  });
}

// Enter input search
function inputSearchTag() {
  this.addEventListener("keydown", createTag);
}

// Create tag
function createTag(e) {
  const inputValue = this.value.trim();
  if (e.key === "Enter" && inputValue) {
    if (!checkForExistence(inputValue, tagList)) {
      tagList.push(inputValue);
      const liTag = document.createElement("li");
      const html = `
          ${inputValue} <i class="delete fa-solid fa-xmark"></i>
      `;
      liTag.innerHTML = html;

      ulElem.insertBefore(liTag, $(".input-tag"));
    }
    inputElem.value = "";
    inputElem.focus();
  }
}

// check for existence
function checkForExistence(valueCheck, arr) {
  for (const val of arr) {
    if (valueCheck.toLowerCase().trim() === val.toLowerCase()) {
      return true;
    }
  }
}

// Delete tag
function deleteTag(e) {
  const deleteBtn = e.target.closest(".delete");

  if (deleteBtn) {
    const parentElem = deleteBtn.parentElement;
    const tagDelete = parentElem.textContent.trim();
    const indexDelete = tagList.indexOf(tagDelete);

    tagList = tagList
      .slice(0, indexDelete)
      .concat(tagList.slice(indexDelete + 1));

    parentElem.outerHTML = "";

    console.log(tagList);
  }
}

// Delete All tag
function deleteAllTag() {
  tagList = [];
  const liElemList = ulElem.querySelectorAll("li");

  if (liElemList) {
    liElemList.forEach((li) => li.remove());
    inputElem.focus();
  }
}
