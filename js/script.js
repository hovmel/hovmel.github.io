const smallLogo = document.getElementById('small_logo');
const sendRequest = document.getElementById('send_request');

function initComponents() {
    setTimeout(() => {
        smallLogo.classList.add('visible');
    }, 300)
    setTimeout(() => {
        sendRequest.classList.add('visible');
    }, 700)
}

initComponents();



const accordionItems = document.getElementsByClassName('accordion_item_header');
function initAccordion() {
    for (const accordionItem of accordionItems) {
        accordionItem.addEventListener('click', ev => {
            let node = ev.target.parentNode;
            while (!node.classList.contains('accordion_item')) {
                node = node.parentNode;
            }
            if (node.classList.contains('open')) {
                node.classList.remove('open');
            } else {
                node.classList.add('open');
            }
        })
    }
}

initAccordion();



const showAllButton = document.getElementById('show_all_btn');
const hiddenPortfolioItems = document.getElementById('hidden_portfolio_items');
const portfolioSection = document.getElementById('portfolio');
function initPortfolio() {
    showAllButton.addEventListener('click', () => {
        if (hiddenPortfolioItems.classList.contains('visible')) {
            hiddenPortfolioItems.classList.remove('visible');
            showAllButton.innerText = 'ПОКАЗАТЬ ВСЕ ПРОЕКТЫ';
            portfolioSection.scrollIntoView({behavior: 'smooth'});
        } else {
            hiddenPortfolioItems.classList.add('visible');
            showAllButton.innerText = 'СКРЫТЬ ПРОЕКТЫ';
        }
    })
}

initPortfolio();



const navButtons = document.getElementsByClassName('nav_li');
function initNavButtons() {
    for (const navButton of navButtons) {
        navButton.addEventListener('click', ev => {
            const idToGo = ev.target.getAttribute('data-id-to-go');
            const node = document.getElementById(idToGo);
            if (!node) return;
            node.scrollIntoView({behavior: 'smooth'});
        })
    }
}

initNavButtons();


const header = document.getElementById('header');
window.onscroll = () => {
    if (window.pageYOffset < 200) {
        header.classList.remove('small');
    } else {
        header.classList.add('small');
    }
}
