// Default quotes array
const defaultQuotes = [
  {
    text: "The only way to do great work is to love what you do.",
    category: "Motivation",
    author: "Steve Jobs"
  },
  {
    text: "Innovation distinguishes between a leader and a follower.",
    category: "Leadership",
    author: "Steve Jobs"
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    category: "Dreams",
    author: "Eleanor Roosevelt"
  },
  {
    text: "It is during our darkest moments that we must focus to see the light.",
    category: "Inspiration",
    author: "Aristotle"
  },
  {
    text: "The only impossible journey is the one you never begin.",
    category: "Motivation",
    author: "Tony Robbins"
  },
  {
    text: "Wisdom is not a product of schooling but of the lifelong attempt to acquire it.",
    category: "Wisdom",
    author: "Albert Einstein"
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    category: "Success",
    author: "Winston Churchill"
  },
  {
    text: "The best time to plant a tree was 20 years ago. The second best time is now.",
    category: "Wisdom",
    author: "Chinese Proverb"
  }
];

let quotes = [];
let currentQuoteIndex = -1;
let filteredQuotes = [];
let currentFilter = 'all';

// Storage Functions
function saveQuotes() {
  try {
    const quotesJSON = JSON.stringify(quotes);
    localStorage.setItem('quotesData', quotesJSON);
    console.log('Quotes saved to localStorage');
  } catch (error) {
    console.error('Error saving quotes to localStorage:', error);
    alert('Error saving quotes to local storage');
  }
}

function loadQuotes() {
  try {
    const savedQuotes = localStorage.getItem('quotesData');
    if (savedQuotes) {
      quotes = JSON.parse(savedQuotes);
      console.log('Quotes loaded from localStorage');
    } else {
      quotes = [...defaultQuotes];
      saveQuotes();
      console.log('Default quotes loaded and saved');
    }
  } catch (error) {
    console.error('Error loading quotes from localStorage:', error);
    quotes = [...defaultQuotes];
  }
}

// Session Storage Functions
function saveLastViewedQuote(quoteIndex) {
  try {
    const sessionData = {
      lastViewedQuote: quoteIndex,
      timestamp: new Date().toISOString(),
      totalQuotesViewed: getSessionViewCount() + 1
    };
    sessionStorage.setItem('quoteSession', JSON.stringify(sessionData));
  } catch (error) {
    console.error('Error saving to sessionStorage:', error);
  }
}

function getSessionData() {
  try {
    const sessionData = sessionStorage.getItem('quoteSession');
    return sessionData ? JSON.parse(sessionData) : null;
  } catch (error) {
    console.error('Error reading from sessionStorage:', error);
    return null;
  }
}

function getSessionViewCount() {
  const sessionData = getSessionData();
  return sessionData ? sessionData.totalQuotesViewed : 0;
}

// Filter Storage Functions
function saveLastSelectedFilter(filter) {
  try {
    localStorage.setItem('lastSelectedFilter', filter);
    console.log('Filter saved to localStorage:', filter);
  } catch (error) {
    console.error('Error saving filter to localStorage:', error);
  }
}

function loadLastSelectedFilter() {
  try {
    const savedFilter = localStorage.getItem('lastSelectedFilter');
    return savedFilter || 'all';
  } catch (error) {
    console.error('Error loading filter from localStorage:', error);
    return 'all';
  }
}

// Category Management Functions
function populateCategories() {
  const categoryFilter = document.getElementById('categoryFilter');
  const uniqueCategories = [...new Set(quotes.map(quote => quote.category))];
  
  // Clear existing options except "All Categories"
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';
  
  // Add unique categories
  uniqueCategories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
  
  // Restore last selected filter using localStorage.getItem
  const lastFilter = localStorage.getItem('lastSelectedFilter') || 'all';
  categoryFilter.value = lastFilter;
  currentFilter = lastFilter;
}

