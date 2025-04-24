// Global variables
let allGroups = [];
let currentGroups = [];
let currentPage = 1;
const groupsPerPage = 6;

// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    // Determine which page we're on
    const currentPath = window.location.pathname;
    
    if (currentPath.includes('sgfinder.html')) {
        initializeFinderPage();
    } else if (currentPath.includes('my-groups.html')) {
        initializeMyGroupsPage();
    } else if (currentPath.includes('create-group.html')) {
        initializeCreateGroupPage();
    }
});

// Initialize the finder page
function initializeFinderPage() {
    const searchField = document.getElementById('search-field');
    const searchFilter = document.getElementById('searchFilter');
    const searchButton = document.querySelector('.btn-dark');
    const showAllButton = document.querySelector('.btn-success');
    
    // Create container for groups if it doesn't exist
    if (!document.getElementById('groupsContainer')) {
        const container = document.querySelector('.container:nth-of-type(2)');
        const groupsContainer = document.createElement('div');
        groupsContainer.id = 'groupsContainer';
        groupsContainer.className = 'row mt-4';
        container.appendChild(groupsContainer);
    }
    
    // Create pagination container
    if (!document.getElementById('paginationContainer')) {
        const container = document.querySelector('.container:nth-of-type(2)');
        const paginationContainer = document.createElement('div');
        paginationContainer.id = 'paginationContainer';
        paginationContainer.className = 'mt-4 d-flex justify-content-center';
        container.appendChild(paginationContainer);
    }
    
    // Add event listeners
    searchButton.addEventListener('click', () => {
        searchGroups(searchField.value, searchFilter.value);
    });
    
    showAllButton.addEventListener('click', () => {
        searchField.value = '';
        currentPage = 1;
        displayGroups(allGroups);
    });
    
    // Fetch and display groups
    fetchGroups();
}

// Initialize the my groups page
function initializeMyGroupsPage() {
    fetchMyGroups();
}

// Initialize the create group page
function initializeCreateGroupPage() {
    const form = document.querySelector('form');
    
    // Add form validation
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        const formData = {};
        
        // Get each input by its specific ID to avoid issues with hyphenated names
        const groupName = document.getElementById('group-name');
        const courseCode = document.getElementById('course-code');
        const department = document.getElementById('department');
        const college = document.getElementById('college');
        
        // Check each field individually
        if (!groupName.value.trim()) {
            showError(groupName, 'This field is required');
            isValid = false;
        } else {
            clearError(groupName);
            formData.groupName = groupName.value.trim();
        }
        
        if (!courseCode.value.trim()) {
            showError(courseCode, 'This field is required');
            isValid = false;
        } else {
            clearError(courseCode);
            formData.courseCode = courseCode.value.trim();
        }
        
        if (!department.value.trim()) {
            showError(department, 'This field is required');
            isValid = false;
        } else {
            clearError(department);
            formData.department = department.value.trim();
        }
        
        if (!college.value.trim()) {
            showError(college, 'This field is required');
            isValid = false;
        } else {
            clearError(college);
            formData.college = college.value.trim();
        }
        
        if (isValid) {
            createGroup(formData);
        }
    });
    
    // Add input validation on blur for each input
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (!input.value.trim()) {
                showError(input, 'This field is required');
            } else {
                clearError(input);
            }
        });
        
        input.addEventListener('input', () => {
            clearError(input);
        });
    });
}

// Fetch groups from API

async function fetchGroups() {
    try {
        // Fetch API data
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) throw new Error('Failed to fetch groups');

        const data = await response.json();

        const apiGroups = data.map(user => ({
            id: user.id,
            name: `${user.company.bs.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}`,
            courseCode: `CS${100 + user.id}`,
            college: user.company.name,
            department: user.company.catchPhrase.split(' ')[0],
            link: `https://example.com/group/${user.id}`
        }));

        const customGroups = JSON.parse(localStorage.getItem('customGroups')) || [];

        // Save only — don't display yet
        allGroups = [...customGroups, ...apiGroups];
        currentGroups = [...allGroups];

       
    } catch (error) {
        console.error('Error fetching groups:', error);
        document.getElementById('groupsContainer').innerHTML = `
            <div class="col-12 text-center">
                <p class="text-danger">Failed to load study groups. Please try again later.</p>
            </div>
        `;
    }
}

// Fetch my groups
async function fetchMyGroups() {
    const myGroupsContainer = document.getElementById('myGroupsContainer');
    if (!myGroupsContainer) return;

    showLoading('myGroupsContainer');

    try {
        const savedCustomGroups = JSON.parse(localStorage.getItem('customGroups')) || [];

        // Get first 3 from API to simulate real groups
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();

        const apiGroups = data.slice(0, 3).map(user => ({
            id: user.id,
            name: `${user.company.bs.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}`,
            courseCode: `CS${100 + user.id}`,
            college: user.company.name,
            department: user.company.catchPhrase.split(' ')[0],
            link: `https://example.com/group/${user.id}`
        }));

        // Combine both
        const myGroups = [...savedCustomGroups, ...apiGroups];

        displayMyGroups(myGroups);
    } catch (error) {
        console.error('Error fetching my groups:', error);
        myGroupsContainer.innerHTML = `
            <div class="text-center">
                <p class="text-danger">Failed to load your study groups. Please try again later.</p>
            </div>
        `;
    }
}


