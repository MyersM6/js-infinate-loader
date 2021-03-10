const imageConainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

//Unplash API
let count = 5; //How many photos we get from said link
const apiKey='erkrXJ5FoRyfFqFSE4irPrIxejcnD_iYu9of1rzW9S4'; //unique to me
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`; //the url from where we get the photos from
//IMPORTANT: Test later - This url can be changes to get photos from a specific user. nees further testing.

//check if all the images were loaded
function imageLoaded() {
    console.log("image laoded");
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        count = 20;
    }
}

//helper function to set attributes
function setAttributes(element, attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}
//Dumb Explination: We are passing in the element that needs to be changed
//then we are passing in a key/item pair element, similar to a dictionary, to be put into the set attribute

//create elements for links and photos and add to dom
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    //run function for each object in the array
    photosArray.forEach((photo) => {
        //Create <a> to link to unplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        //create img for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        //event listener to check to see if the images have finished loading 
        img.addEventListener('load', imageLoaded);
        //put img inside the <a> element, then put both inside the image container elemet
        item.appendChild(img);
        imageConainer.appendChild(item);
    })
}


//Get photos from unplash api
async function getPhotos() {
    try{
        const responce= await fetch (apiUrl);
        photosArray = await responce.json();
        console.log(photosArray);
        displayPhotos();
    } catch(error){
        //catch error here
    }
}


//check to see if scrolling is near the bottom of the page. if so load more
window.addEventListener('scroll', () => {
    //what the below function is doing is taking the hight of the screen (stored in pixles) and the scroll of the window, and checking to see if it is less than 1000 pixles from the bottom of the page currently. If it is, more pictures will be loaded.
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready)
    {
        ready = false;
        getPhotos();
    }
})


getPhotos();