// Filter Quotes Function
function filterQuotes() {
  const selectedCategory = document.getElementById('categoryFilter').value;
  currentFilter = selectedCategory;
  
  // Save the selected filter using localStorage.setItem
  localStorage.setItem('lastSelectedFilter', selectedCategory);
  
  // Update filtered quotes array
  if (selectedCategory === 'all') {
    filteredQuotes = [...quotes];
  } else {
    filteredQuotes = quotes.filter(quote => quote.category === selectedCategory);
  }
  
  // Reset current quote index for filtered results
  currentQuoteIndex = -1;
  
  // Update display
  const quoteDisplay = document.getElementById('quoteDisplay');
  if (filteredQuotes.length === 0) {
    quoteDisplay.innerHTML = '<p>No quotes found for the selected category.</p>';
  } else {
    quoteDisplay.innerHTML = `<p>Click "Show New Quote" to display a random quote from ${selectedCategory === 'all' ? 'all categories' : selectedCategory}!</p>`;
  }
  
  console.log(`Filtered quotes: ${filteredQuotes.length} quotes in category "${selectedCategory}"`);
}

// Function to show random quote (updated for filtering)
function showRandomQuote() {
  if (filteredQuotes.length === 0) {
    document.getElementById('quoteDisplay').innerHTML = '<p>No quotes available for the selected category.</p>';
    return;
  }
  
  // Avoid showing the same quote twice in a row
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  } while (randomIndex === currentQuoteIndex && filteredQuotes.length > 1);
  
  currentQuoteIndex = randomIndex;
  const selectedQuote = filteredQuotes[randomIndex];
  
  // Find the original index in the full quotes array for session storage
  const originalIndex = quotes.findIndex(quote => 
    quote.text === selectedQuote.text && 
    quote.author === selectedQuote.author && 
    quote.category === selectedQuote.category
  );
  
  // Save to session storage
  saveLastViewedQuote(originalIndex);
  
  // Create quote display elements
  const quoteDisplay = document.getElementById('quoteDisplay');
  quoteDisplay.innerHTML = '';
  
  const quoteContainer = document.createElement('div');
  
  const quoteText = document.createElement('p');
  quoteText.textContent = `"${selectedQuote.text}"`;
  
  const quoteInfo = document.createElement('p');
  quoteInfo.textContent = `Category: ${selectedQuote.category} | Author: ${selectedQuote.author}`;
  
  quoteContainer.appendChild(quoteText);
  quoteContainer.appendChild(quoteInfo);
  quoteDisplay.appendChild(quoteContainer);
}

// Function to create add quote form
function createAddQuoteForm() {
  const existingForm = document.getElementById('addQuoteFormContainer');
  if (existingForm) {
    existingForm.remove();
    return;
  }
  
  const formContainer = document.createElement('div');
  formContainer.id = 'addQuoteFormContainer';
  
  const formTitle = document.createElement('h3');
  formTitle.textContent = 'Add New Quote';
  
  const quoteTextLabel = document.createElement('label');
  quoteTextLabel.textContent = 'Quote Text:';
  
  const quoteTextInput = document.createElement('textarea');
  quoteTextInput.id = 'newQuoteText';
  quoteTextInput.placeholder = 'Enter a new quote';
  
  const categoryLabel = document.createElement('label');
  categoryLabel.textContent = 'Category:';
  
  const categoryInput = document.createElement('input');
  categoryInput.id = 'newQuoteCategory';
  categoryInput.type = 'text';
  categoryInput.placeholder = 'Enter quote category';
  
  const authorLabel = document.createElement('label');
  authorLabel.textContent = 'Author:';
  
  const authorInput = document.createElement('input');
  authorInput.id = 'newQuoteAuthor';
  authorInput.type = 'text';
  authorInput.placeholder = 'Enter author name';
  
  const addButton = document.createElement('button');
  addButton.textContent = 'Add Quote';
  addButton.onclick = addQuote;
  
  const cancelButton = document.createElement('button');
  cancelButton.textContent = 'Cancel';
  cancelButton.onclick = function() {
    formContainer.remove();
  };
  
  formContainer.appendChild(formTitle);
  formContainer.appendChild(quoteTextLabel);
  formContainer.appendChild(quoteTextInput);
  formContainer.appendChild(categoryLabel);
  formContainer.appendChild(categoryInput);
  formContainer.appendChild(authorLabel);
  formContainer.appendChild(authorInput);
  formContainer.appendChild(addButton);
  formContainer.appendChild(cancelButton);
  
  document.body.appendChild(formContainer);
}

