// =============================================================================
// CALCULADORA DE CARTA NATAL - PARTE 1
// =============================================================================

// Configuración de ciudades y coordenadas
const CITIES_DATA = {
    'ES': [
        { name: 'Madrid', lat: 40.4168, lon: -3.7038, tz: 'Europe/Madrid' },
        { name: 'Barcelona', lat: 41.3851, lon: 2.1734, tz: 'Europe/Madrid' },
        { name: 'Valencia', lat: 39.4699, lon: -0.3763, tz: 'Europe/Madrid' },
        { name: 'Sevilla', lat: 37.3891, lon: -5.9845, tz: 'Europe/Madrid' },
        { name: 'Bilbao', lat: 43.2630, lon: -2.9350, tz: 'Europe/Madrid' },
        { name: 'Málaga', lat: 36.7213, lon: -4.4214, tz: 'Europe/Madrid' },
        { name: 'Las Palmas', lat: 28.1248, lon: -15.4300, tz: 'Atlantic/Canary' },
        { name: 'Palma de Mallorca', lat: 39.5696, lon: 2.6502, tz: 'Europe/Madrid' }
    ],
    'MX': [
        { name: 'Ciudad de México', lat: 19.4326, lon: -99.1332, tz: 'America/Mexico_City' },
        { name: 'Guadalajara', lat: 20.6597, lon: -103.3496, tz: 'America/Mexico_City' },
        { name: 'Monterrey', lat: 25.6866, lon: -100.3161, tz: 'America/Mexico_City' },
        { name: 'Puebla', lat: 19.0414, lon: -98.2063, tz: 'America/Mexico_City' },
        { name: 'Tijuana', lat: 32.5027, lon: -117.0039, tz: 'America/Tijuana' },
        { name: 'Cancún', lat: 21.1619, lon: -86.8515, tz: 'America/Cancun' }
    ],
    'AR': [
        { name: 'Buenos Aires', lat: -34.6037, lon: -58.3816, tz: 'America/Argentina/Buenos_Aires' },
        { name: 'Córdoba', lat: -31.4201, lon: -64.1888, tz: 'America/Argentina/Cordoba' },
        { name: 'Rosario', lat: -32.9442, lon: -60.6505, tz: 'America/Argentina/Buenos_Aires' },
        { name: 'Mendoza', lat: -32.8895, lon: -68.8458, tz: 'America/Argentina/Mendoza' },
        { name: 'La Plata', lat: -34.9215, lon: -57.9545, tz: 'America/Argentina/Buenos_Aires' }
    ],
    'CO': [
        { name: 'Bogotá', lat: 4.7110, lon: -74.0721, tz: 'America/Bogota' },
        { name: 'Medellín', lat: 6.2442, lon: -75.5812, tz: 'America/Bogota' },
        { name: 'Cali', lat: 3.4516, lon: -76.5320, tz: 'America/Bogota' },
        { name: 'Barranquilla', lat: 10.9639, lon: -74.7964, tz: 'America/Bogota' },
        { name: 'Cartagena', lat: 10.3910, lon: -75.4794, tz: 'America/Bogota' }
    ],
    'US': [
        { name: 'New York', lat: 40.7128, lon: -74.0060, tz: 'America/New_York' },
        { name: 'Los Angeles', lat: 34.0522, lon: -118.2437, tz: 'America/Los_Angeles' },
        { name: 'Chicago', lat: 41.8781, lon: -87.6298, tz: 'America/Chicago' },
        { name: 'Miami', lat: 25.7617, lon: -80.1918, tz: 'America/New_York' },
        { name: 'San Francisco', lat: 37.7749, lon: -122.4194, tz: 'America/Los_Angeles' }
    ]
};

// Símbolos astrológicos
const ZODIAC_SYMBOLS = {
    'Aries': '♈', 'Tauro': '♉', 'Géminis': '♊', 'Cáncer': '♋',
    'Leo': '♌', 'Virgo': '♍', 'Libra': '♎', 'Escorpio': '♏',
    'Sagitario': '♐', 'Capricornio': '♑', 'Acuario': '♒', 'Piscis': '♓'
};

const PLANET_SYMBOLS = {
    'Sol': '☉', 'Luna': '☽', 'Mercurio': '☿', 'Venus': '♀',
    'Marte': '♂', 'Júpiter': '♃', 'Saturno': '♄', 'Urano': '♅',
    'Neptuno': '♆', 'Plutón': '♇', 'Quirón': '⚷', 'Nodo Norte': '☊'
};

// Datos de signos zodiacales
const ZODIAC_SIGNS = [
    'Aries', 'Tauro', 'Géminis', 'Cáncer', 'Leo', 'Virgo',
    'Libra', 'Escorpio', 'Sagitario', 'Capricornio', 'Acuario', 'Piscis'
];

