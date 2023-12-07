//https://teachablemachine.withgoogle.com/models/jNx9QSraA/model.json
var prediction1 = ""
var prediction2 = ""

Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90
})
camera = document.getElementById("camera")
Webcam.attach("#camera")

function take_capture(){
    Webcam.snap(function(dataURL){
        document.getElementById("result").innerHTML="<img id='capturedkidnappedimage' src='"+dataURL+"'>"
    })
}

console.log(ml5.version)
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/jNx9QSraA/model.json', modelLoaded)

function modelLoaded(){
    console.log("modelLoaded")
}

function speak(){
    var synth = window.speechSynthesis
    speakData1="The First Prediction Is "+prediction1
    speakData2="The Second Prediction Is "+prediction2
    var speakThis=new SpeechSynthesisUtterance(speakData1+speakData2)
    synth.speak(speakThis)
}

function check(){
    img = document.getElementById("capturedkidnappedimage")
    classifier.classify(img, getresult)
}

function getresult(error, results){
    if(error){
        console.error(error)
    }
    else{
        console.log(results)

        document.getElementById("result1").innerHTML=results[0].label

        document.getElementById("result2").innerHTML=results[1].label

        prediction1 = results[0].label

        prediction2 = results[1].label

        speak()

        if(results[0].label=="Happy"){
            document.getElementById("update_emoji1").innerHTML="&#128512;"
        }

        if(results[0].label=="Sad"){
            document.getElementById("update_emoji1").innerHTML="&#128546;"
        }

        if(results[0].label=="Angry"){
            document.getElementById("update_emoji1").innerHTML="&#128128;"
        }

        if(results[1].label=="Happy"){
            document.getElementById("update_emoji2").innerHTML="&#128512;"
        }

        if(results[1].label=="Sad"){
            document.getElementById("update_emoji2").innerHTML="&#128546;"
        }

        if(results[1].label=="Angry"){
            document.getElementById("update_emoji2").innerHTML="&#128128;"
        }
        
    }
}