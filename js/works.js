fetch('/works.json')
  .then(response => response.json())
  .then(data => {
    createImageGrid(data);
  })
  .catch(error => console.error('Erreur lors du chargement du JSON:', error));


  function createImageGrid(data) {
    data.sort((a, b) => new Date(b.date) - new Date(a.date));
    const gridContainer = document.getElementById('workgrid');
  
    data.forEach(item => {
      const imageElement = document.createElement('div');
      imageElement.classList.add('image-item');
      imageElement.setAttribute('data-tags', item.tags.join(','));
      imageElement.setAttribute('data-soft', item.soft.join(','));
      imageElement.setAttribute('data-date', item.date);
  
      const image = document.createElement('img');
      image.src = item.mainImage;
      image.alt = item.title_fr;
      image.addEventListener('click', () => showImageDetails(item));

      const title = document.createElement('h4');
      title.innerText = item.title_fr;
  
      imageElement.appendChild(image);
      imageElement.appendChild(title)
      gridContainer.appendChild(imageElement);
    });
  }

  function showImageDetails(item) {
    const detailsContainer = document.getElementById('workdetail');
    detailsContainer.innerHTML = `
      <h3>${item.title_fr}</h3>
      <p>${item.description_fr}</p>
      <p><strong>Date:</strong> ${item.date}</p>
      <p><strong>Tag:</strong> ${item.tags}</p>
      <div class="additional-images">
        ${item.additionalImages.map(img => `<img src="${img}" alt="Additional image">`).join('')}
      </div>
    `;
    detailsContainer.style.display = 'block';
  }


  function filterImagesByTags(selectedTags, selectedSoft) {
    const imageItems = document.querySelectorAll('.image-item');
    imageItems.forEach(item => {
      const itemTags = item.getAttribute('data-tags').split(',');
      const itemSoft = item.getAttribute('data-soft').split(',');
      const hasMatchingTag = selectedTags.some(tag => itemTags.includes(tag));
      const hasMatchingsoft = selectedSoft.some(soft => itemSoft.includes(soft));
      if (hasMatchingTag && hasMatchingsoft) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  }


  function applyTagFilters() {
    const checkboxes_tag = document.querySelectorAll('#tag-filters input[type="checkbox"]:checked');
    const checkboxes_soft = document.querySelectorAll('#soft-filters input[type="checkbox"]:checked');
    const selectedTags = Array.from(checkboxes_tag).map(cb => cb.value);
    const selectedSoft = Array.from(checkboxes_soft).map(cb => cb.value);
    filterImagesByTags(selectedTags, selectedSoft);
  }









  document.getElementById('toggletag').addEventListener('click', function() {
    var filters = document.querySelectorAll('.filters');
    filters.forEach(function(filter) {
        if (filter.id !== 'tag-filters') {
            filter.style.display = 'none';
        }
    });


    var element = document.getElementById('tag-filters');
    if (element.style.display === 'none' || element.style.display === '') {
        element.style.display = 'flex'; // Afficher l'élément
    } else {
        element.style.display = 'none'; // Masquer l'élément
    }
});


document.getElementById('togglesoft').addEventListener('click', function() {
    var filters = document.querySelectorAll('.filters');
    filters.forEach(function(filter) {
        if (filter.id !== 'soft-filters') {
            filter.style.display = 'none';
        }
    });

    var element = document.getElementById('soft-filters');
    if (element.style.display === 'none' || element.style.display === '') {
        element.style.display = 'flex'; // Afficher l'élément
    } else {
        element.style.display = 'none'; // Masquer l'élément
    }
});


function activecheckbox(type) {
    var divElement = document.getElementById(type);
    // Sélectionner tous les checkboxes
    var checkboxes = divElement.querySelectorAll('input[type="checkbox"]');

    // Cocher ou décocher tous les checkboxes
    checkboxes.forEach(function(checkbox) {
        checkbox.checked = true;
    });
}

function desactivecheckbox(type) {
    var divElement = document.getElementById(type);
    // Sélectionner tous les checkboxes
    var checkboxes = divElement.querySelectorAll('input[type="checkbox"]');

    // Cocher ou décocher tous les checkboxes
    checkboxes.forEach(function(checkbox) {
        checkbox.checked = false;
    });
}