const ipoData = {
    active_IPOs: [
      {
        name: "Anya Ploytech and Fertilizers",
        issue_price: 13,
        gmp: 20,
        subscription_status: { total: "5.22", qib: "3.12", nii: "1.5", retail: "10.23" },
        subscription_date: "26th Dec - 30th Dec"
      },
      {
        name: "Citichem India",
        issue_price: 70,
        gmp: 30,
        subscription_status: {  total: "11.26", qib: "13.12", nii: "7.5", retail: "8.56" },
        subscription_date: "27th Dec - 1st Jan"
      },
      {
        name: "Indofarm",
        issue_price: 170,
        gmp: 30,
        subscription_status: {  total: "121.31", qib: "113.12", nii: "17.5", retail: "48.56" },
        subscription_date: "27th Dec - 1st Jan"
      },
      {
        name: "VMM",
        issue_price: 70,
        gmp: 30,
        subscription_status: {  total: "11.12", qib: "13.12", nii: "7.5", retail: "8.56" },
        subscription_date: "27th Dec - 1st Jan"
      }
    ]
  };
  
  const blogData = [
    {
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
    showSection('ipo-details');
  });
  
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
    const sections = document.querySelectorAll('.section');
    
    // Hide all sections
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show the selected section
    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.classList.add('active');
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
}

// Close Modal
function closeModal() {
  document.getElementById('subscribe-modal').style.display = 'none';
}

// Handle Subscription
function subscribe() {
  const userInput = document.getElementById('user-input').value;

  if (userInput === '') {
    alert('Please enter a valid email or phone number.');
    return;
  }

  // Save the input to a file (simulated)
  fetch('/subscribe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userInput: userInput })
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      alert('You have successfully subscribed!');
      closeModal();
    } else {
      alert('There was an issue with your subscription.');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('There was an error. Please try again.');
  });
}

  