// Interpretaciones astrológicas básicas
const SIGN_INTERPRETATIONS = {
    'Aries': {
        traits: 'Energético, pionero, impulsivo, valiente, independiente',
        description: 'Los Aries son líderes naturales con una energía ardiente. Son pioneros que no temen enfrentar nuevos desafíos.'
    },
    'Tauro': {
        traits: 'Estable, práctico, determinado, sensual, perseverante',
        description: 'Los Tauro valoran la estabilidad y la belleza. Son personas prácticas que disfrutan de los placeres sensoriales.'
    },
    'Géminis': {
        traits: 'Comunicativo, versátil, curioso, adaptable, intelectual',
        description: 'Los Géminis son comunicadores naturales con una mente ágil y curiosa. Se adaptan fácilmente a nuevas situaciones.'
    },
    'Cáncer': {
        traits: 'Emocional, protector, intuitivo, hogareño, empático',
        description: 'Los Cáncer son muy emocionales y protectores. Valoran profundamente la familia y el hogar.'
    },
    'Leo': {
        traits: 'Creativo, generoso, dramático, orgulloso, carismático',
        description: 'Los Leo son naturalmente carismáticos y creativos. Les gusta brillar y ser el centro de atención.'
    },
    'Virgo': {
        traits: 'Analítico, perfeccionista, servicial, práctico, detallista',
        description: 'Los Virgo son meticulosos y analíticos. Tienen un don natural para ayudar y mejorar las cosas.'
    },
    'Libra': {
        traits: 'Equilibrado, diplomático, estético, social, indeciso',
        description: 'Los Libra buscan la armonía y el equilibrio. Son diplomáticos naturales con gran sentido estético.'
    },
    'Escorpio': {
        traits: 'Intenso, misterioso, transformador, magnético, profundo',
        description: 'Los Escorpio son intensos y misteriosos. Tienen una capacidad única para la transformación profunda.'
    },
    'Sagitario': {
        traits: 'Aventurero, filosófico, optimista, libre, expansivo',
        description: 'Los Sagitario son aventureros y filósofos. Buscan constantemente expandir sus horizontes.'
    },
    'Capricornio': {
        traits: 'Ambicioso, disciplinado, responsable, tradicional, persistente',
        description: 'Los Capricornio son ambiciosos y disciplinados. Valoran la tradición y trabajan duro para lograr sus metas.'
    },
    'Acuario': {
        traits: 'Innovador, independiente, humanitario, excéntrico, visionario',
        description: 'Los Acuario son innovadores y humanitarios. Tienen una visión única del futuro y valoran la libertad.'
    },
    'Piscis': {
        traits: 'Intuitivo, compasivo, artístico, sensible, espiritual',
        description: 'Los Piscis son muy intuitivos y compasivos. Tienen una conexión natural con el mundo espiritual y artístico.'
    }
};

// Funciones de cálculo astronómico básico
class AstronomicalCalculator {
    constructor() {
        this.J2000 = 2451545.0; // Época J2000.0
    }

    // Convertir fecha a Día Juliano
    dateToJulianDay(year, month, day, hour, minute) {
        if (month <= 2) {
            year -= 1;
            month += 12;
        }
        
        const A = Math.floor(year / 100);
        const B = 2 - A + Math.floor(A / 4);
        
        const JD = Math.floor(365.25 * (year + 4716)) + 
                   Math.floor(30.6001 * (month + 1)) + 
                   day + B - 1524.5 + 
                   (hour + minute / 60) / 24;
        
        return JD;
    }

    // Calcular tiempo sidéreo local
    calculateSiderealTime(jd, longitude) {
        const T = (jd - this.J2000) / 36525.0;
        const theta0 = 280.46061837 + 360.98564736629 * (jd - this.J2000) + 
                      0.000387933 * T * T - T * T * T / 38710000.0;
        
        let lst = (theta0 + longitude) % 360;
        if (lst < 0) lst += 360;
        
        return lst;
    }

    // Calcular posición del Sol (aproximada)
    calculateSunPosition(jd) {
        const n = jd - this.J2000;
        const L = (280.460 + 0.9856474 * n) % 360;
        const M = (357.528 + 0.9856003 * n) % 360;
        const lambda = L + 1.915 * Math.sin(M * Math.PI / 180) + 
                      0.020 * Math.sin(2 * M * Math.PI / 180);
        
        return { longitude: lambda % 360 };
    }

    // Determinar signo zodiacal basado en longitud eclíptica
    getZodiacSign(longitude) {
        const signIndex = Math.floor(longitude / 30);
        return ZODIAC_SIGNS[signIndex];
    }

    // Calcular Ascendente (aproximado)
    calculateAscendant(lst, latitude) {
        // Aproximación simplificada del ascendente
        const ascendant = (lst + 180) % 360;
        return this.getZodiacSign(ascendant);
    }

    // Calcular Medio Cielo
    calculateMidheaven(lst) {
        const mc = lst % 360;
        return this.getZodiacSign(mc);
    }
}

console.log("previo a clase natalchartapp")

// Clase principal para manejar la aplicación
class NatalChartApp {
    constructor() {
        this.calculator = new AstronomicalCalculator();
        this.initializeApp();
    }

    initializeApp() {
        this.setupEventListeners();
        this.populateCountryDropdown();
    }

    setupEventListeners() {
        // Event listener para el formulario
        document.getElementById('birthForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.calculateChart();
        });

        // Event listener para cambio de país
        document.getElementById('country').addEventListener('change', (e) => {
            this.populateCityDropdown(e.target.value);
        });

