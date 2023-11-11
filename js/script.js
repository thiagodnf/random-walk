import Canvas from "./utils/Canvas.js";
import Memory from "./core/Memory.js";

import RandomWalk from "./walk/RandomWalk.js";
import PreviousMemoryWalk from "./walk/PreviousMemoryWalk.js";
import FullMemoryWalk from "./walk/FullMemoryWalk.js";

let $steps = null;
let $nodes = null;
let $edges = null;

let isRunning = false;

const settings = {
    speed: 1,
    walk: new RandomWalk()
}

let pos = { i: 0, j: 0 };

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const memory = new Memory(pos);

function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

function step() {

    let next = settings.walk.next(memory, pos.i, pos.j);

    memory.save(pos, next);

    pos.i = next.i;
    pos.j = next.j;

    $steps.text(numberWithCommas(memory.steps))
    $nodes.text(numberWithCommas(memory._nodes.size))
    $edges.text(numberWithCommas(memory._edges.size))

    if (isRunning) {
        setTimeout(function () {
            step();
        }, settings.speed)
    }
}

function start() {

    if (isRunning) {
        return;
    }

    isRunning = true;

    $("#btn-play").addClass("disabled")
    $("#btn-step").addClass("disabled")
    $("#btn-stop").removeClass("disabled")

    step();
}

function stop() {
    isRunning = false;

    $("#btn-play").removeClass("disabled")
    $("#btn-step").removeClass("disabled")
    $("#btn-stop").addClass("disabled")
}

function refreshCanvas() {

    Canvas.clear(ctx);

    memory.edges(function (source, target) {
        Canvas.drawLine(ctx, source.j, source.i, target.j, target.i)
    })

    Canvas.drawCircle(ctx, pos.j, pos.i, 5);

    window.requestAnimationFrame(refreshCanvas);
}

function resizeWindow() {

    const $mainPanel = $(".main-panel");

    canvas.width = $mainPanel.width();
    canvas.height = $(window).height() - $mainPanel.offset().top - 36;

    $(".side-panel .card").height(canvas.height);
}

$(function () {

    // disable right clicking
    $("canvas").bind("contextmenu", function (e) {
        return false;
    });

    $steps = $("#steps");
    $nodes = $("#nodes");
    $edges = $("#edges");

    $("#btn-play").click(function () {
        start();
    }).trigger("click");

    $("#btn-step").click(function () {
        step();
    });

    $("#btn-stop").click(function () {
        stop();
    });

    $("input[name=speed]").change(function () {
        settings.speed = parseInt(this.value);
    });

    $("#walk").change(function () {
        if (this.value == 1) {
            settings.walk = new RandomWalk()
        } else if (this.value == 2) {
            settings.walk = new PreviousMemoryWalk()
        } else if (this.value == 3) {
            settings.walk = new FullMemoryWalk()
        }
    }).trigger("change");

    $(window).resize(resizeWindow).trigger("resize");

    Canvas.init(canvas);

    window.requestAnimationFrame(refreshCanvas);
});