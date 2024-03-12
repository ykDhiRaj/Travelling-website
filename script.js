gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});





// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();



var tl = gsap.timeline();

tl.from("#nav a",{
    y:-100,
    delay:1,
    duration:2,
    opacity:0,
    stagger:0.3
});

gsap.from("#description h1, #description p ",{
    scale:0,
    delay:1,
    duration:1.5,
    stagger:1
})

gsap.from("#explore h1, #explore p",{
    y:100,
    duration:1,
    opacity:0,
    scrollTrigger:{
        trigger:"#explore h1, #explore p",
        scroller:"#main",
        duration:2,
        delay:1,
        scrub:2
    }
})

gsap.from("#journal h1, #journal p",{
    y:100,
    duration:1,
    opacity:0,
    scrollTrigger:{
        trigger:"#journal h1, #journal p",
        scroller:"#main",
        duration:2,
        delay:1,
        scrub:2
    }
})

gsap.from("#imgbox img, #box1 img, #box2 img",{
    scale:0,
    opacity:0,
    duration:2,
    scrollTrigger:{
        trigger:"#imgbox img, #box1 img, #box2 img",
        scroller:"#main",
        scrub:2
    }
})

var main = document.querySelector("#main");
var crsr = document.querySelector("#crsr");

main.addEventListener("mousemove",function(dets){
  crsr.style.top = dets.y+"px"
  crsr.style.left = dets.x+"px"
})