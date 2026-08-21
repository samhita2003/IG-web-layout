document.addEventListener("DOMContentLoaded", () => {

  const htmlElement = document.documentElement;

  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const mobileThemeToggleBtn = document.getElementById(
    "mobileThemeToggleBtn"
  );

  const themeIcon = document.getElementById("themeIcon");
  const mobileThemeIcon = document.getElementById("mobileThemeIcon");

  const SearchInput = document.getElementById("search-Input");
  const feedGrid = document.getElementById("feedGrid");

  const createPostBtn = document.getElementById("openCreatePostModal");




  function setTheme(theme) {
    htmlElement.setAttribute("data-theme", theme);

    if (themeIcon) {
      themeIcon.className =
        theme === "light" ? "ph ph-moon" : "ph ph-sun";
    }

    if (mobileThemeIcon) {
      mobileThemeIcon.className =
        theme === "light" ? "ph ph-moon" : "ph ph-sun";
    }

    localStorage.setItem("theme", theme);
  }


  const savedTheme = localStorage.getItem("theme") || "light";

  setTheme(savedTheme);


  function toggleTheme() {
    const currentTheme = htmlElement.getAttribute("data-theme");

    const newTheme =
      currentTheme === "light" ? "dark" : "light";

    setTheme(newTheme);
  }


  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", toggleTheme);
  }

  if (mobileThemeToggleBtn) {
    mobileThemeToggleBtn.addEventListener("click", toggleTheme);
  }




  const navItems = document.querySelectorAll(
    ".nav-menu .nav-item"
  );

  navItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();

      navItems.forEach((nav) => {
        nav.classList.remove("active");
      });

      item.classList.add("active");
    });
  });


  

  const mobileNavBtns = document.querySelectorAll(
    ".mobile-bottom-nav .mobile-nav-btn"
  );

  mobileNavBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      mobileNavBtns.forEach((b) => {
        b.classList.remove("active");
      });

      btn.classList.add("active");
    });
  });



  let savedPosts =
    JSON.parse(localStorage.getItem("instagramPosts")) || [];


  savedPosts.forEach((postData) => {
    createPostElement(postData, false);
  });




  feedGrid.addEventListener("click", (e) => {

    const heart = e.target.closest(".action-icon.ph-heart");

    if (!heart) return;


    const postCard = heart.closest(".post-card");

    if (!postCard) return;


    const likesText =
      postCard.querySelector(".post-likes b");

    if (!likesText) return;


    let likes =
      parseInt(likesText.textContent.replace(",", "")) || 0;


    const isLiked =
      heart.classList.contains("ph-fill");


    if (isLiked) {

      

      heart.classList.remove("ph-fill");
      heart.classList.add("ph");

      heart.style.color = "";

      likes--;

    } else {

   

      heart.classList.remove("ph");
      heart.classList.add("ph-fill");

      heart.style.color = "#e11d48";

      likes++;
    }


    likesText.textContent =
      likes.toLocaleString();


    // Save like count if this is a user-created post
    const postId = postCard.dataset.postId;

    if (postId) {

      const posts =
        JSON.parse(localStorage.getItem("instagramPosts")) || [];

      const post = posts.find(
        (item) => item.id === postId
      );

      if (post) {

        post.likes = likes;
        post.liked = !isLiked;

        localStorage.setItem(
          "instagramPosts",
          JSON.stringify(posts)
        );
      }
    }
  });


 

  feedGrid.addEventListener("click", (e) => {

    const followBtn =
      e.target.closest(".follow-btn");

    if (!followBtn) return;


    const postCard =
      followBtn.closest(".post-card");


    const isFollowing =
      followBtn.textContent.trim() === "Following";


    if (!isFollowing) {

      // FOLLOW

      followBtn.textContent = "Following";

      followBtn.style.background =
        "var(--primary-gradient)";

      followBtn.style.color = "#fff";

      followBtn.style.borderColor =
        "transparent";

    } else {

      // UNFOLLOW

      followBtn.textContent = "Follow";

      followBtn.style.background =
        "var(--bg-hover)";

      followBtn.style.color =
        "var(--text-main)";

      followBtn.style.borderColor =
        "var(--border-color)";
    }


    // Save follow state for user-created posts
    const postId = postCard.dataset.postId;

    if (postId) {

      const posts =
        JSON.parse(localStorage.getItem("instagramPosts")) || [];

      const post =
        posts.find((item) => item.id === postId);

      if (post) {

        post.following = !isFollowing;

        localStorage.setItem(
          "instagramPosts",
          JSON.stringify(posts)
        );
      }
    }
  });




  if (SearchInput) {

    SearchInput.addEventListener("input", () => {

      const searchValue =
        SearchInput.value.toLowerCase().trim();


      const posts =
        feedGrid.querySelectorAll(".post-card");


      posts.forEach((post) => {

        const author =
          post
            .querySelector(".author-name")
            ?.textContent
            .toLowerCase() || "";


        const location =
          post
            .querySelector(".post-location")
            ?.textContent
            .toLowerCase() || "";


        const caption =
          post
            .querySelector(".post-caption")
            ?.textContent
            .toLowerCase() || "";


        const matches =
          author.includes(searchValue) ||
          location.includes(searchValue) ||
          caption.includes(searchValue);


        post.style.display =
          matches ? "flex" : "No such posts found";
      });
    });
  }



  if (createPostBtn) {
    createPostBtn.addEventListener(
      "click",
      openCreatePostModal
    );
  }


  function openCreatePostModal() {

    // Prevent duplicate modal
    if (
      document.querySelector(
        ".create-post-overlay"
      )
    ) {
      return;
    }


    const overlay =
      document.createElement("div");

    overlay.className =
      "create-post-overlay";


    overlay.innerHTML = `

      <div class="create-post-modal">

        <div class="modal-header">

          <h2>Create Post</h2>

          <button class="close-modal">

            <i class="ph ph-x"></i>

          </button>

        </div>


        <div class="modal-body">

          <label class="upload-label">

            <i class="ph ph-image"></i>

            <span>Choose Image</span>

            <input
              type="file"
              id="postImageInput"
              accept="image/*"
              hidden
            />

          </label>


          <div
            class="image-preview"
            id="imagePreview"
          >

            <i class="ph ph-image"></i>

            <span>Image preview</span>

          </div>


          <input
            type="text"
            id="postAuthorInput"
            placeholder="Your name"
          />


          <input
            type="text"
            id="postLocationInput"
            placeholder="Location"
          />


          <textarea
            id="postCaptionInput"
            placeholder="Write a caption..."
            rows="4"
          ></textarea>


          <button
            class="publish-post-btn"
            id="publishPostBtn"
          >

            <i
              class="ph-bold ph-paper-plane-tilt"
            ></i>

            Create Post

          </button>

        </div>

      </div>
    `;


    document.body.appendChild(overlay);


   
    const closeBtn =
      overlay.querySelector(
        ".close-modal"
      );


    const imageInput =
      overlay.querySelector(
        "#postImageInput"
      );


    const imagePreview =
      overlay.querySelector(
        "#imagePreview"
      );


    const authorInput =
      overlay.querySelector(
        "#postAuthorInput"
      );


    const locationInput =
      overlay.querySelector(
        "#postLocationInput"
      );


    const captionInput =
      overlay.querySelector(
        "#postCaptionInput"
      );


    const publishBtn =
      overlay.querySelector(
        "#publishPostBtn"
      );


   

    closeBtn.addEventListener(
      "click",
      () => {
        overlay.remove();
      }
    );


    // Click outside modal

    overlay.addEventListener(
      "click",
      (e) => {

        if (e.target === overlay) {
          overlay.remove();
        }

      }
    );


  

    imageInput.addEventListener(
      "change",
      () => {

        const file =
          imageInput.files[0];

        if (!file) return;


        const imageURL =
          URL.createObjectURL(file);


        imagePreview.innerHTML = `

          <img
            src="${imageURL}"
            alt="Preview"
          />

        `;
      }
    );


    

    publishBtn.addEventListener(
      "click",
      () => {

        const file =
          imageInput.files[0];


        const author =
          authorInput.value.trim();


        const location =
          locationInput.value.trim();


        const caption =
          captionInput.value.trim();


    

        if (!file) {

          alert(
            "Please choose an image."
          );

          return;
        }


        if (!author) {

          alert(
            "Please enter your name."
          );

          return;
        }


        if (!location) {

          alert(
            "Please enter a location."
          );

          return;
        }


        if (!caption) {

          alert(
            "Please write a caption."
          );

          return;
        }


      

        const reader =
          new FileReader();


        reader.onload = function () {

          const imageURL =
            reader.result;


     

          const postData = {

            id:
              Date.now().toString(),

            author: author,

            location: location,

            image: imageURL,

            caption: caption,

            likes: 0,

            liked: false,

            following: false
          };


          // Save to localStorage

          const posts =
            JSON.parse(
              localStorage.getItem(
                "instagramPosts"
              )
            ) || [];


          posts.unshift(postData);


          localStorage.setItem(
            "instagramPosts",
            JSON.stringify(posts)
          );


          // Add post to UI

          createPostElement(
            postData,
            true
          );


          // Close modal

          overlay.remove();
        };


        reader.readAsDataURL(file);
      }
    );
  }



  function createPostElement(
    postData,
    addToBeginning = true
  ) {

    const post =
      document.createElement("article");


    post.className =
      "post-card";



    post.dataset.postId =
      postData.id;


    post.innerHTML = `

      <div class="post-header">

        <div class="post-author">

          <img
            src="${postData.image}"
            alt="${escapeHTML(postData.author)}"
            class="author-avatar"
          />

          <div class="author-info">

            <h4 class="author-name">
              ${escapeHTML(postData.author)}
            </h4>

            <span class="post-location">
              ${escapeHTML(postData.location)}
            </span>

          </div>

        </div>


        <div class="post-header-actions">

          <button class="follow-btn">
            ${postData.following
              ? "Following"
              : "Follow"}
          </button>

          <button class="more-btn">

            <i
              class="ph ph-dots-three-horizontal"
            ></i>

          </button>

        </div>

      </div>


      <div class="post-image-container">

        <img
          src="${postData.image}"
          alt="User post"
          class="post-image"
        />

      </div>


      <div class="post-content">

        <div class="post-actions">

          <div class="action-group">

            <i
              class="${
                postData.liked
                  ? "ph-fill"
                  : "ph"
              } ph-heart action-icon"
              ${
                postData.liked
                  ? 'style="color:#e11d48"'
                  : ""
              }
            ></i>


            <i
              class="ph ph-chat-circle action-icon"
            ></i>


            <i
              class="ph ph-paper-plane-tilt action-icon"
            ></i>

          </div>


          <i
            class="ph ph-bookmark-simple action-icon"
          ></i>

        </div>


        <div class="post-likes">

          <i
            class="ph-fill ph-heart"
            style="
              color:#e11d48;
              vertical-align:middle
            "
          ></i>

          Liked by you and

          <b>
            ${postData.likes.toLocaleString()}
          </b>

          others

        </div>


        <p class="post-caption">
          ${escapeHTML(postData.caption)}
        </p>

      </div>
    `;


    if (addToBeginning) {

      feedGrid.prepend(post);

    } else {

      feedGrid.appendChild(post);
    }
  }


  function escapeHTML(text) {

    const div =
      document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
  }

});