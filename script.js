(() => {
  const navExperience = document.querySelector("#experience");
  const navAbout = document.querySelector("#about");
  const navProjects = document.querySelector("#projects");
  const navContact = document.querySelector("#contact");
  const observeElements = document.querySelectorAll(".observeBased");
  const observeElementsAssets = document.querySelectorAll(".observeAssets");
  const redirectButton = document.querySelector('.about-left button');
  const navOvserveElements = document.querySelectorAll('.nav-observer');

  [navExperience, redirectButton].forEach(el=> {
    el.addEventListener("click", () => {
      document.querySelector("#experience-box").scrollIntoView();
    });
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

  function changeCurrentTab(element) {
    const tabs = ['main-box','stack','projects-box'];
    const nav = ['about','experience','projects'];

    tabs.forEach((tab,i)=>{
      const currentNavElement = document.querySelector(`#${nav[i]} .select-nav`);
      if(tab === element.id) currentNavElement.style.width = '100%';
      else currentNavElement.style.width = '0';
    })
  }

  function isObserve(entry,type) {
    if(!entry.target.classList.contains(type)) {
      return false;
    }

    return true;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if(!entry.isIntersecting) return;

      if (isObserve(entry,"observeBased")) {
        entry.target.classList.add("show");
      }

      if (isObserve(entry,"observeAssets")) {
        entry.target.classList.add("showAssets");
      }

    });
  });

  const observeNavChange = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      changeCurrentTab(entry.target);
    });
  });


  [...observeElements, ...observeElementsAssets].forEach((element) => {
    observer.observe(element);
  });

  navOvserveElements.forEach((element) => {
    observeNavChange.observe(element);
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
