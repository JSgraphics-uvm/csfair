//////////////////// Bridges //////////////////////
let hand = null;
let is_draw_leapmotion = false;
///////////////////////////////////////////////////
let angel=0;
// p5js code start
function draw_leapmotion() {
    if (hand && is_draw_leapmotion) {
        //console.log(hand.fingers[1].bones[3].nextJoint);
        //translate(width/2, height/2);
        push()
        scale(2,2);
      
        for (let i=0;i<5;i++) {
            let [x,z,y] = hand.fingers[i].bones[3].nextJoint;
            ellipse(x,y,10);
            if (i==1 || i==4) {
                push()
                translate(x,y);
                rotate(angel);
                ellipse(20,0, 10);
                pop()
            }
            for (let bone of hand.fingers[i].bones) {
                let [x1,z1,y1] = bone.prevJoint;
                let [x2,z2,y2] = bone.nextJoint;
                line(x1,y1,x2,y2);
            }
        }
        pop()
        is_draw_leapmotion = false;
        angel+=0.1;
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight-4);
}
  
function draw() {
    background(0);
    g_controler.p5_draw();
    console.log("The position of the controler is: ", g_controler.x, g_controler.y);
}