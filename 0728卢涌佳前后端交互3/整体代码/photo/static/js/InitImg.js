export default class InitImg {
  constructor(imgUrl) {
    this.createElement(imgUrl);
  }

  createElement(imgUrl) {
    const div = document.createElement("div");
    const imgName = imgUrl.substring(imgUrl.indexOf("_") + 1);
    div.classList.add("photoItem");
    div.innerHTML = `
          <img src=${imgUrl} />
          <span>
          ${imgName}
          </span>
      `;
    document.querySelector(".photoContainer").appendChild(div);
  }
}
