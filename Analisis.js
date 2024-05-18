let genomicData = [
    { gene: 'GEN1', mutation: 'Mutación A', expression: 0.8, files: [] },
    { gene: 'GEN2', mutation: 'Mutación B', expression: 0.6, files: [] },
    { gene: 'GEN3', mutation: 'Mutación C', expression: 0.5, files: [] }
];

const genomicForm = document.getElementById('genomicForm');
genomicForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const gene = document.getElementById('geneInput').value;
    const mutation = document.getElementById('mutationInput').value;
    const expression = parseFloat(document.getElementById('expressionInput').value);
    const files = document.getElementById('fileInput').files;

    if (gene && mutation && !isNaN(expression)) {
        genomicData.push({ gene, mutation, expression, files });
        alert('Datos genómicos guardados exitosamente.');
        clearForm();
    } else {
        alert('Por favor, ingrese valores válidos.');
    }
});

function clearForm() {
    document.getElementById('geneInput').value = '';
    document.getElementById('mutationInput').value = '';
    document.getElementById('expressionInput').value = '';
    document.getElementById('fileInput').value = '';
}

function showDataAsTable() {
    const dataDisplay = document.getElementById('dataDisplay');
    dataDisplay.innerHTML = ''; 
    
    const table = document.createElement('table');
    const headers = ['Gen', 'Mutación', 'Expresión', 'Adjuntos'];
    const headerRow = document.createElement('tr');
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    genomicData.forEach(dataItem => {
        const row = document.createElement('tr');
        Object.values(dataItem).forEach((value, index) => {
            const cell = document.createElement('td');
            if (index === 3 && Array.isArray(value)) {
                value.forEach(file => {
                    const fileName = document.createElement('div');
                    const downloadLink = document.createElement('a');
                    downloadLink.href = URL.createObjectURL(file);
                    downloadLink.download = file.name;
                    downloadLink.textContent = file.name;
                    fileName.appendChild(downloadLink);
                    cell.appendChild(fileName);
                });
            } else {
                cell.textContent = value;
            }
            row.appendChild(cell);
        });
        table.appendChild(row);
    });

    dataDisplay.appendChild(table);
}

function createChart(chartType) {
    const dataDisplay = document.getElementById('dataDisplay');
    dataDisplay.innerHTML = '<canvas id="myChart"></canvas>'; 

    const labels = genomicData.map(dataItem => dataItem.gene);
    const expressionData = genomicData.map(dataItem => dataItem.expression);

    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
        type: chartType,
        data: {
            labels: labels,
            datasets: [{
                label: 'Expresión Genética',
                data: expressionData,
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function showDataAsDiagram() {
    const dataDisplay = document.getElementById('dataDisplay');
    dataDisplay.innerHTML = ''; 

    const svgWidth = 600;
    const svgHeight = 400;
    const margin = { top: 20, right: 20, bottom: 50, left: 50 };
    const chartWidth = svgWidth - margin.left - margin.right;
    const chartHeight = svgHeight - margin.top - margin.bottom;

    const svg = d3.select('#dataDisplay')
        .append('svg')
        .attr('width', svgWidth)
        .attr('height', svgHeight);

    const chart = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const xScale = d3.scalePoint()
        .domain(genomicData.map(dataItem => dataItem.gene))
        .range([0, chartWidth])
        .padding(0.5);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(genomicData, dataItem => dataItem.expression)])
        .range([chartHeight, 0]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    chart.append('g')
        .attr('transform', `translate(0, ${chartHeight})`)
        .call(xAxis);

    chart.append('g')
        .call(yAxis);

    chart.selectAll('.circle')
        .data(genomicData)
        .enter()
        .append('circle')
        .attr('class', 'circle')
        .attr('cx', dataItem => xScale(dataItem.gene))
        .attr('cy', dataItem => yScale(dataItem.expression))
        .attr('r', 5)
        .attr('fill', 'steelblue');
}

document.getElementById('tableBtn').addEventListener('click', showDataAsTable);
document.getElementById('chartBtn').addEventListener('click', () => {
    document.getElementById('chartOptions').style.display = 'block';
    const chartType = document.getElementById('chartType').value;
    createChart(chartType);
});
document.getElementById('diagramBtn').addEventListener('click', () => {
    document.getElementById('chartOptions').style.display = 'none';
    showDataAsDiagram();
});

document.getElementById('chartType').addEventListener('change', () => {
    const chartType = document.getElementById('chartType').value;
    createChart(chartType);
});

// Mostrar tabla por defecto
showDataAsTable();
