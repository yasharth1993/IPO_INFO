const ipoData = {
  active_IPOs: [{
          name: "Anya Ploytech and Fertilizer",
          issue_price: 13,
          gmp: 20,
          subscription_status: {
              total: "5.22",
              qib: "3.12",
              nii: "1.5",
              retail: "10.23"
          },
          subscription_date: "26th Dec - 30th Dec"
      },
      {
          name: "Citichem India",
          issue_price: 70,
          gmp: 30,
          subscription_status: {
              total: "11.26",
              qib: "13.12",
              nii: "7.5",
              retail: "8.56"
          },
          subscription_date: "27th Dec - 1st Jan"
      },
      {
          name: "Indofarm",
          issue_price: 170,
          gmp: 30,
          subscription_status: {
              total: "121.31",
              qib: "113.12",
              nii: "17.5",
              retail: "48.56"
          },
          subscription_date: "27th Dec - 1st Jan"
      },
      {
          name: "VMM",
          issue_price: 70,
          gmp: 30,
          subscription_status: {
              total: "11.12",
              qib: "13.12",
              nii: "7.5",
              retail: "8.56"
          },
          subscription_date: "27th Dec - 1st Jan"
      }
  ]
};

const blogData = [{
      title: "Understanding IPOs: A Beginner's Guide",
      summary: "Initial Public Offerings (IPOs) are the process by which a company offers its shares to the public for the first time. IPOs allow companies to raise capital and offer investors an opportunity to buy shares in a growing company.",
      fullContent: "In this guide, we will walk through the steps involved in an IPO, what it means for the company, and how investors can participate. We will also explore the potential risks and rewards associated with investing in an IPO. IPOs can provide companies with significant capital to expand their business and fuel growth, but they also come with risks for investors as the stock's market performance can fluctuate significantly in the early stages. For investors, understanding the financial health and growth prospects of the company is crucial before deciding whether to participate."
  },
  {
      title: "How to Analyze IPO Subscription Data",
      summary: "IPO subscription data tells us how many shares have been subscribed to by different categories of investors, such as Qualified Institutional Buyers (QIB), Non-Institutional Investors (NII), and Retail Investors.",
      fullContent: "Understanding the subscription data is key for assessing the demand for an IPO. High subscription rates across all investor categories typically indicate strong market interest and can result in the stock being priced higher. Retail investors, who are the smaller investors in an IPO, typically have a lower subscription rate, whereas QIBs and NIIs may drive up the demand. Analyzing these trends helps investors determine if an IPO is likely to be oversubscribed and if they should apply for the IPO."
  },
  {
      title: "What Does GMP (Grey Market Premium) Indicate in IPOs?",
      summary: "The Grey Market Premium (GMP) is the price at which shares of an unlisted IPO are traded in the unofficial market before the actual listing on the stock exchange.",
      fullContent: "The GMP is a crucial indicator of the potential listing price of an IPO. A higher GMP suggests a strong interest from investors, which might result in a higher opening price on the stock exchange. However, it is important to note that GMP is unofficial and does not always reflect the actual listing price. Investors often look at GMP as a barometer for potential gains but should not base their entire investment decision solely on it."
  }
];

window.addEventListener('load', async () => {
  loadIPOData();
  loadBlogs();
  fetchMarketNews();
});

window.onload = function() {
  window.scrollTo({
      top: 0,
      behavior: 'auto'
  });
};

async function loadIPOData() {
  const tableBody = document.querySelector('#ipo-table tbody');

  if (!ipoData.active_IPOs || ipoData.active_IPOs.length === 0) {
      tableBody.innerHTML = '<tr><td colspan="8">No active IPOs available.</td></tr>';
      return;
  }

  const rows = ipoData.active_IPOs.map(ipo => {
      return `
      <tr>
        <td>${ipo.name}</td>
        <td>${ipo.issue_price}</td>
        <td>${ipo.gmp}</td>
        <td>${ipo.subscription_status.total}</td>
        <td>${ipo.subscription_status.qib}</td>
        <td>${ipo.subscription_status.nii}</td>
        <td>${ipo.subscription_status.retail}</td>
        <td>${ipo.subscription_date}</td>
      </tr>
    `;
  }).join('');

  tableBody.innerHTML = rows;
}

async function loadBlogs() {
  const blogsContainer = document.getElementById('blogs');

  if (!blogData || blogData.length === 0) {
      blogsContainer.innerHTML = 'No blogs available.';
      return;
  }

  const blogElements = blogData.map((blog, index) => {
      return `
      <div class="blog">
        <h3>${blog.title}</h3>
        <p>${blog.summary}</p>
        <button class="more-btn" onclick="showMoreContent(${index})">More</button>
        <div class="full-content" id="blog-${index}" style="display: none;">
          <p>${blog.fullContent}</p>
        </div>
      </div>
    `;
  }).join('');

  blogsContainer.innerHTML = blogElements;
}

function showSection(sectionId) {
  // Get all sections
  const targetSection = document.getElementById(sectionId);

  // If the target section exists, scroll to it
  if (targetSection) {
      targetSection.scrollIntoView({
          behavior: 'smooth', // Smooth scrolling
          block: 'start', // Align to the start of the section
      });
  }
}


