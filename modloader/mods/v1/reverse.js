degreeToRadian = (angle) => {
    return angle * (Math.PI / 180);
};

runtime = cr_getC2Runtime();
layout = runtime.running_layout;
layer = layout.layers.find(x => x.name === "Layer 0");
angle = 0;

setInterval(() => {
    layer.angle = degreeToRadian(angle);
    angle += 1;
}, 100);

// width = layer.width;
// instances = layer.instances;

// instances.forEach((instance, i) => {
//     // instance.x = width - instance.x;
//     // instance.set_bbox_changed();

//     setTimeout(() => {
//         console.log(instance.type.name)

//         if (instance.type.name === "t42") return;
//         if (instance.type.name === "t51") return;

//         instance.x = width - instance.x;
//         instance.width = -instance.width;

//         instance.set_bbox_changed();
//     }, i * 100);
// });