import { header } from './components/header.js';
import { footer } from './components/footer.js';

const initData = async () => {
    if (!localStorage.getItem('allBooks')) {
        try {
            // gửi yêu câu và đợi tải xong file
            const response = await fetch('/shared/sach.json');
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

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', main);
} else {
    main();
}