function showSection(sectionId) {
  // Get all sections
  const targetSection = document.getElementById(sectionId);

  // If the target section exists, scroll to it
  if (targetSection) {
      targetSection.scrollIntoView({
          behavior: 'smooth', // Smooth scrolling
          block: 'start', // Align to the start of the section
      });
  }
}


function showMoreContent(index) {
  const content = document.getElementById(`blog-${index}`);
  content.style.display = content.style.display === 'none' ? 'block' : 'none';
}

// JavaScript for modal and subscribe functionality

// Open Modal
function openModal() {
  document.getElementById('subscribe-modal').style.display = 'block';

  document.getElementById("form-section").style.display = "block";
  document.getElementById("spinner-section").style.display = "none";
  document.getElementById("thankyou-section").style.display = "none";
}

// Close Modal
function closeModal() {
  document.getElementById('subscribe-modal').style.display = 'none';
}


function fetchMarketNews() {

  const today = new Date();

  // Get the date two days ago
  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(today.getDate() - 2);

  // Format dates as YYYY-MM-DD
  const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
  };

  const toDate = formatDate(today);
  const fromDate = formatDate(twoDaysAgo);

  // Construct the API URL with dynamic dates
  const apiUrl = `https://finnhub.io/api/v1/company-news?symbol=AAPL&from=${fromDate}&to=${toDate}&token=ctqelj1r01qmn6h4465gctqelj1r01qmn6h44660`;

  fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
          displayMarketNews(data);
      })
      .catch(error => {
          console.error('Error fetching market news:', error);
      });
}

let currentIndex = 0;
const newsPerPage = 5;

function displayMarketNews(news) {
  const newsContainer = document.getElementById('news-container');

  // Display the current batch of news items
  const currentNews = news.slice(currentIndex, currentIndex + newsPerPage);

  currentNews.forEach(item => {
      const newsItem = document.createElement('div');
      newsItem.classList.add('news-item');

      const newsTitle = document.createElement('h3');
      newsTitle.innerText = item.headline;
      newsItem.appendChild(newsTitle);

      const newsDescription = document.createElement('p');
      newsDescription.innerText = item.summary;
      newsItem.appendChild(newsDescription);

      const newsLink = document.createElement('a');
      newsLink.href = item.url;
      newsLink.target = '_blank';
      newsLink.innerText = 'Read more';
      newsItem.appendChild(newsLink);

      newsContainer.appendChild(newsItem);
  });

  // Check if the "Show more news" text is needed
  const existingShowMoreText = document.querySelector('.show-more-text');
  const existingLine = document.querySelector('.line-break');

  // Remove the existing "Show more" text if there is one, to avoid duplicates
  if (existingShowMoreText) {
      existingShowMoreText.remove();
  }
  if (existingLine) {
    existingLine.remove();
  }

  // Only add the "Show more news" text if there are more news to load
  if (currentIndex + newsPerPage < news.length) {
      const showMoreText = document.createElement('span');
      const line = document.createElement('br');
      line.classList.add('line-break');

      showMoreText.innerText = 'Show more news';
      showMoreText.classList.add('show-more-text');
      showMoreText.style.cursor = 'pointer';
      showMoreText.style.color = 'darkseagreen';
      showMoreText.style.textDecoration = 'underline';
      showMoreText.style.float = 'right';
      showMoreText.onclick = () => loadMoreNews(news);

      // Add the "Show more news" text at the bottom of the container
      newsContainer.appendChild(showMoreText);
      newsContainer.appendChild(line);
  }
}

// Function to load the next set of news items without removing the previous ones
function loadMoreNews(news) {
  currentIndex += newsPerPage; // Update the current index
  displayMarketNews(news); // Re-display the news with the updated index
}




// App Script url
const form = document.getElementById("Sheet1");
const userInput = document.getElementById("user-input");
const googleAppScriptUrl = "https://script.google.com/macros/s/AKfycbwMjPlIUzneQpEupD_5zykUz7DXOruscFMRd_SdAJib1hqqWBBN7jGU_pEScbA6rSTg/exec";
// Fuction to send data to google form when submit button is clicked
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = userInput.value.trim();
  if (!validateEmailOrPhone(email)) {
      alert("Please enter a valid email address or phone number.");
      return;
  }
  document.getElementById("form-section").style.display = "none";
  document.getElementById("spinner-section").style.display = "block";
  try {
      fetch(googleAppScriptUrl, {
          method: "POST",
          mode: "no-cors",
          body: new FormData(form),
      }).then(() => {
          document.getElementById("spinner-section").style.display = "none";
          document.getElementById("thankyou-section").style.display = "block";
      });
  } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
  }
});

function validateEmailOrPhone(input) {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phonePattern = /^[0-9]{10}$/; // Assumes 10-digit phone number without spaces or symbols
  return emailPattern.test(input) || phonePattern.test(input);
}

const burgerIcon = document.getElementById('burger-icon');
const navMenu = document.querySelector('.nav-menu');
        burgerIcon.addEventListener('click', () => {
          navMenu.classList.toggle('show');
});