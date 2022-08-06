// ---
const hamMenuBtn = document.querySelector(".header__main-ham-menu-cont");
const smallMenu = document.querySelector(".header__sm-menu");
const headerHamMenuBtn = document.querySelector(".header__main-ham-menu");
const headerHamMenuCloseBtn = document.querySelector(
  ".header__main-ham-menu-close"
);
const headerSmallMenuLinks = document.querySelectorAll(".header__sm-menu-link");

hamMenuBtn.addEventListener("click", () => {
  if (smallMenu.classList.contains("header__sm-menu--active")) {
    smallMenu.classList.remove("header__sm-menu--active");
  } else {
    smallMenu.classList.add("header__sm-menu--active");
  }
  if (headerHamMenuBtn.classList.contains("d-none")) {
    headerHamMenuBtn.classList.remove("d-none");
    headerHamMenuCloseBtn.classList.add("d-none");
  } else {
    headerHamMenuBtn.classList.add("d-none");
    headerHamMenuCloseBtn.classList.remove("d-none");
  }
});

for (let i = 0; i < headerSmallMenuLinks.length; i++) {
  headerSmallMenuLinks[i].addEventListener("click", () => {
    smallMenu.classList.remove("header__sm-menu--active");
    headerHamMenuBtn.classList.remove("d-none");
    headerHamMenuCloseBtn.classList.add("d-none");
  });
}

// ---
const headerLogoConatiner = document.querySelector(".header__logo-container");

headerLogoConatiner.addEventListener("click", () => {
  location.href = "index.html";
});

document.addEventListener(
  "DOMContentLoaded",
  function () {
    getProjectsFromGitHub();
  },
  false
);

function getProjectsFromGitHub() {
  function getFullReposEndpointURL(repos) {
    const tempRepos = [];
    repos.forEach((repo) => {
      tempRepos.push(`${GITHUB_REPOS_ENDPOINT}${repo}`);
    });
    return tempRepos;
  }

  function namesWithoutDashes(name) {
    return name.split("-").join(" ");
  }

  function removeLoader() {
    document.querySelector(".loader-container").style.display = "none";
    document.body.style.overflowY = "scroll";
  }

  async function getShowcaseResponseData(fullReposURL) {
    const tempData = [];
    const projectsShowcase = document.getElementById("showcase");

    await fullReposURL.forEach((repo) => {
      fetch(repo)
        .then((data) => data.json())
        .then((res) => {
          const projectHTML = `
            <div class="projects__content-project">
              <figure class="item">
                <img src="https://raw.githubusercontent.com/mohamedhany01/${
                  res.name
                }/main/preview/preview.png" alt="preview">
              </figure>
              <div class="container">
                <div class="item">
                  <h3>${namesWithoutDashes(res.name)}</h3>
                </div>
                <div class="item">
                  <p>${res.description}</p>
                </div>
                <div class="item">
                  <ul class="technologies">
                    ${res.topics.map((topic) => `<li>${topic}</li>`).join("")}
                  </ul>
                </div>
                <div class="item btn-row">
                  <a href="${
                    res.html_url
                  }" target="_blank" class="btn">Source Code</a>
                  <a href="${
                    res.homepage
                  }" target="_blank" class="btn btn--theme">Live Demo</a>
                </div>
              </div>
            </div>
          `;
          projectsShowcase.insertAdjacentHTML("afterbegin", projectHTML);
        });
    });

    return tempData;
  }

  const GITHUB_REPOS_ENDPOINT = "https://api.github.com/repos/mohamedhany01/";
  const REPOS_SHOWCASE = [
    "authentication-app",
    "github-profile-finder",
    "numbers-game",
    "cs50x-finance-app",
  ];
  const SHOWCASE_REPOS_FULL_URL = getFullReposEndpointURL(REPOS_SHOWCASE);

  setTimeout(() => {
    getShowcaseResponseData(SHOWCASE_REPOS_FULL_URL).finally(() => {
      removeLoader();
    });
  }, 2500);
}
