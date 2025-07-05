// Quote database - array of quote objects
    let quotes = [
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

    let currentQuoteIndex = -1;

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
      
      document.getElementById('addQuoteFormContainer').remove();
      
      alert('Quote added successfully!');
    }

    // Function to create control buttons
    function createControlButtons() {
      const controlContainer = document.createElement('div');
      
      const addQuoteButton = document.createElement('button');
      addQuoteButton.textContent = 'Add New Quote';
      addQuoteButton.onclick = createAddQuoteForm;
      
      const statsButton = document.createElement('button');
      statsButton.textContent = 'Show Stats';
      statsButton.onclick = showStats;
      
      controlContainer.appendChild(addQuoteButton);
      controlContainer.appendChild(statsButton);
      
      const newQuoteButton = document.getElementById('newQuote');
      newQuoteButton.parentNode.insertBefore(controlContainer, newQuoteButton.nextSibling);
    }

    // Function to show statistics
    function showStats() {
      const existingStats = document.getElementById('statsContainer');
      if (existingStats) {
        existingStats.remove();
        return;
      }
      
      const statsContainer = document.createElement('div');
      statsContainer.id = 'statsContainer';
      
      const statsTitle = document.createElement('h3');
      statsTitle.textContent = 'Quote Statistics';
      
      const totalQuotes = document.createElement('p');
      totalQuotes.textContent = `Total Quotes: ${quotes.length}`;
      
      const totalCategories = document.createElement('p');
      const uniqueCategories = [...new Set(quotes.map(quote => quote.category))];
      totalCategories.textContent = `Total Categories: ${uniqueCategories.length}`;
      
      const categoryList = document.createElement('p');
      categoryList.textContent = `Categories: ${uniqueCategories.join(', ')}`;
      
      const closeButton = document.createElement('button');
      closeButton.textContent = 'Close Stats';
      closeButton.onclick = function() {
        statsContainer.remove();
      };
      
      statsContainer.appendChild(statsTitle);
      statsContainer.appendChild(totalQuotes);
      statsContainer.appendChild(totalCategories);
      statsContainer.appendChild(categoryList);
      statsContainer.appendChild(closeButton);
      
      document.body.appendChild(statsContainer);
    }

    // Event listeners
    document.getElementById('newQuote').addEventListener('click', showRandomQuote);

    // Initialize the application
    document.addEventListener('DOMContentLoaded', function() {
      document.getElementById('quoteDisplay').innerHTML = '<p>Click "Show New Quote" to display a random quote!</p>';
      
      createControlButtons();
    });