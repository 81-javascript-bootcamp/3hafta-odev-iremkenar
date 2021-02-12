const petsModule = (function(){
    const _data = [
        {
            image: "https://pet-uploads.adoptapet.com/1/6/b/406528149.jpg",
            name: "Sam",
            type: "Golden Retriever/St. Bernard Mix",
            sound: "bark",
            soundText: "Bark - type b"
            soundKey: 66
        },
        {
            image: "https://pet-uploads.adoptapet.com/0/f/3/462356648.jpg",
            name: "Mellie",
            type: "Domestic Shorthair",
            sound: "meow",
            soundText: "Meow - type m"
            soundKey: 66
        }
    ];
    const $tbodyEl = document.querySelector("tbody");
    const $buttons= document.querySelectorAll("button");

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
    //Pet tablosundaki satirlara tıklandiginda satir renginin degismesi icin
     const changePetRowColor = function () {
        const rows = getPetRows();
        for(let i= 0; i< rows.length; i++){
            rows[i].addEventListener("click", function(event){
                const selectedRow = this.style;
                selectedRow.backgroundColor = "purple";
                selectedRow.color = "white";
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
    }

    return {
        init: init
    }
})();