        // Event listener para cambio de ciudad
        document.getElementById('city').addEventListener('input', (e) => {
            this.updateCoordinates(e.target.value);
        });
    }

    populateCountryDropdown() {
        const countrySelect = document.getElementById('country');
        // Los países ya están en el HTML, no necesitamos agregar más
    }

    populateCityDropdown(countryCode) {
        const cityInput = document.getElementById('city');
        const citiesDatalist = document.getElementById('cities');
        
        // Limpiar opciones anteriores
        citiesDatalist.innerHTML = '';
        
        if (CITIES_DATA[countryCode]) {
            CITIES_DATA[countryCode].forEach(city => {
                const option = document.createElement('option');
                option.value = city.name;
                citiesDatalist.appendChild(option);
            });
        }
        
        // Limpiar campos de coordenadas
        document.getElementById('latitude').value = '';
        document.getElementById('longitude').value = '';
        cityInput.value = '';
    }

    updateCoordinates(cityName) {
        const countryCode = document.getElementById('country').value;
        
        if (CITIES_DATA[countryCode]) {
            const city = CITIES_DATA[countryCode].find(c => c.name === cityName);
            if (city) {
                document.getElementById('latitude').value = city.lat;
                document.getElementById('longitude').value = city.lon;
            }
        }
    }

    showError(message) {
        const errorContainer = document.getElementById('errorContainer');
        errorContainer.innerHTML = `<div class="error">${message}</div>`;
        setTimeout(() => {
            errorContainer.innerHTML = '';
        }, 5000);
    }

    showSuccess(message) {
        const errorContainer = document.getElementById('errorContainer');
        errorContainer.innerHTML = `<div class="success">${message}</div>`;
        setTimeout(() => {
            errorContainer.innerHTML = '';
        }, 3000);
    }

    validateForm() {
        const day = parseInt(document.getElementById('day').value);
        const month = parseInt(document.getElementById('month').value);
        const year = parseInt(document.getElementById('year').value);
        const hour = parseInt(document.getElementById('hour').value);
        const minute = parseInt(document.getElementById('minute').value);
        const country = document.getElementById('country').value;
        const city = document.getElementById('city').value;
        const latitude = parseFloat(document.getElementById('latitude').value);
        const longitude = parseFloat(document.getElementById('longitude').value);

        if (!day || !month || !year || hour < 0 || minute < 0 || !country || !city) {
            this.showError('Por favor, completa todos los campos obligatorios.');
            return false;
        }

        if (day < 1 || day > 31) {
            this.showError('El día debe estar entre 1 y 31.');
            return false;
        }

        if (hour > 23) {
            this.showError('La hora debe estar entre 0 y 23.');
            return false;
        }

        if (minute > 59) {
            this.showError('Los minutos deben estar entre 0 y 59.');
            return false;
        }

        if (isNaN(latitude) || isNaN(longitude)) {
            this.showError('No se pudieron obtener las coordenadas de la ciudad seleccionada.');
            return false;
        }

        return true;
    }

    

    async calculateChart() {
        if (!this.validateForm()) {
            return;
        }

        const calculateBtn = document.getElementById('calculateBtn');
        const loading = document.getElementById('loading');
        
        // Mostrar loading
        calculateBtn.disabled = true;
        loading.style.display = 'block';


        console.log(" dentro de clase natalchartapp")

        try {
            // Obtener datos del formulario
            const birthData = this.getBirthData();
            
            // Calcular posiciones planetarias
            const chartData = this.performCalculations(birthData);
            
            // Mostrar resultados
            this.displayResults(chartData);
            this.renderChart(chartData);
            
            this.showSuccess('¡Carta natal calculada exitosamente!');
            
        } catch (error) {
            console.error('Error calculando carta natal:', error);
            this.showError('Error al calcular la carta natal. Por favor, inténtalo de nuevo.');
        } finally {
            calculateBtn.disabled = false;
            loading.style.display = 'none';
        }
    }

    getBirthData() {
        return {
            name: document.getElementById('name').value || 'Anónimo',
            day: parseInt(document.getElementById('day').value),
            month: parseInt(document.getElementById('month').value),
            year: parseInt(document.getElementById('year').value),
            hour: parseInt(document.getElementById('hour').value),
            minute: parseInt(document.getElementById('minute').value),
            country: document.getElementById('country').value,
            city: document.getElementById('city').value,
            latitude: parseFloat(document.getElementById('latitude').value),
            longitude: parseFloat(document.getElementById('longitude').value)
        };
    }


    performCalculations(birthData) {
        const jd = this.calculator.dateToJulianDay(
            birthData.year, birthData.month, birthData.day,
            birthData.hour, birthData.minute
        );

        const lst = this.calculator.calculateSiderealTime(jd, birthData.longitude);
        const sunPosition = this.calculator.calculateSunPosition(jd);

        const sunSign = this.calculator.getZodiacSign(sunPosition.longitude);
        const ascendant = this.calculator.calculateAscendant(lst, birthData.latitude);
        const midheaven = this.calculator.calculateMidheaven(lst);

        const planetPositions = this.simulatePlanetPositions(jd, sunPosition.longitude);
        const houses = this.calculateHouses(lst, birthData.latitude);

        return {
            birthData,
            julianDay: jd,
            siderealTime: lst,
            sunSign,
            ascendant,
            midheaven,
            planetPositions,
            houses,
            sunPosition: sunPosition.longitude
        };
    }

    simulatePlanetPositions(jd, sunLongitude) {
        const positions = {};
        const n = jd - this.calculator.J2000;

        positions['Sol'] = {
            longitude: sunLongitude,
            sign: this.calculator.getZodiacSign(sunLongitude),
            degree: Math.floor(sunLongitude % 30),
            house: 1
        };

        const moonLongitude = (218.316 + 13.176396 * n) % 360;
        positions['Luna'] = {
            longitude: moonLongitude,
            sign: this.calculator.getZodiacSign(moonLongitude),
            degree: Math.floor(moonLongitude % 30),
            house: Math.floor(Math.random() * 12) + 1
        };

        const planets = ['Mercurio', 'Venus', 'Marte', 'Júpiter', 'Saturno', 'Urano', 'Neptuno', 'Plutón'];

        planets.forEach((planet, index) => {
            const longitude = (sunLongitude + (index + 1) * 30 + Math.random() * 60 - 30) % 360;
            positions[planet] = {
                longitude: longitude,
                sign: this.calculator.getZodiacSign(longitude),
                degree: Math.floor(longitude % 30),
                house: Math.floor(Math.random() * 12) + 1
            };
        });

        return positions;
    }

    calculateHouses(lst, latitude) {
        const houses = [];

        for (let i = 1; i <= 12; i++) {
            const houseCusp = (lst + (i - 1) * 30) % 360;
            houses.push({
                number: i,
                cusp: houseCusp,
                sign: this.calculator.getZodiacSign(houseCusp)
            });
        }

        return houses;
    }

    // Mostrar resultados
    displayResults(chartData) {
        const resultsSection = document.getElementById('resultsSection');
        const resultsGrid = document.getElementById('resultsGrid');
        const chartSummary = document.getElementById('chartSummary');

        // Mostrar sección de resultados
        resultsSection.style.display = 'block';

        // Resumen general
        chartSummary.innerHTML = `
            <div class="result-card">
                <h3>🌟 Resumen de ${chartData.birthData.name}</h3>
                <p><strong>Fecha de nacimiento:</strong> ${chartData.birthData.day}/${chartData.birthData.month}/${chartData.birthData.year}</p>
                <p><strong>Hora:</strong> ${chartData.birthData.hour}:${chartData.birthData.minute.toString().padStart(2, '0')}</p>
                <p><strong>Lugar:</strong> ${chartData.birthData.city}, ${chartData.birthData.country}</p>
                <p><strong>Coordenadas:</strong> ${chartData.birthData.latitude.toFixed(4)}°, ${chartData.birthData.longitude.toFixed(4)}°</p>
            </div>
        `;

        // Limpiar resultados anteriores
        resultsGrid.innerHTML = '';

        // Signos principales
        this.addResultCard('🌞 Signo Solar', chartData.sunSign, SIGN_INTERPRETATIONS[chartData.sunSign]);
        this.addResultCard('🌅 Ascendente', chartData.ascendant, {
            description: `Tu ascendente en ${chartData.ascendant} influye en cómo te presentas al mundo y tu primera impresión.`
        });
        this.addResultCard('⭐ Medio Cielo', chartData.midheaven, {
            description: `Tu Medio Cielo en ${chartData.midheaven} representa tus aspiraciones profesionales y tu imagen pública.`
        });

        // Posiciones planetarias
        this.addPlanetaryPositions(chartData.planetPositions);

        // Casas astrológicas
        this.addHousesInformation(chartData.houses);

        // Scroll a los resultados
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    }

    // Agregar tarjeta de resultado
    addResultCard(title, sign, interpretation) {
        const resultsGrid = document.getElementById('resultsGrid');

        const card = document.createElement('div');
        card.className = 'result-card';
        card.innerHTML = `
            <h3>${title}</h3>
            <p><strong>${ZODIAC_SYMBOLS[sign] || ''} ${sign}</strong></p>
            <p><strong>Características:</strong> ${SIGN_INTERPRETATIONS.traits || 'Información no disponible'}</p>
            <p>${SIGN_INTERPRETATIONS.description || 'Descripción no disponible'}</p>
        `;

        resultsGrid.appendChild(card);
    }

    // Agregar posiciones planetarias
    addPlanetaryPositions(positions) {
        const resultsGrid = document.getElementById('resultsGrid');

        const card = document.createElement('div');
        card.className = 'result-card';
        card.innerHTML = '<h3>🪐 Posiciones Planetarias</h3>';

        Object.entries(positions).forEach(([planet, data]) => {
            const positionDiv = document.createElement('div');
            positionDiv.className = 'planet-position';
            positionDiv.innerHTML = `
                <span class="planet-name">${PLANET_SYMBOLS[planet] || ''} ${planet}</span>
                <span class="planet-sign">${ZODIAC_SYMBOLS[data.sign]} ${data.sign} ${data.degree}°</span>
            `;
            card.appendChild(positionDiv);
        });

        resultsGrid.appendChild(card);
    }

    addHousesInformation(houses) {
        const resultsGrid = document.getElementById('resultsGrid');

        const card = document.createElement('div');
        card.className = 'result-card';
        card.innerHTML = '<h3>🏠 Casas Astrológicas</h3>';

        houses.slice(0, 6).forEach(house => {
            const houseDiv = document.createElement('div');
            houseDiv.className = 'planet-position';
            houseDiv.innerHTML = `
                <span class="planet-name">Casa ${house.number}</span>
                <span class="planet-sign">${ZODIAC_SYMBOLS[house.sign]} ${house.sign}</span>
            `;
            card.appendChild(houseDiv);
        });

        resultsGrid.appendChild(card);
    }

    // Método para renderizar el gráfico de carta natal
    renderChart(chartData) {
        const chartContainer = document.getElementById('chartContainer');
        chartContainer.innerHTML = '';

        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('class', 'chart-svg');
        svg.setAttribute('viewBox', '0 0 400 400');
        svg.setAttribute('width', '400');
        svg.setAttribute('height', '400');

        const centerX = 200;
        const centerY = 200;
        const outerRadius = 180;
        const innerRadius = 140;
        const houseRadius = 100;

        const outerCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        outerCircle.setAttribute('cx', centerX);
        outerCircle.setAttribute('cy', centerY);
        outerCircle.setAttribute('r', outerRadius);
        outerCircle.setAttribute('class', 'outer-circle');
        svg.appendChild(outerCircle);

        const innerCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        innerCircle.setAttribute('cx', centerX);
        innerCircle.setAttribute('cy', centerY);
        innerCircle.setAttribute('r', innerRadius);
        innerCircle.setAttribute('class', 'inner-circle');
        svg.appendChild(innerCircle);

        const houseCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        houseCircle.setAttribute('cx', centerX);
        houseCircle.setAttribute('cy', centerY);
        houseCircle.setAttribute('r', houseRadius);
        houseCircle.setAttribute('class', 'house-circle');
        svg.appendChild(houseCircle);

        for (let i = 0; i < 12; i++) {
            const angle = (i * 30 - 90) * Math.PI / 180;
            const x1 = centerX + innerRadius * Math.cos(angle);
            const y1 = centerY + innerRadius * Math.sin(angle);
            const x2 = centerX + outerRadius * Math.cos(angle);
            const y2 = centerY + outerRadius * Math.sin(angle);

            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', x1);
            line.setAttribute('y1', y1);
            line.setAttribute('x2', x2);
            line.setAttribute('y2', y2);
            line.setAttribute('class', 'sign-line');
            svg.appendChild(line);

            const signAngle = ((i * 30 + 15) - 90) * Math.PI / 180;
            const signX = centerX + (innerRadius + outerRadius) / 2 * Math.cos(signAngle);
            const signY = centerY + (innerRadius + outerRadius) / 2 * Math.sin(signAngle);

            const signText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            signText.setAttribute('x', signX);
            signText.setAttribute('y', signY);
            signText.setAttribute('class', 'sign-symbol');
            signText.textContent = ZODIAC_SYMBOLS[ZODIAC_SIGNS[i]];
            svg.appendChild(signText);
        }

        for (let i = 0; i < 12; i++) {
            const angle = (i * 30 - 90) * Math.PI / 180;
            const x1 = centerX + houseRadius * Math.cos(angle);
            const y1 = centerY + houseRadius * Math.sin(angle);
            const x2 = centerX + innerRadius * Math.cos(angle);
            const y2 = centerY + innerRadius * Math.sin(angle);

            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', x1);
            line.setAttribute('y1', y1);
            line.setAttribute('x2', x2);
            line.setAttribute('y2', y2);
            line.setAttribute('class', 'house-line');
            svg.appendChild(line);

            const houseAngle = ((i * 30 + 15) - 90) * Math.PI / 180;
            const houseX = centerX + (houseRadius + innerRadius) / 2 * Math.cos(houseAngle);
            const houseY = centerY + (houseRadius + innerRadius) / 2 * Math.sin(houseAngle);

            const houseText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            houseText.setAttribute('x', houseX);
            houseText.setAttribute('y', houseY);
            houseText.setAttribute('class', 'house-number');
            houseText.textContent = i + 1;
            svg.appendChild(houseText);
        }

        const ascLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        ascLine.setAttribute('x1', centerX - outerRadius);
        ascLine.setAttribute('y1', centerY);
        ascLine.setAttribute('x2', centerX + outerRadius);
        ascLine.setAttribute('y2', centerY);
        ascLine.setAttribute('class', 'asc-line');
        svg.appendChild(ascLine);

        const ascText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        ascText.setAttribute('x', centerX - outerRadius - 10);
        ascText.setAttribute('y', centerY - 5);
        ascText.setAttribute('class', 'asc-label');
        ascText.textContent = 'ASC';
        svg.appendChild(ascText);

        const mcLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        mcLine.setAttribute('x1', centerX);
        mcLine.setAttribute('y1', centerY - outerRadius);
        mcLine.setAttribute('x2', centerX);
        mcLine.setAttribute('y2', centerY + outerRadius);
        mcLine.setAttribute('class', 'mc-line');
        svg.appendChild(mcLine);

        const mcText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        mcText.setAttribute('x', centerX + 5);
        mcText.setAttribute('y', centerY - outerRadius - 5);
        mcText.setAttribute('class', 'mc-label');
        mcText.textContent = 'MC';
        svg.appendChild(mcText);

        Object.entries(chartData.planetPositions).forEach(([planet, data]) => {
            const planetAngle = (data.longitude - chartData.siderealTime) * Math.PI / 180;
            const planetRadius = houseRadius - 30;
            const planetX = centerX + planetRadius * Math.cos(planetAngle);
            const planetY = centerY + planetRadius * Math.sin(planetAngle);

            const planetCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            planetCircle.setAttribute('cx', planetX);
            planetCircle.setAttribute('cy', planetY);
            planetCircle.setAttribute('r', 12);
            planetCircle.setAttribute('fill', '#ffffff');
            planetCircle.setAttribute('stroke', '#333333');
            planetCircle.setAttribute('stroke-width', '2');
            svg.appendChild(planetCircle);

            const planetText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            planetText.setAttribute('x', planetX);
            planetText.setAttribute('y', planetY);
            planetText.setAttribute('class', 'planet-symbol');
            planetText.setAttribute('fill', '#333333');
            planetText.textContent = PLANET_SYMBOLS[planet] || planet.charAt(0);
            svg.appendChild(planetText);
        });

        chartContainer.appendChild(svg);
    }
   
}

