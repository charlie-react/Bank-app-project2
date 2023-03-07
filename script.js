'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const content = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const section1 = document.querySelector('#section--1');
const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
const slides = document.querySelectorAll('.slide');
const btnRight = document.querySelector('.slider__btn--right');
const btnLeft = document.querySelector('.slider__btn--left');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

// btnCloseModal.addEventListener('click', closeModal);
// overlay.addEventListener('click', closeModal);

// document.addEventListener('keydown', function (e) {
//   if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
//     closeModal();
//   }
// });

btnsOpenModal.forEach(btns => {
  btns.addEventListener('click', openModal);
  btnCloseModal.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });
});
// all mark up is converted to document objects called nodes
// type of nodes
// text,element,comment,document

// implementin scroll to
const btnScrollTo = document.querySelector('.btn--scroll-to');

btnScrollTo.addEventListener('click', function () {
  section1.scrollIntoView({ behavior: 'smooth' });
});

// implementin smooth scroll

// document.querySelectorAll('.nav__link').forEach(function( ancorEl){

//  ancorEl.addEventListener('click',function(e){
//     // we didnt use an arrow function because this would point to  the for each call back function which is a function expression
//   e.preventDefault()
//   const id =this.getAttribute('href')
//   console.log(id)
//   document.querySelector(id).scrollIntoView({behavior:'smooth'})

//  })
// })

//Buildin tabbed components

tabsContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('operations__tab')) {
    tabs.forEach(el => {
      el.classList.remove('operations__tab--active');
    });
    e.target.classList.add('operations__tab--active');
    // removin active classes
    content.forEach(el => {
      el.classList.remove('operations__content--active');
      //solution to display content
      document
        .querySelector(`.operations__content--${e.target.dataset.tab}`)
        .classList.add('operations__content--active');
    });
  }
});

// talkin about dataset attributes
// const button1 =document.querySelector('.operations__tab--1')

// console.log(button1.dataset.tab)

// Implementin the fade out features
const handleHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    console.log(e.target);
    const siblings = e.target.closest('.nav').querySelectorAll('.nav__link');
    siblings.forEach(el => {
      if (e.target !== el) {
        el.style.opacity = opacity;
      }
    });
  }
};
nav.addEventListener('mouseover', function (e) {
  handleHover(e, 0.5);
});
nav.addEventListener('mouseout', function (e) {
  handleHover(e, 1);
});

// intersection observer API
//  const  callBackFn = function(entries,observer){
//   const [entry] =entries
//   console.log(entry)
// // entries is an array,that comes from the threshold
//  }
//  const observerOptions ={
//   threshold: 0.1, //100% value ..0.1 is 10% for instance(threshold is a way of setting the amount of your observed element to be seen against d viewport before the cb is called ),settin it to 0,means when its not visible on the viewport...it can be multiple values too,set in an array
//   root : null
//   // settin the root to null,the selected section or elemet is compared agianst the viewport,it could be anythin you want to compare ur element against
//  }
// const observer = new IntersectionObserver(callBackFn,observerOptions)
// observer.observe(section1)
// it is a higher order function,takes in two arguments-a cb func and a observer option

// sticky nav

const stickyNav = function (entries, observerHeader) {
  const [entry] = entries;
  console.log(typeof entry);
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};
const observerOptions = {
  threshold: 0,
  root: null,
  rootMargin: '-90px', //(margin around the root ,the viewpoint which in tis case,reduces te height of the viewport,meanin,we will be getting the sticky effect even before the target element is completely out of sight)
};
const observerHeader = new IntersectionObserver(stickyNav, observerOptions);
observerHeader.observe(header);

//revealin features

const obsFn = function (entries, obsOpt) {
  const [entry] = entries;
  console.log(typeof entry);
  if (entry.isIntersecting) {
    entry.target.classList.remove('section--hidden');
  }
};
const obsOpt = {
  root: null,
  threshold: 0.15,
};
const observer = new IntersectionObserver(obsFn, obsOpt);
allSections.forEach(section => {
  section.classList.add('section--hidden');
  observer.observe(section);
});

