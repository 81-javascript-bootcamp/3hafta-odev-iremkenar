const petsModule = (function(){
    const _data = [
        {
            image: "https://pet-uploads.adoptapet.com/1/6/b/406528149.jpg",
            name: "Sam",
            type: "Golden Retriever/St. Bernard Mix",
            sound: "bark",
            soundText: "Bark - type b"
            soundKey: 66,
            backgroundColor: "purple"
        },
        {
            image: "https://pet-uploads.adoptapet.com/0/f/3/462356648.jpg",
            name: "Mellie",
            type: "Domestic Shorthair",
            sound: "meow",
            soundText: "Meow - type m"
            soundKey: 77,
            backgroundColor: "blue"
        }
    ];
    const $tbodyEl = document.querySelector("tbody");
    const $buttons= document.querySelectorAll("button");
    const $petRows = $tbodyEl.querySelectorAll("tr");
    const $mainImage = document.querySelector("main-image");

    const getButtons = function(){
        return document.querySelectorAll("button");
    }

    const createPetElement = function(pet){
        return "<tr><td><img class='pet-image' src='"+pet.image+"' /></td><td>"+pet.name+"</td><td>"+pet.type+"</td><td><button data-sound='"+pet.sound+"'>"+pet.soundText+"</button></td></tr>"
    };

    const addToTable = function(content){
        $tbodyEl.innerHTML += content;
    }

    const putPetsInHtml = function(){
        for(let i=0; i< _data.length; i++){
            addToTable(createPetElement(_data[i]));
        }
    }
    // Pet tablosundaki tum satirlari getirmek icin
    const getPetRows = function() {
        return $tbodyEl.querySelectorAll("tr");
    }
    //Pet tablosundaki satirlara tıklandiginda satir renginin degismesi icin iki metodu asagida bulabilirsiniz
    // Metod 1 - Dynamic row color
    const changePetRowColor = function () {
        const rows = getPetRows();
        for(let i= 0; i< rows.length; i++){
            rows[i].addEventListener("click", function(event){
                rows[i].style.backgroundColor = _data[i].backgroundColor;
                rows[i].style.color = "white";
            });
        }
    }
    // Metod 2 - Static row color
    /*const changePetRowColor = function () {
        const rows = getPetRows();
        for(let i= 0; i< rows.length; i++){
            rows[i].addEventListener("click", function(event){
                const selectedRow = this.style;
                selectedRow.backgroundColor = "purple";
                selectedRow.color = "white";
            });
        }
    }*/

    //Satira tikladiginda ana gorselin secili pet gorseli olmasi icin
    const setPetAsMainImage = function () {
      const rows = getPetRows();
      for(let i= 0; i< rows.length; i++){
          rows[i].addEventListener("click", function(event){
              const mainImage = document.querySelector(".main-image");
              mainImage.setAttribute("src", _data[i].image);
          });
      }
    }

    // Buton uzerinde belirtilen tusa basildiginda ilgili hayvanin sesinin calmasi icin
    const playSoundByKey = function () {
        document.addEventListener("keydown", function(event){
            for(let i=0; i< _data.length; i++){
                if (event.keyCode === _data[i].soundKey){
                        const soundId = _data[i].sound;
                        const soundElement = document.getElementById(soundId);
                        if(soundElement){
                            soundElement.play();
                        }
                }
            }            
        }); 
    }

    const bindEvents = function(){
        const buttons = getButtons();
        for(let i= 0; i< buttons.length; i++){
            buttons[i].addEventListener("click", function(event){
                //Butona basildiginda satir renginin degismemesi icin
                event.stopPropagation();
                const soundId = this.dataset.sound;
                const soundElement = document.getElementById(soundId);
                if(soundElement){
                    soundElement.play();
                }
            });
        }
    }

    const init = function(){
        putPetsInHtml();
        bindEvents();
        playSoundByKey();
        changePetRowColor();
        setPetAsMainImage();
    }

    return {
        init: init
    }
})();