console.log("ml5 version is" ,ml5.version);

camera = document.getElementById("camera");

Webcam.set(
    {
        wdith:350,
        height:350,
        image_format:'png',
        png_quality:100
    }
);

Webcam.attach('#camera'); 

function capture()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="capture_image" src="'+data_uri+'">';
    })
}  

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/xM8ygDml0/model.json", modelLoaded);

function modelLoaded()
{
    console.log("Model has been loaded");
}

function identify()
{
    img = document.getElementById("capture_image");
    classifier.classify(img, gotresult);
}

function gotresult(error,results)
{
    if(error)
    {
        console.log(error);
    }
    else
    {
        console.log(results);
        document.getElementById("object_name").innerHTML = results[0].label;
        document.getElementById("object_accuracy").innerHTML = results[0].confidence.toFixed(3)*100+" %";;
    }
}



