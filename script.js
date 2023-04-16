const container = document.querySelector("#container");
const tops = document.querySelector("#tops");
const bottoms = document.querySelector("#bottoms");

const namefield = document.querySelector("#namefield");
const lastnamefield = document.querySelector("#lastnamefield");
const agefield = document.querySelector("#agefield");
const jobfield = document.querySelector("#jobfield");
const addbtn = document.querySelector("#addbtn");





  function createPerson(firstName, lastName, age, job) 
  {
    const persondiv = document.createElement("div");
    persondiv.classList.add("persondivcss", "upper");
    persondiv.innerHTML = 
    `<div id="person">${firstName} <br> ${lastName} <br> ${age}<br> <b>${job}</b></div>`;
    tops.appendChild(persondiv);

    let delbtn = document.createElement("button");
    delbtn.innerHTML = "X";
    delbtn.classList.add("deletebtn");
    persondiv.appendChild(delbtn)

    let timer = document.createElement("p");
    timer.classList.add("timer");
    persondiv.appendChild(timer)

    let timerId;
    let remainingTime;
    let startTime = Date.now();

    let ogage = age;
    
    const text = document.createElement("div");
    text.style.position = "absolute";
    text.style.display = "none";
    document.body.appendChild(text);

    //////////////////////////////////////////////

             

    const pause = () => {
      clearTimeout(timerId);
      remainingTime = 1000 - (Date.now() - startTime);
    };
    
    const resume = () => {
      timerId = setTimeout(countDown, remainingTime);
    };


    const countDown = () => {
      timer.innerHTML = ogage;
      ogage--;
      if (ogage >= 0) {
        timerId = setTimeout(countDown, 1000);
      } else {
      timer.innerHTML = "Completed";
      persondiv.classList.remove("upper");
      persondiv.classList.add("downer");
      bottoms.appendChild(persondiv);
      }
    };
    
    countDown();


    /////////////////////////////////////////////////


    persondiv.addEventListener("click", function() 
    {
      if (persondiv.classList.contains("upper")) 
      {
      persondiv.classList.remove("upper");
      persondiv.classList.add("downer");
      bottoms.appendChild(persondiv);
      pause();
      
      } 
      else if (persondiv.classList.contains("downer") && timer.innerHTML != "Completed") 
      {
      persondiv.classList.remove("downer");
      persondiv.classList.add("upper");
      tops.appendChild(persondiv);
      resume();
      }
      else
      {
        ogage += age + 1;
        countDown();
        persondiv.classList.remove("downer");
        persondiv.classList.add("upper");
        tops.appendChild(persondiv);
      }
      
    });


    delbtn.addEventListener("click", function(event)
    {       
       event.stopPropagation();
       clearTimeout(timerId);
       text.style.display = "none";
       persondiv.remove()
    })

    delbtn.addEventListener("mousemove", function(event) {
      event.stopPropagation();
      text.classList.add("text");
      text.style.left = event.pageX + 10 + "px";
      text.style.top = event.pageY + 10 + "px";
      text.style.display = "block";
      text.innerHTML = "Close game";
    });    
    

    persondiv.addEventListener("mousemove", function(event) {      
      event.stopPropagation();
      text.classList.add("text");
      text.style.left = event.pageX + 10 + "px";
      text.style.top = event.pageY + 10 + "px";
      text.style.display = "block";
      if (persondiv.classList.contains("upper") && ogage != "Completed")
      {
        text.innerHTML = "Pause game";
      }
      else if (persondiv.classList.contains("downer") && timer.innerHTML == "Completed")
      {
        text.innerHTML = "Repeat game";
      }      
      else if (persondiv.classList.contains("downer") && timer.innerHTML != "Completed")
      {
        text.innerHTML = "Resume game";
      }
    });

    persondiv.addEventListener("mouseout", function() {
      text.style.display = "none";
    });    
  }

let kyle = createPerson("Kyle", "Gale", 120, "Galaxian");
let maria = createPerson("Maria", "Veraads", 300, "Star Wars");
let vlad = createPerson("Vlad", "Litkinson", 10, "Star Wars");
let olga = createPerson("Olga", "Semechko", 15, "Railroad");

addbtn.addEventListener("click", function() 
  {
    createPerson(namefield.value, lastnamefield.value, Number(agefield.value), jobfield.value )
  })


  








