(function ($) {
    "use strict";
    $(function () {
        $('.sidenav').sidenav();
    });

    $(window).on('load', function () {
        createCanvas()
    });
    let height = document.getElementById('inputHeight').value;
    let width = document.getElementById('inputWidth').value;
    const gridHeight = document.getElementById('inputHeight');
    const gridWidth = document.getElementById('inputWidth');
    const table = document.getElementById('pixelCanvas');

    let blackColor = "#000000";

    let whiteColor = "#F5F5F5";

    var isToggling = false;

    gridHeight.addEventListener("input", function () {
        height = document.getElementById('inputHeight').value;
    });

    gridWidth.addEventListener("input", function () {
        width = document.getElementById('inputWidth').value;
    });
    document.getElementById('drawBtn').addEventListener("click", createCanvas, false);
    document.getElementById('downloadVAL').addEventListener("click", downloadVal, false);


    function createCanvas() {
        table.innerHTML = '';
        for (let h = 1; h <= height; h++) {
            const row = document.createElement('tr');

            for (let w = 1; w <= width; w++) {
                const cell = document.createElement('td');
                cell.style.textAlign = "center";
                cell.style.width = "30px";
                cell.style.height = "35px";
                row.appendChild(cell);
            }
            table.appendChild(row);
        }


        var tableEntry = table.getElementsByTagName('td');
        table.onmousedown = enableToggle;

        for (var i = 0, il = tableEntry.length; i < il; i++) {
            tableEntry[i].onmouseenter = toggle; //changes color

            tableEntry[i].addEventListener("drop", function (ev) {
                isToggling = false;
                if (ev.target.tagName !== "SPAN" && ev.target.innerHTML.length == 0 && ev.target.style.backgroundColor != "rgb(0, 0, 0)") {
                    ev.preventDefault();
                    let data = ev.dataTransfer.getData("text");
                    ev.target.appendChild(document.getElementById(data));
                }
            });
            tableEntry[i].addEventListener("dragover", function (ev) {
                isToggling = false;
                if (ev.target.tagName !== "SPAN" && ev.target.innerHTML.length == 0 && ev.target.style.backgroundColor != "rgb(0, 0, 0)") {
                    ev.preventDefault();
                }
            });

        }


        var source = new Image();
        source.src = "assets/img/source.png";
        source.style.width = '20px';
        source.style.height = '25px';
        source.id = 'srcPoint';
        source.setAttribute('draggable', true);
        source.addEventListener("dragstart", function (event) {
            event.dataTransfer.setData("text", event.target.id);
        });
        tableEntry[0].appendChild(source);

        var destination = new Image();
        destination.src = "assets/img/location.png";
        destination.style.width = '20px';
        destination.style.height = '25px';
        destination.id = 'dstPoint';
        destination.setAttribute('draggable', true);
        destination.addEventListener("dragstart", function (event) {
            event.dataTransfer.setData("text", event.target.id);
        });
        tableEntry[1].appendChild(destination);


        table.onmouseup = disableToggle;
    }

    function downloadVal() {
        let content = '';
        console.log(table)
        for (var r = 0, n = table.rows.length; r < n; r++) {
            for (var c = 0, m = table.rows[r].cells.length; c < m; c++) {
                console.log(table.rows[r].cells[c].innerHTML);
                if (table.rows[r].cells[c].style.backgroundColor === "rgb(0, 0, 0)") {
                    content = content + "(" + r + "," + c + ")=9999999\n";
                }
                else if (table.rows[r].cells[c].lastChild != null) {
                    if(table.rows[r].cells[c].lastChild.id === "dstPoint"){
                        content = content + "(" + r + "," + c + ")=-1\n";
                    }else if(table.rows[r].cells[c].lastChild.id === "srcPoint"){
                        content = content + "(" + r + "," + c + ")=1\n";
                    }
                }
            }
        }

        var aa = document.createElement("a");
        var file = new Blob([content], {type: 'text/plain'});
        aa.href = URL.createObjectURL(file);
        aa.download = "dijkstra.val";
        aa.click();
    }


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
        if (e.target.tagName === "SPAN" || e.target.innerHTML.length != 0) {
            return;
        }
        if (isToggling === false) {
            return;
        }
        if (e.target.tagName !== "SPAN") {
            if (event.target.style.backgroundColor == "rgb(0, 0, 0)") {
                event.target.style.backgroundColor = whiteColor;
            }
            else {
                event.target.style.backgroundColor = blackColor;
            }
        }
    }


})(jQuery);
