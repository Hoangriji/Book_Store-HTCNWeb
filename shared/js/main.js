import { header } from './components/header.js';
import { footer } from './components/footer.js';

const main = () => {
    // render header
    header();

    // render footer
    footer();
};

// kiểm tra DOM load xong chưa
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', main);
} else {
    main();
}