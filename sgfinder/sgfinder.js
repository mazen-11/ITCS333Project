// Global variables
let allGroups = [];
let currentGroups = [];
let currentPage = 1;
const groupsPerPage = 6;

// Safe JSON Parsing
function safeParse(json) {
    try {
        return JSON.parse(json) || [];
    } catch (e) {
        return [];
    }
}

// Example groups
function getExampleGroups() {
    return [
        { id: '1', name: 'Introduction to Algorithms', courseCode: 'CS201', college: 'Engineering', department: 'Computer Science', link: '#' },
        { id: '2', name: 'Organic Chemistry Study Group', courseCode: 'CHEM210', college: 'Science', department: 'Chemistry', link: '#' }
    ];
}

// Initialize Finder Page
function initializeFinderPage() {
    try {
        const searchField = document.getElementById('search-field');
        const searchFilter = document.getElementById('searchFilter');
        const searchButton = document.querySelector('.btn-dark');
        const showAllButton = document.querySelector('.btn-success');

        if (!searchField || !searchFilter || !searchButton || !showAllButton) return;

        const customGroups = safeParse(localStorage.getItem('customGroups'));
        const exampleGroups = getExampleGroups();
        allGroups = [...exampleGroups, ...customGroups];
        currentGroups = [...allGroups];

        showAllButton.addEventListener('click', () => {
            searchField.value = '';
            currentPage = 1;
            currentGroups = [...allGroups];
            displayGroups(currentGroups);
        });

        searchButton.addEventListener('click', () => {
            const query = searchField.value;
            const filter = searchFilter.value;
            searchGroups(query, filter);
        });

        
    } catch (error) {
        console.error('Error initializing finder page:', error);
    }
}

// Initialize My Groups Page
function fetchMyGroups() {
    const myGroupsContainer = document.getElementById('myGroupsContainer');
    if (!myGroupsContainer) return;

    try {
        showLoading('myGroupsContainer');

        const customGroups = safeParse(localStorage.getItem('customGroups'));
        const exampleGroups = getExampleGroups();
        const myGroups = [...exampleGroups, ...customGroups];

        setTimeout(() => {
            displayMyGroups(myGroups);
        }, 500);
    } catch (error) {
        console.error('Error fetching groups:', error);
        myGroupsContainer.innerHTML = `<div class="text-center">
            <p class="text-danger">Failed to load your study groups. Please try again later.</p>
        </div>`;
    }
}

// Initialize Create Group Page
function initializeCreateGroupPage() {
    const form = document.querySelector('form');

    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const groupName = document.getElementById('group-name').value.trim();
        const courseCode = document.getElementById('course-code').value.trim();
        const department = document.getElementById('department').value.trim();
        const college = document.getElementById('college').value.trim();

        if (!groupName || !courseCode || !department || !college) {
            alert("Please fill in all fields!");
            return;
        }

        const customGroups = safeParse(localStorage.getItem('customGroups')) || [];

        const newGroup = {
            id: Date.now().toString(),
            name: groupName,
            courseCode: courseCode,
            college: college,
            department: department,
            link: "#"
        };

        customGroups.push(newGroup);

        localStorage.setItem('customGroups', JSON.stringify(customGroups));

        // Redirect after saving
        window.location.href = 'my-groups.html';
    });
}

// Display Groups (Find Groups page)
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
                    <h5 class="card-title">${group.name}</h5>
                    <p class="card-text">Course Code: ${group.courseCode}</p>
                    <p class="card-text">College: ${group.college}</p>
                    <p class="card-text">Department: ${group.department}</p>
                    <a href="${group.link}" class="btn btn-primary">Join Group</a>
                </div>
            </div>
        `;
        groupsContainer.appendChild(groupCard);
    });

    createPagination(totalPages);
}

// Display My Groups (My Groups page)
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
                <div class="d-flex justify-content-between align-items-start">
                    <h5 class="card-title fw-bold">${group.name}</h5>
                </div>
                <hr>
                <p class="card-text"><strong>Course Code:</strong> ${group.courseCode}</p>
                <p class="card-text"><strong>College:</strong> ${group.college}</p>
                <p class="card-text"><strong>Department:</strong> ${group.department}</p>
                <a href="${group.link}" class="btn btn-primary btn-sm" target="_blank">Join Group</a>
            </div>
        `;
        myGroupsContainer.appendChild(groupCard);
    });
}

// Create Pagination
function createPagination(totalPages) {
    const paginationContainer = document.getElementById('paginationContainer');
    if (!paginationContainer) return;

    paginationContainer.innerHTML = '';

    if (totalPages <= 1) return;

    const pagination = document.createElement('nav');
    pagination.setAttribute('aria-label', 'Study groups pagination');

    const paginationList = document.createElement('ul');
    paginationList.className = 'pagination';

    const prevItem = document.createElement('li');
    prevItem.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
    prevItem.innerHTML = `<a class="page-link" href="#" aria-label="Previous"><span aria-hidden="true">«</span></a>`;
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
    nextItem.innerHTML = `<a class="page-link" href="#" aria-label="Next"><span aria-hidden="true">»</span></a>`;
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

// Search Groups
function searchGroups(query, filter) {
    try {
        query = query.toLowerCase().trim();

        if (!query) {
            currentPage = 1;
            currentGroups = [...allGroups];
            displayGroups(currentGroups);
            return;
        }

        let filteredGroups = [];

        switch (filter) {
            case 'course-name':
                filteredGroups = allGroups.filter(group => group.name.toLowerCase().includes(query));
                break;
            case 'course-code':
                filteredGroups = allGroups.filter(group => group.courseCode.toLowerCase().includes(query));
                break;
            case 'college':
                filteredGroups = allGroups.filter(group => group.college.toLowerCase().includes(query));
                break;
            case 'department':
                filteredGroups = allGroups.filter(group => group.department.toLowerCase().includes(query));
                break;
            default:
                filteredGroups = allGroups;
        }

        currentPage = 1;
        currentGroups = [...filteredGroups];
        displayGroups(currentGroups);

    } catch (error) {
        console.error('Error searching groups:', error);
    }
}

// Loading spinner
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

// DOMContentLoaded - initialize based on page
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;

    if (path.includes('sgfinder.html')) {
        initializeFinderPage();
    } else if (path.includes('my-groups.html')) {
        fetchMyGroups();
    } else if (path.includes('create-group.html')) {
        initializeCreateGroupPage();
    }
});
