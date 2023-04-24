// Example data
var carousels = [
    {
      id: 1,
      src: 'https://images-sihv2.prd.dlivecdn.com/fit-in/1920x1920/filters:quality(90)/thumbnail/cafd20a2-c289-11e9-9758-1a66ccbdb197',
      totalNumImages: 4,
    },
    {
      id: 2,
      src: 'https://images-sihv2.prd.dlivecdn.com/fit-in/1920x1920/filters:quality(90)/thumbnail/3aa6ba57-05ea-11ea-bd1e-563a837bad22',
      totalNumImages: 4,
    },
    {
      id: 3,
      src: 'https://images-sihv2.prd.dlivecdn.com/fit-in/1920x1920/filters:quality(90)/thumbnail/fef42531-acb6-11e9-b47f-76a6645f3d2e',
      totalNumImages: 4,
    },
    {
      id: 4,
      src: 'https://images-sihv2.prd.dlivecdn.com/fit-in/1920x1920/filters:quality(90)/thumbnail/17e01b7c-db45-11e9-97bf-5e7c1cb4728b',
      totalNumImages: 4,
    },
  ];
  
  const carouselImage = document.querySelector(".carousel-image");
  const carouselImageIndex = document.querySelector(".carousel-image-index");
  
  function fetchImage(index) {
    return new Promise((resolve, reject) => {
      const time = index === 2 ? 2000 : 500;
      setTimeout(() => {
        resolve(carousels[index]);
      }, time);
    });
  }
  
  function updateCarousel(data) {
    carouselImage.src = data.src;
    carouselImage.setAttribute('data-index',data.id);
    carouselImageIndex.innerHTML = data.id;
  }
  
  function init() {
    fetchImage(0).then((response) => {
      updateCarousel(response);
    })
  }
  
  function showPrev() {
    const currentIndex = Number(carouselImage.getAttribute('data-index'));
    const nextIndex = currentIndex-1;
    if(nextIndex<0) {
        nextIndex = 1;
    }
    updateCarousel(carousels[nextIndex-1]);
  }
  
  function showNext() {
    const currentIndex = Number(carouselImage.getAttribute('data-index'));
    let nextIndex = currentIndex+1;
    if(nextIndex > carousels.length) {
      nextIndex = carousels.length;
    }
    updateCarousel(carousels[nextIndex-1]);
  }
  window.showPrev = showPrev;
  window.showNext = showNext;
  window.addEventListener('load', init, false);