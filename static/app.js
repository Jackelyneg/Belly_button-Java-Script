/* The following is an example on how you might structure your code.
This is not the only way to complete this assignment.
Feel free to disregard and create your own code */

d3.json("samples.json").then(function (response) {
    console.log(response);

})

//Define function that will run on page load
function init() {
    let dropdownMenu = d3.select("#selDataset");
    // Read json data
    d3.json("samples.json").then(function (response) {
        // Parse and filter data to get sample names
        let names = response.names;
        // Add dropdown option for each sample
        for (i = 0; i < names.length; i++) {
            dropdownMenu.append("option").text(names[i]).property("value", names[i])
        }
        let sample = names[0];
        buildMetadata(sample);
        buildCharts(sample);

    });

}

// Parse and filter the data to get the sample's metadata



// Call functions below using the first sample to build metadata and initial plots

// Define a function that will create metadata for given sample
function buildMetadata(sample) {
    // Read the json data
    d3.json("samples.json").then(function (response) {
        // Parse and filter the data to get the sample's metadata
        let metaData = response.metadata;
        // Specify the location of the metadata and update it
        let resultArr = metaData.filter(sampleObj => sampleObj.id == sample);
        console.log(resultArr);
        let result = resultArr[0];
        let panel = d3.select("#sample-metadata");
        panel.html("");
        Object.entries(result).forEach(([key, value]) => {
            panel.append("h6").text(`${key}:${value}`)
        });
        // let Values = metaData.map(freq => freq.wfreq);

        // console.log(Values);

     
          

        let data3 = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: "",
                title: { text: "" },
                type: "indicator",
                mode: "gauge+number",
                // delta: { reference: Values },
                // gauge: { axis: { range: [null, Values] } }
            }
        ];
        let layout3 = { width: 600, height: 500, margin: { t: 0, b: 0 } }

        Plotly.newPlot("gauge", data3, layout3);



    });
}

// Define a function that will create charts for given sample
function buildCharts(sample) {

    // Read the json data
    d3.json("samples.json").then(function (response) {
        // Parse and filter the data to get the sample's OTU data
        let samples = response.samples;
        let resultArr = samples.filter(sampleObj => sampleObj.id == sample);
        let result = resultArr[0];
        let otu_id = result.otu_ids;
        let otu_labels = result.otu_labels;
        let sample_values = result.sample_values;

        let data = [{
            x: otu_id,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
                size: sample_values,
                color: otu_id,
                colorscale: "Earth"
            }

        }];

        let layout = {
            title: "Bacteria culture per sample",
            margin: { t: 0 },
            hovermode: "closest",
            xaxis: { title: "OTU ID" },
            margin: { t: 30 },
        };
        Plotly.newPlot("bubble", data, layout);

        let yTicks = otu_id.slice(0, 10).map(otuid => `OTU ${otuid}`).reverse();

        let data1 = [{
            y: yTicks,
            x: sample_values.slice(0, 10).reverse(),
            text: otu_labels.slice(0, 10).reverse(),
            type: "bar",
            orientation: "h"

        }];

        let layout1 = {
            title: "Top 10 Bacteria Cultures Found",
            margin: { t: 30, l: 150 }
        };

        Plotly.newPlot("bar", data1, layout1);

    });

}






// Pay attention to what data is required for each chart
// w3 schools

// Create bar chart in correct location

// Create bubble chart in correct location



function optionChanged(sample) {
    // The parameter being passed in this function is new sample id from dropdown menu

    // Update metadata with newly selected sample USE ON CHANGE
    buildMetadata(sample);
    // Update charts with newly selected sample
    buildCharts(sample);
}


// Initialize dashboard on page load
init();