// =============================================================================
// CALCULADORA DE CARTA NATAL - PARTE 2
// =============================================================================

/* // Continuación de la clase NatalChartApp
NatalChartApp.prototype.performCalculations = function(birthData) {
    const jd = this.calculator.dateToJulianDay(
        birthData.year, birthData.month, birthData.day,
        birthData.hour, birthData.minute
    );

    const lst = this.calculator.calculateSiderealTime(jd, birthData.longitude);
    const sunPosition = this.calculator.calculateSunPosition(jd);
    
    // Calcular signos principales
    const sunSign = this.calculator.getZodiacSign(sunPosition.longitude);
    const ascendant = this.calculator.calculateAscendant(lst, birthData.latitude);
    const midheaven = this.calculator.calculateMidheaven(lst);
    
    // Simular posiciones de otros planetas (en una implementación real, 
    // necesitarías efemérides precisas o una API astronómica)
    const planetPositions = this.simulatePlanetPositions(jd, sunPosition.longitude);
    
    // Calcular casas astrológicas
    const houses = this.calculateHouses(lst, birthData.latitude);
    
    return {
        birthData,
        julianDay: jd,
        siderealTime: lst,
        sunSign,
        ascendant,
        midheaven,
        planetPositions,
        houses,
        sunPosition: sunPosition.longitude
    };
};

// Simular posiciones planetarias (aproximadas)
NatalChartApp.prototype.simulatePlanetPositions = function(jd, sunLongitude) {
    const positions = {};
    const n = jd - this.calculator.J2000;
    
    // Sol
    positions['Sol'] = {
        longitude: sunLongitude,
        sign: this.calculator.getZodiacSign(sunLongitude),
        degree: Math.floor(sunLongitude % 30),
        house: 1 // Simplificado
    };
    
    // Luna (aproximación muy básica)
    const moonLongitude = (218.316 + 13.176396 * n) % 360;
    positions['Luna'] = {
        longitude: moonLongitude,
        sign: this.calculator.getZodiacSign(moonLongitude),
        degree: Math.floor(moonLongitude % 30),
        house: Math.floor(Math.random() * 12) + 1
    };
    
    // Otros planetas (posiciones simuladas para demostración)
    const planets = ['Mercurio', 'Venus', 'Marte', 'Júpiter', 'Saturno', 'Urano', 'Neptuno', 'Plutón'];
    
    planets.forEach((planet, index) => {
        const longitude = (sunLongitude + (index + 1) * 30 + Math.random() * 60 - 30) % 360;
        positions[planet] = {
            longitude: longitude,
            sign: this.calculator.getZodiacSign(longitude),
            degree: Math.floor(longitude % 30),
            house: Math.floor(Math.random() * 12) + 1
        };
    });
    
    return positions;
};

// Calcular casas astrológicas (método simplificado)
NatalChartApp.prototype.calculateHouses = function(lst, latitude) {
    const houses = [];
    
    for (let i = 1; i <= 12; i++) {
        const houseCusp = (lst + (i - 1) * 30) % 360;
        houses.push({
            number: i,
            cusp: houseCusp,
            sign: this.calculator.getZodiacSign(houseCusp)
        });
    }
    
    return houses;
};
 */


