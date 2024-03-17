const inputbox = document.getElementById("inputbox");
const search = document.getElementById("search");
const container = document.getElementById("container");

search.addEventListener("click", () => {
  console.log(inputbox.value);
});

// https://openapi.programming-hero.com/api/phones?search=13

// const showPhones = () => {
//   fetch("https://openapi.programming-hero.com/api/phones?search=13")
//     .then((res) => res.json())
//     .then((data) => {
//       console.log(data.data);
//     });
// };

function displayPhones(data) {
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

  const div = document.createElement("div");
  div.classList.add("DetailedInfo");
  container.append(div);

  activeEvent();
}

const activeEvent = () => {
  document.querySelectorAll("#showMoreBtn").forEach((ele, idx) => {
    // console.log(ele);
    ele.addEventListener("click", (e) => {
      let detailPhone = phoneArr[idx].slug;
      console.log(detailPhone);
      //   console.log(container.children[idx]);
      //   showPhones(ele.classList[1]);
      detailedReview(detailPhone);
    });
  });
};

async function detailedReview(detailedName) {
  let res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${detailedName}`
  );
  let jsonData = await res.json();
  let data = jsonData.data;
  //   console.log(data);
}

// Function for showing the mobile phones and search query
let phoneArr = [];
async function showPhones(phone) {
  let res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${phone}`
  );
  let jsonData = await res.json();
  let data = jsonData.data;
  //   console.log(data);
  phoneArr = data;
  //   console.log(phoneArr);
  displayPhones(data);
}

window.onload = function () {
  showPhones(13);
};

// console.log("Working");

// let fruits = [
//   { name: "iPhone 13 mini" },
//   { name: "AOrange" },
//   { name: "Apple" },
//   { name: "Mango" },
// ];

// let arrWithIndex = fruits.filter((ele) => {
//   return ele.name.indexOf("13") !== -1;
// });

// console.log(arrWithIndex);
// let arrWithIncludes = fruits.filter((ele) => {
//   return ele.name.includes("13");
// });
// console.log(arrWithIncludes);
