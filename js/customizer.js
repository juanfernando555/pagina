// Colores de las camisas
const shirtColors = {
    white: '#FFFFFF',
    blue: '#1f618d',
    black: '#2C3E50',
    red: '#C0392B'
};

// Función para cargar el SVG base
async function loadShirtSVG() {
    try {
        const response = await fetch('img/shirt-base.svg');
        const svgText = await response.text();
        return svgText;
    } catch (error) {
        console.error('Error loading shirt SVG:', error);
        return null;
    }
}

// Función para actualizar el color del SVG
function updateShirtColor(svg, color) {
    return svg.replace(/fill="currentColor"/g, `fill="${color}"`);
}

// Función para actualizar la vista previa de la camisa
async function updateShirtPreview() {
    const color = document.getElementById('shirtColor').value;
    const preview = document.getElementById('shirtPreview');
    const svg = await loadShirtSVG();
    
    if (svg) {
        const coloredSvg = updateShirtColor(svg, shirtColors[color]);
        preview.src = 'data:image/svg+xml;base64,' + btoa(coloredSvg);
    }
}

// Función para actualizar el texto personalizado
function updateCustomText() {
    const text = document.getElementById('customTextInput').value;
    const color = document.getElementById('textColor').value;
    const customText = document.getElementById('customText');
    
    customText.textContent = text;
    customText.style.color = color;
}

// Función para realizar el pedido personalizado
function orderCustomShirt() {
    const color = document.getElementById('shirtColor').value;
    const text = document.getElementById('customTextInput').value;
    const size = document.getElementById('customSize').value;
    
    // Crear mensaje para WhatsApp
    const mensaje = `¡Hola! Me gustaría hacer un pedido personalizado:%0A%0A` +
                   `Color de camisa: ${color}%0A` +
                   `Texto personalizado: ${text}%0A` +
                   `Talla: ${size}`;

    // Abrir WhatsApp con el mensaje
    window.open(`https://wa.me/59167053233?text=${mensaje}`);
}

// Inicializar la vista previa cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const colorButtons = document.querySelectorAll('.color-btn');
    const customText = document.getElementById('customText');
    const sizeSelect = document.getElementById('size');
    const whatsappButton = document.getElementById('whatsappButton');
    const customTextPreview = document.getElementById('customTextPreview');
    const shirtImage = document.getElementById('shirtImage');
    
    // Elementos del resumen
    const selectedColorSpan = document.getElementById('selectedColor');
    const selectedTextSpan = document.getElementById('selectedText');
    const selectedSizeSpan = document.getElementById('selectedSize');

    // Estado del personalizador
    let currentState = {
        color: '#ffffff',
        text: '',
        size: ''
    };

    // Función para actualizar la previsualización
    function updatePreview() {
        // Actualizar color de la camisa
        shirtImage.style.filter = getColorFilter(currentState.color);
        
        // Actualizar texto
        customTextPreview.textContent = currentState.text;
        
        // Actualizar resumen
        selectedColorSpan.textContent = getColorName(currentState.color);
        selectedTextSpan.textContent = currentState.text || '-';
        selectedSizeSpan.textContent = currentState.size || '-';
    }

    // Función para obtener el nombre del color
    function getColorName(hexColor) {
        const colorMap = {
            '#ffffff': 'Blanco',
            '#000000': 'Negro',
            '#1f618d': 'Azul',
            '#2ecc71': 'Verde',
            '#e74c3c': 'Rojo'
        };
        return colorMap[hexColor] || hexColor;
    }

    // Función para obtener el filtro CSS según el color
    function getColorFilter(hexColor) {
        if (hexColor === '#ffffff') return 'none';
        
        // Convertir hex a RGB
        const r = parseInt(hexColor.slice(1, 3), 16);
        const g = parseInt(hexColor.slice(3, 5), 16);
        const b = parseInt(hexColor.slice(5, 7), 16);
        
        // Aplicar filtro de color
        return `brightness(0) saturate(100%) invert(${r/255}) sepia(${g/255}) saturate(${b/255})`;
    }

    // Event Listeners
    colorButtons.forEach(button => {
        button.addEventListener('click', () => {
            currentState.color = button.dataset.color;
            updatePreview();
        });
    });

    customText.addEventListener('input', (e) => {
        currentState.text = e.target.value;
        updatePreview();
    });

    sizeSelect.addEventListener('change', (e) => {
        currentState.size = e.target.value;
        updatePreview();
    });

    whatsappButton.addEventListener('click', () => {
        if (!currentState.size) {
            alert('Por favor selecciona una talla antes de continuar.');
            return;
        }

        const message = `¡Hola! Me gustaría ordenar una camisa con las siguientes características:
- Color: ${getColorName(currentState.color)}
- Texto: ${currentState.text || 'Sin texto'}
- Talla: ${currentState.size}
¿Podrían ayudarme con mi pedido?`;

        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/59167053233?text=${encodedMessage}`, '_blank');
    });

    // Inicializar previsualización
    updatePreview();
}); 