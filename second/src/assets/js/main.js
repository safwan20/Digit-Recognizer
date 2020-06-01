window.addEventListener('load', () => {
    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext('2d');


    // // //Resizing
    // // canvas.height = 600;
    // // canvas.width = 600;

    // ctx.canvas.width  = 500;
    // ctx.canvas.height = 500;

    let painting = false;

    function startPosition() {
        painting = true;
    }
    function finishedPosition() {
        painting = false;
        ctx.beginPath();
    }
    function draw(e) {
        if (!painting) return;
        ctx.strokeStyle  = 'white',
        ctx.lineWidth = 20;
        ctx.lineCap = 'round'
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);
    }
    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', finishedPosition);
    canvas.addEventListener('mousemove', draw);


    // var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    // var data = imageData.data;
    // var outputData = []
    // for(var i = 0; i < data.length; i += 4) {
    // var brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
    // outputData.push(brightness);
    // }

    document.getElementById('show').addEventListener('click', function () {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        // var imageData = canvas.toDataURL();
        var tfImage = tf.browser.fromPixels(imageData, 1);
        var tfResizedImage = tf.image.resizeBilinear(tfImage, [28,28]);
        var test = tfResizedImage.expandDims().div(255.0);
        console.log(test);
        loadModel(test);

    });

    document.getElementById('clear').addEventListener('click', function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, false);

})


async function loadModel(image) {
    const model = await tf.loadLayersModel("/assets/models/model.json");
    let predictions = await model.predict(image).data();
    let final = model.predict(image).argMax(-1).dataSync();
    console.log(predictions);
    alert(final);
    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "dark1", // "light1", "light2", "dark1", "dark2"
        title:{
            text: "Probability"
        },
        axisY: {
            title: ""
        },
        data: [{        
            type: "column",  
            showInLegend: true, 
            legendMarkerColor: "grey",
            legendText: "",
            dataPoints: [      
                { y: predictions[0], label: "0" },
                { y: predictions[1],  label: "1" },
                { y: predictions[2],  label: "2" },
                { y: predictions[3],  label: "3" },
                { y: predictions[4],  label: "4" },
                { y: predictions[5], label: "5" },
                { y: predictions[6],  label: "6" },
                { y: predictions[7],  label: "7" },
                { y: predictions[8], label: "8" },
                { y: predictions[9],  label: "9" },
            ]
        }]
    });
    chart.render(); 
  }

