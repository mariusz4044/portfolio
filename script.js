(() => {
  const navExperience = document.querySelector("#experience");
  const navAbout = document.querySelector("#about");
  const navProjects = document.querySelector("#projects");
  const navContact = document.querySelector("#contact");
  const observeElements = document.querySelectorAll(".observeBased");
  const observeElementsAssets = document.querySelectorAll(".observeAssets");

  navExperience.addEventListener("click", () => {
    document.querySelector("#experience-box").scrollIntoView();
  });

  navAbout.addEventListener("click", () => {
    document.querySelector("#about-box").scrollIntoView();
  });

  navProjects.addEventListener("click", () => {
    document.querySelector("#projects-box").scrollIntoView();
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (
        entry.isIntersecting &&
        entry.target.classList.contains("observeBased")
      ) {
        entry.target.classList.add("show");
      }

      if (
        entry.isIntersecting &&
        entry.target.classList.contains("observeAssets")
      ) {
        entry.target.classList.add("showAssets");
      }
    });
  });

  [...observeElements, ...observeElementsAssets].forEach((element) => {
    console.log(element);
    observer.observe(element);
  });
})();