/* // Mostrar resultados
NatalChartApp.prototype.displayResults = function(chartData) {
    const resultsSection = document.getElementById('resultsSection');
    const resultsGrid = document.getElementById('resultsGrid');
    const chartSummary = document.getElementById('chartSummary');
    
    // Mostrar sección de resultados
    resultsSection.style.display = 'block';
    
    // Resumen general
    chartSummary.innerHTML = `
        <div class="result-card">
            <h3>🌟 Resumen de ${chartData.birthData.name}</h3>
            <p><strong>Fecha de nacimiento:</strong> ${chartData.birthData.day}/${chartData.birthData.month}/${chartData.birthData.year}</p>
            <p><strong>Hora:</strong> ${chartData.birthData.hour}:${chartData.birthData.minute.toString().padStart(2, '0')}</p>
            <p><strong>Lugar:</strong> ${chartData.birthData.city}, ${chartData.birthData.country}</p>
            <p><strong>Coordenadas:</strong> ${chartData.birthData.latitude.toFixed(4)}°, ${chartData.birthData.longitude.toFixed(4)}°</p>
        </div>
    `;
    
    // Limpiar resultados anteriores
    resultsGrid.innerHTML = '';
    
    // Signos principales
    this.addResultCard('🌞 Signo Solar', chartData.sunSign, SIGN_INTERPRETATIONS[chartData.sunSign]);
    this.addResultCard('🌅 Ascendente', chartData.ascendant, {
        description: `Tu ascendente en ${chartData.ascendant} influye en cómo te presentas al mundo y tu primera impresión.`
    });
    this.addResultCard('⭐ Medio Cielo', chartData.midheaven, {
        description: `Tu Medio Cielo en ${chartData.midheaven} representa tus aspiraciones profesionales y tu imagen pública.`
    });
    
    // Posiciones planetarias
    this.addPlanetaryPositions(chartData.planetPositions);
    
    // Casas astrológicas
    this.addHousesInformation(chartData.houses);
    
    // Scroll a los resultados
    resultsSection.scrollIntoView({ behavior: 'smooth' });
};

// Agregar tarjeta de resultado
NatalChartApp.prototype.addResultCard = function(title, sign, interpretation) {
    const resultsGrid = document.getElementById('resultsGrid');
    
    const card = document.createElement('div');
    card.className = 'result-card';
    card.innerHTML = `
        <h3>${title}</h3>
        <p><strong>${ZODIAC_SYMBOLS[sign] || ''} ${sign}</strong></p>
        <p><strong>Características:</strong> ${interpretation.traits || 'Información no disponible'}</p>
        <p>${interpretation.description || 'Descripción no disponible'}</p>
    `;
    
    resultsGrid.appendChild(card);
};

// Agregar posiciones planetarias
NatalChartApp.prototype.addPlanetaryPositions = function(positions) {
    const resultsGrid = document.getElementById('resultsGrid');
    
    const card = document.createElement('div');
    card.className = 'result-card';
    card.innerHTML = '<h3>🪐 Posiciones Planetarias</h3>';
    
    Object.entries(positions).forEach(([planet, data]) => {
        const positionDiv = document.createElement('div');
        positionDiv.className = 'planet-position';
        positionDiv.innerHTML = `
            <span class="planet-name">${PLANET_SYMBOLS[planet] || ''} ${planet}</span>
            <span class="planet-sign">${ZODIAC_SYMBOLS[data.sign]} ${data.sign} ${data.degree}°</span>
        `;
        card.appendChild(positionDiv);
    });
    
    resultsGrid.appendChild(card);
}; */

