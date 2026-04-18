const getDirectDriveLink = (url) => {
    if (url && url.includes("drive.google.com")) {
        const fileId = url.split("id=")[1];
        return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
    }
    return url;
};

const getBooksFromStorage = () => {
    const data = localStorage.getItem("allBooks");
    return data ? JSON.parse(data) : [];
};

// get search quẻy
const urlParams = new URLSearchParams(window.location.search);
const searchQuery = urlParams.get("q") || "";

// DOM element
const searchTitle = document.getElementById("searchTitle");
const resultCount = document.getElementById("resultCount");
const searchResults = document.getElementById("searchResults");
const noResults = document.getElementById("noResults");

// update search title
if (searchQuery) {
    searchTitle.textContent = `Kết quả tìm kiếm cho: "${searchQuery}"`;
} else {
    searchTitle.textContent = "Hãy nhập từ khóa để tìm kiếm";
}

// filter books 
const filterBooks = (query, books) => {
    if (!query.trim()) {
        return [];
    }

    const normalizedQuery = query.toLowerCase().trim();
    return books.filter((book) => {
        const titleMatch = (book.title || "").toLowerCase().includes(normalizedQuery);
        const authorMatch = (book.author || "").toLowerCase().includes(normalizedQuery);
        const categoryMatch = Array.isArray(book.categories) && book.categories.some(cat => cat.toLowerCase().includes(normalizedQuery));
        return titleMatch || authorMatch || categoryMatch;
    });
};

// search results
const displayResults = (books) => {
    searchResults.innerHTML = "";

    if (books.length === 0) {
        noResults.style.display = "block";
        resultCount.textContent = "Không tìm thấy sách nào";
        return;
    }
    
    resultCount.textContent = `Tìm thấy ${books.length} kết quả`;

    const mappedBooks = books.map((book) => ({
        ...book,
        img: getDirectDriveLink(book.image),
        author: book.author || "",
    }));

    renderCards("searchResults", mappedBooks);
};

// get data books
let allBooks = getBooksFromStorage();

const results = filterBooks(searchQuery, allBooks);
displayResults(results);