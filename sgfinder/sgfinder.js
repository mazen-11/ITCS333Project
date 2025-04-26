// Global variables
let allGroups = [];       // ← Now correctly loaded!
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

// Example Groups
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

        // Load groups into memory
        const customGroups = safeParse(localStorage.getItem('customGroups'));
        const exampleGroups = getExampleGroups();
        allGroups = [...exampleGroups, ...customGroups];
        currentGroups = [...allGroups];
       

        // ✅ Fix Show All Button
        showAllButton.addEventListener('click', () => {
            searchField.value = '';
            currentPage = 1;
            currentGroups = [...allGroups];
            displayGroups(currentGroups);  
        });

        // ✅ Fix Search Button
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
            
        }, 1000);
    } catch (error) {
        console.error('Error fetching groups:', error);
        myGroupsContainer.innerHTML = `<div class="text-center">
            <p class="text-danger">Failed to load your study groups. Please try again later.</p>
        </div>`;
    }
}

// Display Groups (for Find Groups page)
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
        groupsContainer.innerHTML = `
            <div class="col-12 text-center">
                <p>No study groups found matching your criteria.</p>
            </div>
        `;
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

// Display My Groups (for My Groups page)
function displayMyGroups(groups) {
    const myGroupsContainer = document.getElementById('myGroupsContainer');
    if (!myGroupsContainer) return;

    myGroupsContainer.innerHTML = '';

    if (groups.length === 0) {
        myGroupsContainer.innerHTML = `
            <div class="text-center">
                <p>You haven't joined any study groups yet.</p>
                <a href="sgfinder.html" class="btn btn-primary">Find Groups</a>
            </div>
        `;
        return;
    }

    groups.forEach(group => {
        const groupCard = document.createElement('div');
        groupCard.className = 'card mb-3';
        groupCard.innerHTML = `
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-start">
                    <h5 class="card-title fw-bold">${group.name}</h5>
                    ${
                        group.id.toString().length > 5
                            ? `<button class="btn btn-danger btn-sm" data-id="${group.id}">Delete</button>`
                            : ''
                    }
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

    myGroupsContainer.querySelectorAll('button[data-id]').forEach(button => {
        button.addEventListener('click', () => {
            const groupId = button.getAttribute('data-id');
            deleteCustomGroup(groupId);
        });
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
            displayGroups(currentGroups);  // ✅ Must display
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



// Delete Custom Group
function deleteCustomGroup(groupId) {
    Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to delete this group?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            let customGroups = safeParse(localStorage.getItem('customGroups'));
            customGroups = customGroups.filter(group => group.id.toString() !== groupId);
            localStorage.setItem('customGroups', JSON.stringify(customGroups));
            fetchMyGroups();
           
        }
    });
}

// Show Loading Spinner
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

// Error helpers
function showError(input, message) {
    clearError(input);
    const errorElement = document.createElement('div');
    errorElement.className = 'invalid-feedback d-block';
    errorElement.textContent = message;
    input.classList.add('is-invalid');
    input.parentNode.appendChild(errorElement);
}

function clearError(input) {
    input.classList.remove('is-invalid');
    const errorElement = input.parentNode.querySelector('.invalid-feedback');
    if (errorElement) errorElement.remove();
}


document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;

    if (path.includes('sgfinder.html')) {
        initializeFinderPage();
    } else if (path.includes('my-groups.html')) {
        fetchMyGroups();
    }
});