// Display groups with pagination
function displayGroups(groups) {
    const groupsContainer = document.getElementById('groupsContainer');
    const paginationContainer = document.getElementById('paginationContainer');
    
    if (!groupsContainer) return;
    
    currentGroups = groups;
    const totalPages = Math.ceil(groups.length / groupsPerPage);
    
    // Ensure current page is valid
    if (currentPage > totalPages) {
        currentPage = totalPages || 1;
    }
    
    const startIndex = (currentPage - 1) * groupsPerPage;
    const endIndex = startIndex + groupsPerPage;
    const groupsToDisplay = groups.slice(startIndex, endIndex);
    
    // Clear container
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
    
    // Create group cards
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
    
    // Create pagination
    createPagination(totalPages);
}

// Display my groups
function displayMyGroups(groups) {
    const myGroupsContainer = document.getElementById('myGroupsContainer');
    
    if (!myGroupsContainer) return;
    
    // Clear container
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
    
    // Create group cards
    groups.forEach(group => {
        const groupCard = document.createElement('div');
        groupCard.className = 'card mb-3';
        groupCard.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${group.name}</h5>
                <p class="card-text">Course Code: ${group.courseCode}</p>
                <p class="card-text">College: ${group.college}</p>
                <p class="card-text">Department: ${group.department}</p>
                <p><a href="${group.link}">Group link</a></p>
            </div>
        `;
        myGroupsContainer.appendChild(groupCard);
    });
}

// Create pagination controls
function createPagination(totalPages) {
    const paginationContainer = document.getElementById('paginationContainer');
    
    if (!paginationContainer) return;
    
    paginationContainer.innerHTML = '';
    
    if (totalPages <= 1) return;
    
    const pagination = document.createElement('nav');
    pagination.setAttribute('aria-label', 'Study groups pagination');
    
    const paginationList = document.createElement('ul');
    paginationList.className = 'pagination';
    
    // Previous button
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
    
    // Page numbers
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
    
    // Next button
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

// Search groups
function searchGroups(query, filter) {
    query = query.toLowerCase().trim();
    
    if (!query) {
        displayGroups(allGroups);
        return;
    }
    
    let filteredGroups = [];
    
    switch (filter) {
        case 'course-name':
            filteredGroups = allGroups.filter(group => 
                group.name.toLowerCase().includes(query)
            );
            break;
        case 'course-code':
            filteredGroups = allGroups.filter(group => 
                group.courseCode.toLowerCase().includes(query)
            );
            break;
        case 'college':
            filteredGroups = allGroups.filter(group => 
                group.college.toLowerCase().includes(query)
            );
            break;
        case 'department':
            filteredGroups = allGroups.filter(group => 
                group.department.toLowerCase().includes(query)
            );
            break;
        default:
            filteredGroups = allGroups;
    }
    
    currentPage = 1;
    displayGroups(filteredGroups);
}

// Create a new group
async function createGroup(formData) {
    // Map kebab-case IDs to camelCase properties
    const groupData = {
        groupName: formData['group-name'],
        courseCode: formData['course-code'],
        department: formData['department'],
        college: formData['college']
    };
    
    const form = document.querySelector('form');

    form.innerHTML = `
        <div class="text-center">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <p class="mt-2">Creating your study group...</p>
        </div>
    `;

    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        const customGroup = {
            id: Date.now(), // Unique
            name: formData.groupName ,
            courseCode: formData.courseCode,
            college: formData.college ,
            department: formData.department ,
            link: '#'
        };
customGroup.name=formData.groupName;
        const savedGroups = JSON.parse(localStorage.getItem('customGroups')) || [];
        savedGroups.push(customGroup);
        localStorage.setItem('customGroups', JSON.stringify(savedGroups));

        window.location.href = 'my-groups.html';
    } catch (error) {
        console.error('Error creating group:', error);
        form.innerHTML = `
            <div class="alert alert-danger" role="alert">
                Failed to create study group. Please try again later.
            </div>
            <button type="button" class="btn btn-primary" onclick="location.reload()">Try Again</button>
        `;
    }
}


// Show loading indicator
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

// Show form validation error
function showError(input, message) {
    // Clear any existing error
    clearError(input);
    
    const errorElement = document.createElement('div');
    errorElement.className = 'invalid-feedback d-block';
    errorElement.textContent = message;
    
    input.classList.add('is-invalid');
    input.parentNode.appendChild(errorElement);
}

// Clear form validation error
function clearError(input) {
    input.classList.remove('is-invalid');
    
    const errorElement = input.parentNode.querySelector('.invalid-feedback');
    if (errorElement) {
        errorElement.remove();
    }
}

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
                <h5 class="card-title">${group.name}</h5>
                <p class="card-text">Course Code: ${group.courseCode}</p>
                <p class="card-text">College: ${group.college}</p>
                <p class="card-text">Department: ${group.department}</p>
                <p><a href="${group.link}" target="_blank">Group link</a></p>
                ${
                    group.id.toString().length > 5
                        ? `<button class="btn btn-danger btn-sm" data-id="${group.id}">Delete</button>`
                        : ''
                }
            </div>
        `;
        myGroupsContainer.appendChild(groupCard);
    });

    // Add delete event listeners
    myGroupsContainer.querySelectorAll('button[data-id]').forEach(button => {
        button.addEventListener('click', () => {
            const groupId = button.getAttribute('data-id');
            deleteCustomGroup(groupId);
        });
    });
}

function deleteCustomGroup(groupId) {
    // Show confirmation dialog
    const confirmDelete = confirm("Are you sure you want to delete this group?");
    
    if (!confirmDelete) return;

    let customGroups = JSON.parse(localStorage.getItem('customGroups')) || [];

    customGroups = customGroups.filter(group => group.id.toString() !== groupId);

    localStorage.setItem('customGroups', JSON.stringify(customGroups));

    fetchMyGroups(); // Refresh the list
}
