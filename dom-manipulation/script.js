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

    // Local Storage Functions
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
          saveQuotes(); // Save default quotes to localStorage
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

    // Function to show random quote
    function showRandomQuote() {
      if (quotes.length === 0) {
        document.getElementById('quoteDisplay').innerHTML = '<p>No quotes available.</p>';
        return;
      }
      
      // Avoid showing the same quote twice in a row
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * quotes.length);
      } while (randomIndex === currentQuoteIndex && quotes.length > 1);
      
      currentQuoteIndex = randomIndex;
      const selectedQuote = quotes[randomIndex];
      
      // Save to session storage
      saveLastViewedQuote(randomIndex);
      
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

    // Function to add a new quote
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
      saveQuotes(); // Save to localStorage
      
      document.getElementById('addQuoteFormContainer').remove();
      
      alert('Quote added successfully and saved to local storage!');
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

    // JSON Import Function
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
          saveQuotes(); // Save to localStorage
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
      
      const title = document.createElement('h3');
      title.textContent = 'Import/Export Quotes';
      
      const exportButton = document.createElement('button');
      exportButton.textContent = 'Export Quotes';
      exportButton.onclick = exportQuotesToJSON;
      
      const importLabel = document.createElement('label');
      importLabel.textContent = 'Import Quotes from JSON file:';
      
      const importInput = document.createElement('input');
      importInput.type = 'file';
      importInput.id = 'importFile';
      importInput.accept = '.json';
      importInput.onchange = importFromJsonFile;
      
      const closeButton = document.createElement('button');
      closeButton.textContent = 'Close';
      closeButton.onclick = function() {
        container.remove();
      };
      
      controlContainer.appendChild(addQuoteButton);
      controlContainer.appendChild(title);
      controlContainer.appendChild(exportButton);
      controlContainer.appendChild(importLabel);
      controlContainer.appendChild(importInput);
      controlContainer.appendChild(closeButton);
    }

    // Event listeners
    document.getElementById('newQuote').addEventListener('click', showRandomQuote);

    // Initialize the application
    document.addEventListener('DOMContentLoaded', function() {
      // Load quotes from localStorage
      loadQuotes();
      
      // Initialize display
      document.getElementById('quoteDisplay').innerHTML = '<p>Click "Show New Quote" to display a random quote!</p>';
      
      // Create control buttons
      createControlButtons();
      
      console.log('Application initialized with', quotes.length, 'quotes');
    });