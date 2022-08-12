/* Style Guide
https://airbnb.io/javascript/ */

const navBar = document.getElementById('nav-banner');
const navBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');
const menuItems = document.querySelector('.menu-items');
const body = document.body
let previousYPos;

const iconSwap = (element, starturl='', endurl='') => {
    if (element.src.endsWith(starturl)) {
        element.src = endurl;
        menu.classList.add('expand');
        menuItems.classList.add('visible');
        body.classList.add('no-scroll');
    } else if (element.src.endsWith(endurl)) {
        element.src = starturl;
        menu.classList.remove('expand');
        menuItems.classList.remove('visible');
        body.classList.remove('no-scroll');
    }
};

const navIcon = () => {
    return iconSwap(navBtn.firstChild.nextElementSibling,
        '/img/nav/menu-ready.svg',
        '/img/nav/menu-close.svg')
        // RETURN NAVBAR BEHAVIOR FUNCTION
};

navBtn.addEventListener('click', navIcon);

/* https://www.freecodecamp.org/news/javascript-debounce-example/
https://levelup.gitconnected.com/debounce-in-javascript-improve-your-applications-performance-5b01855e086 */
const debounce = (func, delay = 300) => {
    let timeout;

    const executeTimeout = (...args) => {
        clearTimeout(timeout);
        const setTime = () => {
            func.apply(this, args);
        }
        timeout = setTimeout(setTime, delay);
    };

    return executeTimeout
};

const navBarDrop = (previousYPos) => {
    let currentYPos = window.pageYOffset;

    if (currentYPos <= 100) {
        navBar.classList.remove('active');
    } else if(currentYPos > previousYPos) {
        navBar.classList.remove('active');
    } else if(currentYPos < previousYPos) {
        navBar.classList.add('active');
    }
};

const debouncedNavBarDrop = debounce(navBarDrop);

const ctaArticleIndex = document.querySelectorAll('.content-index');
const ctaArticleTitle = document.querySelectorAll('.content-title');
const ctaArticleBody = document.querySelectorAll('.content-body');

const animateElement = (element, attribute='', pageYPosition, elementTopPosition) => {
    // if page Y coordinate exceeds an element top Y coordinate
    if (pageYPosition > elementTopPosition) {
        element.classList.add(attribute);
    } else element.classList.remove(attribute);
};

const elementTopPageYOffset = (element) => {
    return elementTopPosition = element.getBoundingClientRect().top;
};

const triggerPointCoordinates = (previousYPos, desiredPageY = null, elementTopPosition) => {
    return (
        pageYPosition = (previousYPos - desiredPageY) + elementTopPosition,
        elementTopPosition
    );
};

// set offSet to the first elements page position to trigger animation event and increment based upon the position of the remaining elements in the array
const animateElementCoordinates = (previousYPos, offSet, offSetIncrement, attribute='', elementArray) => {
    let desiredPageY = offSet
    elementArray.forEach((element) => {
        elementTopPageYOffset(element);
        triggerPointCoordinates(previousYPos, desiredPageY, elementTopPosition);
        desiredPageY += offSetIncrement;
        return animateElement(element, attribute, pageYPosition, elementTopPosition)
    })
};

const allCards = document.querySelectorAll('.connect__card');
const cardsFrontFace = document.querySelectorAll('.connect__face-front');

allCards.forEach((element) => {
    element.addEventListener('mouseover', () => {
        return element.classList.add('is-flipped');
    })
    element.addEventListener('contextmenu', (event) => {
        return event.preventDefault();
    })
});

const forEachCard = (element, desiredPageY, attribute='') => {
    elementTopPageYOffset(element);
    triggerPointCoordinates(previousYPos, desiredPageY, elementTopPosition);
    return animateElement(element, attribute, pageYPosition, elementTopPosition);
};

const spinCards = (elementArray, desiredPageY, attribute='') => {
    return elementArray.forEach( (element) => {forEachCard(element, desiredPageY, attribute)} )
};

const connectNarrative = document.querySelector('.connect__narrative');

const animateNarrative = (element, desiredPageY, attribute='') => {
    elementTopPageYOffset(element);
    triggerPointCoordinates(previousYPos, desiredPageY, elementTopPosition);
    return animateElement(element, attribute, pageYPosition, elementTopPosition);
};

const documentScroll = () => {
    debouncedNavBarDrop(previousYPos);

    animateElementCoordinates(previousYPos, 1500, 900, 'slide-effect', ctaArticleIndex);
    animateElementCoordinates(previousYPos, 1650, 900, 'slide-effect', ctaArticleTitle);
    animateElementCoordinates(previousYPos, 1650, 900, 'slide-effect', ctaArticleBody);

    animateNarrative(connectNarrative, 6200, 'active');
    spinCards(cardsFrontFace, 6400, 'is-spinning');
    previousYPos = window.pageYOffset;
    // console.log('windowY= ', window.pageYOffset)
};

document.addEventListener('scroll', documentScroll);

// NEW IN PROGRESS

const blockBtnContainer = document.getElementById('code__block-btn');
const blockBtn = document.querySelector('.code-btn');
const codeBlock = document.querySelector('.code__block');
const codeImage = document.getElementById('code');
const codeContainer = document.querySelector('.code__container');


// https://thewebdev.info/2022/02/09/how-to-create-pause-or-delay-in-a-javascript-for-loop/#:~:text=JavaScript%20for%20loop%3F-,To%20create%20pause%20or%20delay%20in%20a%20JavaScript%20for%20loop,with%20a%20for%2Dof%20loop.&text=to%20define%20the%20wait%20function,to%20loop%20through%20an%20array.

const wait = (ms) => new Promise( (resolve) => {
    setTimeout(resolve, ms)
});

const loop = async () => {
    const squares = document.querySelectorAll('.block');

    for (let square of squares) {
        square.classList.add('bye');
        await wait(10)
    }
};

const updateBox = () => {
    loop().then(addImage).catch( (error) => { console.error(error); });
};

for (let i = 0; i < 184; i++) {
    const newBlock = document.createElement('div');
    newBlock.classList.add('block');
    codeBlock.appendChild(newBlock);
}

const updateBtn = () => {
    blockBtn.classList.add('bye');
};

const addImage = () => {
    codeContainer.style.overflowY = "scroll";
    codeImage.src = '/pexels-pixabay-358238.jpg';
};

blockBtnContainer.addEventListener('click', updateBox);
blockBtn.addEventListener('click', updateBtn);