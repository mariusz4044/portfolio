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

  navContact.addEventListener("click", () => {
    document.querySelector("#contact-box").scrollIntoView();
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

  const dots = [];

  //Create random stars
  const canvas = document.querySelector("#canv");
  const ctx = canvas.getContext("2d");

  canvas.width = 1920;
  canvas.height = 1080;

  for (let i = 0; i < 500; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const radius = Math.random() * 2 + 0.2;
    const opacity = Math.random() * 0.5 + 0.2;

    dots.push({ x, y, radius, opacity, i });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const dot of dots) {
      ctx.beginPath();

      if ((dot.i + 1) % 8 === 0) {
        //Crucifix
        ctx.moveTo(dot.x - 3, dot.y);
        ctx.lineTo(dot.x + 3, dot.y);
        ctx.moveTo(dot.x, dot.y - 5);
        ctx.lineTo(dot.x, dot.y + 6);
        ctx.lineWidth = 1;
        ctx.strokeStyle = `rgba(255, 255, 255, ${dot.opacity})`;
        ctx.stroke();
      } else {
        //Dot
        ctx.arc(dot.x, dot.y, dot.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = `rgba(255, 255, 255, ${dot.opacity})`;
        ctx.fill();
      }
    }
  }

  draw();
})();
