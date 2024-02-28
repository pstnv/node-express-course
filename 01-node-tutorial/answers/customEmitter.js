const EventEmitter = require("events");

const emitter = new EventEmitter();

const poems = [
    { pink: "What is pink? a rose is pink\nBy a fountain's brink.\n" },
    { red: "What is red? a poppy's red\nIn its barley bed.\n" },
    { blue: "What is blue? the sky is blue\nWhere the clouds float thro'.\n" },
    { white: "What is white? a swan is white\nSailing in the light.\n" },
    {
        yellow: "What is yellow? pears are yellow,\nRich and ripe and mellow.\n",
    },
    {
        green: "What is green? the grass is green,\nWith small flowers between.\n",
    },
    {
        vilolet:
            "What is violet? clouds are violet\nIn the summer twilight.\n",
    },
    { orange: "What is orange? Why, an orange,\nJust an orange!\n" },
];

const colors = poems.reduce((acc, obj) => {
    const props = Object.keys(obj);
    if (props) {
        acc.push(...props);
    }
    return acc;
}, []);

setInterval(() => {
    const randomIndex = Math.floor(Math.random() * poems.length);
    const randomColor = colors[randomIndex];
    emitter.emit("poem", randomColor);
}, 2000);
emitter.on("poem", (color) => {
    const poem = poems.find((poem) => poem.hasOwnProperty(color));
    console.log(poem[color]);
});
