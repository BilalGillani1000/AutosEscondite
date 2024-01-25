import React, { useState } from "react";
import { Form, Button } from 'react-bootstrap';
import "../styles/styles.css";

class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (const char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.isEndOfWord = true;
  }

  searchPrefix(prefix) {
    let node = this.root;
    for (const char of prefix) {
      if (!node.children[char]) {
        return null; // Prefix not found
      }
      node = node.children[char];
    }
    return node;
  }

  getAllSuggestions(node, prefix) {
    const suggestions = [];
    this.traverse(node, prefix, suggestions);
    return suggestions;
  }

  traverse(node, currentPrefix, suggestions) {
    if (node.isEndOfWord) {
      suggestions.push(currentPrefix);
    }

    for (const [char, childNode] of Object.entries(node.children)) {
      this.traverse(childNode, currentPrefix + char, suggestions);
    }
  }
}

const SearchBar = () => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const trie = new Trie();

  // Example car brands
  const carBrands = ["Toyota", "Tesla", "Ford", "Chevrolet", "Honda", "Hyundai", "Nissan", "BMW", "Mercedes-Benz"];

  // Insert car brands into the Trie
  carBrands.forEach((brand) => {
    trie.insert(brand.toLowerCase()); // Convert to lowercase for case-insensitive matching
  });

  const handleInputChange = (event) => {
    const userInput = event.target.value.toLowerCase();
    setInput(userInput);

    // Search Trie for suggestions
    const prefixNode = trie.searchPrefix(userInput);
    const suggestions = prefixNode ? trie.getAllSuggestions(prefixNode, userInput) : [];
    setSuggestions(suggestions);
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    setSuggestions([]); // Clear suggestions after selection
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Use the selected values as needed (e.g., send to backend, update state, etc.)
    console.log('Selected brand:', input);
  };

  return (
    <Form onSubmit={handleSubmit} className="d-flex position-relative">
      <Form.Control
        className=""
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Enter a car brand..."
        autoComplete="off"
      />
      <Button variant="primary" type="submit">
        Search
      </Button>
      {suggestions.length > 0 && (
        <div className="suggestions">
          {suggestions.map((suggestion, index) => (
            <div key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </Form>
  );
};

export default SearchBar;
