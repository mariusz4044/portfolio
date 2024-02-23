(() => {
  const navExperience = document.querySelector("#experience");
  const navAbout = document.querySelector("#about");
  const navProjects = document.querySelector("#projects");
  const navContact = document.querySelector("#contact");
  const observeElements = document.querySelectorAll(".observeBased");
  const observeElementsRight = document.querySelectorAll(".observeBasedRight");
  const observeElementsAssets = document.querySelectorAll(".observeAssets");
  const redirectButton = document.querySelector(".about-left button");
  const navOvserveElements = document.querySelectorAll(".nav-observer");

  [navExperience, redirectButton].forEach((el) => {
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
    const tabs = ["main-box", "stack", "projects-container", "contact-box"];
    const nav = ["about", "experience", "projects", "contact"];

    tabs.forEach((tab, i) => {
      const currentNavElement = document.querySelector(
        `#${nav[i]} .select-nav`
      );
      if (!currentNavElement) return;

      if (tab === element.id) currentNavElement.style.width = "100%";
      else currentNavElement.style.width = "0";
    });
  }

  function isObserve(entry, type) {
    if (!entry.target.classList.contains(type)) {
      return false;
    }

    return true;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      //Only once show animation.
      if (isObserve(entry, "observeBased")) {
        entry.target.classList.add("show");
      }

      if (isObserve(entry, "observeAssets")) {
        entry.target.classList.add("showAssets");
      }

      if (isObserve(entry, "observeSize")) {
        entry.target.classList.add("showSize");
      }
      if (isObserve(entry, "observeBasedRight")) {
        console.log(1);
        entry.target.classList.add("showRight");
      }
    });
  });

  const observeNavChange = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      changeCurrentTab(entry.target);
    });
  });

  [
    ...observeElements,
    ...observeElementsAssets,
    ...observeElementsRight,
  ].forEach((element) => {
    observer.observe(element);
  });

  navOvserveElements.forEach((element) => {
    observeNavChange.observe(element);
  });

  let dots = [];

  //Create random stars
  const canvas = document.querySelector("#canv");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth + window.innerWidth * 0.8; //Generate 8% more space for move background.
  canvas.height = window.innerHeight + window.innerHeight * 0.8;

  function draw() {
    dots = [];
    for (let i = 0; i < 600; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const radius = Math.random() * 2 + 0.2;
      const opacity = Math.random() * 0.5 + 0.2;

      dots.push({ x, y, radius, opacity, i });
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const dot of dots) {
      ctx.beginPath();

      if ((dot.i + 1) % 7 === 0) {
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

  window.addEventListener(
    "resize",
    () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      if (w <= 1900 || h <= 1080) {
        //re-generate only for big screens.
        return;
      }

      canvas.width = w;
      canvas.height = h;
      draw();
    },
    false
  );

  draw();

  //Project image preview

  function setFakeImage(fakeImage, elementSize) {
    fakeImage.style.width = `${elementSize.width}px`;
    fakeImage.style.height = `${elementSize.height}px`;
    fakeImage.style.zIndex = "2";
    fakeImage.style.left = `${elementSize.leftPos}px`;
    fakeImage.style.top = `${elementSize.topPos - 70}px`;
  }

  function getElementsPostions(e) {
    const leftPos = e.target.getBoundingClientRect().left;
    const topPos = e.target.getBoundingClientRect().top;

    return {
      width: e.target.offsetWidth,
      height: e.target.offsetHeight,
      leftPos,
      topPos,
    };
  }

  function changeImage({
    fakeImageContainer,
    fakeImage,
    dir,
    currentIndeks,
    maxImageIndeks,
    projectDir,
  }) {
    currentIndeks += dir;
    if (currentIndeks > maxImageIndeks) {
      return maxImageIndeks;
    }
    if (currentIndeks < 1) {
      return 1;
    }

    toggleAnim(fakeImageContainer);

    setTimeout(() => {
      fakeImage.src = `./assets/${projectDir}/${currentIndeks}.webp`;
    }, 300);
    return currentIndeks;
  }

  function toggleAnim(el, status) {
    const element = el.querySelector(".image-loader");

    if (!status) {
      element.style.opacity = "1";
    }

    setTimeout(() => {
      element.style.opacity = "0";
    }, 350);
  }

  function toggleArrows(box, status) {
    const counter = box.querySelector(".slider-count");

    const arrows = box.querySelectorAll(".arrow");
    arrows.forEach((el) => {
      if (status) return el.classList.add("arrow-show");
      el.classList.remove("arrow-show");
    });

    if (status) return counter.classList.add("show-count");
    counter.classList.remove("show-count");
  }

  function createSlider(box, element) {
    box.style.background = "#000000ab";
    element.style.width = `70%`;
    element.style.height = `auto`;
    element.style.setProperty("left", `calc(50% - 35%)`);
    element.style.top = `100px`;
  }

  document.querySelectorAll(".project-box").forEach((el) => {
    createListener(el, el.querySelector(".image-box"));
  });

  function createListener(el, imageBox) {
    if (!el.querySelector(".preview-box")) return; //No preview;
    imageBox.addEventListener("click", (e) => {
      const previewBox = el.querySelector(".preview-box");
      const fakeImageContainer = previewBox.querySelector(".image-container");
      const fakeImage = previewBox.querySelector(".image-container img");
      const arrowLeft = fakeImageContainer.querySelector(".fa-arrow-left");
      const arrowRight = previewBox.querySelector(".fa-arrow-right");
      const counter = fakeImageContainer.querySelector(".slider-count");

      //fill images max

      const maxImageIndeks = +previewBox.dataset.includeImages;
      const projectDir = previewBox.dataset.dir;
      let currentIndeks = 1;

      const postisons = getElementsPostions(e);

      previewBox.style.display = "block";
      previewBox.style.position = "fixed";

      previewBox.style.width = "100vw";
      previewBox.style.height = "100vh";
      previewBox.style.left = `0`;
      previewBox.style.top = `70px`;

      setFakeImage(fakeImageContainer, postisons);
      setTimeout(() => {
        createSlider(previewBox, fakeImageContainer);
      }, 100);

      previewBox.addEventListener("click", (event) => {
        //Remove slider
        if (!event.target.classList.contains("preview-box")) return;
        const currentPositions = getElementsPostions(e);

        previewBox.style.background = "transparent";
        setFakeImage(fakeImageContainer, currentPositions);

        setTimeout(() => {
          previewBox.style.display = "none";
        }, 350);
      });

      document.querySelector(
        ".slider-count"
      ).innerText = `${currentIndeks} / ${maxImageIndeks}`;

      const changeImageCfg = {
        fakeImageContainer,
        fakeImage,
        dir: 0,
        currentIndeks,
        maxImageIndeks,
        projectDir,
      };

      counter.innerText = `${changeImageCfg.currentIndeks} / ${changeImageCfg.maxImageIndeks}`;

      arrowLeft.addEventListener("click", () => {
        changeImageCfg.dir = -1;
        changeImageCfg.currentIndeks = changeImage(changeImageCfg);

        counter.innerText = `${changeImageCfg.currentIndeks} / ${changeImageCfg.maxImageIndeks}`;
      });

      arrowRight.addEventListener("click", () => {
        changeImageCfg.dir = 1;
        changeImageCfg.currentIndeks = changeImage(changeImageCfg);
        counter.innerText = `${changeImageCfg.currentIndeks} / ${changeImageCfg.maxImageIndeks}`;
      });

      fakeImageContainer.addEventListener("mouseover", () => {
        toggleArrows(fakeImageContainer, true);
      });

      fakeImageContainer.addEventListener("mouseout", () => {
        toggleArrows(fakeImageContainer, false);
      });
    });
  }

  function createRandomMeteors() {
    const container = document.querySelector("#meteor-box");

    const meteor = document.createElement("div");
    meteor.classList.add("meteor");
    meteor.style.left = `${Math.random() * 100}vw`;
    meteor.style.opacity = Math.random() * 0.4 + 0.1;

    const delay = Math.random() * 5;
    const startLeft = Math.random() * 100;
    const speed = Math.random() * 5 + 3;
    meteor.style.animation = `fall ${speed}s linear ${delay}s forwards`;
    meteor.style.left = `${startLeft}%`;
    meteor.style.transition = `opacity ${speed}s`;

    container.appendChild(meteor);

    meteor.addEventListener("animationend", () => {
      meteor.remove();
    });
  }

  function spawnRandomMeteors() {
    const randomMeteorCount = Math.floor(Math.random() * 6 + 3);
    for (let i = 0; i < randomMeteorCount; i++) {
      createRandomMeteors();
    }
  }

  spawnRandomMeteors();
  setInterval(spawnRandomMeteors, 4000);
})();