//IMPLEMENTING LAZY LOADING IMAGES
// const loadingImg = function (entries, imgObserver) {
//   const [entry] = entries;
//   entry.target.src = entry.target.dataset.src;
//   entry.target.addEventListener('load', function () {
//     entry.target.classList.remove('lazy-img');
//   });
// };
// const imgObserver = new IntersectionObserver(loadingImg, {
//   root: null,
//   threshold: 0,
//   rootMargin: '200px',
// });
// imageTargets.forEach(img => {
//   imgObserver.observe(img);
// });

// slider
const maxNumberOfSlides = slides.length - 1;
let currentSlide = 0;
slides.forEach((slide, i) => {
  // 0,100%,200%
  slide.style.transform = `translateX(${100 * i}%)`;
});

btnRight.addEventListener('click', function () {
  if (currentSlide === maxNumberOfSlides) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
 
  slides.forEach((slide, i) => {
    // 0,100%,200%
    console.log(i)
    slide.style.transform = `translateX(${100 * (i - currentSlide)}%)`;

  });
});

// btnLeft.addEventListener('click',function(){
//   // if (currentSlide === 0) {
//   //   currentSlide = maxNumberOfSlides;
//   // } else {
    
//   // }
//   currentSlide--;

//   slides.forEach((slide, i) => {
//     // 0,100%,200%
//     slide.style.transform = `translateX(${100 * (i - currentSlide)}%)`;
//   });
// })

// 0,100%,200%

// ask question about d storin d handleHover called in a variable,(restroom)

// mouseenter doesn't bubble up,mouseover does
//

// my own solution to display content
// tabsContainer.addEventListener('click', function (e) {
//   if (e.target.classList.contains('operations__tab')) {
//     content.forEach(el => {
//       el.classList.remove('operations__content--active');
//     });
//     content.forEach((el, index) => {
//       if (e.target.classList.contains(`operations__tab--${index + 1}`)) {
//         el.classList.toggle('operations__content--active');
//       }
//     });
//   }
// });

// why do we get a response as well wen we click on any of d buttons,it is cos d event it generated is picked up at te bubblin phase

// Using Event Delegation
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// an event is a signal generated by a DOM node(a node is an object representation of anything on our mark up)

// TYPES OF EVENTS AND EVENT HANDLERS
// const h1 = document.querySelector('h1');

// const x =function(){
//   alert('you just moved the on the h1');
//   h1.removeEventListener('mouseenter',x)
// }

// h1.addEventListener('mouseenter',x)
//with our traditional way of adding an event,we have the added advantage of also removing the event as done above by exporting the function

// another way
// h1.onclick=function(){
//   alert('you just moved on the h1')
// }
// EVENT PROPAGATION :BUBBLING AND CAPTURING

// IN the diagramatic example  ,when the anchor is clicked for example,te event isnt generated at the anchor but from te root doc ..it thens begins to move down from the root element(html) to that anchor(target element),this is called EVENT CAPTURING,THAT PHASE IS CALLED CAPTURIN PHASE.THE REVERSE IS WHEN THE DIRECTION CHANGES FROM TE TARGET ELEMENT TO THE ROOT ELEMENT,IT IS CALLED EVENT BUBBLING,THAT PHASE IS CALLED BUBBLING PHASE

// that exact time when the target element is reached what is called TARGET PHASE

// IT is in the target phase OR the bubbling phase that we can begin to listen for an event and handle it

// ThE  UP AND DOWN MOVEMENT IS CALLED EVENT PROPAGATION

// NOTE:not all events have the capturing phase and bubbling phase

// QSTN:LINE 83.

// EVENT PROPAGATION IN PRACTICE

