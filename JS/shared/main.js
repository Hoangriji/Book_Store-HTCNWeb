import { header } from './header.js';
import { footer } from './footer.js';

const initData = async () => {
    if (!localStorage.getItem('allBooks')) {
        try {
            const response = await fetch('/JS/shared/sach.json');
            const data = await response.json();
            localStorage.setItem('allBooks', JSON.stringify(data.books));
        } catch (error) {
            console.error(error);
        }
    }
};

const main = async () => {
    header();
    footer();
    await initData();
};

main();