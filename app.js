// Build out the Test Subject ID dropdown list from data 

var dropdown = d3.select("#selDataset");
var demographicInfo = d3.select("#sample-metadata");

d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var metaIDs = metadata.map(d => d.id);
    metaIDs.forEach(subject => {
        var option = dropdown.append("option");
        option.text(subject);
        });
    });

// Use the D3 library to read in `samples.json`
// Grab values from the response json object to build the plots for initial visualization
d3.json("samples.json").then(function(data) {
    console.log(data);
    var samples = data.samples;
    var metadata = data.metadata;

    console.log("samples");
    console.log(samples);
    console.log("metadata");
    console.log(metadata);
     
    var subjectID = dropdown.property("value");
    console.log("subjectID");
    console.log(subjectID);

    // create subject data that feeds off of selected Subject ID - samples and metadata
    // get metadata
    intSubjectID = parseInt(subjectID);
    var selectedSubjectMetadata = metadata.filter(subject => subject.id === intSubjectID)
    console.log("selectedSubjectMetadata");
    console.log(selectedSubjectMetadata);

    // build table for metadata
    Object.entries(selectedSubjectMetadata[0])
        .forEach(([key, value]) => {
            var div = demographicInfo.append("div");
            {div.text(`${key}: ${value}`)};
        }); 

    // get samples data
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

    // slice data to get top 10 
    var slicedIDs = selectedSubjectIDs[0].slice(0,10);
    var slicedValues = selectedSubjectValues[0].slice(0,10);
    var slicedLabels = selectedSubjectLabels[0].slice(0,10);

    console.log("Top 10 Subject Ids");
    console.log(slicedIDs);
    console.log("Top 10 Subject Values");
    console.log(slicedValues);
    console.log("Top 10 Subject Labels");
    console.log(slicedLabels);

    // create trace for bar chart
    var trace = {
        x: slicedIDs,
        y: slicedValues.map(d => `OTU ${d}`),
        type: "bar",
        text: slicedLabels,
        orientation: "h",
        };
    
    var layout = {
        xaxis: {
            title: 'Sample Values ',
        },
        yaxis: {
            title: 'OTU ID: ',
        }
    };

    // plot initial bar chart 
    var data = [trace]; 
    Plotly.newPlot("bar", data, layout);

    // create trace for bubble chart
    var trace2 = {
        x: slicedIDs,
        y: slicedValues,
        mode: 'markers',
        marker: {
            // multiply sliceIDs by 0.15 to keep values under 255 for rgb scale -> highest ID is 1601
            color: slicedIDs.map(d => `'rgb(${d*.15},${255-(d*.15)},150)'`),
            size: slicedValues},
        text: slicedLabels,
        };

    var layout2 = {
        xaxis: {
            title: 'OTU ID: ',
        },
        yaxis: {
            title: 'Sample Values ',
        }
    };

    // plot initial bubble chart
    var data2 = [trace2];
    Plotly.newPlot("bubble", data2, layout2);


    // update data to correspond to selected Test Subject ID when user selects new Subject ID: 
    dropdown.on("change", function() {
        d3.event.preventDefault();   

        var subjectID = dropdown.property("value");
        console.log("subjectID");
        console.log(subjectID);

        // create subject data that feeds off of selected Subject ID - samples and metadata
        // get metadata
        intSubjectID = parseInt(subjectID);
        var selectedSubjectMetadata = metadata.filter(subject => subject.id === intSubjectID)
        console.log("selectedSubjectMetadata");
        console.log(selectedSubjectMetadata);

        // remove previous selection metadata 
        d3.select("#sample-metadata").selectAll("div").remove();

        // build out and display metadata 
        Object.entries(selectedSubjectMetadata[0])
            .forEach(([key, value]) => {
                var div = demographicInfo.append("div");
                {div.text(`${key}: ${value}`)};
            });       
        
        // get samples data
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
        var slicedIDs = selectedSubjectIDs[0].slice(0,10);
        var slicedValues = selectedSubjectValues[0].slice(0,10);
        var slicedLabels = selectedSubjectLabels[0].slice(0,10);

        console.log("Top 10 Subject Ids");
        console.log(slicedIDs);
        console.log("Top 10 Subject Values");
        console.log(slicedValues);
        console.log("Top 10 Subject Labels");
        console.log(slicedLabels);
        
        // create trace for bar chart
        var trace = {
            x: slicedIDs,
            y: slicedValues.map(d => `OTU ${d}`),
            type: "bar",
            text: slicedLabels,
            orientation: "h",
            };
        
        var layout = {
            xaxis: {
                title: 'Sample Values ',
            },
            yaxis: {
                title: 'OTU ID: ',
            }
        };

        // plot bar chart 
        var data = [trace]; 
        Plotly.newPlot("bar", data, layout);

        // create trace for bubble chart
        var trace2 = {
            x: slicedIDs,
            y: slicedValues,
            mode: 'markers',
            marker: {
                // multiply sliceIDs by 0.15 to keep values under 255 for rgb scale -> highest ID is 1601
                color: slicedIDs.map(d => `'rgb(${d*.15},${255-(d*.15)},150)'`),
                size: slicedValues},
            text: slicedLabels,
            };

        var layout2 = {
            xaxis: {
                title: 'OTU ID: ',
            },
            yaxis: {
                title: 'Sample Values ',
            }
        };

        // plot bubble chart
        var data2 = [trace2];
        Plotly.newPlot("bubble", data2, layout2);

    });    

});

