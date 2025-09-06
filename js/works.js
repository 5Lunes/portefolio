const filterIdsGrid1 = [1, 14, 28, 40]; 
const filterIdsGrid2 = []; 


fetch('works.json')
  .then(response => response.json())
  .then(data => {
    try {
      const grid1 = new ImageGrid('workgridIndex');
      grid1.createGrid(data, filterIdsGrid1);
    }
    catch (error) {
      console.error('Erreur lors de la création de la grille:', error);}
    try {
      const grid2 = new ImageGrid('workgridWork');
      grid2.createGrid(data, filterIdsGrid2);
    }
    catch (error) {
    console.error('Erreur lors de la création de la grille:', error);}
  })
  .catch(error => console.error('Erreur lors du chargement du JSON:', error));



class ImageGrid {
  constructor(grid) {
    this.container = document.getElementById(grid);
      if (!this.container) {
        throw new Error(`Conteneur avec l'ID "${grid}" non trouvé.`);
      }
  }

  createGrid(data, idfilter = null) {
    data.sort((a, b) => new Date(b.date) - new Date(a.date));
  
    data.forEach(item => {
      if (idfilter && idfilter.length > 0 &&  !idfilter.includes(item.id)) {
        return;
      }

      const imageElement = this.createImageElement(item);
      this.container.appendChild(imageElement);
    });
  } 
  createImageElement(item) {
    const imageElement = document.createElement('div');
    imageElement.classList.add('image-item');
    imageElement.setAttribute('data-tags', item.tags.join(','));
    imageElement.setAttribute('data-soft', item.soft.join(','));
    imageElement.setAttribute('data-date', item.date);
  
    const image = document.createElement('img');
    image.src = item.mainImage;
    image.alt = item._titre;
    image.addEventListener('click', () => showImageDetails(item));
    const imagedesc = document.createElement(`div`);
    imagedesc.classList.add('imagedesc');

    const title = document.createElement(`h5`);
    title.setAttribute('data-i18n',`${item.id}.titre`);


    const softicon = this.createSoftIcons(item.soft);
  
    imageElement.appendChild(image);
    imageElement.appendChild(imagedesc);
    imagedesc.appendChild(title);
    imagedesc.appendChild(softicon)
    this.container.appendChild(imageElement);
    return imageElement
  };

  createSoftIcons(softArray) {
    const softicon = document.createElement('div');
    softicon.classList.add('softicons');
    
    const softwareIcons = {
      blender: 'img/svg/blender.svg',
      houdini: 'img/svg/houdini.svg',
      '3Dmax': 'img/svg/3Dmax.png',
      unity: 'img/svg/unity.svg',
      unreal: 'img/svg/unreal.svg',
      zbrush: 'img/svg/zbrush.svg',
      painter: 'img/svg/painter.svg',
      speedtree: 'img/svg/speedtree.png',
      photoshop: 'img/svg/photoshop.svg',
      VS: 'img/svg/VS.svg'
    };
    
    softArray.forEach(soft => {
      if (softwareIcons[soft]) {
        softicon.insertAdjacentHTML('beforeend', `<img src="${softwareIcons[soft]}" alt="${soft} icon">`);
      }
    });
    
    return softicon;
  };
}
  

function showImageDetails(item) {
  const detailsContainer = document.getElementById('workdetail');
  detailsContainer.innerHTML = `
    <button onclick="window.workdetail.close();" aria-label="close" class="x"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>

    <p data-i18n='pays.${item.pays}' class="detail_pays"><strong>Pays:</strong> </p>
    <h1 data-i18n='${item.id}.titre' class="detail_titre"></h1>
    <p class="detail_info">
      <span data-i18n='${item.id}.description'></span> <br>
      <span class="detail_date"> ${item.date}</span>
    </p>
    <div class="detail_cat">
    <p class="detail_spec"><span class="detail_spec_title">Soft</span><span class="detail_spec_info">${item.soft}</span></p>
    <p class="detail_spec"><span class="detail_spec_title">Tags</span><span class="detail_spec_info">${item.tags}</span></p>
    </div>
    
    <div class="additional-images">
      ${item.additionalImages.map(img => `<a href="${img}" target="_blank"><img src="${img}" alt="Additional image" ></a>`).join('')}
    </div>
  `;

  if( item.additionalVideo != null){
    detailsContainer.insertAdjacentHTML(
      "beforeend",
      `<iframe width="560" height="315" src="${item.additionalVideo}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
    )
  }
  window.workdetail.showModal();
  //detailsContainer.style.display = 'block';
  rerender();
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