/* // Agregar información de casas
NatalChartApp.prototype.addHousesInformation = function(houses) {
    const resultsGrid = document.getElementById('resultsGrid');
    
    const card = document.createElement('div');
    card.className = 'result-card';
    card.innerHTML = '<h3>🏠 Casas Astrológicas</h3>';
    
    houses.slice(0, 6).forEach(house => {
        const houseDiv = document.createElement('div');
        houseDiv.className = 'planet-position';
        houseDiv.innerHTML = `
            <span class="planet-name">Casa ${house.number}</span>
            <span class="planet-sign">${ZODIAC_SYMBOLS[house.sign]} ${house.sign}</span>
        `;
        card.appendChild(houseDiv);
    });
    
    resultsGrid.appendChild(card);
};

// Renderizar gráfico de carta natal
NatalChartApp.prototype.renderChart = function(chartData) {
    const chartContainer = document.getElementById('chartContainer');
    chartContainer.innerHTML = '';
    
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'chart-svg');
    svg.setAttribute('viewBox', '0 0 400 400');
    svg.setAttribute('width', '400');
    svg.setAttribute('height', '400');
    
    const centerX = 200;
    const centerY = 200;
    const outerRadius = 180;
    const innerRadius = 140;
    const houseRadius = 100;
    
    // Círculo exterior
    const outerCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    outerCircle.setAttribute('cx', centerX);
    outerCircle.setAttribute('cy', centerY);
    outerCircle.setAttribute('r', outerRadius);
    outerCircle.setAttribute('class', 'outer-circle');
    svg.appendChild(outerCircle);
    
    // Círculo interior
    const innerCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    innerCircle.setAttribute('cx', centerX);
    innerCircle.setAttribute('cy', centerY);
    innerCircle.setAttribute('r', innerRadius);
    innerCircle.setAttribute('class', 'inner-circle');
    svg.appendChild(innerCircle);
    
    // Círculo de casas
    const houseCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    houseCircle.setAttribute('cx', centerX);
    houseCircle.setAttribute('cy', centerY);
    houseCircle.setAttribute('r', houseRadius);
    houseCircle.setAttribute('class', 'house-circle');
    svg.appendChild(houseCircle);
    
    // Dibujar divisiones de signos
    for (let i = 0; i < 12; i++) {
        const angle = (i * 30 - 90) * Math.PI / 180;
        const x1 = centerX + innerRadius * Math.cos(angle);
        const y1 = centerY + innerRadius * Math.sin(angle);
        const x2 = centerX + outerRadius * Math.cos(angle);
        const y2 = centerY + outerRadius * Math.sin(angle);
        
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
        line.setAttribute('class', 'sign-line');
        svg.appendChild(line);
        
        // Símbolos de signos
        const signAngle = ((i * 30 + 15) - 90) * Math.PI / 180;
        const signX = centerX + (innerRadius + outerRadius) / 2 * Math.cos(signAngle);
        const signY = centerY + (innerRadius + outerRadius) / 2 * Math.sin(signAngle);
        
        const signText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        signText.setAttribute('x', signX);
        signText.setAttribute('y', signY);
        signText.setAttribute('class', 'sign-symbol');
        signText.textContent = ZODIAC_SYMBOLS[ZODIAC_SIGNS[i]];
        svg.appendChild(signText);
    }
    
    // Dibujar divisiones de casas
    for (let i = 0; i < 12; i++) {
        const angle = (i * 30 - 90) * Math.PI / 180;
        const x1 = centerX + houseRadius * Math.cos(angle);
        const y1 = centerY + houseRadius * Math.sin(angle);
        const x2 = centerX + innerRadius * Math.cos(angle);
        const y2 = centerY + innerRadius * Math.sin(angle);
        
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
        line.setAttribute('class', 'house-line');
        svg.appendChild(line);
        
        // Números de casas
        const houseAngle = ((i * 30 + 15) - 90) * Math.PI / 180;
        const houseX = centerX + (houseRadius + innerRadius) / 2 * Math.cos(houseAngle);
        const houseY = centerY + (houseRadius + innerRadius) / 2 * Math.sin(houseAngle);
        
        const houseText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        houseText.setAttribute('x', houseX);
        houseText.setAttribute('y', houseY);
        houseText.setAttribute('class', 'house-number');
        houseText.textContent = i + 1;
        svg.appendChild(houseText);
    }
    
    // Línea del Ascendente
    const ascLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    ascLine.setAttribute('x1', centerX - outerRadius);
    ascLine.setAttribute('y1', centerY);
    ascLine.setAttribute('x2', centerX + outerRadius);
    ascLine.setAttribute('y2', centerY);
    ascLine.setAttribute('class', 'asc-line');
    svg.appendChild(ascLine);
    
    // Etiqueta Ascendente
    const ascText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    ascText.setAttribute('x', centerX - outerRadius - 10);
    ascText.setAttribute('y', centerY - 5);
    ascText.setAttribute('class', 'asc-label');
    ascText.textContent = 'ASC';
    svg.appendChild(ascText);
    
    // Línea del Medio Cielo
    const mcLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    mcLine.setAttribute('x1', centerX);
    mcLine.setAttribute('y1', centerY - outerRadius);
    mcLine.setAttribute('x2', centerX);
    mcLine.setAttribute('y2', centerY + outerRadius);
    mcLine.setAttribute('class', 'mc-line');
    svg.appendChild(mcLine);
    
    // Etiqueta Medio Cielo
    const mcText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    mcText.setAttribute('x', centerX + 5);
    mcText.setAttribute('y', centerY - outerRadius - 5);
    mcText.setAttribute('class', 'mc-label');
    mcText.textContent = 'MC';
    svg.appendChild(mcText);
    
    // Dibujar planetas
    Object.entries(chartData.planetPositions).forEach(([planet, data]) => {
        const planetAngle = (data.longitude - chartData.siderealTime) * Math.PI / 180;
        const planetRadius = houseRadius - 30;
        const planetX = centerX + planetRadius * Math.cos(planetAngle);
        const planetY = centerY + planetRadius * Math.sin(planetAngle);
        
        // Círculo para el planeta
        const planetCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        planetCircle.setAttribute('cx', planetX);
        planetCircle.setAttribute('cy', planetY);
        planetCircle.setAttribute('r', 12);
        planetCircle.setAttribute('fill', '#ffffff');
        planetCircle.setAttribute('stroke', '#333333');
        planetCircle.setAttribute('stroke-width', '2');
        svg.appendChild(planetCircle);
        
        // Símbolo del planeta
        const planetText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        planetText.setAttribute('x', planetX);
        planetText.setAttribute('y', planetY);
        planetText.setAttribute('class', 'planet-symbol');
        planetText.setAttribute('fill', '#333333');
        planetText.textContent = PLANET_SYMBOLS[planet] || planet.charAt(0);
        svg.appendChild(planetText);
    });
    
    chartContainer.appendChild(svg);
};
 */



















