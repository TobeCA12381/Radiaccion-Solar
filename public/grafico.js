 // Datos de ejemplo
 const uvData = [
    { time: '09:00', level: 10 },
    { time: '10:00', level: 7 },
    { time: '11:00', level: 6 },
    { time: '12:00', level: 5 },
    { time: '13:00', level: 4 },
    { time: '14:00', level: 3 },
    { time: '15:00', level: 2 },
    { time: '16:00', level: 1 }
];

function renderUVLevels(data) {
    const uvLevelsContainer = document.getElementById('uv-levels');
    uvLevelsContainer.innerHTML = ''; // Limpiar contenido previo

    data.forEach(entry => {
        const levelDiv = document.createElement('div');
        levelDiv.classList.add('uv-level');

        const timeSpan = document.createElement('span');
        timeSpan.textContent = entry.time;
        levelDiv.appendChild(timeSpan);

        const barDiv = document.createElement('div');
        barDiv.classList.add('bar', `level-${entry.level}`);
        barDiv.style.width = `${entry.level * 5}%`; // Ancho de la barra según el nivel
        levelDiv.appendChild(barDiv);

        const levelSpan = document.createElement('span');
        levelSpan.textContent = entry.level;
        levelDiv.appendChild(levelSpan);

        uvLevelsContainer.appendChild(levelDiv);
    });
}

// Llamar a la función para renderizar los datos
renderUVLevels(uvData);