// Function to add a new quote (updated for filtering)
function addQuote() {
  const textInput = document.getElementById('newQuoteText');
  const categoryInput = document.getElementById('newQuoteCategory');
  const authorInput = document.getElementById('newQuoteAuthor');
  
  const text = textInput.value.trim();
  const category = categoryInput.value.trim();
  const author = authorInput.value.trim();
  
  if (!text || !category) {
    alert('Please fill in both quote text and category!');
    return;
  }
  
  const newQuote = {
    text: text,
    category: category,
    author: author || 'Unknown'
  };
  
  quotes.push(newQuote);
  saveQuotes();
  
  // Update categories dropdown
  populateCategories();
  
  // Update filtered quotes if needed
  filterQuotes();
  
  document.getElementById('addQuoteFormContainer').remove();
  
  alert('Quote added successfully and saved to storage!');
}

// JSON Export Function
function exportQuotesToJSON() {
  try {
    const quotesJSON = JSON.stringify(quotes, null, 2);
    const blob = new Blob([quotesJSON], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = `quotes_export_${new Date().toISOString().split('T')[0]}.json`;
    downloadLink.textContent = 'Download JSON';
    
    // Trigger download
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    
    // Clean up the URL object
    URL.revokeObjectURL(url);
    
    alert('Quotes exported successfully!');
  } catch (error) {
    console.error('Error exporting quotes:', error);
    alert('Error exporting quotes');
  }
}

// JSON Import Function (updated for filtering)
function importFromJsonFile(event) {
  const file = event.target.files[0];
  if (!file) return;
  
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
    try {
      const importedQuotes = JSON.parse(event.target.result);
      
      // Validate imported data
      if (!Array.isArray(importedQuotes)) {
        throw new Error('Invalid format: Expected an array of quotes');
      }
      
      // Validate each quote object
      for (let quote of importedQuotes) {
        if (!quote.text || !quote.category) {
          throw new Error('Invalid quote format: Each quote must have text and category');
        }
      }
      
      quotes.push(...importedQuotes);
      saveQuotes();
      
      // Update categories dropdown
      populateCategories();
      
      // Update filtered quotes
      filterQuotes();
      
      alert(`Successfully imported ${importedQuotes.length} quotes!`);
      
      // Clear the file input
      event.target.value = '';
      
    } catch (error) {
      console.error('Error importing quotes:', error);
      alert(`Error importing quotes: ${error.message}`);
    }
  };
  
  fileReader.onerror = function() {
    alert('Error reading the file');
  };
  
  fileReader.readAsText(file);
}

// Function to create control buttons
function createControlButtons() {
  const controlContainer = document.getElementById('controlButtons');
  
  const addQuoteButton = document.createElement('button');
  addQuoteButton.textContent = 'Add New Quote';
  addQuoteButton.onclick = createAddQuoteForm;

  const exportButton = document.getElementById('exportBtn');
  exportButton.onclick = exportQuotesToJSON;
  
  const importInput = document.getElementById('importFile');
  importInput.onchange = importFromJsonFile;
  
  controlContainer.appendChild(addQuoteButton);
}

// Event listeners
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  // Load quotes from storage
  loadQuotes();
  
  // Populate categories dropdown
  populateCategories();
  
  // Apply initial filter
  filterQuotes();
  
  // Initialize display
  document.getElementById('quoteDisplay').innerHTML = '<p>Click "Show New Quote" to display a random quote!</p>';
  
  // Create control buttons
  createControlButtons();
  
  console.log('Application initialized with', quotes.length, 'quotes');
});