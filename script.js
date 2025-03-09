var selectedItems = [];

async function displayLogos() {
    const container = document.getElementById('logos-container');
    try {
      const response = await fetch('./Restaurant Logos');
      const text = await response.text();
      const parser = new DOMParser();
      const htmlDocument = parser.parseFromString(text, 'text/html');
      const links = htmlDocument.querySelectorAll('a');
  
      for (const link of links) {
        const href = link.getAttribute('href');
        if (href.match(/\.(jpg|jpeg|png|gif)$/i)) {
          const img = document.createElement('img');
          img.src = href;
          img.alt = link.textContent;
          img.title = link.textContent
            .replace(/-/g, ' ')
            .replace(/\.(jpg|jpeg|png|gif)$/i, '');
          img.style.margin = '20px';
          img.style.width = '200px';
          img.classList.add('logo');
          img.addEventListener('click', () => {
            if (selectedItems.includes(img)) {
              selectedItems = selectedItems.filter((item) => item !== img);
              img.style.border = 'none';
            } else {
              selectedItems.push(img);
              img.style.border = '5px solid red';
            }
          });
          container.appendChild(img);
        }
      }
    } catch (error) {
      console.error('Error reading directory:', error);
    }
}
  
displayLogos();


// display a random item from the selected items list when the btn-outline-primary button is pressed
document.getElementById('go').addEventListener('click', () => {
    if (selectedItems.length === 0) {
        alert('Please select at least one item');
        return;
    }
    else {    
        const randomItem = selectedItems[Math.floor(Math.random() * selectedItems.length)];
        const container = document.getElementById('logos-container');
        removeChildren(document.getElementById('logos-container'));
        container.appendChild(randomItem.cloneNode(true));
    }
});


// clear the selected items list when the btn-outline-secondary button is pressed
document.getElementById('clear').addEventListener('click', () => {
    removeChildren(document.getElementById('logos-container'));
    selectedItems = [];
    displayLogos();
});


// remove all itens from the selected items list
function removeChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

  
