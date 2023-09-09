import { array_projects } from "./data.js";

// elemento de interfaz, se va a ejecutar cuando cargue el elemento, la página html
document.addEventListener("DOMContentLoaded", () => {
  
  const ocupaciones = document.querySelector(".ocupaciones");
  const figure_scroll = document.querySelector(".figure_scroll");

  function slider() {
    setTimeout(() => {

      ocupaciones.style.color = "red";
      ocupaciones.textContent = "Ingeniera";

    }, 0);

    setTimeout(() => {
      ocupaciones.textContent = "Programadora";
      ocupaciones.style.color = "blue";

    }, 4000);

    setTimeout(() => {
      ocupaciones.textContent = "Diseñadora";
      ocupaciones.style.color = "purple";

    }, 8000);
  }

  // slider();
  // setInterval(slider, 12000);

  const listItemA = [...document.querySelectorAll(".list__a")];
  const listElementB = [...document.querySelectorAll(".element__before")];
  const input_menu = document.querySelector(".input_menu");

  listItemA.map((item) => {
    item.addEventListener("click", (e) => {
      listElementB.map(itemB => {
        itemB.classList.remove("item_active");
      })

      listElementB[parseInt(item.dataset.id)].classList.add("item_active");
      if (input_menu.checked) {
        input_menu.checked = false;
      }
    })
  })

  const list_section = [...document.querySelectorAll(".sections")];
  let h = window.innerHeight / 3 * 2;

  const item_active = () => {
    // if(listItemA[0].getBoundingClientRect().top < h){

    //     listElementB[0].classList.add("item_active");
    // }
    list_section.map((item) => {
      if (item.getBoundingClientRect().top < h) {
        listElementB.map(span => {
          span.classList.remove("item_active");
        })
        listElementB[parseInt(item.dataset.id)].classList.add("item_active");
      }
    })
  }

  // Evento para activar el item de la seccion presente en la vista
  window.addEventListener("scroll", (e) => {
    item_active();

    let scroll_top = window.scrollY;
    if(scroll_top > 500){
      figure_scroll.classList.add("scroll_active");
    }else{
      figure_scroll.classList.remove("scroll_active");
    }
  })

  figure_scroll.addEventListener("click",()=>{
    window.scrollTo(0,0);
  })

  // función para filtrar proyectos

  const cards__container = document.querySelector(".cards__container");

  function filter_projects(array) {

    if (array.length === 0) {
      cards__container.innerText = "No se encontraron proyectos";
    } else {
      cards__container.innerHTML = "";

      array.map((value) => {
        const card = document.createElement("DIV");
        card.innerHTML = `
                <div class="card cards__projects">
                  <img src=${value.image} class="img__project">
                  <h3 class="title__project">${value.name}</h3>
                  <div class="cardinfo">
                    <p class="descripcion__project">${value.description}</p>
                    <a target="_blank" href=${value.link} class="botones btn__cardinfo btncard1">Ver proyecto</a>
                  </div>
                </div>
                `
        cards__container.appendChild(card);
      })
    }
  }
  filter_projects(array_projects);

  const btn__projects = document.querySelectorAll(".btn__projects");
  for (let i = 0; i < btn__projects.length; i++) {
    const btn = btn__projects[i];
    btn.addEventListener("click", (e) => {

      btn__projects.forEach((btn_project)=>{
        btn_project.classList.remove("btn_active");
      });
      btn.classList.add("btn_active");

      const btn_filter = e.target.innerText.toLowerCase();

      if (btn_filter === "todos") {
        filter_projects(array_projects);
      } else {
        const filter = array_projects.filter((project) => btn_filter === project.category.toLowerCase());
        filter_projects(filter);
      }
    })
  }


})



