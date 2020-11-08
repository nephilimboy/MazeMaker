!(function ($) {
    "use strict";

    // Preloader
    $(window).on('load', function () {
        createCanvas2()
    });





    let height = document.getElementById('inputHeight').value;
    let width = document.getElementById('inputWidth').value;
    const gridHeight = document.getElementById('inputHeight');
    const gridWidth = document.getElementById('inputWidth');
    const table = document.getElementById('pixelCanvas');
    const form = document.querySelector('form');
    const colorPicker = document.getElementById('colorPicker');


    let blackColor = "#000000";

    let whiteColor = "#ffffff";

    var isToggling = false;

    gridHeight.addEventListener("input", function () {
        height = document.getElementById('inputHeight').value;
    });

    gridWidth.addEventListener("input", function () {
        width = document.getElementById('inputWidth').value;
    });


    function createCanvas2() {

        for (let h = 1; h <= 20; h++) {
            const row = document.createElement('tr');

            for (let w = 1; w <= 20; w++) {
                const cell = document.createElement('td');
                row.appendChild(cell);
            }
            table.appendChild(row);
        }



        var tableEntry = table.getElementsByTagName('td');
        console.log(tableEntry);
        table.onmousedown = enableToggle;

        for (var i = 0, il = tableEntry.length; i < il; i++) {
            tableEntry[i].onmouseenter = toggle; //changes color

            tableEntry[i].addEventListener("drop", function (ev) {
                if(ev.target.tagName !== "SPAN"  && ev.target.innerHTML.length == 0 && ev.target.style.backgroundColor != "rgb(0, 0, 0)"){
                    isToggling = false;
                    ev.preventDefault();
                    let data = ev.dataTransfer.getData("text");
                    ev.target.appendChild(document.getElementById(data));
                }
            });
            tableEntry[i].addEventListener("dragover", function (ev) {
                if(ev.target.tagName !== "SPAN"  && ev.target.innerHTML.length == 0 && ev.target.style.backgroundColor != "rgb(0, 0, 0)"){
                    isToggling = false;
                    ev.preventDefault();
                }
            });

        }


        var source = document.createElement('span');
        source.className = 'sourcePnt';
        source.id = 'srcPoint';
        source.setAttribute('draggable', true);
        source.addEventListener("dragstart", function(event){
            event.dataTransfer.setData("text", event.target.id);
        });
        tableEntry[0].appendChild(source);
        console.log(tableEntry[0].innerHTML.length);

        var destination = document.createElement('span');
        destination.className = 'destinationPnt';
        destination.id = 'dstPoint';
        destination.setAttribute('draggable', true);
        destination.addEventListener("dragstart", function(event){
            event.dataTransfer.setData("text", event.target.id);
        });
        tableEntry[2].appendChild(destination);




        table.onmouseup = disableToggle;
    }












    function createCanvas(event) {
        event.preventDefault();

        for (let h = 1; h <= height; h++) {
            const row = document.createElement('tr');

            for (let w = 1; w <= width; w++) {
                const cell = document.createElement('td');
                row.appendChild(cell);
            }

            table.appendChild(row);
        }
    }

    form.addEventListener('submit', createCanvas);




    function enableToggle(e) {
        isToggling = true;
        if (e.target !== table) {
            toggle(e);
        }
    }

    function disableToggle() {
        isToggling = false;
    }

    function toggle(e) {
        if(e.target.tagName === "SPAN" || e.target.innerHTML.length !=0){
            return;
        }
        if (isToggling === false) {
            return;
        }
        if(e.target.tagName !== "SPAN")
        {
            if (event.target.style.backgroundColor == "rgb(0, 0, 0)") {
                event.target.style.backgroundColor = whiteColor;
            }
            else {
                event.target.style.backgroundColor = blackColor;
            }
        }
    }



})(jQuery);