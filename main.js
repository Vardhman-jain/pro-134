song="";
status="";
object= [];

function preload() {
    song=loadSound("ringtone.mp3");
}

function setup(){
    canvas= createCanvas(380, 380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML= "Status: Detecting Objects";
}



//line 13 won't be a problem as if the model is not loaded then it will show line 13 else it will show line 20;

function modelLoaded() {
    console.log("Model Loaded");
    status= true;
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }else{
        console.log(results);
        object= results;
    }
}

function draw() {
    image(video,0,0,380,380);
    if (status != "") {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < object.length; i++) {
            document.getElementById("status").innerHTML="Status: Object Dtected";

            fill('#EB1D36');
            percent= floor(object[i].confidence * 100); //floor() will take the no. before the decimal;
            text(object[i].label + " " + percent+ "%", object[i].x + 15, object[i].y + 15);
            noFill();
            stroke('#EB1D36');
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
            if (object[i].label=="person") {
                document.getElementById("number_of_objects").innerHTML="Baby Found";
                song.stop();
            }
            else{
                document.getElementById("number_of_objects").innerHTML="Baby Not Found";
                song.play();
            }
        }
        if(object.length == 0){
            document.getElementById("number_of_objects").innerHTML="Baby Not Found";
            song.play();

        }
    }

}

