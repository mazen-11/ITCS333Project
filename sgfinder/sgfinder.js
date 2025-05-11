const baseURL = "https://5e08408e-bdd1-4bf3-8ee6-83bd2b87ab24-00-15dlgdu3c8ef9.sisko.replit.dev/sgfinder";

let currentGroups = [];
let currentPage = 1;
const groupsPerPage = 6;

function initializeCreateGroupPage() {
    const form = document.querySelector('form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const groupName = document.getElementById('group-name').value.trim();
        const courseCode = document.getElementById('course-code').value.trim();
        const department = document.getElementById('department').value.trim();
        const college = document.getElementById('college').value.trim();
        const now = new Date().toISOString().slice(0, 10);

        if (!groupName || !courseCode || !department || !college) {
            alert("Please fill in all fields!");
            return;
        }

        const groupData = {
            CourseName: groupName,
            CourseCode: courseCode,
            Department: department,
            College: college,
            date: now
        };

        try {
            const res = await fetch(`${baseURL}/api/create.php`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(groupData)
            });

            const result = await res.json();
            if (result.success) {
                window.location.href = "my-groups.html";
            } else {
                alert("Failed to create group: " + (result.error || "Unknown error"));
            }
        } catch (err) {
            console.error("Error:", err);
            alert("Something went wrong.");
        }
    });
}

function fetchMyGroups() {
    const myGroupsContainer = document.getElementById('myGroupsContainer');
    if (!myGroupsContainer) return;

    showLoading('myGroupsContainer');

    fetch(`${baseURL}/api/list.php`)
        .then(res => res.json())
        .then(data => {
            displayMyGroups(data);
        })
        .catch(err => {
            console.error("Failed to load groups:", err);
            myGroupsContainer.innerHTML = `<div class="text-center">
                <p class="text-danger">Failed to load your study groups. Please try again later.</p>
            </div>`;
        });
}

function displayGroups(groups) {
    const groupsContainer = document.getElementById('groupsContainer');
    const paginationContainer = document.getElementById('paginationContainer');
    if (!groupsContainer) return;

    currentGroups = groups;
    const totalPages = Math.ceil(groups.length / groupsPerPage);
    if (currentPage > totalPages) currentPage = totalPages || 1;

    const startIndex = (currentPage - 1) * groupsPerPage;
    const endIndex = startIndex + groupsPerPage;
    const groupsToDisplay = groups.slice(startIndex, endIndex);

    groupsContainer.innerHTML = '';

    if (groupsToDisplay.length === 0) {
        groupsContainer.innerHTML = `<div class="col-12 text-center">
            <p>No study groups found matching your criteria.</p>
        </div>`;
        paginationContainer.innerHTML = '';
        return;
    }

    groupsToDisplay.forEach(group => {
        const groupCard = document.createElement('div');
        groupCard.className = 'col-md-4 mb-4';
        groupCard.innerHTML = `
            <div class="card h-100">
                <div class="card-body">
                    <h5 class="card-title">${group.CourseName}</h5>
                    <p class="card-text">Course Code: ${group.CourseCode}</p>
                    <p class="card-text">College: ${group.College}</p>
                    <p class="card-text">Department: ${group.Department}</p>
                    <a href="#" class="btn btn-primary">Join Group</a>
                </div>
            </div>
        `;
        groupsContainer.appendChild(groupCard);
    });

    createPagination(totalPages);
}

function displayMyGroups(groups) {
    const myGroupsContainer = document.getElementById('myGroupsContainer');
    if (!myGroupsContainer) return;

    myGroupsContainer.innerHTML = '';

    if (groups.length === 0) {
        myGroupsContainer.innerHTML = `<div class="text-center">
            <p>You haven't joined any study groups yet.</p>
            <a href="sgfinder.html" class="btn btn-primary">Find Groups</a>
        </div>`;
        return;
    }

    groups.forEach(group => {
        const groupCard = document.createElement('div');
        groupCard.className = 'card mb-3';
        groupCard.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${group.CourseName}</h5>
                <p class="card-text">Course Code: ${group.CourseCode}</p>
                <p class="card-text">College: ${group.College}</p>
                <p class="card-text">Department: ${group.Department}</p>
                <p><a href="#">Group link</a></p>
            </div>
        `;
        myGroupsContainer.appendChild(groupCard);
    });
}

function createPagination(totalPages) {
    const paginationContainer = document.getElementById('paginationContainer');
    if (!paginationContainer) return;

    paginationContainer.innerHTML = '';
    if (totalPages <= 1) return;

    const pagination = document.createElement('nav');
    const paginationList = document.createElement('ul');
    paginationList.className = 'pagination';

    const prevItem = document.createElement('li');
    prevItem.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
    prevItem.innerHTML = `<a class="page-link" href="#">«</a>`;
    prevItem.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage > 1) {
            currentPage--;
            displayGroups(currentGroups);
        }
    });
    paginationList.appendChild(prevItem);

    for (let i = 1; i <= totalPages; i++) {
        const pageItem = document.createElement('li');
        pageItem.className = `page-item ${i === currentPage ? 'active' : ''}`;
        pageItem.innerHTML = `<a class="page-link" href="#">${i}</a>`;
        pageItem.addEventListener('click', (e) => {
            e.preventDefault();
            currentPage = i;
            displayGroups(currentGroups);
        });
        paginationList.appendChild(pageItem);
    }

    const nextItem = document.createElement('li');
    nextItem.className = `page-item ${currentPage === totalPages ? 'disabled' : ''}`;
    nextItem.innerHTML = `<a class="page-link" href="#">»</a>`;
    nextItem.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage < totalPages) {
            currentPage++;
            displayGroups(currentGroups);
        }
    });
    paginationList.appendChild(nextItem);

    pagination.appendChild(paginationList);
    paginationContainer.appendChild(pagination);
}

function showLoading(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = `
        <div class="col-12 text-center">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <p class="mt-2">Loading study groups...</p>
        </div>
    `;
}

// DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;

    if (path.includes('my-groups.html')) {
        fetchMyGroups();
    } else if (path.includes('create-group.html')) {
        initializeCreateGroupPage();
    }

    // ✅ Handle Search Button (matches real keys)
    const searchBtn = document.querySelector('button[type="submit"]');
    const searchField = document.getElementById('search-field');
    const filterSelect = document.getElementById('searchFilter');

    if (searchBtn && searchField && filterSelect) {
        searchBtn.addEventListener('click', async (e) => {
            e.preventDefault();

            const keyword = searchField.value.trim().toLowerCase();
            const filter = filterSelect.value;

            if (!keyword) {
                alert("Please enter a search term.");
                return;
            }

            try {
                const res = await fetch(`${baseURL}/api/search.php?filter=${filter}&keyword=${encodeURIComponent(keyword)}`);
                const data = await res.json();

                if (!Array.isArray(data) || data.length === 0) {
                    document.getElementById('groupsContainer').innerHTML = `
                        <div class="col-12 text-center">
                            <p>No study groups found matching your criteria.</p>
                        </div>`;
                    document.getElementById('paginationContainer').innerHTML = '';
                    return;
                }

                currentPage = 1;
                displayGroups(data);
            } catch (err) {
                console.error("Search failed:", err);
                alert("Error fetching search results.");
            }
        });
    }
});
