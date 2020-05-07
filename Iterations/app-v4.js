// Build out the Test Subject ID dropdown list from data 

var dropdown = d3.select("#selDataset");

d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var metaIDs = metadata.map(d => d.id);
    metaIDs.forEach(subject => {
        var option = dropdown.append("option");
        option.text(subject);
        });
    });

// // Use the D3 library to read in `samples.json`
// // Grab values from the response json object to build the plots

d3.json("samples.json").then(function(data) {
    console.log(data);
    var samples = data.samples;

    console.log("samples");
    console.log(samples);

    // // filter samples for default subject id
    // defaultSubjectID = "940"

    // var defaultSample = samples.filter(subject => subject.id === defaultSubjectID)
    // console.log("defaultSample");
    // console.log(defaultSample);

    // update data to correspond to selected Test Subject ID
    dropdown.on("change", function() {
        d3.event.preventDefault();        

        var subjectID = dropdown.property("value");
        console.log("subjectID");
        console.log(subjectID);

        // create subject data that feeds off of selected Subject ID 

        var selectedSubject = samples.filter(subject => subject.id === subjectID)
        console.log("selectedSubject")
        console.log(selectedSubject)

        var selectedSubjectIDs = selectedSubject.map(d => d.otu_ids);
        var selectedSubjectValues = selectedSubject.map(d => d.sample_values);
        var selectedSubjectLabels = selectedSubject.map(d => d.otu_labels);    
        
        console.log("selectedSubjectIDs")
        console.log(selectedSubjectIDs)
        console.log("selectedSubjectValues")
        console.log(selectedSubjectValues)
        console.log("selectedSubjectLabels")
        console.log(selectedSubjectLabels)

        // slice to get top 10

        slicedIDs = selectedSubjectIDs.slice(0,10);
        slicedValues = selectedSubjectValues.slice(0,10);
        slicedLabels = selectedSubjectLabels.slice(0,10);

        console.log("Top 10 Subject Ids");
        console.log(slicedIDs);
        console.log("Top 10 Subject Values");
        console.log(slicedValues);
        console.log("Top 10 Subject Labels");
        console.log(slicedLabels);

        // create trace 
        var trace = {
            x: slicedIDs,
            y: slicedValues,
            type: "bar",
            text: slicedLabels,
            orientation: "h",
            };

        var data = [trace]; 

        Plotly.newPlot("bar", data);

    });    

});



// d3.json("samples.json").then(function(data) {
//     console.log(data);
//     var samples = data.samples;
//     var sampleVals = samples.map(d => d.sample_values);
//     var otuIDs = samples.map(d => d.otu_ids)
//     var otuLabels = samples.map(d => d.otu_labels);

//     var metadata = data.metadata;
//     var metaIDs = metadata.map(d => d.id)
//     console.log(metadata);
//     console.log(metaIDs);

//     // turn arrays of arrays into single arrays that can be passed into plotly 
//     var otuIDs2 = [].concat.apply([], otuIDs);
//     var sampleVals2 = [].concat.apply([], sampleVals);
//     var otuLabels2 = [].concat.apply([], otuLabels);
    
//     // confirm we have single arrays that can be passed
//     console.log("sampleVals2")
//     console.log(sampleVals2)
//     console.log("otuIDs2")
//     console.log(otuIDs2)
//     console.log("otuLabels2")
//     console.log(otuLabels2)

//     // defaultSubject = 940
//     // var subjectSampleVals = metadata.filter( => subject.id === subjectID)
//     // console.log(subjectMetadata)

//     // create trace 
//     var trace1 = {
//         x: otuIDs2,
//         y: sampleVals2,
//         type: "bar",
//         text: otuLabels,
//         orientation: "h",
//         };

//     var data1 = trace1; 

//     Plotly.newPlot("bar", data1);

//     // create trace for bubble chart
//     var trace2 = {
//         x: otuIDs2,
//         y: sampleVals2,
//         radius: sampleVals2,
//         backgroundColor: otuIDs2, // create color set for otu_ids list
//         text: otuLabels2,
//     }

//     var data2 = trace2

//     Plotly.newPlot("bubble", data2)
// });




    



// // update metadata to correspond to selected Test Subject ID
// dropdown.on("change", function() {
//     d3.event.preventDefault();

//     d3.json("samples.json").then((data) => {
//         var metadata = data.metadata;
    
//     var subjectID = dropdown.property("value");
//     console.log(subjectID);

//     var subjectMetadata = metadata.filter(subject => subject.id === subjectID)
//     console.log(subjectMetadata)
//     })
// })


// // build out the Subject Demographi Info panel using metadata of selected subject id
// var demographicInfo = d3.select("#sample-metadata");

// d3.json("samples.json").then((data) => {
//     var metadata = data.metadata;
//     var subjectID = dropdown.property("value");
//     var subjectMetadata = metadata.filter(subject => subject.id === subjectID)
//     subjectMetadata.forEach(([key,value]) => {
//         var line = demographicInfo.append("div");
//         line.text(key, value);
//     });
// });


// // function getBio(samples) {
// //     d3.json("samples.json").then((data) => {
// //         var metadata = data.metadata;
// //         console.log(metadata);
// //     }
// // )};

// // getBio(samples);
