// =============================================================================
// CALCULADORA DE CARTA NATAL - PARTE 3
// =============================================================================

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', () => {
    window.natalChartApp = new NatalChartApp();
});


























/* 

// =============================================================================
// FUNCIONES ADICIONALES Y MEJORAS
// =============================================================================

// Función para exportar la carta como imagen (funcionalidad adicional)
NatalChartApp.prototype.exportChart = function() {
    const svg = document.querySelector('.chart-svg');
    if (!svg) return;
    
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    canvas.width = 400;
    canvas.height = 400;
    
    img.onload = function() {
        ctx.drawImage(img, 0, 0);
        const link = document.createElement('a');
        link.download = 'carta-natal.png';
        link.href = canvas.toDataURL();
        link.click();
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
};

// Función para imprimir resultados
NatalChartApp.prototype.printResults = function() {
    const resultsContent = document.getElementById('resultsSection').innerHTML;
    const chartContent = document.getElementById('chartContainer').innerHTML;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Carta Natal - Resultados</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                .result-card { margin-bottom: 20px; padding: 15px; border: 1px solid #ddd; }
                .planet-position { display: flex; justify-content: space-between; margin: 5px 0; }
                .chart-svg { max-width: 300px; margin: 20px auto; display: block; }
                @media print {
                    body { margin: 0; }
                    .result-card { break-inside: avoid; }
                }
            </style>
        </head>
        <body>
            <h1>Carta Natal - Resultados</h1>
            <div style="text-align: center; margin: 20px 0;">
                ${chartContent}
            </div>
            ${resultsContent}
        </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
};

// Función para compartir resultados (Web Share API)
NatalChartApp.prototype.shareResults = function() {
    if (navigator.share) {
        navigator.share({
            title: 'Mi Carta Natal',
            text: 'He calculado mi carta natal astrológica',
            url: window.location.href
        }).catch(console.error);
    } else {
        // Fallback: copiar URL al portapapeles
        navigator.clipboard.writeText(window.location.href).then(() => {
            alert('URL copiada al portapapeles');
        });
    }
};

// Función para agregar aspectos astrológicos (básico)
NatalChartApp.prototype.calculateAspects = function(planetPositions) {
    const aspects = [];
    const planets = Object.keys(planetPositions);
    
    const aspectTypes = {
        0: { name: 'Conjunción', orb: 8, symbol: '☌' },
        60: { name: 'Sextil', orb: 6, symbol: '⚹' },
        90: { name: 'Cuadratura', orb: 8, symbol: '□' },
        120: { name: 'Trígono', orb: 8, symbol: '△' },
        180: { name: 'Oposición', orb: 8, symbol: '☍' }
    };
    
    for (let i = 0; i < planets.length; i++) {
        for (let j = i + 1; j < planets.length; j++) {
            const planet1 = planets[i];
            const planet2 = planets[j];
            const lon1 = planetPositions[planet1].longitude;
            const lon2 = planetPositions[planet2].longitude;
            
            let angle = Math.abs(lon1 - lon2);
            if (angle > 180) angle = 360 - angle;
            
            Object.entries(aspectTypes).forEach(([aspectAngle, aspectInfo]) => {
                const targetAngle = parseInt(aspectAngle);
                if (Math.abs(angle - targetAngle) <= aspectInfo.orb) {
                    aspects.push({
                        planet1,
                        planet2,
                        type: aspectInfo.name,
                        symbol: aspectInfo.symbol,
                        angle: Math.round(angle),
                        orb: Math.round(Math.abs(angle - targetAngle))
                    });
                }
            });
        }
    }
    
    return aspects;
};

// Función para mostrar aspectos
NatalChartApp.prototype.displayAspects = function(aspects) {
    if (aspects.length === 0) return;
    
    const resultsGrid = document.getElementById('resultsGrid');
    const card = document.createElement('div');
    card.className = 'result-card';
    card.innerHTML = '<h3>🔗 Aspectos Planetarios</h3>';
    
    aspects.slice(0, 10).forEach(aspect => {
        const aspectDiv = document.createElement('div');
        aspectDiv.className = 'planet-position';
        aspectDiv.innerHTML = `
            <span class="planet-name">
                ${PLANET_SYMBOLS[aspect.planet1]} ${aspect.planet1} ${aspect.symbol} ${PLANET_SYMBOLS[aspect.planet2]} ${aspect.planet2}
            </span>
            <span class="planet-sign">${aspect.type} (${aspect.angle}°)</span>
        `;
        card.appendChild(aspectDiv);
    });
    
    resultsGrid.appendChild(card);
};

// Mejorar la función performCalculations para incluir aspectos
const originalPerformCalculations = NatalChartApp.prototype.performCalculations;
NatalChartApp.prototype.performCalculations = function(birthData) {
    const chartData = originalPerformCalculations.call(this, birthData);
    
    // Calcular aspectos
    chartData.aspects = this.calculateAspects(chartData.planetPositions);
    
    return chartData;
};

// Mejorar la función displayResults para mostrar aspectos
const originalDisplayResults = NatalChartApp.prototype.displayResults;
NatalChartApp.prototype.displayResults = function(chartData) {
    originalDisplayResults.call(this, chartData);
    
    // Mostrar aspectos
    this.displayAspects(chartData.aspects);
}; */







