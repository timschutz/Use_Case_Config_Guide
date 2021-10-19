let closeBtn = document.getElementById("closeBtn");
let openBtn = document.getElementById("openContainer");
let menuSlider = document.getElementById("menu");
let totalPages = 0;
let currPage = 0;

// SIDE MENU FUNCTIONS
let menuWidth = document.getElementById('menu').offsetWidth * -1;
gsap.to(menuSlider, {x: menuWidth, duration: 0});

  openBtn.addEventListener('click', function (){
    openNav();
  });
  closeBtn.addEventListener('click', function (){
    closeNav();
  });

function openNav() {
  gsap.to(menuSlider, {x: 0, duration: 0.8, ease: "expo"});
}

function closeNav() {
  gsap.to(menuSlider, {x: menuWidth, duration: 0.8, ease: "expo"});
}

// CREATING THE SLIDES
let theSliderContent = new Splide( '.splide', {
    width : '100vw',
    // height: '100%',
		height: '100vh',
    easing: 'ease',
} ).mount();

// LISTENING FOR ARROW CLICKS & UPDATING MENU ACCORDINGLY
theSliderContent.on( 'moved', function () {
  currPage = theSliderContent.Components.Controller.getIndex();
  arrowClick(currPage);
  closeNav();
} );

// LISTENING FOR CLICKS IN THE MENU & SETTING CURRENT SLIDE STATUS
let remContainer = document.getElementById('btnContainer');
let remCount = remContainer.children.length;

let firstSlideSelect = document.getElementById('menuBtn');
firstSlideSelect.className = 'sidenavCurrent';

for(let i=0; i<remCount; i++){
  totalPages++;
  remContainer.children[i].addEventListener('click', function (){
    menuClick(remContainer.children[i], i);
  });
}

// UPDATING THE MENU BASED WHEN MENU BUTTON CLICKED
function menuClick(thisButton, i){
  resetMenu();
  theSliderContent.go(i);
  closeNav();
  thisButton.className = 'sidenavCurrent';
}

// UPDATING THE MENU BASED WHEN ARROW BUTTON CLICKED
function arrowClick(x){
  resetMenu();
  for(let i=0; i<remCount; i++){
    if(i == x){
      remContainer.children[i].className = 'sidenavCurrent';
    }
  }
}

function resetMenu() {
  let remContainer = document.getElementById('btnContainer');
  let remCount = remContainer.children.length;

  for(let i=0; i<remCount; i++){
    remContainer.children[i].classList.remove('sidenavCurrent');
  }
}

// SLIDE IMAGE & HEADER NUMBER GENERATOR 
setSlideImage();

function setSlideImage() {
  for(let i=0; i<totalPages; i++){
    let currSlide = 'slide' + (i + 1);
    let currDiv = document.getElementById(currSlide);
    let slideImage = 'url(assets/slide' + (i + 1) + '.jpg)';
    currDiv.style.backgroundImage = slideImage;
    currDiv.style.backgroundSize = 'cover';
  }
}

openNav();



