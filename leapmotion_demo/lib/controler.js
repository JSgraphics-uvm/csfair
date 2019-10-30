const index_x = 0;
const index_y = 1;

class Controler {
    constructor() {
        console.log("controler constructed.");
        this.hand=null;
        this.hand_in = false;
        this.hand_prev = [];
        this.points_x = [];
        this.points_y = [];
        this.x = 0;
        this.y = 0;
    }
    set_hand(hand) {
        this.hand = hand;
        this.hand_in = true;
    }
    buffer(x, xs) {
        xs.push(x);
        if (xs.length>500) xs.shift();
    }
    p5_draw_hand( pos=null ) {
        push();
        if (pos) {
            translate(pos.x, pos.y);
        }
        noStroke();
        fill(0);
        rect(0, 0, 300,300);
        if (this.hand_in) {
            this.buffer(this.hand.fingers[1].bones[3].nextJoint[index_x], this.points_x);
            this.buffer(this.hand.fingers[1].bones[3].nextJoint[index_y], this.points_y);
            push();
            translate(150,300);
            scale(1,-1);
            stroke(50);
            fill(20);
            for (let i=0;i<5;i++) {
                for (let j=0;j<4;j++) {
                    let p = this.hand.fingers[i].bones[j].nextJoint;
                    let p_0 = this.hand.fingers[i].bones[j].prevJoint;
                    ellipse(p[index_x],p[index_y],10);
                    line(p[index_x],p[index_y],p_0[index_x],p_0[index_y]);
                    if (i==1 && j==3) {
                        push();
                        beginShape();
                        noFill();
                        stroke(10);
                        //vertex(p[0],p[2]);
                        for (let h=0;h<this.points_x.length;h++) {
                            vertex(this.points_x[h], this.points_y[h]);
                        }
                        endShape();
                        pop();
                    }
                }
            }
            pop();
            this.p5_draw_direction(createVector(150, 150));
        }
        pop();
    }
    p5_draw_direction(pos=null) {
        push();
        if (pos) {
            translate(pos.x, pos.y);
        }
        if (this.points_x.length>0) {
            let p_x = this.points_x[this.points_x.length-1];
            let p_y = this.points_y[this.points_y.length-1];
            let mean_x = this.points_x.reduce(function(a, b) { return a + b; }) / this.points_x.length; // mean
            let mean_y = this.points_y.reduce(function(a, b) { return a + b; }) / this.points_y.length; // mean
            let x = p_x - mean_x;
            let y = p_y - mean_y;
            y = -y;
            this.x = x;
            this.y = y;
            strokeWeight(4);
            stroke(255);
            line(0,0,x,y);
        }
        pop();
    }
    p5_draw_mouse( pos=null ) {
        push();
        if (pos) {
            translate(pos.x, pos.y);
        }
        noStroke();
        fill(10);
        rect(0, 0, 300,300);
        translate(150,150);
        let x = mouseX - pos.x - 150;
        let y = mouseY - pos.y - 150;
        this.x = x;
        this.y = y;
        strokeWeight(4);
        stroke(255);
        line(0,0,x,y);
    
        pop();
    }
    p5_draw( pos=null ) {
        if (pos) {
            translate(pos.x, pos.y);
        }
        if (mouseX>windowWidth-310 && mouseY>windowHeight-310) {
            this.p5_draw_mouse(createVector(windowWidth-310, windowHeight-310))
        } else {
            this.p5_draw_hand(createVector(windowWidth-310, windowHeight-310));
        }
        this.hand_in = false;
    }
}

let g_controler = new Controler();
// Leapmotion Javascript API
Leap.loop({
    // hand callbacks are run once for each hand in the frame
    hand: function(hand){
        g_controler.set_hand(hand);
    }
});
