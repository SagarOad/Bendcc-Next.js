import React from 'react'

const ModalNav = () => {
  return (
    <div>
      <div>
        <nav class=" modal-nav navbar-expand-lg bg-body-tertiary">
          <div class="container">
            <a class="navbar-brand" href="#">
              <img src="https://www.bendcc.com/wp-content/uploads/2022/08/BendccLogoWhite-e1692670404519.png" />
            </a>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="#">
                    Submit an Event
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    About Us
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    Contact Us
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link">News</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default ModalNav