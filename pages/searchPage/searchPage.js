document.addEventListener("DOMContentLoaded", () => {
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

        noResults.style.display = "none";
        resultCount.textContent = `Tìm thấy ${books.length} kết quả`;

        const mappedBooks = books.map((book) => ({
            ...book,
            img: getDirectDriveLink(book.image || book.img),
            author: book.author || "",
        }));

        renderCards("searchResults", mappedBooks);
    };

    // get data books
    let allBooks = getBooksFromStorage();
    
    // check data in local 
    if (allBooks.length === 0) {
        fetch("/shared/sach.json")
            .then(res => res.json())
            .then(data => {
                allBooks = data.books || [];
                localStorage.setItem("allBooks", JSON.stringify(allBooks));
                const results = filterBooks(searchQuery, allBooks);
                displayResults(results);
            })
            .catch(err => {
                console.error("Error loading books:", err);
                noResults.style.display = "block";
                resultCount.textContent = "Lỗi khi tải dữ liệu";
            });
    } else {
        // Display results with books from localStorage
        const results = filterBooks(searchQuery, allBooks);
        displayResults(results);
    }

    // search form
    const searchForm = document.querySelector("form[action='/search']");
    if (searchForm) {
        searchForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const input = searchForm.querySelector("input[type='text']");
            if (input && input.value.trim()) {
                window.location.href = `/pages/searchPage/searchPage.html?q=${encodeURIComponent(input.value)}`;
            }
        });
    }
});
