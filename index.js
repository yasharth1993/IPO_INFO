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
  },
  {
    title: "What Does GMP (Grey Market Premium) Indicate in IPOs?",
    summary: "The Grey Market Premium (GMP) is the price at which shares of an unlisted IPO are traded in the unofficial market before the actual listing on the stock exchange.",
    fullContent: "The GMP is a crucial indicator of the potential listing price of an IPO. A higher GMP suggests a strong interest from investors, which might result in a higher opening price on the stock exchange. However, it is important to note that GMP is unofficial and does not always reflect the actual listing price. Investors often look at GMP as a barometer for potential gains but should not base their entire investment decision solely on it."
  },
  {
    title: "What Does GMP (Grey Market Premium) Indicate in IPOs?",
    summary: "The Grey Market Premium (GMP) is the price at which shares of an unlisted IPO are traded in the unofficial market before the actual listing on the stock exchange.",
    fullContent: "The GMP is a crucial indicator of the potential listing price of an IPO. A higher GMP suggests a strong interest from investors, which might result in a higher opening price on the stock exchange. However, it is important to note that GMP is unofficial and does not always reflect the actual listing price. Investors often look at GMP as a barometer for potential gains but should not base their entire investment decision solely on it."
  },
  {
    title: "What Does GMP (Grey Market Premium) Indicate in IPOs?",
    summary: "The Grey Market Premium (GMP) is the price at which shares of an unlisted IPO are traded in the unofficial market before the actual listing on the stock exchange.",
    fullContent: "The GMP is a crucial indicator of the potential listing price of an IPO. A higher GMP suggests a strong interest from investors, which might result in a higher opening price on the stock exchange. However, it is important to note that GMP is unofficial and does not always reflect the actual listing price. Investors often look at GMP as a barometer for potential gains but should not base their entire investment decision solely on it."
  }
];

window.addEventListener('load', async () => {
  fetchAPIData();
  //loadIPOData();
  loadBlogs();
  fetchMarketNews();
});

window.onload = function() {
  window.scrollTo({
      top: 0,
      behavior: 'auto'
  });
};

// const apiUrl = 'https://fastapi-app-670257250443.asia-south1.run.app/api/data';
const apiUrl = 'https://webnodejs.investorgain.com/cloud/report/data-read/333/1/1/2025/2024-25/0/all?search=';
// const apiKey = '3780cea9-745e-46a4-920c-b385d67d8450';

async function fetchAPIData() {
  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        //'x-api-key': apiKey // Include the API key in the request headers
      }
    });

    if (!response.ok) {
      if (response.status === 500) {
        const errorResponse = await response.json();
        if (errorResponse.detail === 'No data available') {
          //document.body.innerHTML = '<p style="color: red;">No data available at the moment. Please try again later.</p>';
          const tableBody = document.querySelector('#ipo-table tbody');
          tableBody.innerHTML = '<p style="color: red;">No data available at the moment. Please try again later.</p>';
        } else {
          throw new Error(`API error: ${errorResponse.detail || 'Unknown error'}`);
        }
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return; // Exit function after handling error
    }

    const data = await response.json();
    displayAPIData(data.reportTableData); // Call the display function with the API response
  } catch (error) {
    console.error('Error fetching data from API:', error);
    document.body.innerHTML = '<p style="color: red;">Failed to fetch data. Please check the API URL, API key, or network settings.</p>';
  }
}

