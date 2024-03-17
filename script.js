const inputbox = document.getElementById("inputbox");
const search = document.getElementById("search");
const container = document.getElementById("container");

search.addEventListener("click", () => {
  console.log(inputbox.value);
  let phone = inputbox.value;
  showPhones(phone);
});

const activeEvent = () => {
  document.querySelectorAll("#showMoreBtn").forEach((ele, idx) => {
    console.log(ele);
    ele.addEventListener("click", (e) => {
      let detailPhone = phoneArr[idx].slug;
      console.log(detailPhone);
      detailedReview(detailPhone);
    });
  });
};
// Working on this function activeEvent & detailedReview
async function detailedReview(detailedName) {
  let res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${detailedName}`
  );
  let jsonData = await res.json();
  let data = jsonData.data;
}

// Api Call with Promises
// const showPhones = () => {
//   fetch("https://openapi.programming-hero.com/api/phones?search=13")
//     .then((res) => res.json())
//     .then((data) => {
//       console.log(data.data);
//     });
// };

// This is a function to display all the card shown
function displayPhones(data) {
  if (data.length > 9) {
    let demoData = data.slice(0, 9);
    showData(demoData);
    document.querySelector(".showMoreSectionBtn").style.display = "block";
    document
      .querySelector(".showMoreSectionBtn")
      .addEventListener("click", () => {
        showData(data);
        document.querySelector(".showMoreSectionBtn").style.display = "none";
      });
  } else {
    showData(data);
  }
  activeEvent();
}

// This is a function to Create all the card data
const showData = (data) => {
  container.innerHTML = "";
  data.forEach((phone, index) => {
    const div = document.createElement("div");
    div.innerHTML = `
        <img src="${phone.image}">
        <h2>${phone.phone_name}</h2>
        <p>There are many variations of passages of available, but the majority have suffered</p>
        <div id="showMoreBtn" class="${index}">SHOW MORE</div>
    `;
    div.classList.add("cards");
    container.append(div);
  });
};

// Function for fetch the mobile phones using ASYNC AWAIT and pass the search Query API calls
let phoneArr = [];
async function showPhones(phone) {
  let res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${phone}`
  );
  let jsonData = await res.json();
  let data = jsonData.data;
  phoneArr = data;
  displayPhones(data);
}

window.onload = function () {
  showPhones(13);
};
