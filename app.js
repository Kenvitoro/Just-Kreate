/*slider producto */
let btnRP = document.getElementById("btn-rightP");
let btnLP = document.getElementById("btn-leftP");
let sliderP = document.getElementById("sliderP");
let slider__sectionP = ".SSP";



btnRP.addEventListener("click", () => {
   Next(sliderP, slider__sectionP);

})

btnLP.addEventListener("click", () => {
   Prev(sliderP, slider__sectionP);
})

/*slider interiores */
let btnRI = document.getElementById("btn-rightI");
let btnLI = document.getElementById("btn-leftI");
let sliderI = document.getElementById("sliderI");
let slider__sectionI = ".SSI";



btnRI.addEventListener("click", () => {
   Next(sliderI, slider__sectionI);

})

btnLI.addEventListener("click", () => {
   Prev(sliderI, slider__sectionI);
})

/*slider exteriores*/

let btnRE = document.getElementById("btn-rightE");
let btnLE = document.getElementById("btn-leftE");
let sliderE = document.getElementById("sliderE");
let slider__sectionE = ".SSE";



btnRE.addEventListener("click", () => {
   Next(sliderE, slider__sectionE);

})

btnLE.addEventListener("click", () => {
   Prev(sliderE, slider__sectionE);
})


/*FUNCION NEXT Y PREV DEL SLIDER */

function Next(sliderX, sliderSectionsX) {
   let pImagen = document.querySelectorAll(sliderSectionsX)[0];

   sliderX.style.marginLeft = "-200%";

   sliderX.style.transition = "all 0.5s ease-in-out";

   setTimeout(() => {
      sliderX.style.transition = "none";

      sliderX.insertAdjacentElement("beforeend", pImagen);

      sliderX.style.marginLeft = "-100%";

   }, 500)

}

function Prev(sliderX, sliderSectionsX) {
   let uImagen = document.querySelectorAll(sliderSectionsX)[document.querySelectorAll(sliderSectionsX).length - 1];

   sliderX.style.marginLeft = "-0%";

   sliderX.style.transition = "all 0.5s ease-in-out";

   setTimeout(() => {
      sliderX.style.transition = "none";

      sliderX.insertAdjacentElement("afterbegin", uImagen);

      sliderX.style.marginLeft = "-100%";

   }, 500)

}


/*--------------------------VALIDACION FORMULARIO----------------------------- */


const d = document;

const $form = d.querySelector(".form");
const $inputs = d.querySelectorAll(".form [required]");



$inputs.forEach((input) => {
   const $span = d.createElement("span");
   $span.id = input.name;
   $span.textContent = input.title;
   $span.classList.add("contact-form-error", "none");
   input.insertAdjacentElement("afterend", $span);
});


d.addEventListener("keyup",(e)=>{
if(e.target.matches(".form [required]")){
   let $input = e.target;
   let pattern = $input.pattern || $input.dataset.pattern;
   

if(pattern && $input.value !== ""){
   let regex = new RegExp(pattern);
   return !regex.exec($input.value)
   ?d.getElementById($input.name).classList.add("is-active")
   :d.getElementById($input.name).classList.remove("is-active");

      }
   }
})


d.addEventListener("submit",(e)=>{
   e.preventDefault();


   let $loader = d.querySelector(".contact-form-loader");
   let $submit = d.querySelector(".contact-form-response");


   $loader.classList.remove("none");



   fetch("https://formsubmit.co/ajax/andreskmora@gmail.com",{
      method: "POST",
      body: new FormData(e.target)
   })
      .then(res=>res.ok?res.json():Promise.reject(res))
      .then(json=>{
         $loader.classList.add("none");
         $submit.classList.remove("none");
        /* $submit.innerHTML = `<p>${json.message}</p>`*/
        $submit.innerHTML = `<p>Los datos han sido enviados</p>`
         $form.reset();
      })
      .catch(err=>{
         console.log(err);
         let message = err.statusText || "Ocurrio un error al enviar, intenta nuevamente";
         $submit.innerHTML = `Error: ${err.status}:${message}}`
      })

      .finally(()=>setTimeout(()=> $submit.classList.add("none"),3000))

  /* setTimeout(()=>{
      $loader.classList.add("none");
      $submit.classList.remove("none");
      $form.reset();


      
      setTimeout(()=> $submit.classList.add("none"),3000)

   },3000)*/
})