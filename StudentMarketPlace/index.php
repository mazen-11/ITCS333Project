


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Students marketplace</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="../style.css" rel="stylesheet">

</head>
<body>

  
    <nav class="navbar navbar-expand-lg bg-dark navbar-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Navbar</a>
            <button class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-expanded="false">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="navbar-collapse collapse" id="navbarNavDropdown">
                <ul class="navbar-nav">
                    <li class="nav-item"><a class="nav-link" href="../index.html">Home</a></li>
                    <li class="nav-item"><a class="nav-link" href="../EventsCalendar/eventsPage.html">Event Calendar</a></li>
                    <li class="nav-item"><a class="nav-link" href="../sgfinder/sgfinder.html">Study Group Finder</a></li>
                    <li class="nav-item"><a class="nav-link" href="../Course_review/index.html">Course Reviews</a></li>
                    <li class="nav-item"><a class="nav-link" href="../CourseNotes/index.html">Course Notes</a></li>
                    <li class="nav-item"><a class="nav-link" href="../campus-news/index.html">Campus News</a></li>
                    <li class="nav-item"><a class="nav-link" href="add/add-service.html">Add Proudects or Services</a></li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">filter by</a>
                      
                      <!--filter selection-->
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item">choose filter</a></li>
                            <form id="filter-form">
                            <li><a class="dropdown-item">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="service" id="flexCheckIndeterminate">
                                    <label class="form-check-label" for="flexCheckIndeterminate">
                                      Services
                                    </label>
                                  </div>
                            </a>
                        </li>
                        <li><a class="dropdown-item">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="product" id="flexCheckIndeterminate">
                                <label class="form-check-label" for="flexCheckIndeterminate">
                                    Products
                                </label>
                              </div>
                        </a>
                    </li>
                    
    
                    <li><a class="dropdown-item">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="notesforsale" id="flexCheckIndeterminate">
                            <label class="form-check-label" for="flexCheckIndeterminate">
                              notes for sale
                            </label>
                          </div>
                    </a>
                </li>
                <li><a class="dropdown-item">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="Privateteacher" id="flexCheckIndeterminate">
                        <label class="form-check-label" for="flexCheckIndeterminate">
                          Private teacher
                        </label>
                      </div>
                </a>
            </li>
                
            <li><a class="dropdown-item">
                <div class="container-fluid justify-content-center">
                <button class="btn btn-outline-dark" type="submit">Apply filter</button>
                </div>
            </a>
        </li>
            
    
                            </form>
                        </ul>
                    </li>
                </ul>
                      <!--end of filter selection-->


            </div>
        </div>
    </nav>

<!-- Search Bar -->
<nav class="navbar bg-dark navbar-dark">
    <div class="container-fluid justify-content-center">
        <form class="d-flex w-75" role="search" id="search">
            <input class="form-control me-2" type="search" placeholder="Search by code">
            <button class="btn btn-outline-light" type="submit">Search</button>
        </form>
    </div>
</nav>

<!-- Content Section -->
<main class="services-section container">
  <!-- Add g-4 for spacing -->
     <div class="row g-4" id="product-list"></div>
</main>

<!-- Footer -->
<footer class="bg-dark text-light pt-5">
    <div class="container">
        <div class="row">
            <div class="col-md-4">
                <h3>Coding Yaar</h3>
                <p>321, Lorem ipsum dolor sit amet.</p>
                <p>0987654321</p>
            </div>
            <div class="col-md-4">
                <h4>Menu</h4>
                <ul class="list-unstyled">
                    <li><a href="#" class="text-light text-decoration-none">Home</a></li>
                    <li><a href="#" class="text-light text-decoration-none">About</a></li>
                    <li><a href="#" class="text-light text-decoration-none">Contact</a></li>
                </ul>
            </div>
            <div class="col-md-4">
                <h4>More</h4>
                <ul class="list-unstyled">
                    <li><a href="#" class="text-light text-decoration-none">Landing Pages</a></li>
                    <li><a href="#" class="text-light text-decoration-none">FAQs</a></li>
                </ul>
            </div>
        </div>
        <hr>
        <div class="d-flex justify-content-between py-1">
            <p>2023 © Coding Yaar. All Rights Reserved.</p>
            <p>
                <a href="#" class="text-light text-decoration-none">Terms of Use</a>
                <a href="#" class="text-light text-decoration-none ms-3">Privacy Policy</a>
            </p>
        </div>
    </div>
</footer>

<!-- Bootstrap Script -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="js/main.js"></script>
<script src="JSONFecth.js"></script>

</body>
</html>