function displayAPIData(data) {
  const tableBody = document.querySelector('#ipo-table tbody');
  tableBody.innerHTML = ''; // Clear any existing table rows

  // Helper function to strip HTML tags
  function stripHtmlTags(str) {
    const doc = new DOMParser().parseFromString(str, 'text/html');
    return doc.body.textContent || "";
  }

  data.forEach(item => {
    const row = document.createElement('tr');

    // Fields for other columns
    const fields = [
      "IPO",          // 1st column
      "IPO Price",    // 2nd column
      "QIB",          // 4th column
      "NII",          // 5th column
      "RII",          // 6th column
      "Total",        // 7th column
      "Close Date"    // 8th column
    ];

    // Add first two columns (IPO and IPO Price)
    fields.slice(0, 2).forEach(field => {
      const cell = document.createElement('td');
      cell.textContent = stripHtmlTags(item[field]) || '-'; // Remove HTML tags
      row.appendChild(cell);
    });

    // Add GMP as the third column
    const status = item.Status || '';
    const gmpMatch = status.match(/GMP:&#8377;<b>(\d+\.?\d*)<\/b>/); // Match GMP value (₹ followed by number)
    const randomPercentage = Math.random() * 0.02 + 0.01;
    let gmpValue = gmpMatch ? gmpMatch[1] - (gmpMatch[1] * randomPercentage) : '-'; // Default to '-' if GMP not found
    if (isNaN(gmpValue)) {
        gmpValue = '-';
    } else {
        gmpValue = Math.round(gmpValue * 100) / 100;
    }
    const gmpCell = document.createElement('td');
    gmpCell.textContent = gmpValue;
    row.appendChild(gmpCell);

    // Add the remaining columns (QIB, NII, RII, Total, Close Date)
    fields.slice(2).forEach(field => {
      const cell = document.createElement('td');
      cell.textContent = stripHtmlTags(item[field]) || '-'; // Remove HTML tags
      row.appendChild(cell);
    });

    // Append the row to the table body
    tableBody.appendChild(row);
  });
}


// Call the function to fetch data when the page loads
//fetchAPIData();

async function loadBlogs() {
  const blogsContainer = document.getElementById('blogs');

  if (!blogData || blogData.length === 0) {
      blogsContainer.innerHTML = 'No blogs available.';
      return;
  }

  const blogElements = blogData.map((blog, index) => {
      return `
      <div class="blog" id="blog-${index}">
          <h3>${blog.title}</h3>
          <p>${blog.summary}</p>
          <div class="full-content" id="content-${index}" style="max-height: 0;">
              <p>${blog.fullContent}</p>
          </div>
          <button class="more-btn" data-index="${index}">Read More</button>
      </div>
      `;
  }).join('');

  blogsContainer.innerHTML = blogElements;

  // Attach event listeners to buttons
  document.querySelectorAll('.more-btn').forEach(button => {
      button.addEventListener('click', handleReadMoreClick);
  });
}

function handleReadMoreClick(event) {
  const clickedButton = event.target; // Get the clicked button
  const index = clickedButton.getAttribute('data-index'); // Get the blog index
  const fullContent = document.getElementById(`content-${index}`); // Get the full-content div
  const isOpen = fullContent.style.maxHeight !== '0px'; // Check if it's open

  if (isOpen) {
      // Collapse the clicked blog
      fullContent.style.maxHeight = '0';
      clickedButton.textContent = 'Read More';
  } else {
      // Collapse all other blogs
      document.querySelectorAll('.full-content').forEach(content => {
          content.style.maxHeight = '0'; // Collapse all full-content divs
      });
      document.querySelectorAll('.more-btn').forEach(button => {
          button.textContent = 'Read More'; // Reset all buttons
      });

      // Expand the clicked blog
      const contentHeight = fullContent.scrollHeight; // Get dynamic height
      fullContent.style.maxHeight = `${contentHeight}px`; // Set max-height
      clickedButton.textContent = 'Read Less'; // Update button text
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


// function showMoreContent(index) {
//   const content = document.getElementById(`blog-${index}`);
//   content.style.display = content.style.display === 'none' ? 'block' : 'none';
// }

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
const newsPerPage = 6;

function displayMarketNews(news) {
  const newsContainer = document.getElementById('news-container');
  const filteredNews = news.filter(item => item.image && item.image.trim() !== '');
  const currentNews = filteredNews.slice(currentIndex, currentIndex + newsPerPage);

  currentNews.forEach(item => {
      const newsItem = document.createElement('div');
      newsItem.classList.add('news-item');

      // Create a clickable wrapper
      const newsLink = document.createElement('a');
      newsLink.href = item.url;
      newsLink.target = '_blank';

      const newsImage = document.createElement('img');
      newsImage.src = item.image;
      newsImage.alt = 'News Image';
      newsLink.appendChild(newsImage);

      const newsTitle = document.createElement('h3');
      newsTitle.innerText = item.headline;
      newsLink.appendChild(newsTitle);

      newsItem.appendChild(newsLink);

      const newsDescription = document.createElement('p');
      const summaryText = item.summary.split('.')[0]; // Get text until the first full stop
      newsDescription.innerText = summaryText + '.';
      newsItem.appendChild(newsDescription);

      newsContainer.appendChild(newsItem);
  });

  // Existing "Show more news" functionality
  const existingShowMoreText = document.querySelector('.show-more-text');
  const existingLine = document.querySelector('.line-break');

  if (existingShowMoreText) existingShowMoreText.remove();
  if (existingLine) existingLine.remove();

  if (currentIndex + newsPerPage < news.length) {
      const showMoreText = document.createElement('span');
      const line = document.createElement('br');
      line.classList.add('line-break');

      showMoreText.innerText = 'Show more news';
      showMoreText.classList.add('show-more-text');
      showMoreText.onclick = () => loadMoreNews(news);

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