document.querySelector('.nav__link').addEventListener('click', function (e) {
  e.preventDefault();
  // this.style.backgroundColor = 'seagreen';
  //e.stopPropagation()
  console.log(e.target);
  console.log(this === e.currentTarget);
});
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // this.style.backgroundColor = 'sandybrown';
  console.log(e.target);
});
document.querySelector('.nav').addEventListener('click', function (e) {
  e.preventDefault();
  // this.style.backgroundColor = 'tomato';
  console.log(e.target);
});

// Interview question:the this keyword points to the currentTarget which is the same as the element bound to the addEventListener.

// by default events are listened to in the bubbling phase but you can do this in the capturing phase if we like,by settin a third argument on the addEventListener,its called  the useCapture,a boolean variable that can be set to true or false.

// NOTE:you cant simultaenously listen to events in both the capturing and bubbling

// DOM TRAVERSIN
//GoinG DOWNWARDS
const h1 = document.querySelector('h1');
// console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
// console.log(h1.children)
// h1.firstElementChild.style.color ='blue'
// console.log(h1.firstElementChild)
// console.log(h1.lastElementChild)

//GoinG uPWARDS
console.log(h1.parentNode);
console.log(h1.parentElement);
console.log(h1.closest('.header')); //exact opposite of d queryselectorAll...looks for d closest element(parent) that has d selector supplied,for d queryselector,it looks deep down to look for children,it can take the element name or te selector . or #

// GoinG sideways(accessing siblings,u can only access d immediate sibling in JS)

console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);
console.log(h1.parentElement.children);
// const arrOfEl =Arrayfrom(h1.parentElement.children)
// const arrOfEl =[...h1.parentElement.children]

// arrOfEl.forEach((el)=>{
//   if(el !== h1){
//     el.style.transform ='rotate(5deg)'
//   }
// })

// selectin elements

const section = document.querySelector('.section');
// alwyas remember tat te query selector can directly take in a element,p or h1
const allSection = document.querySelectorAll('.section'); //returns a nodelist
// const section1 =document.getElementById('section--1')
const navItems = document.getElementsByClassName('nav__item'); //returns an HTML collection;a live collection
// The Difference between a nodelist and html collection is when the dom is updated the html collection is automatically updtaed unlike the nodelist

const allButtons = document.getElementsByTagName('button'); //returns a live collection as well

// creatin and insertin elements
// insertAdjacentHTML(ALready discussed in mobile app)

const myDiv = document.createElement('div');
myDiv.classList.add('cookie-message');
myDiv.innerHTML = `We use cookies for improved accessibility and functionality <button class='btn--close-cookie'>GOT IT<button>`;
// difference between te textcontent and innerHTML is with the latter you can even insert a new elemnt that is recognized
console.log(myDiv);

// header.prepend(myDiv) //prepend adds the elments as te first child of the parent element

//  header.append(myDiv) //append adds it as the last child

//  to clone this myDiv element which is a live and unique actually with the   CloneNode wit an argument true

// header.prepend(myDiv.cloneNode(true))

//sibling placement...AFTER AND BEFORE

// header.before(myDiv)

// header.after(myDiv)

// Deletin elements

// document.querySelector('.btn--close-cookie').addEventListener('click',function(){
//   myDiv.remove()
// })

// Styles,attributes and classes

myDiv.style.backgroundColor = 'slateblue';
myDiv.style.width = '100%';

console.log(getComputedStyle(myDiv).height); //getComputedStyle gets us all the style on an element we can then access anyone say height

myDiv.style.height = parseFloat(getComputedStyle(myDiv).height) + 20 + 'px';

// attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.src);
console.log(logo.alt);
console.log(logo.className);

// anoda way
console.log(logo.getAttribute('src'));
console.log(logo.getAttribute('id'));
console.log(logo.getAttribute('class'));

logo.setAttribute('id', 'Enaira');

//

// classes

console.log(logo.classList);
logo.classList.add('j');
logo.classList.remove('j');
logo.classList.toggle('k');
logo.classList.contains('k');
