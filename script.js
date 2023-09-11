(()=>{
    const navExperience = document.querySelector('#experience');
    const navAbout = document.querySelector('#about');
    const navProjects = document.querySelector('#projects');
    const navContact = document.querySelector('#contact');

    navExperience.addEventListener('click',()=>{
        document.querySelector('#experience-box').scrollIntoView();
    });

    navAbout.addEventListener('click',()=>{
        document.querySelector('#about-box').scrollIntoView();
    });


})();