// =============================================================================
// COMENTARIOS PARA MEJORAS FUTURAS
// =============================================================================

/*
MEJORAS RECOMENDADAS PARA IMPLEMENTACIÓN PROFESIONAL:

1. API ASTRONÓMICA REAL:
   - Usar Swiss Ephemeris (librería astronómica precisa)
   - Integrar con APIs como:
     * AstrologyAPI.com
     * Astro-Charts API
     * NASA JPL Ephemeris
   
2. CÁLCULOS PRECISOS:
   - Implementar algoritmos Meeus para posiciones planetarias
   - Cálculo preciso de casas (Placidus, Koch, Whole Sign)
   - Corrección por zona horaria y horario de verano
   - Nodos lunares y puntos árabe
   
3. INTERPRETACIONES AVANZADAS:
   - Base de datos de interpretaciones por signo/casa/aspecto
   - Algoritmo de síntesis de interpretaciones
   - Interpretaciones por combinaciones (ej: Sol en Aries en Casa 5)
   
4. FUNCIONALIDADES ADICIONALES:
   - Tránsitos planetarios
   - Progresiones secundarias
   - Revolución solar
   - Sinastría (compatibilidad entre cartas)
   - Carta compuesta
   
5. MEJORAS UX/UI:
   - Animaciones en el gráfico
   - Zoom y rotación de la carta
   - Modo oscuro/claro
   - Tooltips informativos
   - Búsqueda de ciudades con API de geocodificación
   
6. OPTIMIZACIÓN:
   - Service Workers para funcionamiento offline
   - Cache de cálculos
   - Lazy loading de interpretaciones
   - Optimización de rendimiento en dispositivos móviles

7. BASES DE DATOS:
   - Atlas mundial completo
   - Zonas horarias históricas
   - Efemérides planetarias
   - Catálogo de asteroides

8. EXPORTACIÓN:
   - PDF con interpretación completa
   - Formatos de imagen vectorial (SVG, PDF)
   - Datos en JSON para otras aplicaciones
   
9. VALIDACIÓN:
   - Validación de fechas históricas
   - Manejo de calendario juliano/gregoriano
   - Verificación de coordenadas

10. INTERNACIONALIZACIÓN:
    - Múltiples idiomas
    - Formatos de fecha/hora locales
    - Nombres de lugares en idioma local
*/




